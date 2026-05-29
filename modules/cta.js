import { whatsappButton, whatsappUrl } from "../utils/whatsapp.js";

export function cta({ company, settings }) {
  return `<section class="relative overflow-hidden py-20">
    <div class="absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 animated-gradient bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-white/10 blur-3xl"></div>
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="fade-in glass rounded-[2rem] p-8 text-center sm:p-12">
        <p class="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">Gratis Konsultasi</p>
        <h2 class="mt-4 text-3xl font-black text-white sm:text-5xl">Ingin buka usaha fotocopy di Bali tapi belum tahu mulai dari mana?</h2>
        <p class="mx-auto mt-5 max-w-2xl text-slate-300">Kirim pesan WhatsApp. Kami bantu rekomendasikan mesin, paket modal, dan komposisi perlengkapan yang cocok untuk lokasi Anda.</p>
        <div class="mt-8">${whatsappButton("Konsultasi Sekarang", whatsappUrl(company, settings.whatsappMessage))}</div>
      </div>
    </div>
  </section>`;
}
