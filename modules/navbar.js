import { APP_CONFIG } from "../config/supabase.js";
import { whatsappUrl } from "../utils/format.js";

export function navbar() {
  const links = [
    ["Tentang", "#tentang"],
    ["Produk", "#produk"],
    ["Paket", "#paket"],
    ["Services", "#services"],
    ["Gallery", "#gallery"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"]
  ];

  return `<header class="no-print fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/65 backdrop-blur-2xl">
    <nav class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a href="#home" class="flex items-center gap-3">
        <span class="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 font-black text-cyan-200 shadow-[0_0_34px_rgba(0,212,255,0.25)]">BC</span>
        <span>
          <span class="block text-sm font-black text-white">${APP_CONFIG.businessName}</span>
          <span class="block text-xs text-slate-400">${APP_CONFIG.location}</span>
        </span>
      </a>
      <button id="menu-toggle" class="rounded-xl border border-white/10 p-3 text-white md:hidden" aria-label="Buka menu">☰</button>
      <div id="nav-menu" class="glass pointer-events-none absolute left-4 right-4 top-24 grid translate-y-2 gap-2 rounded-2xl p-3 opacity-0 transition md:pointer-events-auto md:static md:flex md:translate-y-0 md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:opacity-100 md:shadow-none md:backdrop-blur-0">
        ${links.map(([label, href]) => `<a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white" href="${href}">${label}</a>`).join("")}
        <a href="auth/" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">Login</a>
        <a href="${whatsappUrl(APP_CONFIG.whatsapp, "Halo Bali CopyTech, saya ingin konsultasi mesin fotocopy.")}" target="_blank" rel="noopener" class="btn-primary py-2.5 text-sm">WhatsApp</a>
      </div>
    </nav>
  </header>`;
}

export function initNavbar() {
  const button = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#nav-menu");
  button?.addEventListener("click", () => {
    menu.classList.toggle("pointer-events-none");
    menu.classList.toggle("opacity-0");
    menu.classList.toggle("translate-y-2");
  });
}
