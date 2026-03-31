<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all pricing rules
        $rulesStmt = $db->query("SELECT * FROM pricing_rules ORDER BY id_rule ASC");
        $rules = $rulesStmt->fetchAll();

        // Get all zones
        $zonesStmt = $db->query("SELECT * FROM pricing_zones ORDER BY zone_name ASC");
        $zones = $zonesStmt->fetchAll();

        // Get service rates
        $serviceStmt = $db->query("SELECT * FROM service_rates ORDER BY service_type ASC");
        $services = $serviceStmt->fetchAll();

        echo json_encode([
            'success' => true,
            'data' => [
                'rules' => $rules,
                'zones' => $zones,
                'services' => $services
            ]
        ]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        try {
            $db->beginTransaction();

            // Update pricing rules
            if (isset($data['rules'])) {
                $db->exec("DELETE FROM pricing_rules");
                $stmt = $db->prepare("INSERT INTO pricing_rules (rule_key, rule_label, value, unit) VALUES (:key, :label, :value, :unit)");
                foreach ($data['rules'] as $rule) {
                    $stmt->execute([
                        ':key' => $rule['key'],
                        ':label' => $rule['label'],
                        ':value' => $rule['value'],
                        ':unit' => $rule['unit'] ?? '€'
                    ]);
                }
            }

            // Update zones
            if (isset($data['zones'])) {
                $db->exec("DELETE FROM pricing_zones");
                $stmt = $db->prepare("INSERT INTO pricing_zones (zone_name, zone_from, zone_to, base_price, price_per_km) VALUES (:name, :from_loc, :to_loc, :base, :per_km)");
                foreach ($data['zones'] as $zone) {
                    $stmt->execute([
                        ':name' => $zone['name'],
                        ':from_loc' => $zone['from'],
                        ':to_loc' => $zone['to'],
                        ':base' => $zone['base_price'],
                        ':per_km' => $zone['price_per_km']
                    ]);
                }
            }

            // Update service rates
            if (isset($data['services'])) {
                $db->exec("DELETE FROM service_rates");
                $stmt = $db->prepare("INSERT INTO service_rates (service_type, base_rate, hourly_rate, min_hours) VALUES (:type, :base, :hourly, :min)");
                foreach ($data['services'] as $svc) {
                    $stmt->execute([
                        ':type' => $svc['service_type'],
                        ':base' => $svc['base_rate'],
                        ':hourly' => $svc['hourly_rate'] ?? 0,
                        ':min' => $svc['min_hours'] ?? 0
                    ]);
                }
            }

            $db->commit();
            echo json_encode(['success' => true, 'message' => 'Pricing updated']);
        } catch (Exception $e) {
            $db->rollBack();
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
        break;
}
?>
