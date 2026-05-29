# PROJECT STRUCTURE — COMPANY PROFILE USAHA MESIN FOTOCOPY & PERLENGKAPAN USAHA PRINTING BALI

project-root/
│
├── index.html
├── README.md
│
├── assets/
│   ├── images/
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── products/
│   │   ├── services/
│   │   ├── gallery/
│   │   ├── testimonials/
│   │   └── icons/
│   │
│   ├── videos/
│   │   └── hero-video.mp4
│   │
│   └── fonts/
│
├── data/
│   ├── company.json
│   ├── products.json
│   ├── categories.json
│   ├── services.json
│   ├── testimonials.json
│   ├── gallery.json
│   ├── faq.json
│   └── settings.json
│
├── modules/
│   ├── navbar.js
│   ├── hero.js
│   ├── about.js
│   ├── categories.js
│   ├── services.js
│   ├── featured-products.js
│   ├── business-package.js
│   ├── gallery.js
│   ├── testimonials.js
│   ├── faq.js
│   ├── cta.js
│   ├── contact.js
│   ├── footer.js
│   └── dashboard-loader.js
│
├── dashboard/
│   ├── login.html
│   ├── dashboard.html
│   │
│   ├── css/
│   │   └── dashboard.css
│   │
│   ├── js/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── products-manager.js
│   │   ├── category-manager.js
│   │   ├── services-manager.js
│   │   ├── gallery-manager.js
│   │   ├── testimonial-manager.js
│   │   ├── faq-manager.js
│   │   ├── settings-manager.js
│   │   └── analytics.js
│   │
│   └── components/
│       ├── sidebar.js
│       ├── topbar.js
│       ├── stat-card.js
│       ├── product-card.js
│       ├── modal.js
│       └── table.js
│
├── styles/
│   ├── global.css
│   ├── animations.css
│   ├── glassmorphism.css
│   ├── dashboard-theme.css
│   └── responsive.css
│
├── utils/
│   ├── fetchData.js
│   ├── renderModule.js
│   ├── whatsapp.js
│   ├── animation.js
│   ├── lazyload.js
│   ├── formatter.js
│   └── seo.js
│
├── api/
│   ├── upload-image.php
│   ├── save-product.php
│   ├── save-category.php
│   ├── save-service.php
│   ├── save-gallery.php
│   ├── save-settings.php
│   └── auth.php
│
└── uploads/
├── products/
├── gallery/
└── banners/

====================================================

KONSEP WEBSITE

Website company profile modern untuk usaha:

* Penjualan mesin fotocopy
* Service & maintenance mesin fotocopy
* Sewa mesin fotocopy
* Penjualan sparepart
* Penjualan perlengkapan usaha printing & fotocopy
* Paket usaha fotocopy lengkap

Target market:

* Kantor
* Sekolah
* Kampus
* UMKM
* Tempat printing
* Calon pengusaha fotocopy di Bali

Tujuan:

* Mendapatkan lebih banyak pelanggan di Bali
* Menjangkau calon pemilik usaha printing/fotocopy
* Branding usaha lebih profesional
* Mempermudah closing via WhatsApp

====================================================

KATEGORI PRODUK

1. Mesin Fotocopy

   * Canon
   * Fuji Xerox
   * Kyocera
   * Ricoh

2. Mesin Laminating

   * Laminating panas
   * Laminating dingin
   * Laminating roll

3. Mesin Press

   * Press mug
   * Press kaos
   * Press kartu
   * Press pin

4. Mesin Potong Kertas

5. Mesin Jilid

6. Printer & Scanner

7. Tinta & Toner

8. Sparepart Fotocopy

9. Paket Usaha Fotocopy Lengkap

====================================================

MAIN WEBSITE SECTION

1. Navbar

   * Sticky glass navbar
   * Blur effect
   * CTA WhatsApp
   * Smooth scroll

2. Hero Section

   * Video background modern
   * Headline besar
   * CTA:

     * Konsultasi WhatsApp
     * Lihat Produk
   * Floating animation
   * Glow effect

3. Tentang Perusahaan

   * Pengalaman usaha
   * Area layanan Bali
   * Tim teknisi
   * Keunggulan usaha

