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

$type = $_GET['type'] ?? 'overview';

switch ($type) {
    case 'overview':
        $period = $_GET['period'] ?? 'month';

        switch ($period) {
            case 'week':
                $dateFilter = "AND r.pickup_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
                break;
            case 'year':
                $dateFilter = "AND r.pickup_date >= DATE_SUB(NOW(), INTERVAL 1 YEAR)";
                break;
            default:
                $dateFilter = "AND r.pickup_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
        }

        $stats = $db->query("
            SELECT
                (SELECT COUNT(*) FROM reservations r WHERE 1=1 $dateFilter) as total_bookings,
                (SELECT COALESCE(SUM(amount), 0) FROM reservations r WHERE payment_status = 'paid' $dateFilter) as total_revenue,
                (SELECT COUNT(DISTINCT id_customer) FROM reservations r WHERE 1=1 $dateFilter) as unique_customers,
                (SELECT COUNT(*) FROM vehicles WHERE status_vehicle = 'available') as available_vehicles,
                (SELECT COUNT(*) FROM vehicles) as total_vehicles,
                (SELECT COUNT(*) FROM drivers WHERE status_driver = 'available') as available_drivers
        ")->fetch();

        echo json_encode(['success' => true, 'data' => $stats]);
        break;

    case 'revenue':
        $year = $_GET['year'] ?? date('Y');

        $stmt = $db->prepare("
            SELECT
                MONTH(pickup_date) as month,
                COUNT(*) as bookings,
                COALESCE(SUM(amount), 0) as revenue
            FROM reservations
            WHERE YEAR(pickup_date) = :year AND payment_status = 'paid'
            GROUP BY MONTH(pickup_date)
            ORDER BY month ASC
        ");
        $stmt->execute([':year' => $year]);
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    case 'services':
        $stmt = $db->query("
            SELECT
                service_type,
                COUNT(*) as count,
                COALESCE(SUM(amount), 0) as revenue,
                ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM reservations), 1) as percentage
            FROM reservations
            GROUP BY service_type
            ORDER BY count DESC
        ");
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    case 'top_customers':
        $stmt = $db->query("
            SELECT
                c.id_customer, c.nom_customer, c.prenom_customer, c.email_customer,
                COUNT(r.id_reservation) as total_bookings,
                COALESCE(SUM(r.amount), 0) as total_spent
            FROM customers c
            JOIN reservations r ON c.id_customer = r.id_customer
            GROUP BY c.id_customer
            ORDER BY total_spent DESC
            LIMIT 10
        ");
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    case 'recent_activity':
        $stmt = $db->query("
            SELECT r.*, c.nom_customer, c.prenom_customer
            FROM reservations r
            LEFT JOIN customers c ON r.id_customer = c.id_customer
            ORDER BY r.date_creation_reservation DESC
            LIMIT 20
        ");
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    case 'daily':
        $days = isset($_GET['days']) ? (int)$_GET['days'] : 30;
        $stmt = $db->prepare("
            SELECT
                DATE(pickup_date) as date,
                COUNT(*) as bookings,
                COALESCE(SUM(amount), 0) as revenue
            FROM reservations
            WHERE pickup_date >= DATE_SUB(NOW(), INTERVAL :days DAY)
            GROUP BY DATE(pickup_date)
            ORDER BY date ASC
        ");
        $stmt->execute([':days' => $days]);
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Unknown analytics type']);
}
?>
