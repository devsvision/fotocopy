<?php

declare(strict_types=1);

require_once __DIR__ . '/middleware/auth.php';

$user = require_roles(['SUPER_ADMIN', 'OWNER', 'MANAGER', 'KASIR']);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = request_json();
    $storeId = (int) ($input['store_id'] ?? ($user['store_id'] ?? 0));
    $items = $input['items'] ?? [];

    if ($storeId <= 0 || !can_access_store($user, $storeId)) {
        json_response(['success' => false, 'message' => 'Toko tidak valid.'], 403);
    }
    if (!is_array($items) || count($items) === 0) {
        json_response(['success' => false, 'message' => 'Cart masih kosong.'], 422);
    }

    $pdo = db();
    $pdo->beginTransaction();

    try {
        $subtotal = 0;
        $preparedItems = [];

        $productStmt = $pdo->prepare('SELECT * FROM products WHERE id = :id AND store_id = :store_id AND is_active = 1 FOR UPDATE');
        foreach ($items as $item) {
            $productId = (int) ($item['product_id'] ?? 0);
            $qty = max(1, (int) ($item['qty'] ?? 1));
            $discount = max(0, (float) ($item['discount_amount'] ?? 0));

            $productStmt->execute(['id' => $productId, 'store_id' => $storeId]);
            $product = $productStmt->fetch();
            if (!$product) {
                throw new RuntimeException('Produk tidak ditemukan.');
            }
            if ((int) $product['stock'] < $qty) {
                throw new RuntimeException('Stok tidak cukup untuk ' . $product['name']);
            }

            $lineSubtotal = ((float) $product['selling_price'] * $qty) - $discount;
            $subtotal += $lineSubtotal;
            $preparedItems[] = compact('product', 'qty', 'discount', 'lineSubtotal');
        }

        $discountTotal = max(0, (float) ($input['discount_total'] ?? 0));
        $taxTotal = max(0, (float) ($input['tax_total'] ?? 0));
        $grandTotal = max(0, $subtotal - $discountTotal + $taxTotal);
        $paidAmount = (float) ($input['paid_amount'] ?? 0);
        $changeAmount = max(0, $paidAmount - $grandTotal);
        $invoice = 'BCT-' . date('Ymd-His') . '-' . random_int(100, 999);

        $transactionStmt = $pdo->prepare(
            'INSERT INTO transactions (store_id, user_id, customer_id, invoice_number, subtotal, discount_total, tax_total, grand_total, paid_amount, change_amount, notes)
             VALUES (:store_id, :user_id, :customer_id, :invoice_number, :subtotal, :discount_total, :tax_total, :grand_total, :paid_amount, :change_amount, :notes)'
        );
        $transactionStmt->execute([
            'store_id' => $storeId,
            'user_id' => (int) $user['id'],
            'customer_id' => $input['customer_id'] ?? null,
            'invoice_number' => $invoice,
            'subtotal' => $subtotal,
            'discount_total' => $discountTotal,
            'tax_total' => $taxTotal,
            'grand_total' => $grandTotal,
            'paid_amount' => $paidAmount,
            'change_amount' => $changeAmount,
            'notes' => $input['notes'] ?? null,
        ]);
        $transactionId = (int) $pdo->lastInsertId();

        $itemStmt = $pdo->prepare(
            'INSERT INTO transaction_items (transaction_id, product_id, product_name, qty, unit_price, cost_price, discount_amount, subtotal)
             VALUES (:transaction_id, :product_id, :product_name, :qty, :unit_price, :cost_price, :discount_amount, :subtotal)'
        );
        $stockStmt = $pdo->prepare('UPDATE products SET stock = stock - :qty WHERE id = :id');
        $movementStmt = $pdo->prepare(
            'INSERT INTO stock_movements (store_id, product_id, user_id, type, qty, reference_type, reference_id, notes)
             VALUES (:store_id, :product_id, :user_id, "sale", :qty, "transaction", :reference_id, :notes)'
        );

        foreach ($preparedItems as $item) {
            $product = $item['product'];
            $itemStmt->execute([
                'transaction_id' => $transactionId,
                'product_id' => (int) $product['id'],
                'product_name' => $product['name'],
                'qty' => $item['qty'],
                'unit_price' => (float) $product['selling_price'],
                'cost_price' => (float) $product['cost_price'],
                'discount_amount' => $item['discount'],
                'subtotal' => $item['lineSubtotal'],
            ]);
            $stockStmt->execute(['qty' => $item['qty'], 'id' => (int) $product['id']]);
            $movementStmt->execute([
                'store_id' => $storeId,
                'product_id' => (int) $product['id'],
                'user_id' => (int) $user['id'],
                'qty' => $item['qty'],
                'reference_id' => $transactionId,
                'notes' => 'POS sale ' . $invoice,
            ]);
        }

        $paymentStmt = $pdo->prepare(
            'INSERT INTO payments (transaction_id, method, amount, reference_number)
             VALUES (:transaction_id, :method, :amount, :reference_number)'
        );
        $paymentStmt->execute([
            'transaction_id' => $transactionId,
            'method' => $input['payment_method'] ?? 'cash',
            'amount' => $paidAmount,
            'reference_number' => $input['reference_number'] ?? null,
        ]);

        $pdo->commit();
        json_response([
            'success' => true,
            'transaction' => [
                'id' => $transactionId,
                'invoice_number' => $invoice,
                'grand_total' => $grandTotal,
                'paid_amount' => $paidAmount,
                'change_amount' => $changeAmount,
            ],
        ], 201);
    } catch (Throwable $error) {
        $pdo->rollBack();
        json_response(['success' => false, 'message' => $error->getMessage()], 422);
    }
}

if ($method === 'GET') {
    $storeId = (int) ($_GET['store_id'] ?? ($user['store_id'] ?? 0));
    if ($storeId <= 0 || !can_access_store($user, $storeId)) {
        json_response(['success' => false, 'message' => 'Toko tidak valid.'], 403);
    }

    $stmt = db()->prepare(
        'SELECT transactions.*, users.name AS cashier_name
         FROM transactions
         JOIN users ON users.id = transactions.user_id
         WHERE transactions.store_id = :store_id
         ORDER BY transactions.id DESC
         LIMIT 50'
    );
    $stmt->execute(['store_id' => $storeId]);
    json_response(['success' => true, 'transactions' => $stmt->fetchAll()]);
}

json_response(['success' => false, 'message' => 'Method tidak didukung.'], 405);
