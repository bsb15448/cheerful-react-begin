<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single reservation with customer info
            $stmt = $db->prepare("
                SELECT r.*, c.nom_customer, c.prenom_customer, c.email_customer, c.telephone_customer
                FROM reservations r
                LEFT JOIN customers c ON r.id_customer = c.id_customer
                WHERE r.id_reservation = :id
            ");
            $stmt->execute([':id' => $_GET['id']]);
            $reservation = $stmt->fetch();

            if ($reservation) {
                echo json_encode(['success' => true, 'data' => $reservation]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Reservation not found']);
            }
        } else {
            // List reservations with filters
            $where = [];
            $params = [];

            if (isset($_GET['status']) && $_GET['status'] !== 'all') {
                $where[] = "r.status_reservation = :status";
                $params[':status'] = $_GET['status'];
            }
            if (isset($_GET['service_type']) && $_GET['service_type'] !== 'all') {
                $where[] = "r.service_type = :service_type";
                $params[':service_type'] = $_GET['service_type'];
            }
            if (isset($_GET['date_from'])) {
                $where[] = "r.pickup_date >= :date_from";
                $params[':date_from'] = $_GET['date_from'];
            }
            if (isset($_GET['date_to'])) {
                $where[] = "r.pickup_date <= :date_to";
                $params[':date_to'] = $_GET['date_to'];
            }
            if (isset($_GET['search'])) {
                $where[] = "(c.nom_customer LIKE :search OR c.prenom_customer LIKE :search2 OR r.id_reservation LIKE :search3)";
                $searchTerm = '%' . $_GET['search'] . '%';
                $params[':search'] = $searchTerm;
                $params[':search2'] = $searchTerm;
                $params[':search3'] = $searchTerm;
            }

            $whereClause = count($where) > 0 ? 'WHERE ' . implode(' AND ', $where) : '';

            // Pagination
            $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
            $perPage = isset($_GET['per_page']) ? min(100, max(1, (int)$_GET['per_page'])) : 20;
            $offset = ($page - 1) * $perPage;

            // Sort
            $sortBy = isset($_GET['sort_by']) ? $_GET['sort_by'] : 'date_creation_reservation';
            $sortOrder = isset($_GET['sort_order']) && strtolower($_GET['sort_order']) === 'asc' ? 'ASC' : 'DESC';
            $allowedSorts = ['date_creation_reservation', 'pickup_date', 'amount', 'status_reservation'];
            if (!in_array($sortBy, $allowedSorts)) $sortBy = 'date_creation_reservation';

            // Count total
            $countStmt = $db->prepare("
                SELECT COUNT(*) as total
                FROM reservations r
                LEFT JOIN customers c ON r.id_customer = c.id_customer
                $whereClause
            ");
            $countStmt->execute($params);
            $total = $countStmt->fetch()['total'];

            // Fetch data
            $stmt = $db->prepare("
                SELECT r.*, c.nom_customer, c.prenom_customer, c.email_customer, c.telephone_customer
                FROM reservations r
                LEFT JOIN customers c ON r.id_customer = c.id_customer
                $whereClause
                ORDER BY r.$sortBy $sortOrder
                LIMIT $perPage OFFSET $offset
            ");
            $stmt->execute($params);
            $reservations = $stmt->fetchAll();

            echo json_encode([
                'success' => true,
                'data' => $reservations,
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

        if (!$data) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
            break;
        }

        try {
            $db->beginTransaction();

            // Create or find customer
            $customerStmt = $db->prepare("
                SELECT id_customer FROM customers WHERE email_customer = :email LIMIT 1
            ");
            $customerStmt->execute([':email' => $data['client_email']]);
            $customer = $customerStmt->fetch();

            if ($customer) {
                $customerId = $customer['id_customer'];
            } else {
                $insertCustomer = $db->prepare("
                    INSERT INTO customers (nom_customer, prenom_customer, email_customer, telephone_customer)
                    VALUES (:nom, :prenom, :email, :phone)
                ");
                $insertCustomer->execute([
                    ':nom' => $data['client_name'] ?? '',
                    ':prenom' => $data['client_first_name'] ?? '',
                    ':email' => $data['client_email'],
                    ':phone' => $data['client_phone'] ?? ''
                ]);
                $customerId = $db->lastInsertId();
            }

            // Create reservation
            $stmt = $db->prepare("
                INSERT INTO reservations (
                    id_customer, service_type, status_reservation,
                    pickup_address, dropoff_address, pickup_date, pickup_time,
                    return_date, return_time,
                    passenger_count, luggage_count, special_requests,
                    amount, currency, payment_method, payment_status,
                    source, notes
                ) VALUES (
                    :customer_id, :service_type, :status,
                    :pickup, :dropoff, :pickup_date, :pickup_time,
                    :return_date, :return_time,
                    :passengers, :luggage, :special_requests,
                    :amount, :currency, :payment_method, :payment_status,
                    :source, :notes
                )
            ");

            $stmt->execute([
                ':customer_id' => $customerId,
                ':service_type' => $data['service_type'] ?? 'other',
                ':status' => $data['status'] ?? 'pending',
                ':pickup' => $data['pickup_address'] ?? '',
                ':dropoff' => $data['dropoff_address'] ?? '',
                ':pickup_date' => $data['pickup_date'] ?? null,
                ':pickup_time' => $data['pickup_time'] ?? null,
                ':return_date' => $data['return_date'] ?? null,
                ':return_time' => $data['return_time'] ?? null,
                ':passengers' => $data['passenger_count'] ?? 1,
                ':luggage' => $data['luggage_count'] ?? 0,
                ':special_requests' => $data['special_requests'] ?? null,
                ':amount' => $data['amount'] ?? 0,
                ':currency' => $data['currency'] ?? 'EUR',
                ':payment_method' => $data['payment_method'] ?? 'card',
                ':payment_status' => $data['payment_status'] ?? 'pending',
                ':source' => $data['source'] ?? 'website',
                ':notes' => $data['notes'] ?? null
            ]);

            $reservationId = $db->lastInsertId();
            $db->commit();

            echo json_encode([
                'success' => true,
                'data' => ['id_reservation' => $reservationId, 'id_customer' => $customerId],
                'message' => 'Reservation created successfully'
            ]);
        } catch (Exception $e) {
            $db->rollBack();
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Error creating reservation: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Reservation ID required']);
            break;
        }

        $fields = [];
        $params = [':id' => $_GET['id']];

        $allowedFields = [
            'status_reservation', 'service_type', 'pickup_address', 'dropoff_address',
            'pickup_date', 'pickup_time', 'return_date', 'return_time',
            'passenger_count', 'luggage_count', 'special_requests',
            'amount', 'payment_status', 'payment_method',
            'id_vehicle', 'id_driver', 'notes'
        ];

        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = :$field";
                $params[":$field"] = $data[$field];
            }
        }

        if (empty($fields)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'No fields to update']);
            break;
        }

        $stmt = $db->prepare("UPDATE reservations SET " . implode(', ', $fields) . " WHERE id_reservation = :id");
        $stmt->execute($params);

        echo json_encode(['success' => true, 'message' => 'Reservation updated']);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Reservation ID required']);
            break;
        }

        $stmt = $db->prepare("DELETE FROM reservations WHERE id_reservation = :id");
        $stmt->execute([':id' => $_GET['id']]);

        echo json_encode(['success' => true, 'message' => 'Reservation deleted']);
        break;
}
?>
