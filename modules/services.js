import { sectionShell } from "../utils/renderModule.js";

const serviceIcons = {
  "shopping-bag": `<path d="M6 8h12l-1 11H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>`,
  wrench: `<path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-3 3-3-3 3-3Z"/>`,
  repeat: `<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>`,
  package: `<path d="M21 8 12 3 3 8l9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>`,
  "messages-square": `<path d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H9l-5 5v-5a3 3 0 0 1-3-3V5Z"/><path d="M8 7h8"/><path d="M8 11h5"/>`
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    ${serviceIcons[name] || serviceIcons.wrench}
  </svg>`;
}

export function services({ services }) {
  const content = `<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
    ${services.map((service, index) => `<article class="fade-in glass-soft glow-hover rounded-2xl p-5 ${index === 0 ? "lg:col-span-2" : ""}">
      <div class="mb-7 flex items-center justify-between gap-4">
        <p class="text-3xl text-cyan-200">0${index + 1}</p>
        <div class="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-glow">
          ${icon(service.icon)}
        </div>
      </div>
      <h3 class="text-lg font-black text-white">${service.title}</h3>
      <p class="mt-3 text-sm leading-7 text-slate-300">${service.description}</p>
    </article>`).join("")}
  </div>`;
  return sectionShell("layanan", "Layanan", "Service, sewa, penjualan, dan konsultasi", "Layanan dibuat untuk pelanggan yang ingin membeli mesin, menjaga mesin tetap produktif, atau memulai bisnis dari nol.", content, "bg-slate-950/30");
}
