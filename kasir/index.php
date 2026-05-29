<?php
require_once __DIR__ . '/../api/middleware/auth.php';

$user = current_user();
if (!$user) {
    header('Location: ../auth/login.php');
    exit;
}
if (!in_array($user['role_code'], ['SUPER_ADMIN', 'OWNER', 'MANAGER', 'KASIR'], true)) {
    http_response_code(403);
    echo 'Akses kasir tidak diizinkan.';
    exit;
}
?>
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POS Kasir | Bali CopyTech</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../styles/global.css">
    <link rel="stylesheet" href="../styles/glassmorphism.css">
    <link rel="stylesheet" href="../styles/animations.css">
    <link rel="stylesheet" href="pos.css">
  </head>
  <body
    class="min-h-screen bg-slate-950 text-white"
    data-store-id="<?= htmlspecialchars((string) ($user['store_id'] ?? 1), ENT_QUOTES, 'UTF-8') ?>"
    data-cashier="<?= htmlspecialchars($user['name'], ENT_QUOTES, 'UTF-8') ?>"
    data-store="<?= htmlspecialchars($user['store_name'] ?? 'Bali CopyTech', ENT_QUOTES, 'UTF-8') ?>"
  >
    <main class="pos-shell mx-auto grid min-h-screen max-w-[1800px] gap-4 p-3 lg:grid-cols-[1fr_430px] lg:p-5">
      <section class="min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-2xl">
        <header class="flex flex-col gap-4 border-b border-white/10 pb-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p class="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">POS Multi Toko</p>
            <h1 class="mt-2 text-2xl font-black">Kasir Bali CopyTech</h1>
          </div>
          <div class="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input id="product-search" class="pos-input" placeholder="Scan barcode / cari produk / SKU" autofocus>
            <button id="reload-products" class="pos-button secondary">Refresh</button>
          </div>
        </header>

        <div id="category-tabs" class="mt-4 flex gap-2 overflow-x-auto pb-2"></div>
        <div id="product-grid" class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"></div>
      </section>

      <aside class="rounded-3xl border border-cyan-300/20 bg-slate-950/80 p-4 shadow-[0_0_60px_rgba(0,212,255,0.14)] backdrop-blur-2xl">
        <div class="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p class="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Cart</p>
            <h2 class="mt-2 text-xl font-black">Transaksi Cepat</h2>
            <p class="mt-1 text-xs text-slate-400"><?= htmlspecialchars($user['name'], ENT_QUOTES, 'UTF-8') ?></p>
          </div>
          <button id="clear-cart" class="pos-icon-button" title="Kosongkan cart">×</button>
        </div>

        <div id="cart-items" class="cart-scroll mt-4 space-y-3"></div>

        <section class="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <label class="grid gap-2 text-sm font-bold text-slate-200">
            Diskon
            <input id="discount-total" type="number" min="0" value="0" class="pos-input">
          </label>
          <label class="grid gap-2 text-sm font-bold text-slate-200">
            Pajak
            <input id="tax-total" type="number" min="0" value="0" class="pos-input">
          </label>
          <label class="grid gap-2 text-sm font-bold text-slate-200">
            Metode Pembayaran
            <select id="payment-method" class="pos-input">
              <option value="cash">Cash</option>
              <option value="transfer">Transfer</option>
              <option value="qris">QRIS</option>
            </select>
          </label>
          <label class="grid gap-2 text-sm font-bold text-slate-200">
            Dibayar
            <input id="paid-amount" type="number" min="0" value="0" class="pos-input">
          </label>
        </section>

        <section class="mt-4 space-y-2 text-sm">
          <div class="flex justify-between text-slate-300"><span>Subtotal</span><strong id="subtotal">Rp0</strong></div>
          <div class="flex justify-between text-slate-300"><span>Diskon</span><strong id="discount-view">Rp0</strong></div>
          <div class="flex justify-between text-slate-300"><span>Pajak</span><strong id="tax-view">Rp0</strong></div>
          <div class="flex justify-between border-t border-white/10 pt-3 text-lg text-white"><span>Total</span><strong id="grand-total">Rp0</strong></div>
          <div class="flex justify-between text-cyan-200"><span>Kembalian</span><strong id="change-amount">Rp0</strong></div>
        </section>

        <button id="pay-button" class="pos-button mt-5 w-full">Simpan & Cetak Struk</button>
        <p id="pos-message" class="mt-3 hidden rounded-xl px-4 py-3 text-sm"></p>
      </aside>
    </main>

    <section id="receipt" class="receipt hidden"></section>
    <script type="module" src="pos.js"></script>
  </body>
</html>
