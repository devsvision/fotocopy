export function topbar(title) {
  return `<div class="sticky top-0 z-20 border-b border-white/10 bg-slate-950/55 px-4 py-4 backdrop-blur-2xl sm:px-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Dashboard Admin</p>
        <h1 class="text-2xl font-black text-white">${title}</h1>
      </div>
      <div class="flex flex-wrap gap-2">
        <a href="../index.html" target="_blank" class="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 hover:bg-white/10">Buka Website</a>
        <a href="../kasir/" class="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 hover:bg-white/10">POS Kasir</a>
        <button id="export-data-top" class="rounded-full border border-cyan-300/30 px-4 py-2 text-sm font-bold text-cyan-200 hover:bg-cyan-300/10">Export JSON</button>
        <button id="logout" class="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950">Logout</button>
      </div>
    </div>
  </div>`;
}
