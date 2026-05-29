import { whatsappUrl } from "../utils/whatsapp.js";

export function navbar({ company, settings }) {
  const links = [
    ["Tentang", "#tentang"],
    ["Produk", "#produk"],
    ["Paket", "#paket"],
    ["Project", "#gallery"],
    ["FAQ", "#faq"],
    ["Kontak", "#kontak"]
  ];

  return `<header class="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
    <nav class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Navigasi utama">
      <a href="#home" class="flex items-center gap-3">
        <span class="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-lg font-black text-cyan-200 shadow-glow">BC</span>
        <span>
          <span class="block text-sm font-black text-white">${company.name}</span>
          <span class="block text-xs text-slate-400">Denpasar Bali</span>
        </span>
      </a>
      <button id="menu-toggle" class="rounded-xl border border-white/10 p-3 text-white md:hidden" aria-label="Buka menu">☰</button>
      <div id="nav-menu" class="glass-soft pointer-events-none absolute left-4 right-4 top-24 grid translate-y-2 gap-2 rounded-2xl p-3 opacity-0 transition md:pointer-events-auto md:static md:flex md:translate-y-0 md:items-center md:gap-1 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:opacity-100 md:backdrop-blur-0">
        ${links.map(([label, href]) => `<a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white" href="${href}">${label}</a>`).join("")}
        <a href="${whatsappUrl(company, settings.whatsappMessage)}" target="_blank" rel="noopener" class="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-black text-slate-950 shadow-glow transition hover:bg-white">WhatsApp</a>
      </div>
    </nav>
  </header>`;
}

export function initNavbar() {
  const button = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#nav-menu");
  if (!button || !menu) return;
  button.addEventListener("click", () => {
    menu.classList.toggle("pointer-events-none");
    menu.classList.toggle("opacity-0");
    menu.classList.toggle("translate-y-2");
  });
}
