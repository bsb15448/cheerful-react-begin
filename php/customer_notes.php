<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (!isset($_GET['customer_id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'customer_id required']);
            break;
        }
        $stmt = $db->prepare("SELECT * FROM customer_notes WHERE id_customer = :id ORDER BY date_creation DESC");
        $stmt->execute([':id' => $_GET['customer_id']]);
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("INSERT INTO customer_notes (id_customer, note, follow_up_date) VALUES (:id, :note, :follow_up)");
        $stmt->execute([
            ':id' => $data['id_customer'],
            ':note' => $data['note'],
            ':follow_up' => $data['follow_up_date'] ?? null
        ]);
        echo json_encode(['success' => true, 'data' => ['id' => $db->lastInsertId()], 'message' => 'Note added']);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Note ID required']);
            break;
        }
        $db->prepare("DELETE FROM customer_notes WHERE id_note = :id")->execute([':id' => $_GET['id']]);
        echo json_encode(['success' => true, 'message' => 'Note deleted']);
        break;
}
?>
