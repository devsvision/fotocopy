import { logout } from "../services/authService.js";
import { getDashboardStats } from "../services/dataService.js";
import { rupiah } from "../utils/format.js";
import { sidebar, topbar } from "./components/layout.js";

const app = document.querySelector("#dashboard-app");
const profile = JSON.parse(localStorage.getItem("bct_demo_profile") || '{"name":"Demo Super Admin","role":"super_admin"}');
let active = "overview";

render();

async function render() {
  app.innerHTML = `
    ${sidebar(active)}
    <div class="lg:pl-72">
      ${topbar(title(active), profile)}
      <main class="p-4 sm:p-6">${await view()}</main>
    </div>
  `;
  bind();
}

async function view() {
  if (active === "overview") return overview();
  return managementView(active);
}

async function overview() {
  const stats = await getDashboardStats();
  const cards = [
    ["Omzet Hari Ini", rupiah.format(stats.salesToday || 0)],
    ["Transaksi", stats.transactions || 0],
    ["Produk", stats.products || 0],
    ["Stok Minimum", stats.lowStock || 0],
    ["Toko", stats.stores || 0]
  ];

  return `<section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
    ${cards.map(([label, value]) => `<article class="glass rounded-3xl p-5"><p class="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">${label}</p><p class="mt-4 text-2xl font-black">${value}</p></article>`).join("")}
  </section>
  <section class="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
    <div class="glass rounded-3xl p-6">
      <p class="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Analytics</p>
      <h2 class="mt-3 text-2xl font-black">Sales & Inventory Overview</h2>
      <div class="mt-6 grid h-72 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-400">Chart placeholder siap dihubungkan ke Supabase RPC</div>
    </div>
    <div class="glass rounded-3xl p-6">
      <p class="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Role Access</p>
      <div class="mt-5 space-y-3 text-sm text-slate-300">
        ${["super_admin: semua akses", "owner: toko dan laporan miliknya", "manager: operasional toko", "cashier: POS dan transaksi"].map((item) => `<p class="rounded-2xl border border-white/10 bg-white/[0.04] p-3">${item}</p>`).join("")}
      </div>
    </div>
  </section>`;
}

function managementView(name) {
  return `<section class="glass rounded-3xl p-6">
    <p class="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">${title(name)}</p>
    <h2 class="mt-3 text-2xl font-black">Management ${title(name)}</h2>
    <p class="mt-3 max-w-2xl leading-7 text-slate-300">Layout CRUD modular siap dihubungkan ke tabel Supabase melalui service layer. Gunakan role middleware client dan Row Level Security di Supabase.</p>
    <div class="mt-6 overflow-hidden rounded-2xl border border-white/10">
      <table class="w-full text-left text-sm">
        <thead class="bg-white/[0.06] text-slate-300"><tr><th class="p-4">Nama</th><th class="p-4">Status</th><th class="p-4">Aksi</th></tr></thead>
        <tbody><tr class="border-t border-white/10"><td class="p-4">Sample ${title(name)}</td><td class="p-4">Active</td><td class="p-4 text-cyan-200">Edit</td></tr></tbody>
      </table>
    </div>
  </section>`;
}

function bind() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      active = button.dataset.view;
      render();
    });
  });
  document.querySelector("#logout")?.addEventListener("click", async () => {
    localStorage.removeItem("bct_demo_profile");
    try { await logout(); } catch (error) {}
    window.location.href = "../auth/";
  });
}

function title(key) {
  return {
    overview: "Overview",
    products: "Produk",
    inventory: "Inventory",
    stores: "Multi Toko",
    users: "Users",
    reports: "Laporan"
  }[key] || key;
}
