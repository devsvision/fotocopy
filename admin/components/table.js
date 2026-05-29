export function table(headers, rows) {
  return `<div class="overflow-x-auto rounded-3xl border border-white/10">
    <table class="admin-table w-full min-w-[760px] text-left text-sm">
      <thead class="bg-white/5 text-xs uppercase tracking-[0.18em] text-slate-400">
        <tr>${headers.map((header) => `<th class="px-4 py-4">${header}</th>`).join("")}</tr>
      </thead>
      <tbody class="divide-y divide-white/10">${rows}</tbody>
    </table>
  </div>`;
}
