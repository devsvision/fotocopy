<?php
require_once __DIR__ . '/../api/core/bootstrap.php';

if (!empty($_SESSION['user'])) {
    $target = $_SESSION['user']['role_code'] === 'KASIR' ? '../kasir/' : '../admin/dashboard.html';
    header('Location: ' . $target);
    exit;
}
?>
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Business System | Bali CopyTech</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../styles/global.css">
    <link rel="stylesheet" href="../styles/glassmorphism.css">
    <link rel="stylesheet" href="../styles/animations.css">
    <link rel="stylesheet" href="../styles/dashboard-theme.css">
  </head>
  <body class="admin-shell grid min-h-screen place-items-center px-4 text-white">
    <main class="glass w-full max-w-md rounded-3xl p-8">
      <p class="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">Secure Login</p>
      <h1 class="mt-3 text-3xl font-black">Bali CopyTech</h1>
      <p class="mt-3 text-sm leading-7 text-slate-300">Masuk ke dashboard, inventory, laporan, atau POS kasir sesuai role.</p>
      <form id="login-form" class="mt-8 space-y-4">
        <label class="block">
          <span class="text-sm font-bold text-slate-200">Username</span>
          <input name="username" autocomplete="username" class="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300" required>
        </label>
        <label class="block">
          <span class="text-sm font-bold text-slate-200">Password</span>
          <input name="password" type="password" autocomplete="current-password" class="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300" required>
        </label>
        <p id="login-error" class="hidden rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"></p>
        <button class="w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 shadow-glow transition hover:bg-white">Masuk Sistem</button>
      </form>
      <p class="mt-6 text-xs leading-6 text-slate-500">Import `database/schema.sql` dan `database/seed.sql`, lalu gunakan user seed pertama.</p>
    </main>
    <script type="module" src="login.js"></script>
  </body>
</html>
