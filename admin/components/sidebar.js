export function sidebar(active) {
  const items = [
    ["overview", "◇", "Overview"],
    ["products", "▣", "Produk"],
    ["categories", "◆", "Kategori"],
    ["services", "⚙", "Layanan"],
    ["gallery", "▧", "Gallery"],
    ["testimonials", "★", "Testimonial"],
    ["faq", "?", "FAQ"],
    ["settings", "◌", "Settings"],
    ["preview", "◉", "Live Preview"]
  ];

  return `<aside class="admin-sidebar glass-sidebar border-r border-white/10 p-4">
    <div class="mb-6 flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-3">
      <span class="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 font-black text-cyan-200 shadow-glow">BC</span>
      <div>
        <p class="font-black">Bali CopyTech</p>
        <p class="text-xs text-slate-400">Admin Console</p>
      </div>
    </div>
    <nav class="admin-nav grid gap-2">
      ${items.map(([key, icon, label]) => `<button data-view="${key}" class="nav-item group flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${active === key ? "bg-cyan-300 text-slate-950 shadow-glow" : "text-slate-300 hover:bg-white/10 hover:text-white"}">
        <span class="grid h-8 w-8 place-items-center rounded-xl ${active === key ? "bg-slate-950/10" : "bg-white/5 text-cyan-200 group-hover:bg-cyan-300/10"}">${icon}</span>
        <span>${label}</span>
      </button>`).join("")}
    </nav>
    <div class="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4">
      <p class="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Conversion</p>
      <p class="mt-3 text-2xl font-black text-white">WhatsApp First</p>
      <p class="mt-2 text-xs leading-6 text-slate-300">Kelola konten yang langsung mendorong konsultasi calon pelanggan Bali.</p>
    </div>
  </aside>`;
}
