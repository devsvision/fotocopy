export function whatsappUrl(company, message, extra = "") {
  const text = encodeURIComponent(`${message}${extra ? ` - ${extra}` : ""}`);
  return `https://wa.me/${company.whatsapp}?text=${text}`;
}

export function whatsappButton(label, url, variant = "primary") {
  const style = variant === "secondary"
    ? "border border-cyan-300/30 bg-white/5 text-white hover:border-cyan-200 hover:bg-cyan-300/10"
    : "bg-cyan-300 text-slate-950 shadow-glow hover:bg-white";

  return `<a href="${url}" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${style}">
    <span>${label}</span>
    <span aria-hidden="true">↗</span>
  </a>`;
}
