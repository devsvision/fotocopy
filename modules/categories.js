import { sectionShell } from "../utils/renderModule.js";
import { imageFallback } from "../utils/formatter.js";

const categoryImages = {
  fotocopy: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80",
  laminating: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=80",
  press: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  cutting: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=80",
  binding: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
  printer: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80",
  toner: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
  sparepart: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
  package: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80"
};

export function categories({ categories }) {
  const content = `<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    ${categories.map((category) => `<article class="fade-in gloss-card glow-hover group rounded-2xl">
      <div class="relative h-44 overflow-hidden rounded-t-2xl">
        <img src="${imageFallback(category.image || categoryImages[category.id])}" alt="${category.name}" class="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent"></div>
        <div class="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/30 bg-slate-950/55 text-xl font-black text-cyan-200 shadow-glow backdrop-blur-xl">*</div>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-black text-white">${category.name}</h3>
        <p class="mt-3 text-sm leading-7 text-slate-300">${category.description}</p>
      </div>
    </article>`).join("")}
  </div>`;

  return sectionShell(
    "kategori",
    "Kategori Produk",
    "Perlengkapan lengkap untuk bisnis printing",
    "Dari mesin utama sampai consumable harian, semua disusun untuk membantu operasional usaha lebih stabil.",
    content
  );
}
