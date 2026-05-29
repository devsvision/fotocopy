import { whatsappButton, whatsappUrl } from "../utils/whatsapp.js";

const statIcons = [
  `<path d="M7 3h10v18H7z"/><path d="M10 7h4"/><path d="M10 11h4"/><path d="M10 15h4"/>`,
  `<path d="M12 21s7-5.1 7-11a7 7 0 0 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>`,
  `<path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  `<path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="9"/>`
];

function statIcon(index) {
  return `<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    ${statIcons[index] || statIcons[0]}
  </svg>`;
}

export function hero({ company, settings }) {
  return `<section id="home" class="relative flex min-h-screen items-center overflow-hidden pt-24">
    <div class="hero-tech-bg" aria-hidden="true">
      <div class="hero-grid"></div>
      <div class="hero-blueprint-ring ring-a"></div>
      <div class="hero-blueprint-ring ring-b"></div>
      <div class="wide-scan-beam"></div>
      <div class="hero-glow hero-glow-a"></div>
      <div class="hero-glow hero-glow-b"></div>
      <div class="copy-machine-visual">
        <div class="copy-machine-top"></div>
        <div class="copy-machine-body">
          <div class="copy-machine-screen"></div>
          <div class="copy-machine-button button-a"></div>
          <div class="copy-machine-button button-b"></div>
          <div class="copy-scan-window">
            <span class="copy-scan-line"></span>
            <span class="copy-scan-line scan-line-soft"></span>
          </div>
          <div class="toner-bars">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="paper paper-a"></div>
          <div class="paper paper-b"></div>
        </div>
      </div>
      <span class="circuit-line line-a"></span>
      <span class="circuit-line line-b"></span>
      <span class="circuit-line line-c"></span>
      <span class="data-dot dot-a"></span>
      <span class="data-dot dot-b"></span>
      <span class="data-dot dot-c"></span>
    </div>
    <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.9)_0%,rgba(2,6,23,0.68)_43%,rgba(2,6,23,0.22)_73%,rgba(2,6,23,0.4)_100%)]"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/90"></div>
    <div class="absolute inset-x-0 top-0 h-96 animated-gradient bg-gradient-to-r from-cyan-400/15 via-blue-600/10 to-white/5 blur-3xl"></div>
    <div class="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
      <div class="relative z-10 fade-in">
        <p class="mb-5 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Mesin Fotocopy - Printing - Bali</p>
        <h1 class="text-balance text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">${settings.heroTitle}</h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300">${settings.heroSubtitle}</p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          ${whatsappButton(settings.primaryCta, whatsappUrl(company, settings.whatsappMessage))}
          <a href="#produk" class="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-300/50 hover:bg-cyan-300/10">Lihat Produk</a>
        </div>
      </div>
      <div class="relative z-10 hidden min-h-[520px] lg:block"></div>
      <div class="relative z-10 grid w-full gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-2 xl:grid-cols-4">
        ${company.stats.map((stat, index) => `<a href="#layanan" class="group hero-stat-card flex min-h-[118px] items-center justify-between gap-5 p-5 transition duration-300 hover:-translate-y-1">
          <div class="flex min-w-0 items-center gap-4">
            <span class="hero-stat-icon grid h-12 w-12 shrink-0 place-items-center text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950">
              ${statIcon(index)}
            </span>
            <div class="min-w-0">
              <p class="whitespace-nowrap text-2xl font-black leading-none text-white sm:text-3xl">${stat.value}</p>
              <p class="mt-2 whitespace-nowrap text-xs font-semibold text-slate-400">${stat.label}</p>
            </div>
          </div>
          <div class="hidden shrink-0 text-right sm:block">
            <span class="block translate-x-1 text-cyan-200 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true">-></span>
            <p class="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 opacity-0 transition group-hover:opacity-100">Explore</p>
          </div>
        </a>`).join("")}
      </div>
    </div>
  </section>`;
}
