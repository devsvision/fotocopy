# Bali CopyTech - Website Company Profile

Website company profile modern untuk penjualan mesin fotocopy, service, sewa, sparepart, dan perlengkapan usaha printing di Denpasar Bali.

## Stack

- HTML native responsive
- Tailwind CSS Play CDN
- Vanilla JavaScript ES modules
- JSON data source
- Dashboard admin static berbasis `localStorage`

## Cara Menjalankan di VS Code

1. Buka folder project ini di VS Code.
2. Install extension **Live Server**.
3. Klik kanan `index.html`, lalu pilih **Open with Live Server**.
4. Buka dashboard admin di `/admin/`.

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
- `admin/` - login dan admin panel.
- `styles/` - global UI, glassmorphism, animasi, responsive.
- `utils/` - helper fetch, SEO, WhatsApp, animasi.
- `api/` - placeholder endpoint PHP untuk pengembangan backend.

## Mengedit Konten

Konten landing page bisa diedit dari file JSON di folder `data/`.

Dashboard admin menyimpan perubahan ke browser `localStorage`, cocok untuk demo dan preview cepat. Untuk produksi, hubungkan dashboard ke endpoint di folder `api/` atau layanan seperti Firebase.

## Deploy ke Vercel

1. Push project ke GitHub.
2. Masuk ke Vercel dan pilih **Add New Project**.
3. Import repository.
4. Framework preset: **Other**.
5. Build command: kosongkan.
6. Output directory: `./`.
7. Deploy.

## Deploy ke Render

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

Sebelum live, ganti nomor WhatsApp di `data/company.json`, lengkapi gambar produk asli, tambahkan video lokal ke `assets/videos/hero-video.mp4`, dan sambungkan dashboard ke backend bila data perlu dikelola banyak admin.
