export function sidebar(active = "overview") {
  const items = [
    ["overview", "Overview"],
    ["products", "Produk"],
    ["inventory", "Inventory"],
    ["stores", "Multi Toko"],
    ["users", "Users"],
    ["reports", "Laporan"]
  ];

  return `<aside class="glass fixed inset-y-0 left-0 z-40 hidden w-72 rounded-none border-y-0 border-l-0 p-4 lg:block">
    <div class="mb-6 flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-3">
      <span class="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 font-black text-cyan-200">BC</span>
      <div>
        <p class="font-black">Bali CopyTech</p>
        <p class="text-xs text-slate-400">Business System</p>
      </div>
    </div>
    <nav class="grid gap-2">
      ${items.map(([key, label]) => `<button data-view="${key}" class="nav-item rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${active === key ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"}">${label}</button>`).join("")}
    </nav>
  </aside>`;
}

export function topbar(title, profile) {
  return `<header class="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 px-4 py-4 backdrop-blur-2xl lg:ml-72 lg:px-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Dashboard</p>
        <h1 class="text-2xl font-black">${title}</h1>
      </div>
      <div class="flex flex-wrap gap-2">
        <a href="../kasir/" class="btn-secondary py-2 text-sm">POS Kasir</a>
        <a href="../" class="btn-secondary py-2 text-sm">Website</a>
        <button id="logout" class="btn-primary py-2 text-sm">Logout</button>
      </div>
    </div>
    <p class="mt-2 text-xs text-slate-400">${profile?.name || "Demo Admin"} · ${profile?.role || "super_admin"}</p>
  </header>`;
}
