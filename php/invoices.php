<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $stmt = $db->prepare("
                SELECT i.*, c.nom_customer, c.prenom_customer, c.email_customer
                FROM invoices i
                LEFT JOIN customers c ON i.id_customer = c.id_customer
                WHERE i.id_invoice = :id
            ");
            $stmt->execute([':id' => $_GET['id']]);
            $invoice = $stmt->fetch();

            if ($invoice) {
                $itemsStmt = $db->prepare("SELECT * FROM invoice_items WHERE id_invoice = :id ORDER BY id_item ASC");
                $itemsStmt->execute([':id' => $_GET['id']]);
                $invoice['items'] = $itemsStmt->fetchAll();
                echo json_encode(['success' => true, 'data' => $invoice]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Invoice not found']);
            }
        } else {
            $where = [];
            $params = [];

            if (isset($_GET['status']) && $_GET['status'] !== 'all') {
                $where[] = "i.status_invoice = :status";
                $params[':status'] = $_GET['status'];
            }
            if (isset($_GET['search'])) {
                $where[] = "(i.invoice_number LIKE :s1 OR c.nom_customer LIKE :s2 OR c.prenom_customer LIKE :s3)";
                $s = '%' . $_GET['search'] . '%';
                $params[':s1'] = $s;
                $params[':s2'] = $s;
                $params[':s3'] = $s;
            }

            $whereClause = count($where) > 0 ? 'WHERE ' . implode(' AND ', $where) : '';

            $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
            $perPage = isset($_GET['per_page']) ? min(100, max(1, (int)$_GET['per_page'])) : 20;
            $offset = ($page - 1) * $perPage;

            $countStmt = $db->prepare("
                SELECT COUNT(*) as total FROM invoices i
                LEFT JOIN customers c ON i.id_customer = c.id_customer
                $whereClause
            ");
            $countStmt->execute($params);
            $total = $countStmt->fetch()['total'];

            $stmt = $db->prepare("
                SELECT i.*, c.nom_customer, c.prenom_customer, c.email_customer
                FROM invoices i
                LEFT JOIN customers c ON i.id_customer = c.id_customer
                $whereClause
                ORDER BY i.date_creation_invoice DESC
                LIMIT $perPage OFFSET $offset
            ");
            $stmt->execute($params);
            $invoices = $stmt->fetchAll();

            // Get items for each invoice
            foreach ($invoices as &$inv) {
                $itemsStmt = $db->prepare("SELECT * FROM invoice_items WHERE id_invoice = :id");
                $itemsStmt->execute([':id' => $inv['id_invoice']]);
                $inv['items'] = $itemsStmt->fetchAll();
            }

            // Stats
            $statsStmt = $db->query("
                SELECT
                    COUNT(*) as total_count,
                    SUM(CASE WHEN status_invoice = 'paid' THEN total_ttc ELSE 0 END) as total_collected,
                    SUM(CASE WHEN status_invoice = 'sent' THEN total_ttc ELSE 0 END) as total_pending,
                    SUM(CASE WHEN status_invoice = 'overdue' THEN total_ttc ELSE 0 END) as total_overdue
                FROM invoices
            ");
            $stats = $statsStmt->fetch();

            echo json_encode([
                'success' => true,
                'data' => $invoices,
                'stats' => $stats,
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

            // Generate invoice number
            $yearMonth = date('Y');
            $countStmt = $db->query("SELECT COUNT(*) as cnt FROM invoices WHERE YEAR(date_creation_invoice) = YEAR(NOW())");
            $count = $countStmt->fetch()['cnt'] + 1;
            $invoiceNumber = 'INV-' . $yearMonth . '-' . str_pad($count, 3, '0', STR_PAD_LEFT);

            $subtotal = 0;
            if (isset($data['items'])) {
                foreach ($data['items'] as $item) {
                    $subtotal += ($item['qty'] * $item['unit_price']);
                }
            }
            $taxRate = $data['tax_rate'] ?? 20;
            $tax = $subtotal * ($taxRate / 100);
            $totalTTC = $subtotal + $tax;

            $stmt = $db->prepare("
                INSERT INTO invoices (invoice_number, id_customer, id_reservation, issue_date, due_date, subtotal_ht, tax_rate, tax_amount, total_ttc, status_invoice)
                VALUES (:number, :customer, :reservation, :issue_date, :due_date, :subtotal, :tax_rate, :tax, :total, :status)
            ");
            $stmt->execute([
                ':number' => $invoiceNumber,
                ':customer' => $data['id_customer'],
                ':reservation' => $data['id_reservation'] ?? null,
                ':issue_date' => $data['issue_date'] ?? date('Y-m-d'),
                ':due_date' => $data['due_date'] ?? date('Y-m-d', strtotime('+30 days')),
                ':subtotal' => $subtotal,
                ':tax_rate' => $taxRate,
                ':tax' => $tax,
                ':total' => $totalTTC,
                ':status' => $data['status_invoice'] ?? 'draft'
            ]);
            $invoiceId = $db->lastInsertId();

            if (isset($data['items'])) {
                $itemStmt = $db->prepare("
                    INSERT INTO invoice_items (id_invoice, description_item, qty, unit_price, total_item)
                    VALUES (:invoice, :desc, :qty, :price, :total)
                ");
                foreach ($data['items'] as $item) {
                    $itemTotal = $item['qty'] * $item['unit_price'];
                    $itemStmt->execute([
                        ':invoice' => $invoiceId,
                        ':desc' => $item['description'],
                        ':qty' => $item['qty'],
                        ':price' => $item['unit_price'],
                        ':total' => $itemTotal
                    ]);
                }
            }

            $db->commit();
            echo json_encode([
                'success' => true,
                'data' => ['id_invoice' => $invoiceId, 'invoice_number' => $invoiceNumber],
                'message' => 'Invoice created'
            ]);
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
            echo json_encode(['success' => false, 'message' => 'Invoice ID required']);
            break;
        }

        $fields = [];
        $params = [':id' => $_GET['id']];
        $allowed = ['status_invoice', 'due_date', 'paid_date', 'subtotal_ht', 'tax_rate', 'tax_amount', 'total_ttc'];

        foreach ($allowed as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = :$field";
                $params[":$field"] = $data[$field];
            }
        }

        if (!empty($fields)) {
            $stmt = $db->prepare("UPDATE invoices SET " . implode(', ', $fields) . " WHERE id_invoice = :id");
            $stmt->execute($params);
        }

        echo json_encode(['success' => true, 'message' => 'Invoice updated']);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invoice ID required']);
            break;
        }
        $db->prepare("DELETE FROM invoices WHERE id_invoice = :id")->execute([':id' => $_GET['id']]);
        echo json_encode(['success' => true, 'message' => 'Invoice deleted']);
        break;
}
?>
