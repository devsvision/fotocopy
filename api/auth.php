<?php

declare(strict_types=1);

require_once __DIR__ . '/core/bootstrap.php';

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'login') {
    $input = request_json();
    $username = trim((string) ($input['username'] ?? ''));
    $password = (string) ($input['password'] ?? '');

    if ($username === '' || $password === '') {
        json_response(['success' => false, 'message' => 'Username dan password wajib diisi.'], 422);
    }

    $stmt = db()->prepare(
        'SELECT users.id, users.name, users.username, users.password_hash, users.store_id,
                roles.code AS role_code, roles.name AS role_name,
                stores.name AS store_name
         FROM users
         JOIN roles ON roles.id = users.role_id
         LEFT JOIN stores ON stores.id = users.store_id
         WHERE users.username = :username AND users.is_active = 1
         LIMIT 1'
    );
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        json_response(['success' => false, 'message' => 'Username atau password salah.'], 401);
    }

    session_regenerate_id(true);
    unset($user['password_hash']);
    $_SESSION['user'] = $user;

    json_response(['success' => true, 'user' => $user]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'logout') {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', $params['secure'], $params['httponly']);
    }
    session_destroy();
    json_response(['success' => true]);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'me') {
    json_response(['success' => true, 'user' => $_SESSION['user'] ?? null]);
}

json_response(['success' => false, 'message' => 'Action auth tidak ditemukan.'], 404);
