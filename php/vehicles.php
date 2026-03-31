<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $stmt = $db->prepare("SELECT * FROM vehicles WHERE id_vehicle = :id");
            $stmt->execute([':id' => $_GET['id']]);
            $vehicle = $stmt->fetch();
            if ($vehicle) {
                // Get features
                $featStmt = $db->prepare("SELECT feature FROM vehicle_features WHERE id_vehicle = :id");
                $featStmt->execute([':id' => $_GET['id']]);
                $vehicle['features'] = array_column($featStmt->fetchAll(), 'feature');
                echo json_encode(['success' => true, 'data' => $vehicle]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Vehicle not found']);
            }
        } else {
            $where = [];
            $params = [];

            if (isset($_GET['status']) && $_GET['status'] !== 'all') {
                $where[] = "status_vehicle = :status";
                $params[':status'] = $_GET['status'];
            }
            if (isset($_GET['type'])) {
                $where[] = "type_vehicle = :type";
                $params[':type'] = $_GET['type'];
            }
            if (isset($_GET['min_capacity'])) {
                $where[] = "capacity >= :cap";
                $params[':cap'] = (int)$_GET['min_capacity'];
            }
            if (isset($_GET['search'])) {
                $where[] = "(name_vehicle LIKE :s1 OR plate LIKE :s2)";
                $s = '%' . $_GET['search'] . '%';
                $params[':s1'] = $s;
                $params[':s2'] = $s;
            }

            $whereClause = count($where) > 0 ? 'WHERE ' . implode(' AND ', $where) : '';

            $stmt = $db->prepare("SELECT * FROM vehicles $whereClause ORDER BY name_vehicle ASC");
            $stmt->execute($params);
            $vehicles = $stmt->fetchAll();

            echo json_encode(['success' => true, 'data' => $vehicles]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        try {
            $db->beginTransaction();

            $stmt = $db->prepare("
                INSERT INTO vehicles (name_vehicle, plate, type_vehicle, capacity, status_vehicle, fuel_level, mileage, next_service_date, insurance_expiry, daily_rate, image_url)
                VALUES (:name, :plate, :type, :capacity, :status, :fuel, :mileage, :service, :insurance, :rate, :image)
            ");
            $stmt->execute([
                ':name' => $data['name_vehicle'],
                ':plate' => $data['plate'],
                ':type' => $data['type_vehicle'] ?? 'sedan',
                ':capacity' => $data['capacity'] ?? 4,
                ':status' => $data['status_vehicle'] ?? 'available',
                ':fuel' => $data['fuel_level'] ?? 100,
                ':mileage' => $data['mileage'] ?? 0,
                ':service' => $data['next_service_date'] ?? null,
                ':insurance' => $data['insurance_expiry'] ?? null,
                ':rate' => $data['daily_rate'] ?? 0,
                ':image' => $data['image_url'] ?? null
            ]);
            $vehicleId = $db->lastInsertId();

            if (isset($data['features']) && is_array($data['features'])) {
                $featStmt = $db->prepare("INSERT INTO vehicle_features (id_vehicle, feature) VALUES (:id, :feat)");
                foreach ($data['features'] as $f) {
                    $featStmt->execute([':id' => $vehicleId, ':feat' => $f]);
                }
            }

            $db->commit();
            echo json_encode(['success' => true, 'data' => ['id_vehicle' => $vehicleId], 'message' => 'Vehicle created']);
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
            echo json_encode(['success' => false, 'message' => 'Vehicle ID required']);
            break;
        }

        $fields = [];
        $params = [':id' => $_GET['id']];
        $allowed = ['name_vehicle', 'plate', 'type_vehicle', 'capacity', 'status_vehicle', 'fuel_level', 'mileage', 'next_service_date', 'insurance_expiry', 'daily_rate', 'image_url'];

        foreach ($allowed as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = :$field";
                $params[":$field"] = $data[$field];
            }
        }

        if (!empty($fields)) {
            $stmt = $db->prepare("UPDATE vehicles SET " . implode(', ', $fields) . " WHERE id_vehicle = :id");
            $stmt->execute($params);
        }

        if (isset($data['features'])) {
            $db->prepare("DELETE FROM vehicle_features WHERE id_vehicle = :id")->execute([':id' => $_GET['id']]);
            $featStmt = $db->prepare("INSERT INTO vehicle_features (id_vehicle, feature) VALUES (:id, :feat)");
            foreach ($data['features'] as $f) {
                $featStmt->execute([':id' => $_GET['id'], ':feat' => $f]);
            }
        }

        echo json_encode(['success' => true, 'message' => 'Vehicle updated']);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Vehicle ID required']);
            break;
        }
        $db->prepare("DELETE FROM vehicles WHERE id_vehicle = :id")->execute([':id' => $_GET['id']]);
        echo json_encode(['success' => true, 'message' => 'Vehicle deleted']);
        break;
}
?>
