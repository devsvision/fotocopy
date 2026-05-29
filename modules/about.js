import { sectionShell } from "../utils/renderModule.js";

export function about({ company }) {
  const content = `<div class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
    <div class="fade-in glass rounded-3xl p-6">
      <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1000&q=80" alt="Showroom perlengkapan usaha printing Bali" class="aspect-[4/3] w-full rounded-2xl object-cover">
    </div>
    <div class="grid gap-4 sm:grid-cols-2">
      ${[
        ["Konsultasi Tepat", "Membantu memilih mesin sesuai lokasi, volume copy, modal, dan rencana layanan."],
        ["Teknisi Lokal Bali", "Tim teknisi siap support instalasi, service onsite, maintenance, dan sparepart."],
        ["Paket Siap Usaha", "Bundling mesin fotocopy, printer, laminating, press, toner awal, dan training."],
        ["After Sales Jelas", "Dukungan pasca pembelian agar operasional bisnis tetap produktif."]
      ].map(([title, text]) => `<article class="fade-in gloss-card glow-hover rounded-2xl p-6">
        <h3 class="text-xl font-black text-white">${title}</h3>
        <p class="mt-3 text-sm leading-7 text-slate-300">${text}</p>
      </article>`).join("")}
    </div>
  </div>`;
  return sectionShell("tentang", "Tentang Perusahaan", `${company.name} Denpasar`, "Partner perlengkapan usaha fotocopy dan printing yang fokus pada unit siap kerja, edukasi calon pengusaha, dan service cepat untuk pelanggan di seluruh Bali.", content);
}
