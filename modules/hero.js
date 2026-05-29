export function hero() {
  return `<section id="home" class="hero-grid mx-auto grid max-w-7xl items-center gap-10 px-4 pt-28 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
    <div class="fade-up">
      <p class="text-xs font-black uppercase tracking-[0.32em] text-cyan-200">All in One Business System</p>
      <h1 class="mt-5 max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">Mesin fotocopy, service, sewa, ATK, dan POS multi toko.</h1>
      <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Company profile modern untuk Bali CopyTech Denpasar, terhubung dengan dashboard admin, inventory, kasir, dan Supabase backend.</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="#produk" class="btn-primary">Lihat Produk</a>
        <a href="auth/" class="btn-secondary">Masuk Sistem</a>
      </div>
    </div>
    <div class="floating glass rounded-[2rem] p-5">
      <div class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
        <div class="grid gap-3">
          ${["Penjualan Mesin", "Service Onsite", "Sewa Bulanan", "POS Kasir", "Inventory Multi Toko"].map((item, index) => `
            <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <span class="font-bold text-white">${item}</span>
              <span class="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-200">0${index + 1}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  </section>`;
}
