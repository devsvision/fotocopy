import { sectionShell } from "../utils/renderModule.js";

export function faq({ faq }) {
  const content = `<div class="mx-auto max-w-4xl space-y-3">
    ${faq.map((item) => `<details class="fade-in glass-soft rounded-2xl p-5">
      <summary class="cursor-pointer text-base font-black text-white">${item.question}</summary>
      <p class="mt-4 text-sm leading-7 text-slate-300">${item.answer}</p>
    </details>`).join("")}
  </div>`;
  return sectionShell("faq", "FAQ", "Pertanyaan sebelum memulai usaha fotocopy", "Jawaban cepat untuk calon pelanggan yang ingin membeli mesin, service, sewa, atau konsultasi paket usaha.", content);
}
