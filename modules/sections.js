import { APP_CONFIG } from "../config/supabase.js";
import { rupiah, whatsappUrl } from "../utils/format.js";

const products = [
  ["Canon iR ADV 4525", "Mesin Fotocopy", 24500000],
  ["Ricoh MP 3055", "Mesin Fotocopy", 26000000],
  ["Toner NPG-67", "Sparepart", 275000],
  ["Kertas HVS A4 80gsm", "ATK", 62000],
  ["Mesin Laminating A3", "Alat Printing", 950000],
  ["Printer Office Series", "Printer", 1800000]
];

export function about() {
  return `<section id="tentang" class="section-pad">
    <div class="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Tentang Perusahaan</p>
        <h2 class="mt-3 text-3xl font-black text-white sm:text-4xl">Partner teknologi printing untuk bisnis Bali.</h2>
      </div>
      <div class="glass rounded-3xl p-6 text-slate-300">
        <p class="leading-8">Bali CopyTech melayani penjualan mesin fotocopy, service, sewa, sparepart, alat printing, dan alat tulis kantor di Denpasar Bali. Sistem ini dirancang untuk menghubungkan website, dashboard, inventory, dan POS kasir multi toko dalam satu alur kerja ringan.</p>
      </div>
    </div>
  </section>`;
}

export function productSection() {
  return `<section id="produk" class="section-pad bg-white/[0.02]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Produk</p>
          <h2 class="mt-3 text-3xl font-black text-white sm:text-4xl">Katalog usaha fotocopy dan printing.</h2>
        </div>
        <a href="kasir/" class="btn-secondary">Buka POS</a>
      </div>
      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${products.map(([name, category, price]) => `<article class="glass glow-hover rounded-3xl p-5">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">${category}</p>
          <h3 class="mt-4 text-xl font-black text-white">${name}</h3>
          <p class="mt-4 text-2xl font-black text-cyan-100">${rupiah.format(price)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

export function businessPackage() {
  return `<section id="paket" class="section-pad">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="glass rounded-[2rem] p-6 sm:p-8">
        <p class="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Paket Usaha Fotocopy Bali</p>
        <h2 class="mt-3 text-3xl font-black text-white">Setup toko fotocopy dari mesin sampai operasional.</h2>
        <div class="mt-6 grid gap-4 md:grid-cols-3">
          ${["Mesin + Toner", "ATK + Supplies", "POS + Inventory"].map((item) => `<div class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 font-bold text-slate-200">${item}</div>`).join("")}
        </div>
      </div>
    </div>
  </section>`;
}

export function services() {
  const items = ["Service mesin fotocopy Denpasar", "Sewa mesin fotocopy bulanan", "Pengadaan sparepart", "Konsultasi alat printing"];
  return `<section id="services" class="section-pad bg-white/[0.02]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p class="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Services</p>
      <h2 class="mt-3 text-3xl font-black text-white">Layanan cepat untuk operasional bisnis.</h2>
      <div class="mt-8 grid gap-4 md:grid-cols-2">
        ${items.map((item) => `<article class="glass glow-hover rounded-3xl p-6"><h3 class="text-xl font-black text-white">${item}</h3><p class="mt-3 leading-7 text-slate-300">Ditangani tim teknis dan sales yang memahami kebutuhan kantor, sekolah, dan usaha printing di Bali.</p></article>`).join("")}
      </div>
    </div>
  </section>`;
}

export function galleryTestimonialsFaq() {
  return `<section id="gallery" class="section-pad">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="glass rounded-3xl p-6 lg:col-span-2">
          <p class="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Gallery</p>
          <h2 class="mt-3 text-3xl font-black text-white">Instalasi dan service lapangan.</h2>
          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            ${["Setup Toko", "Service Onsite", "Delivery Mesin"].map((item) => `<div class="grid aspect-[4/3] place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-sm font-black text-slate-200">${item}</div>`).join("")}
          </div>
        </div>
        <div id="testimoni" class="glass rounded-3xl p-6">
          <p class="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Testimonial</p>
          <blockquote class="mt-5 leading-8 text-slate-300">"Mesin siap pakai, service cepat, dan stok supplies mudah dipantau."</blockquote>
          <p class="mt-5 font-black text-white">Owner Fotocopy Denpasar</p>
        </div>
      </div>
      <div id="faq" class="mt-6 grid gap-4 md:grid-cols-3">
        ${["Apakah bisa sewa bulanan?", "Apakah teknisi datang onsite?", "Apakah support POS multi toko?"].map((q) => `<details class="glass rounded-2xl p-5"><summary class="cursor-pointer font-black text-white">${q}</summary><p class="mt-3 leading-7 text-slate-300">Bisa. Tim kami menyesuaikan kebutuhan toko, kantor, dan cabang bisnis.</p></details>`).join("")}
      </div>
    </div>
  </section>`;
}

export function ctaContactFooter() {
  return `<section id="contact" class="section-pad bg-white/[0.02]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="glass rounded-[2rem] p-8 text-center">
        <p class="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">CTA WhatsApp</p>
        <h2 class="mt-3 text-3xl font-black text-white">Butuh mesin, service, sparepart, atau sistem kasir?</h2>
        <p class="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">Konsultasikan kebutuhan bisnis fotocopy dan printing Anda di Denpasar Bali.</p>
        <a href="${whatsappUrl(APP_CONFIG.whatsapp, "Halo Bali CopyTech, saya ingin konsultasi.")}" target="_blank" rel="noopener" class="btn-primary mt-6 inline-flex">Chat WhatsApp</a>
      </div>
      <footer class="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© ${new Date().getFullYear()} ${APP_CONFIG.businessName}. Denpasar Bali.</p>
        <p>Jual mesin fotocopy Bali · service mesin fotocopy Denpasar · alat tulis kantor Bali</p>
      </footer>
    </div>
  </section>`;
}
