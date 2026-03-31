<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Stats cards
$stats = $db->query("
    SELECT
        (SELECT COUNT(*) FROM reservations) as total_reservations,
        (SELECT COUNT(*) FROM reservations WHERE date_creation_reservation >= DATE_SUB(NOW(), INTERVAL 30 DAY)) as reservations_this_month,
        (SELECT COALESCE(SUM(amount), 0) FROM reservations WHERE payment_status = 'paid') as total_revenue,
        (SELECT COALESCE(SUM(amount), 0) FROM reservations WHERE payment_status = 'paid' AND date_creation_reservation >= DATE_SUB(NOW(), INTERVAL 30 DAY)) as revenue_this_month,
        (SELECT COUNT(*) FROM customers) as total_customers,
        (SELECT COUNT(*) FROM vehicles WHERE status_vehicle = 'available') as active_vehicles,
        (SELECT COUNT(*) FROM vehicles) as total_vehicles,
        (SELECT COUNT(*) FROM drivers WHERE status_driver = 'available') as available_drivers,
        (SELECT COUNT(*) FROM reservations WHERE status_reservation = 'pending') as pending_reservations,
        (SELECT COUNT(*) FROM invoices WHERE status_invoice = 'overdue') as overdue_invoices
")->fetch();

// Recent reservations
$recent = $db->query("
    SELECT r.*, c.nom_customer, c.prenom_customer
    FROM reservations r
    LEFT JOIN customers c ON r.id_customer = c.id_customer
    ORDER BY r.date_creation_reservation DESC
    LIMIT 5
")->fetchAll();

// Revenue chart (last 7 months)
$revenueChart = $db->query("
    SELECT
        MONTH(pickup_date) as month,
        YEAR(pickup_date) as year,
        COALESCE(SUM(amount), 0) as revenue
    FROM reservations
    WHERE payment_status = 'paid'
        AND pickup_date >= DATE_SUB(NOW(), INTERVAL 7 MONTH)
    GROUP BY YEAR(pickup_date), MONTH(pickup_date)
    ORDER BY year ASC, month ASC
")->fetchAll();

// Upcoming reservations today
$todayReservations = $db->query("
    SELECT r.*, c.nom_customer, c.prenom_customer, d.name_driver, v.name_vehicle
    FROM reservations r
    LEFT JOIN customers c ON r.id_customer = c.id_customer
    LEFT JOIN drivers d ON r.id_driver = d.id_driver
    LEFT JOIN vehicles v ON r.id_vehicle = v.id_vehicle
    WHERE r.pickup_date = CURDATE() AND r.status_reservation IN ('confirmed', 'pending')
    ORDER BY r.pickup_time ASC
")->fetchAll();

echo json_encode([
    'success' => true,
    'data' => [
        'stats' => $stats,
        'recent_reservations' => $recent,
        'revenue_chart' => $revenueChart,
        'today_reservations' => $todayReservations
    ]
]);
?>