4. Kategori Produk

   * Card glossy animated
   * Icon modern
   * Hover glow

5. Layanan

   * Penjualan mesin
   * Service onsite
   * Maintenance rutin
   * Sewa mesin
   * Konsultasi usaha fotocopy

6. Produk Unggulan

   * Card premium
   * Harga
   * Spesifikasi
   * CTA WhatsApp

7. Paket Usaha Fotocopy

   * Paket pemula
   * Paket profesional
   * Paket lengkap usaha printing
   * Simulasi kebutuhan usaha

8. Gallery Project

   * Instalasi mesin
   * Service lapangan
   * Setup toko fotocopy
   * Dokumentasi client

9. Testimonial Client

   * Slider animasi
   * Rating bintang
   * Review pelanggan Bali

10. FAQ

* Cara memulai usaha fotocopy
* Estimasi modal
* Garansi mesin
* Area layanan

11. CTA Section

* Background glow neon
* Tombol WhatsApp besar
* “Gratis konsultasi usaha fotocopy”

12. Contact

* Maps Bali
* Nomor WhatsApp
* Alamat Denpasar Bali
* Jam operasional

13. Footer

* Navigasi
* Sosial media
* Copyright

====================================================

DESIGN STYLE

STYLE:

* Glassmorphism
* Glossy modern UI
* Dark futuristic
* Industrial technology
* Elegant corporate

NUANSA:

* Mesin industri modern
* Teknologi printing
* Profesional teknisi
* Premium business

WARNA:

* Graphite black
* Metallic gray
* White glossy
* Cyan neon
* Electric blue

EFEK:

* Blur glass
* Glow hover
* Floating animation
* Smooth parallax
* Animated gradient
* Mouse light tracking

====================================================

TAILWIND PLAY CDN

Gunakan:

<script src="https://cdn.tailwindcss.com"></script>

Custom config:

<script>
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#00d4ff',
        secondary: '#1e293b',
        dark: '#020617'
      },
      boxShadow: {
        glow: '0 0 40px rgba(0,212,255,0.35)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  }
}
</script>

====================================================

DASHBOARD ADMIN

DESIGN:

* Modern CRM style
* Dark glass dashboard
* Sidebar futuristic
* Animated statistic cards

FITUR:

1. Login Admin

2. Dashboard Overview

   * Total produk
   * Total kategori
   * Total layanan
   * Total gallery
   * Visitor analytics

3. CRUD Produk

   * Upload gambar
   * Nama produk
   * Deskripsi
   * Harga
   * Kategori
   * Status ready/stok habis

4. CRUD Kategori Produk

5. CRUD Paket Usaha

6. CRUD Services

7. CRUD Gallery

8. CRUD FAQ

9. Pengaturan Website

   * Nomor WhatsApp
   * Hero title
   * Hero subtitle
   * CTA text
   * SEO metadata

10. Live Preview Website

====================================================

CTA WHATSAPP

https://wa.me/628xxxxxxxxxx?text=Halo%20saya%20ingin%20konsultasi%20usaha%20fotocopy

====================================================

SEO TARGET BALI

KEYWORDS:

* jual mesin fotocopy bali
* service mesin fotocopy denpasar
* paket usaha fotocopy bali
* mesin laminating bali
* mesin press kaos bali
* perlengkapan usaha printing bali
* sparepart fotocopy bali
* sewa mesin fotocopy bali

====================================================

RECOMMENDED STACK

FRONTEND:

* HTML Native
* Tailwind Play CDN
* Vanilla JavaScript Modular

BACKEND:

* PHP Native
  ATAU
* Firebase

DATABASE:

* JSON file ringan
  ATAU
* MySQL

HOSTING:

* Render
* Vercel
* Netlify

====================================================

STRUKTUR PENGEMBANGAN

1. Landing page modern
2. Responsive mobile
3. Dynamic products
4. WhatsApp CTA
5. Dashboard admin
6. Upload image
7. SEO optimization Bali
8. Deploy production

====================================================

FUTURE SCALE

Nantinya website bisa dikembangkan menjadi:

* Sistem booking service
* Tracking teknisi
* Marketplace alat printing
* Sistem reseller
* Sistem invoice
* CRM pelanggan
* Multi cabang Bali
