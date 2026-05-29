import { sectionShell } from "../utils/renderModule.js";
import { imageFallback } from "../utils/formatter.js";

export function gallery({ gallery }) {
  const content = `<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    ${gallery.map((item, index) => `<figure class="fade-in gloss-card glow-hover group relative rounded-3xl ${index === 0 ? "md:col-span-2" : ""}">
      <img src="${imageFallback(item.image)}" alt="${item.title}" class="h-72 w-full rounded-3xl object-cover transition duration-500 group-hover:scale-105">
      <figcaption class="absolute inset-x-0 bottom-0 rounded-b-3xl bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-5">
        <p class="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">${item.category}</p>
        <h3 class="mt-2 font-black text-white">${item.title}</h3>
      </figcaption>
    </figure>`).join("")}
  </div>`;
  return sectionShell("gallery", "Gallery Project", "Dokumentasi instalasi dan service pelanggan", "Tampilan project membantu calon pelanggan melihat kualitas kerja, setup toko, dan dukungan teknisi di lapangan.", content);
}
