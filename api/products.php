<?php

declare(strict_types=1);

require_once __DIR__ . '/middleware/auth.php';

$user = require_auth();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $storeId = (int) ($_GET['store_id'] ?? ($user['store_id'] ?? 0));
    if ($storeId <= 0 || !can_access_store($user, $storeId)) {
        json_response(['success' => false, 'message' => 'Toko tidak valid.'], 403);
    }

    $query = '%' . trim((string) ($_GET['q'] ?? '')) . '%';
    $categoryId = (int) ($_GET['category_id'] ?? 0);
    $params = ['store_id' => $storeId, 'query' => $query];
    $categorySql = '';

    if ($categoryId > 0) {
        $categorySql = ' AND products.category_id = :category_id';
        $params['category_id'] = $categoryId;
    }

    $stmt = db()->prepare(
        "SELECT products.*, categories.name AS category_name
         FROM products
         JOIN categories ON categories.id = products.category_id
         WHERE products.store_id = :store_id
           AND products.is_active = 1
           AND (products.name LIKE :query OR products.sku LIKE :query OR products.barcode LIKE :query)
           {$categorySql}
         ORDER BY products.name ASC
         LIMIT 100"
    );
    $stmt->execute($params);

    json_response(['success' => true, 'products' => $stmt->fetchAll()]);
}

if ($method === 'POST') {
    $user = require_roles(['SUPER_ADMIN', 'OWNER', 'MANAGER']);
    $input = request_json();
    $storeId = (int) ($input['store_id'] ?? ($user['store_id'] ?? 0));

    if ($storeId <= 0 || !can_access_store($user, $storeId)) {
        json_response(['success' => false, 'message' => 'Toko tidak valid.'], 403);
    }

    $stmt = db()->prepare(
        'INSERT INTO products (store_id, category_id, sku, barcode, name, description, unit, cost_price, selling_price, stock, minimum_stock, image, is_featured)
         VALUES (:store_id, :category_id, :sku, :barcode, :name, :description, :unit, :cost_price, :selling_price, :stock, :minimum_stock, :image, :is_featured)'
    );
    $stmt->execute([
        'store_id' => $storeId,
        'category_id' => (int) $input['category_id'],
        'sku' => trim((string) $input['sku']),
        'barcode' => $input['barcode'] ?? null,
        'name' => trim((string) $input['name']),
        'description' => $input['description'] ?? null,
        'unit' => $input['unit'] ?? 'pcs',
        'cost_price' => (float) ($input['cost_price'] ?? 0),
        'selling_price' => (float) ($input['selling_price'] ?? 0),
        'stock' => (int) ($input['stock'] ?? 0),
        'minimum_stock' => (int) ($input['minimum_stock'] ?? 0),
        'image' => $input['image'] ?? null,
        'is_featured' => !empty($input['is_featured']) ? 1 : 0,
    ]);

    json_response(['success' => true, 'id' => (int) db()->lastInsertId()], 201);
}

json_response(['success' => false, 'message' => 'Method tidak didukung.'], 405);
