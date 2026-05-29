<?php

declare(strict_types=1);

require_once __DIR__ . '/middleware/auth.php';

$user = require_roles(['SUPER_ADMIN', 'OWNER', 'MANAGER']);
$resource = (string) ($_GET['resource'] ?? '');
$method = $_SERVER['REQUEST_METHOD'];

$resources = [
    'stores' => [
        'table' => 'stores',
        'store_scoped' => false,
        'roles' => ['SUPER_ADMIN', 'OWNER'],
        'columns' => ['name', 'code', 'phone', 'address', 'city', 'province', 'is_active'],
    ],
    'users' => [
        'table' => 'users',
        'store_scoped' => true,
        'roles' => ['SUPER_ADMIN', 'OWNER'],
        'columns' => ['role_id', 'store_id', 'name', 'username', 'email', 'password_hash', 'phone', 'is_active'],
    ],
    'categories' => [
        'table' => 'categories',
        'store_scoped' => true,
        'roles' => ['SUPER_ADMIN', 'OWNER', 'MANAGER'],
        'columns' => ['store_id', 'name', 'slug', 'type', 'icon', 'description', 'image', 'is_active'],
    ],
    'products' => [
        'table' => 'products',
        'store_scoped' => true,
        'roles' => ['SUPER_ADMIN', 'OWNER', 'MANAGER'],
        'columns' => ['store_id', 'category_id', 'sku', 'barcode', 'name', 'description', 'unit', 'cost_price', 'selling_price', 'stock', 'minimum_stock', 'image', 'is_featured', 'is_active'],
    ],
    'services' => [
        'table' => 'services',
        'store_scoped' => true,
        'roles' => ['SUPER_ADMIN', 'OWNER', 'MANAGER'],
        'columns' => ['store_id', 'title', 'description', 'icon', 'is_active'],
    ],
    'testimonials' => [
        'table' => 'testimonials',
        'store_scoped' => true,
        'roles' => ['SUPER_ADMIN', 'OWNER', 'MANAGER'],
        'columns' => ['store_id', 'name', 'business', 'rating', 'quote', 'is_active'],
    ],
    'gallery' => [
        'table' => 'gallery',
        'store_scoped' => true,
        'roles' => ['SUPER_ADMIN', 'OWNER', 'MANAGER'],
        'columns' => ['store_id', 'title', 'category', 'image', 'is_active'],
    ],
    'faqs' => [
        'table' => 'faqs',
        'store_scoped' => false,
        'roles' => ['SUPER_ADMIN', 'OWNER', 'MANAGER'],
        'columns' => ['question', 'answer', 'sort_order', 'is_active'],
    ],
    'settings' => [
        'table' => 'settings',
        'store_scoped' => true,
        'roles' => ['SUPER_ADMIN', 'OWNER'],
        'columns' => ['store_id', 'setting_key', 'setting_value'],
    ],
];

if (!isset($resources[$resource])) {
    json_response(['success' => false, 'message' => 'Resource tidak dikenal.'], 404);
}

$config = $resources[$resource];
if (!in_array($user['role_code'], $config['roles'], true)) {
    json_response(['success' => false, 'message' => 'Role tidak diizinkan.'], 403);
}

$table = $config['table'];
$storeId = (int) ($_GET['store_id'] ?? ($user['store_id'] ?? 0));

if ($config['store_scoped'] && ($storeId <= 0 || !can_access_store($user, $storeId))) {
    json_response(['success' => false, 'message' => 'Toko tidak valid.'], 403);
}

if ($method === 'GET') {
    $id = (int) ($_GET['id'] ?? 0);
    $where = [];
    $params = [];

    if ($id > 0) {
        $where[] = 'id = :id';
        $params['id'] = $id;
    }
    if ($config['store_scoped']) {
        $where[] = '(store_id = :store_id OR store_id IS NULL)';
        $params['store_id'] = $storeId;
    }

    $sql = 'SELECT * FROM ' . $table . ($where ? ' WHERE ' . implode(' AND ', $where) : '') . ' ORDER BY id DESC LIMIT 200';
    $stmt = db()->prepare($sql);
    $stmt->execute($params);

    json_response(['success' => true, 'data' => $id > 0 ? $stmt->fetch() : $stmt->fetchAll()]);
}

if ($method === 'POST') {
    $input = request_json();
    unset($input['id'], $input['created_at'], $input['updated_at']);

    if ($config['store_scoped'] && !isset($input['store_id'])) {
        $input['store_id'] = $storeId;
    }
    if (isset($input['password'])) {
        $input['password_hash'] = password_hash((string) $input['password'], PASSWORD_DEFAULT);
        unset($input['password']);
    }
    $input = filter_columns($input, $config['columns']);
    if (!$input) {
        json_response(['success' => false, 'message' => 'Data tidak valid.'], 422);
    }

    $columns = array_keys($input);
    $placeholders = array_map(fn ($column) => ':' . $column, $columns);
    $sql = 'INSERT INTO ' . $table . ' (' . implode(', ', $columns) . ') VALUES (' . implode(', ', $placeholders) . ')';
    $stmt = db()->prepare($sql);
    $stmt->execute($input);

    json_response(['success' => true, 'id' => (int) db()->lastInsertId()], 201);
}

if ($method === 'PUT') {
    $input = request_json();
    $id = (int) ($input['id'] ?? 0);
    if ($id <= 0) {
        json_response(['success' => false, 'message' => 'ID wajib diisi.'], 422);
    }

    unset($input['id'], $input['created_at'], $input['updated_at']);
    if (isset($input['password'])) {
        $input['password_hash'] = password_hash((string) $input['password'], PASSWORD_DEFAULT);
        unset($input['password']);
    }
    $input = filter_columns($input, $config['columns']);
    if (!$input) {
        json_response(['success' => false, 'message' => 'Data tidak valid.'], 422);
    }

    $sets = array_map(fn ($column) => $column . ' = :' . $column, array_keys($input));
    $params = $input + ['id' => $id];
    $scopeSql = '';

    if ($config['store_scoped']) {
        $scopeSql = ' AND (store_id = :store_id OR store_id IS NULL)';
        $params['store_id'] = $storeId;
    }

    $stmt = db()->prepare('UPDATE ' . $table . ' SET ' . implode(', ', $sets) . ' WHERE id = :id' . $scopeSql);
    $stmt->execute($params);

    json_response(['success' => true]);
}

if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        json_response(['success' => false, 'message' => 'ID wajib diisi.'], 422);
    }

    $params = ['id' => $id];
    $scopeSql = '';
    if ($config['store_scoped']) {
        $scopeSql = ' AND (store_id = :store_id OR store_id IS NULL)';
        $params['store_id'] = $storeId;
    }

    $stmt = db()->prepare('DELETE FROM ' . $table . ' WHERE id = :id' . $scopeSql);
    $stmt->execute($params);

    json_response(['success' => true]);
}

json_response(['success' => false, 'message' => 'Method tidak didukung.'], 405);

function filter_columns(array $input, array $allowed): array
{
    return array_intersect_key($input, array_flip($allowed));
}
