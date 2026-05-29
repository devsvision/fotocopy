import { sectionShell } from "../utils/renderModule.js";
import { whatsappButton, whatsappUrl } from "../utils/whatsapp.js";

export function contact({ company, settings }) {
  const content = `<div class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
    <div class="fade-in glass rounded-3xl p-6">
      <h3 class="text-2xl font-black text-white">${company.name}</h3>
      <div class="mt-6 space-y-4 text-sm leading-7 text-slate-300">
        <p><strong class="text-white">Alamat:</strong> ${company.address}</p>
        <p><strong class="text-white">WhatsApp:</strong> ${company.phone}</p>
        <p><strong class="text-white">Email:</strong> ${company.email}</p>
        <p><strong class="text-white">Jam:</strong> ${company.hours}</p>
      </div>
      <div class="mt-7">${whatsappButton("Hubungi WhatsApp", whatsappUrl(company, settings.whatsappMessage))}</div>
    </div>
    <div class="fade-in overflow-hidden rounded-3xl border border-white/10">
      <iframe title="Peta Denpasar Bali" src="${company.mapsUrl}" class="h-[420px] w-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>`;
  return sectionShell("kontak", "Contact", "Datang atau konsultasi dari mana saja", "Berbasis di Denpasar dan melayani kebutuhan pelanggan di seluruh Bali.", content);
}
