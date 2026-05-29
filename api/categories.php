<?php

declare(strict_types=1);

require_once __DIR__ . '/middleware/auth.php';

$user = require_auth();
$storeId = (int) ($_GET['store_id'] ?? ($user['store_id'] ?? 0));

if ($storeId <= 0 || !can_access_store($user, $storeId)) {
    json_response(['success' => false, 'message' => 'Toko tidak valid.'], 403);
}

$stmt = db()->prepare(
    'SELECT id, name, slug, icon, description
     FROM categories
     WHERE (store_id = :store_id OR store_id IS NULL) AND type = "product" AND is_active = 1
     ORDER BY name ASC'
);
$stmt->execute(['store_id' => $storeId]);

json_response(['success' => true, 'categories' => $stmt->fetchAll()]);
