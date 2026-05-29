import { sectionShell } from "../utils/renderModule.js";
import { whatsappButton, whatsappUrl } from "../utils/whatsapp.js";

export function businessPackage({ company, settings }) {
  const packages = [
    ["Paket Pemula", "Untuk lokasi kecil, kos, desa, atau area sekolah.", "Mesin fotocopy A3, printer warna, laminating A3, toner awal, training operator."],
    ["Paket Profesional", "Untuk copy center aktif dan layanan dokumen lengkap.", "Mesin speed lebih tinggi, printer foto, mesin jilid, potong kertas, sparepart awal."],
    ["Paket Printing Lengkap", "Untuk usaha fotocopy plus merchandise.", "Mesin fotocopy, printer, laminating, press kaos, press mug, layout workflow, training."]
  ];
  const content = `<div class="grid gap-5 lg:grid-cols-3">
    ${packages.map(([name, target, items]) => `<article class="fade-in glass glow-hover rounded-3xl p-6">
      <h3 class="text-2xl font-black text-white">${name}</h3>
      <p class="mt-3 text-sm leading-7 text-cyan-100">${target}</p>
      <p class="mt-5 text-sm leading-7 text-slate-300">${items}</p>
      <div class="mt-8">${whatsappButton("Minta Simulasi Paket", whatsappUrl(company, settings.whatsappMessage, name), "secondary")}</div>
    </article>`).join("")}
  </div>`;
  return sectionShell("paket", "Paket Usaha Fotocopy", "Mulai usaha dengan komposisi mesin yang masuk akal", "Pilih paket berdasarkan modal, lokasi, target layanan, dan kapasitas harian. Tim akan bantu simulasi kebutuhan sebelum pembelian.", content, "bg-slate-950/35");
}
