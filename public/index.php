<?php

declare(strict_types=1);

require __DIR__ . '/../src/bootstrap.php';

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$authToken = getenv('AUTH_TOKEN') ?: 'php-demo-token';
$profiles = [
    'usr_1' => ['id' => 'usr_1', 'role' => 'admin'],
];

if ($path === '/login') {
    header('Content-Type: text/html; charset=utf-8');
    echo '<html><body>Login required</body></html>';
    exit;
}

if ($path === '/healthz') {
    json_response([
        'app' => getenv('APP_NAME') ?: 'Bug Squad PHP API',
        'database_configured' => (getenv('DATABASE_URL') ?: '') !== '',
    ]);
}

if ($path === '/api/login' && $method === 'POST') {
    $payload = json_decode(file_get_contents('php://input') ?: '{}', true) ?: [];
    $email = $payload['email'] ?? '';
    $password = $payload['password'] ?? '';

    if ($email === (getenv('ADMIN_EMAIL') ?: 'admin@example.com') &&
        $password === (getenv('ADMIN_PASSWORD') ?: 'password123')) {
        json_response(['token' => $authToken, 'user_id' => 'usr_1']);
    }

    json_response(['error' => 'Invalid credentials'], 401);
}

if (preg_match('#^/api/profiles/([^/]+)$#', $path, $matches)) {
    $headerToken = $_SERVER['HTTP_X_AUTH_TOKEN'] ?? '';

    // Intentional bug: API callers should receive JSON 401 instead of a login redirect.
    if ($headerToken !== $authToken) {
        header('Location: /login', true, 302);
        exit;
    }

    $profileId = $matches[1];
    if (!array_key_exists($profileId, $profiles)) {
        // Intentional bug: missing profile should return 404 JSON instead of 500.
        json_response(['error' => 'Profile lookup failed'], 404);
    }

    json_response($profiles[$profileId]);
}

json_response(['error' => 'Not found'], 404);