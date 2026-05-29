export function footer({ company }) {
  return `<footer class="border-t border-white/10 py-10">
    <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <p>© ${new Date().getFullYear()} ${company.name}. Solusi mesin fotocopy dan printing Bali.</p>
      <div class="flex gap-4">
        <a href="#produk" class="hover:text-white">Produk</a>
        <a href="#layanan" class="hover:text-white">Layanan</a>
        <a href="#kontak" class="hover:text-white">Kontak</a>
      </div>
    </div>
  </footer>`;
}
