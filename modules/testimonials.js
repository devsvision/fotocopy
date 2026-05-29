import { sectionShell } from "../utils/renderModule.js";
import { stars } from "../utils/formatter.js";

export function testimonials({ testimonials }) {
  const content = `<div class="grid gap-5 md:grid-cols-3">
    ${testimonials.map((item) => `<article class="fade-in glass-soft glow-hover rounded-3xl p-6">
      <p class="text-lg tracking-widest text-cyan-200">${stars(item.rating)}</p>
      <blockquote class="mt-5 text-sm leading-7 text-slate-200">"${item.quote}"</blockquote>
      <div class="mt-6 border-t border-white/10 pt-5">
        <p class="font-black text-white">${item.name}</p>
        <p class="text-sm text-slate-400">${item.business}</p>
      </div>
    </article>`).join("")}
  </div>`;
  return sectionShell("testimonial", "Testimonial", "Dipercaya pelanggan usaha dan kantor di Bali", "Review singkat dari pelanggan yang memakai mesin, paket usaha, service, dan sewa mesin fotocopy.", content, "bg-slate-950/30");
}
