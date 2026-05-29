export function modal(title, body) {
  return `<div id="modal" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4 backdrop-blur-xl">
    <div class="glass modal-panel max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl p-6">
      <div class="mb-5 flex items-center justify-between">
        <h2 class="text-xl font-black">${title}</h2>
        <button data-close-modal class="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 hover:bg-white/10">Tutup</button>
      </div>
      ${body}
    </div>
  </div>`;
}
