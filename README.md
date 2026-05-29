# Bali CopyTech All In One Business System

Aplikasi modern ringan untuk company profile, dashboard admin, POS kasir, inventory, multi toko, dan role system.

## Stack

- HTML native
- Tailwind CSS Play CDN
- Vanilla JavaScript modular
- Supabase Auth, Database, Storage
- PostgreSQL Supabase
- Vercel hosting
- Domain Hostinger

## Struktur

- `index.html` - company profile
- `modules/` - reusable section website
- `dashboard/` - dashboard admin
- `kasir/` - POS kasir
- `auth/` - login Supabase
- `services/` - Supabase client, auth, data service
- `config/` - Supabase URL dan anon key
- `database/` - schema dan seed SQL Supabase
- `styles/`, `utils/`, `assets/`, `uploads/`

## Cara Menjalankan di VS Code

1. Buka folder project.
2. Pakai Live Server atau jalankan static server.
3. Buka `index.html`.
4. Login demo: buka `/auth/`, lalu submit form saat Supabase belum dikonfigurasi.

## Connect Supabase

1. Buat project Supabase.
2. Buka SQL Editor.
3. Jalankan `database/schema.sql`.
4. Jalankan `database/seed.sql`.
5. Buka `config/supabase.js`.
6. Isi `SUPABASE_URL` dan `SUPABASE_ANON_KEY`.
7. Buat user di Supabase Auth.
8. Tambahkan profile user ke tabel `users` dengan `auth_user_id`, `role_id`, dan `store_id`.

Role tersedia:

- `super_admin`
- `owner`
- `manager`
- `cashier`

## Deploy ke Vercel

1. Push project ke GitHub.
2. Buka Vercel, import repository.
3. Framework preset: `Other`.
4. Build command: kosongkan.
5. Output directory: `./`.
6. Deploy.

## Connect Domain Hostinger

1. Di Vercel, buka Project Settings > Domains.
2. Tambahkan domain dari Hostinger.
3. Di Hostinger DNS Zone, arahkan CNAME/A record sesuai instruksi Vercel.
4. Tunggu propagasi DNS.
5. SSL aktif otomatis dari Vercel setelah domain valid.

## Catatan Produksi

Aktifkan Row Level Security di Supabase melalui schema yang tersedia. Simpan file media produk/gallery di Supabase Storage dan simpan URL publiknya pada tabel produk/settings.
