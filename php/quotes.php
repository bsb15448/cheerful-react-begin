<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $where = [];
        $params = [];

        if (isset($_GET['status']) && $_GET['status'] !== 'all') {
            $where[] = "status_quote = :status";
            $params[':status'] = $_GET['status'];
        }

        $whereClause = count($where) > 0 ? 'WHERE ' . implode(' AND ', $where) : '';

        $stmt = $db->prepare("SELECT * FROM quotes $whereClause ORDER BY date_creation_quote DESC");
        $stmt->execute($params);
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        try {
            $stmt = $db->prepare("
                INSERT INTO quotes (
                    client_name, client_email, client_phone,
                    service_type, pickup_address, dropoff_address,
                    pickup_date, pickup_time, passenger_count,
                    special_requests, status_quote
                ) VALUES (
                    :name, :email, :phone,
                    :service, :pickup, :dropoff,
                    :date, :time, :passengers,
                    :requests, 'new'
                )
            ");
            $stmt->execute([
                ':name' => $data['client_name'] ?? '',
                ':email' => $data['client_email'] ?? '',
                ':phone' => $data['client_phone'] ?? '',
                ':service' => $data['service_type'] ?? 'other',
                ':pickup' => $data['pickup_address'] ?? '',
                ':dropoff' => $data['dropoff_address'] ?? '',
                ':date' => $data['pickup_date'] ?? null,
                ':time' => $data['pickup_time'] ?? null,
                ':passengers' => $data['passenger_count'] ?? 1,
                ':requests' => $data['special_requests'] ?? null
            ]);

            echo json_encode([
                'success' => true,
                'data' => ['id_quote' => $db->lastInsertId()],
                'message' => 'Quote request received'
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Quote ID required']);
            break;
        }

        $fields = [];
        $params = [':id' => $_GET['id']];
        $allowed = ['status_quote', 'quoted_amount', 'admin_notes'];

        foreach ($allowed as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = :$field";
                $params[":$field"] = $data[$field];
            }
        }

        if (!empty($fields)) {
            $stmt = $db->prepare("UPDATE quotes SET " . implode(', ', $fields) . " WHERE id_quote = :id");
            $stmt->execute($params);
        }

        echo json_encode(['success' => true, 'message' => 'Quote updated']);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Quote ID required']);
            break;
        }
        $db->prepare("DELETE FROM quotes WHERE id_quote = :id")->execute([':id' => $_GET['id']]);
        echo json_encode(['success' => true, 'message' => 'Quote deleted']);
        break;
}
?>
