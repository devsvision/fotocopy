<?php

declare(strict_types=1);

require_once __DIR__ . '/middleware/auth.php';

$user = require_roles(['SUPER_ADMIN', 'OWNER', 'MANAGER']);
$input = $_SERVER['REQUEST_METHOD'] === 'POST' ? request_json() : $_GET;
$storeId = (int) ($input['store_id'] ?? ($user['store_id'] ?? 0));

if ($storeId <= 0 || !can_access_store($user, $storeId)) {
    json_response(['success' => false, 'message' => 'Toko tidak valid.'], 403);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = db()->prepare(
        'SELECT stock_movements.*, products.name AS product_name, users.name AS user_name
         FROM stock_movements
         JOIN products ON products.id = stock_movements.product_id
         LEFT JOIN users ON users.id = stock_movements.user_id
         WHERE stock_movements.store_id = :store_id
         ORDER BY stock_movements.id DESC
         LIMIT 100'
    );
    $stmt->execute(['store_id' => $storeId]);
    json_response(['success' => true, 'movements' => $stmt->fetchAll()]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productId = (int) ($input['product_id'] ?? 0);
    $type = (string) ($input['type'] ?? 'adjustment');
    $qty = max(1, (int) ($input['qty'] ?? 1));
    $allowed = ['in', 'out', 'adjustment'];

    if (!in_array($type, $allowed, true)) {
        json_response(['success' => false, 'message' => 'Tipe stok tidak valid.'], 422);
    }

    $delta = $type === 'in' ? $qty : -$qty;
    $pdo = db();
    $pdo->beginTransaction();

    try {
        $productStmt = $pdo->prepare('SELECT id FROM products WHERE id = :id AND store_id = :store_id FOR UPDATE');
        $productStmt->execute(['id' => $productId, 'store_id' => $storeId]);
        if (!$productStmt->fetch()) {
            throw new RuntimeException('Produk tidak ditemukan.');
        }

        $pdo->prepare('UPDATE products SET stock = stock + :delta WHERE id = :id')->execute([
            'delta' => $delta,
            'id' => $productId,
        ]);
        $pdo->prepare(
            'INSERT INTO stock_movements (store_id, product_id, user_id, type, qty, notes)
             VALUES (:store_id, :product_id, :user_id, :type, :qty, :notes)'
        )->execute([
            'store_id' => $storeId,
            'product_id' => $productId,
            'user_id' => (int) $user['id'],
            'type' => $type,
            'qty' => $qty,
            'notes' => $input['notes'] ?? null,
        ]);

        $pdo->commit();
        json_response(['success' => true], 201);
    } catch (Throwable $error) {
        $pdo->rollBack();
        json_response(['success' => false, 'message' => $error->getMessage()], 422);
    }
}

json_response(['success' => false, 'message' => 'Method tidak didukung.'], 405);
