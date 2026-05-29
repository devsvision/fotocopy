import { sectionShell } from "../utils/renderModule.js";
import { byId, imageFallback } from "../utils/formatter.js";
import { whatsappUrl } from "../utils/whatsapp.js";

export function featuredProducts({ products, categories, company, settings }) {
  const featured = products.filter((product) => product.featured);
  const content = `<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
    ${featured.map((product) => {
      const category = byId(categories, product.category);
      return `<article class="fade-in gloss-card glow-hover flex h-full flex-col rounded-3xl">
        <img src="${imageFallback(product.image)}" alt="${product.name}" class="h-56 w-full rounded-t-3xl object-cover">
        <div class="flex flex-1 flex-col p-6">
          <div class="mb-3 flex items-center justify-between gap-3">
            <span class="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">${category?.name || product.category}</span>
            <span class="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">${product.stock}</span>
          </div>
          <h3 class="text-xl font-black text-white">${product.name}</h3>
          <p class="mt-3 text-sm leading-7 text-slate-300">${product.description}</p>
          <ul class="mt-4 grid gap-2 text-sm text-slate-300">${product.specs.map((spec) => `<li class="flex gap-2"><span class="text-cyan-300">•</span>${spec}</li>`).join("")}</ul>
          <div class="mt-auto pt-6">
            <p class="mb-4 text-lg font-black text-white">${product.price}</p>
            <a href="${whatsappUrl(company, settings.whatsappMessage, product.name)}" target="_blank" rel="noopener" class="inline-flex w-full items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-white">Tanya Produk via WhatsApp</a>
          </div>
        </div>
      </article>`;
    }).join("")}
  </div>`;
  return sectionShell("produk", "Produk Unggulan", "Mesin dan perlengkapan siap operasional", "Produk dipilih untuk kebutuhan usaha fotocopy, kantor, sekolah, kampus, dan layanan printing harian di Bali.", content);
}
