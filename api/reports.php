<?php

declare(strict_types=1);

require_once __DIR__ . '/middleware/auth.php';

$user = require_roles(['SUPER_ADMIN', 'OWNER', 'MANAGER']);
$storeId = (int) ($_GET['store_id'] ?? ($user['store_id'] ?? 0));

if ($storeId <= 0 || !can_access_store($user, $storeId)) {
    json_response(['success' => false, 'message' => 'Toko tidak valid.'], 403);
}

$pdo = db();

$today = $pdo->prepare(
    'SELECT COUNT(*) AS transactions_count, COALESCE(SUM(grand_total), 0) AS omzet
     FROM transactions
     WHERE store_id = :store_id AND DATE(created_at) = CURDATE()'
);
$today->execute(['store_id' => $storeId]);

$month = $pdo->prepare(
    'SELECT COUNT(*) AS transactions_count, COALESCE(SUM(grand_total), 0) AS omzet
     FROM transactions
     WHERE store_id = :store_id AND YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())'
);
$month->execute(['store_id' => $storeId]);

$topProducts = $pdo->prepare(
    'SELECT product_name, SUM(qty) AS total_qty, SUM(subtotal) AS total_sales
     FROM transaction_items
     JOIN transactions ON transactions.id = transaction_items.transaction_id
     WHERE transactions.store_id = :store_id
     GROUP BY product_id, product_name
     ORDER BY total_qty DESC
     LIMIT 10'
);
$topProducts->execute(['store_id' => $storeId]);

$lowStock = $pdo->prepare(
    'SELECT id, sku, name, stock, minimum_stock
     FROM products
     WHERE store_id = :store_id AND stock <= minimum_stock AND is_active = 1
     ORDER BY stock ASC
     LIMIT 20'
);
$lowStock->execute(['store_id' => $storeId]);

json_response([
    'success' => true,
    'today' => $today->fetch(),
    'month' => $month->fetch(),
    'top_products' => $topProducts->fetchAll(),
    'low_stock' => $lowStock->fetchAll(),
]);
