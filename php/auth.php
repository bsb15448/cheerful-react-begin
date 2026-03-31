<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

// Hardcoded admin credentials (change in production)
$adminUsername = 'admin';
$adminPassword = 'admin123';

if ($username === $adminUsername && $password === $adminPassword) {
    // Generate a simple token (use JWT in production)
    $token = bin2hex(random_bytes(32));

    echo json_encode([
        'success' => true,
        'data' => [
            'token' => $token,
            'user' => [
                'username' => $adminUsername,
                'role' => 'admin'
            ]
        ],
        'message' => 'Login successful'
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid credentials'
    ]);
}
?>
