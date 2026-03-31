<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$month = isset($_GET['month']) ? (int)$_GET['month'] : (int)date('m');
$year = isset($_GET['year']) ? (int)$_GET['year'] : (int)date('Y');

$stmt = $db->prepare("
    SELECT
        r.id_reservation, r.pickup_date, r.pickup_time, r.service_type, r.status_reservation,
        r.pickup_address, r.dropoff_address, r.amount,
        c.nom_customer, c.prenom_customer,
        d.name_driver,
        v.name_vehicle
    FROM reservations r
    LEFT JOIN customers c ON r.id_customer = c.id_customer
    LEFT JOIN drivers d ON r.id_driver = d.id_driver
    LEFT JOIN vehicles v ON r.id_vehicle = v.id_vehicle
    WHERE MONTH(r.pickup_date) = :month AND YEAR(r.pickup_date) = :year
    ORDER BY r.pickup_date ASC, r.pickup_time ASC
");
$stmt->execute([':month' => $month, ':year' => $year]);

echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
?>
