<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $stmt = $db->prepare("
                SELECT c.*,
                    COUNT(r.id_reservation) as total_bookings,
                    COALESCE(SUM(r.amount), 0) as total_spent,
                    MAX(r.pickup_date) as last_trip
                FROM customers c
                LEFT JOIN reservations r ON c.id_customer = r.id_customer
                WHERE c.id_customer = :id
                GROUP BY c.id_customer
            ");
            $stmt->execute([':id' => $_GET['id']]);
            $customer = $stmt->fetch();

            if ($customer) {
                // Get customer notes
                $notesStmt = $db->prepare("SELECT * FROM customer_notes WHERE id_customer = :id ORDER BY date_creation DESC");
                $notesStmt->execute([':id' => $_GET['id']]);
                $customer['notes'] = $notesStmt->fetchAll();

                // Get reservation history
                $resStmt = $db->prepare("SELECT * FROM reservations WHERE id_customer = :id ORDER BY pickup_date DESC LIMIT 20");
                $resStmt->execute([':id' => $_GET['id']]);
                $customer['reservations'] = $resStmt->fetchAll();

                echo json_encode(['success' => true, 'data' => $customer]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Customer not found']);
            }
        } else {
            $where = [];
            $params = [];

            if (isset($_GET['search'])) {
                $where[] = "(c.nom_customer LIKE :s1 OR c.prenom_customer LIKE :s2 OR c.email_customer LIKE :s3)";
                $s = '%' . $_GET['search'] . '%';
                $params[':s1'] = $s;
                $params[':s2'] = $s;
                $params[':s3'] = $s;
            }
            if (isset($_GET['tag'])) {
                $where[] = "ct.tag = :tag";
                $params[':tag'] = $_GET['tag'];
            }

            $whereClause = count($where) > 0 ? 'WHERE ' . implode(' AND ', $where) : '';

            $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
            $perPage = isset($_GET['per_page']) ? min(100, max(1, (int)$_GET['per_page'])) : 20;
            $offset = ($page - 1) * $perPage;

            $countStmt = $db->prepare("
                SELECT COUNT(DISTINCT c.id_customer) as total
                FROM customers c
                LEFT JOIN customer_tags ct ON c.id_customer = ct.id_customer
                $whereClause
            ");
            $countStmt->execute($params);
            $total = $countStmt->fetch()['total'];

            $stmt = $db->prepare("
                SELECT c.*,
                    COUNT(r.id_reservation) as total_bookings,
                    COALESCE(SUM(r.amount), 0) as total_spent,
                    MAX(r.pickup_date) as last_trip,
                    GROUP_CONCAT(DISTINCT ct.tag) as tags
                FROM customers c
                LEFT JOIN reservations r ON c.id_customer = r.id_customer
                LEFT JOIN customer_tags ct ON c.id_customer = ct.id_customer
                $whereClause
                GROUP BY c.id_customer
                ORDER BY c.date_creation_customer DESC
                LIMIT $perPage OFFSET $offset
            ");
            $stmt->execute($params);
            $customers = $stmt->fetchAll();

            // Convert tags string to array
            foreach ($customers as &$c) {
                $c['tags'] = $c['tags'] ? explode(',', $c['tags']) : [];
            }

            echo json_encode([
                'success' => true,
                'data' => $customers,
                'pagination' => [
                    'page' => $page,
                    'per_page' => $perPage,
                    'total' => (int)$total,
                    'total_pages' => ceil($total / $perPage)
                ]
            ]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        try {
            $db->beginTransaction();

            $stmt = $db->prepare("
                INSERT INTO customers (nom_customer, prenom_customer, email_customer, telephone_customer, adresse_customer, ville_customer, code_postal_customer)
                VALUES (:nom, :prenom, :email, :phone, :adresse, :ville, :code_postal)
            ");
            $stmt->execute([
                ':nom' => $data['nom_customer'],
                ':prenom' => $data['prenom_customer'],
                ':email' => $data['email_customer'],
                ':phone' => $data['telephone_customer'] ?? '',
                ':adresse' => $data['adresse_customer'] ?? '',
                ':ville' => $data['ville_customer'] ?? '',
                ':code_postal' => $data['code_postal_customer'] ?? ''
            ]);
            $customerId = $db->lastInsertId();

            // Add tags if provided
            if (isset($data['tags']) && is_array($data['tags'])) {
                $tagStmt = $db->prepare("INSERT INTO customer_tags (id_customer, tag) VALUES (:id, :tag)");
                foreach ($data['tags'] as $tag) {
                    $tagStmt->execute([':id' => $customerId, ':tag' => $tag]);
                }
            }

            $db->commit();
            echo json_encode(['success' => true, 'data' => ['id_customer' => $customerId], 'message' => 'Customer created']);
        } catch (Exception $e) {
            $db->rollBack();
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Customer ID required']);
            break;
        }

        $fields = [];
        $params = [':id' => $_GET['id']];
        $allowed = ['nom_customer', 'prenom_customer', 'email_customer', 'telephone_customer', 'adresse_customer', 'ville_customer', 'code_postal_customer'];

        foreach ($allowed as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = :$field";
                $params[":$field"] = $data[$field];
            }
        }

        if (!empty($fields)) {
            $stmt = $db->prepare("UPDATE customers SET " . implode(', ', $fields) . " WHERE id_customer = :id");
            $stmt->execute($params);
        }

        // Update tags
        if (isset($data['tags'])) {
            $db->prepare("DELETE FROM customer_tags WHERE id_customer = :id")->execute([':id' => $_GET['id']]);
            $tagStmt = $db->prepare("INSERT INTO customer_tags (id_customer, tag) VALUES (:id, :tag)");
            foreach ($data['tags'] as $tag) {
                $tagStmt->execute([':id' => $_GET['id'], ':tag' => $tag]);
            }
        }

        echo json_encode(['success' => true, 'message' => 'Customer updated']);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Customer ID required']);
            break;
        }
        $stmt = $db->prepare("DELETE FROM customers WHERE id_customer = :id");
        $stmt->execute([':id' => $_GET['id']]);
        echo json_encode(['success' => true, 'message' => 'Customer deleted']);
        break;
}
?>
