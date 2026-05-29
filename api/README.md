# API PHP Native Modular

Endpoint produksi ringan untuk Hostinger shared hosting.

## Core

- `core/bootstrap.php` - session aman, timezone, loader database/response.
- `core/database.php` - koneksi PDO MySQL.
- `core/response.php` - JSON response dan parser request.
- `middleware/auth.php` - session auth, role middleware, validasi akses toko.

## Endpoint

- `auth.php?action=login|logout|me`
- `products.php`
- `categories.php`
- `transactions.php`
- `inventory.php`
- `reports.php`
- `crud.php?resource=products|categories|services|stores|users|testimonials|gallery|faqs|settings`

Endpoint lama `save-*.php` masih ada sebagai kompatibilitas placeholder. Untuk produksi baru, gunakan endpoint modular di atas.
