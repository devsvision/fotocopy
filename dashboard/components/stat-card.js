export function statCard(label, value, note) {
  return `<article class="stat-card glass glow-hover rounded-3xl p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm text-slate-400">${label}</p>
        <p class="mt-3 text-3xl font-black text-white">${value}</p>
      </div>
      <span class="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">↗</span>
    </div>
    <p class="mt-4 text-xs text-cyan-200">${note}</p>
  </article>`;
}
