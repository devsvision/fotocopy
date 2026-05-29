export function productCard(product) {
  return `<article class="glass-soft rounded-2xl p-4">
    <p class="font-black">${product.name}</p>
    <p class="mt-1 text-sm text-slate-400">${product.price || product.stock || "-"}</p>
  </article>`;
}
