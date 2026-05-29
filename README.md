# Bali CopyTech - Website Company Profile

Website company profile modern untuk penjualan mesin fotocopy, service, sewa, sparepart, dan perlengkapan usaha printing di Denpasar Bali.

## Stack

- HTML native responsive
- Tailwind CSS Play CDN
- Vanilla JavaScript ES modules
- JSON data source
- PHP Native modular untuk auth, API, POS, inventory, laporan
- MySQL database
- Dashboard admin static berbasis `localStorage` dan siap disambungkan ke API

## Cara Menjalankan di VS Code

1. Buka folder project ini di VS Code.
2. Install extension **Live Server**.
3. Klik kanan `index.html`, lalu pilih **Open with Live Server**.
4. Buka dashboard admin static di `/admin/`.
5. Untuk fitur PHP/POS, jalankan lewat server PHP/Apache seperti XAMPP, Laragon, atau Hostinger.

Login demo:

```text
Username: admin
Password: admin123
```

Catatan: karena menggunakan `fetch()` untuk membaca file JSON, jalankan lewat local server. Jangan buka langsung dengan `file://`.

## Struktur Penting

- `index.html` - shell utama landing page.
- `main.js` - entry point yang memuat semua module.
- `modules/` - section website reusable.
- `data/` - sample JSON company, produk, kategori, layanan, gallery, testimonial, FAQ, settings.
- `admin/` - login dan admin panel static.
- `auth/` - login PHP session untuk sistem produksi.
- `dashboard/` - redirect kompatibilitas ke `/admin/`.
- `kasir/` - POS kasir multi toko.
- `config/` - konfigurasi app dan database.
- `database/` - `schema.sql` dan `seed.sql`.
- `styles/` - global UI, glassmorphism, animasi, responsive.
- `utils/` - helper fetch, SEO, WhatsApp, animasi.
- `api/` - endpoint PHP native modular.

## Mengedit Konten

Konten landing page bisa diedit dari file JSON di folder `data/`.

Dashboard admin saat ini tetap menyimpan perubahan ke browser `localStorage`, cocok untuk demo dan preview cepat. Backend PHP/MySQL, login production, role middleware, POS kasir, inventory, transaksi, dan laporan sudah tersedia sebagai fondasi produksi.

## Cara Import Database MySQL

1. Buat database MySQL bernama `fotocopy_business`.
2. Import `database/schema.sql` lewat phpMyAdmin.
3. Import `database/seed.sql`.
4. Sesuaikan kredensial database di `config/database.php`.

User seed awal:

```text
Username: superadmin
Password: password
Role: SUPER ADMIN
```

Ganti password segera setelah login pertama.

## URL Sistem

- Website: `/`
- Dashboard existing: `/admin/`
- Dashboard kompatibilitas: `/dashboard/`
- Login PHP production: `/auth/login.php`
- POS kasir: `/kasir/`

## Setup Hostinger

1. Upload semua file ke `public_html`.
2. Buat database MySQL di hPanel.
3. Import `database/schema.sql`, lalu `database/seed.sql`.
4. Edit `config/database.php` sesuai host, nama database, username, dan password dari Hostinger.
5. Pastikan folder `uploads/` writable.
6. Buka `/auth/login.php`, login dengan user seed, lalu ganti password.

## Setup Domain dan SSL

1. Arahkan domain ke nameserver Hostinger atau set A record ke IP hosting.
2. Di hPanel, pilih domain utama untuk folder `public_html`.
3. Aktifkan SSL dari menu SSL Hostinger.
4. Paksa HTTPS dari hPanel atau aturan redirect HTTPS Hostinger.

## Deploy Static Preview ke Vercel

1. Push project ke GitHub.
2. Masuk ke Vercel dan pilih **Add New Project**.
3. Import repository.
4. Framework preset: **Other**.
5. Build command: kosongkan.
6. Output directory: `./`.
7. Deploy.

## Deploy Static Preview ke Render

1. Push project ke GitHub.
2. Render > **New** > **Static Site**.
3. Pilih repository.
4. Build command: kosongkan atau isi `echo static`.
5. Publish directory: `./`.
6. Deploy.

## Extension VS Code Rekomendasi

- Live Server
- Prettier
- Tailwind CSS IntelliSense
- ESLint

## Produksi

Sebelum live, ganti nomor WhatsApp di `data/company.json`, lengkapi gambar produk asli, tambahkan video lokal ke `assets/videos/hero-video.mp4`, update database Hostinger, ganti password user seed, dan sambungkan dashboard admin static ke endpoint `api/crud.php` bila semua konten ingin dikelola via MySQL.
