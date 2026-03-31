<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $stmt = $db->prepare("
                SELECT d.*, v.name_vehicle as assigned_vehicle_name
                FROM drivers d
                LEFT JOIN vehicles v ON d.id_vehicle = v.id_vehicle
                WHERE d.id_driver = :id
            ");
            $stmt->execute([':id' => $_GET['id']]);
            $driver = $stmt->fetch();

            if ($driver) {
                // Get schedule
                $schedStmt = $db->prepare("SELECT * FROM driver_schedules WHERE id_driver = :id ORDER BY day_of_week ASC");
                $schedStmt->execute([':id' => $_GET['id']]);
                $driver['schedule'] = $schedStmt->fetchAll();

                echo json_encode(['success' => true, 'data' => $driver]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Driver not found']);
            }
        } else {
            $where = [];
            $params = [];

            if (isset($_GET['status']) && $_GET['status'] !== 'all') {
                $where[] = "d.status_driver = :status";
                $params[':status'] = $_GET['status'];
            }
            if (isset($_GET['search'])) {
                $where[] = "(d.name_driver LIKE :s1 OR d.license LIKE :s2)";
                $s = '%' . $_GET['search'] . '%';
                $params[':s1'] = $s;
                $params[':s2'] = $s;
            }

            $whereClause = count($where) > 0 ? 'WHERE ' . implode(' AND ', $where) : '';

            $stmt = $db->prepare("
                SELECT d.*, v.name_vehicle as assigned_vehicle_name
                FROM drivers d
                LEFT JOIN vehicles v ON d.id_vehicle = v.id_vehicle
                $whereClause
                ORDER BY d.name_driver ASC
            ");
            $stmt->execute($params);
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        try {
            $db->beginTransaction();

            $stmt = $db->prepare("
                INSERT INTO drivers (name_driver, phone_driver, email_driver, license, license_expiry, status_driver, max_hours_week, id_vehicle)
                VALUES (:name, :phone, :email, :license, :expiry, :status, :max_hours, :vehicle)
            ");
            $stmt->execute([
                ':name' => $data['name_driver'],
                ':phone' => $data['phone_driver'] ?? '',
                ':email' => $data['email_driver'] ?? '',
                ':license' => $data['license'] ?? '',
                ':expiry' => $data['license_expiry'] ?? null,
                ':status' => $data['status_driver'] ?? 'available',
                ':max_hours' => $data['max_hours_week'] ?? 48,
                ':vehicle' => $data['id_vehicle'] ?? null
            ]);
            $driverId = $db->lastInsertId();

            if (isset($data['schedule']) && is_array($data['schedule'])) {
                $schedStmt = $db->prepare("INSERT INTO driver_schedules (id_driver, day_of_week, start_time, end_time) VALUES (:id, :day, :start, :end)");
                foreach ($data['schedule'] as $s) {
                    $schedStmt->execute([':id' => $driverId, ':day' => $s['day'], ':start' => $s['start'], ':end' => $s['end']]);
                }
            }

            $db->commit();
            echo json_encode(['success' => true, 'data' => ['id_driver' => $driverId], 'message' => 'Driver created']);
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
            echo json_encode(['success' => false, 'message' => 'Driver ID required']);
            break;
        }

        $fields = [];
        $params = [':id' => $_GET['id']];
        $allowed = ['name_driver', 'phone_driver', 'email_driver', 'license', 'license_expiry', 'status_driver', 'max_hours_week', 'id_vehicle', 'current_location'];

        foreach ($allowed as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = :$field";
                $params[":$field"] = $data[$field];
            }
        }

        if (!empty($fields)) {
            $stmt = $db->prepare("UPDATE drivers SET " . implode(', ', $fields) . " WHERE id_driver = :id");
            $stmt->execute($params);
        }

        if (isset($data['schedule'])) {
            $db->prepare("DELETE FROM driver_schedules WHERE id_driver = :id")->execute([':id' => $_GET['id']]);
            $schedStmt = $db->prepare("INSERT INTO driver_schedules (id_driver, day_of_week, start_time, end_time) VALUES (:id, :day, :start, :end)");
            foreach ($data['schedule'] as $s) {
                $schedStmt->execute([':id' => $_GET['id'], ':day' => $s['day'], ':start' => $s['start'], ':end' => $s['end']]);
            }
        }

        echo json_encode(['success' => true, 'message' => 'Driver updated']);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Driver ID required']);
            break;
        }
        $db->prepare("DELETE FROM drivers WHERE id_driver = :id")->execute([':id' => $_GET['id']]);
        echo json_encode(['success' => true, 'message' => 'Driver deleted']);
        break;
}
?>
