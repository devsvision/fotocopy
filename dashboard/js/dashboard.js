import { sidebar } from "../components/sidebar.js";
import { topbar } from "../components/topbar.js";
import { statCard } from "../components/stat-card.js";
import { table } from "../components/table.js";
import { modal } from "../components/modal.js";

const app = document.querySelector("#admin-app");
const storageKey = "bct_admin_data";
const viewTitles = {
  overview: "Overview",
  products: "Product Management",
  categories: "Category Management",
  services: "Service Management",
  gallery: "Gallery Management",
  testimonials: "Testimonial Management",
  faq: "FAQ Management",
  settings: "Website Settings",
  preview: "Live Preview"
};

const collectionConfig = {
  products: {
    label: "Produk",
    singular: "Produk",
    fields: ["name", "category", "description", "specs", "price", "stock", "image", "featured"],
    note: "Kelola mesin fotocopy, printer, sparepart, dan paket usaha."
  },
  categories: {
    label: "Kategori",
    singular: "Kategori",
    fields: ["name", "icon", "description", "image"],
    note: "Kelompokkan produk agar pelanggan cepat menemukan kebutuhan."
  },
  services: {
    label: "Layanan",
    singular: "Layanan",
    fields: ["title", "description", "icon"],
    note: "Atur layanan penjualan, service onsite, sewa, dan konsultasi."
  },
  gallery: {
    label: "Gallery",
    singular: "Project",
    fields: ["title", "category", "image"],
    note: "Tampilkan dokumentasi instalasi, service, dan setup toko."
  },
  testimonials: {
    label: "Testimonial",
    singular: "Testimonial",
    fields: ["name", "business", "rating", "quote"],
    note: "Kelola review pelanggan untuk meningkatkan trust."
  },
  faq: {
    label: "FAQ",
    singular: "FAQ",
    fields: ["question", "answer"],
    note: "Jawab pertanyaan yang sering muncul sebelum calon pelanggan chat."
  }
};

let state = {
  active: "overview",
  query: "",
  data: null
};

boot();

async function boot() {
  guard();
  state.data = await loadAdminData();
  render();
}

function guard() {
  const session = JSON.parse(localStorage.getItem("bct_admin_session") || "null");
  if (!session?.loggedIn) window.location.href = "login.html";
}

async function loadAdminData({ forceSeed = false } = {}) {
  const stored = localStorage.getItem(storageKey);
  if (stored && !forceSeed) return JSON.parse(stored);

  const paths = ["company", "settings", "categories", "products", "services", "gallery", "testimonials", "faq"];
  const values = await Promise.all(paths.map((path) => fetch(`../data/${path}.json`).then((response) => response.json())));
  const seeded = Object.fromEntries(paths.map((path, index) => [path, values[index]]));
  save(seeded);
  return seeded;
}

function save(data = state.data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function render() {
  app.innerHTML = `<div class="admin-layout min-h-screen">
    ${sidebar(state.active)}
    <main class="min-w-0">
      ${topbar(viewTitles[state.active])}
      <section class="p-4 sm:p-6">${renderView()}</section>
    </main>
  </div>
  <div id="toast" class="pointer-events-none fixed bottom-5 right-5 z-[60] translate-y-4 rounded-2xl border border-cyan-300/30 bg-slate-950/90 px-5 py-4 text-sm font-bold text-cyan-100 opacity-0 shadow-glow backdrop-blur-xl transition">Tersimpan</div>`;
  bindEvents();
}

function renderView() {
  if (state.active === "overview") return overviewView();
  if (state.active === "settings") return settingsView();
  if (state.active === "preview") return previewView();
  return collectionView(state.active);
}

function overviewView() {
  const readyProducts = state.data.products.filter((product) => String(product.stock).toLowerCase().includes("ready")).length;
  const featuredProducts = state.data.products.filter((product) => product.featured).length;
  const whatsapp = state.data.company.whatsapp || "-";

  return `<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    ${statCard("Total Produk", state.data.products.length, `${readyProducts} produk ready stock`)}
    ${statCard("Produk Unggulan", featuredProducts, "Tampil di landing page")}
    ${statCard("Total Layanan", state.data.services.length, "Sales, rental, maintenance")}
    ${statCard("WhatsApp Aktif", whatsapp, "Nomor CTA utama")}
  </div>

  <div class="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
    <section class="glass rounded-3xl p-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Analytics Demo</p>
          <h2 class="mt-2 text-xl font-black">WhatsApp Conversion Trend</h2>
        </div>
        <span class="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-bold text-cyan-200">+28% bulan ini</span>
      </div>
      <div class="mt-7 grid h-72 grid-cols-12 items-end gap-2">
        ${[42, 58, 45, 70, 64, 86, 78, 96, 88, 112, 124, 138].map((value, index) => `<div class="group relative rounded-t-xl bg-gradient-to-t from-blue-700 via-cyan-500 to-white shadow-glow" style="height:${value}px">
          <span class="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-lg bg-slate-950 px-2 py-1 text-xs group-hover:block">${value}</span>
          <span class="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-slate-500">${index + 1}</span>
        </div>`).join("")}
      </div>
    </section>

    <section class="glass rounded-3xl p-6">
      <p class="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Control Center</p>
      <h2 class="mt-2 text-xl font-black">Quick Actions</h2>
      <div class="mt-5 grid gap-3">
        <button data-view="products" class="nav-item rounded-2xl border border-white/10 px-4 py-4 text-left font-bold hover:bg-white/10">Tambah atau edit produk</button>
        <button data-view="settings" class="nav-item rounded-2xl border border-white/10 px-4 py-4 text-left font-bold hover:bg-white/10">Update WhatsApp dan hero section</button>
        <button data-view="preview" class="nav-item rounded-2xl border border-white/10 px-4 py-4 text-left font-bold hover:bg-white/10">Buka live preview</button>
        <button id="export-data" class="rounded-2xl border border-cyan-300/30 px-4 py-4 text-left font-bold text-cyan-200 hover:bg-cyan-300/10">Export JSON data</button>
        <button id="reset-data" class="rounded-2xl border border-red-300/30 px-4 py-4 text-left font-bold text-red-200 hover:bg-red-400/10">Reset data demo</button>
      </div>
    </section>
  </div>

  <section class="mt-6 glass rounded-3xl p-6">
    <div class="mb-5 flex items-center justify-between gap-3">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Featured Products</p>
        <h2 class="mt-2 text-xl font-black">Produk tampil di homepage</h2>
      </div>
      <button data-view="products" class="nav-item rounded-full bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950">Kelola</button>
    </div>
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      ${state.data.products.filter((product) => product.featured).slice(0, 4).map(productMiniCard).join("")}
    </div>
  </section>`;
}

function collectionView(key) {
  const config = collectionConfig[key];
  const items = state.data[key].filter((item) => searchableText(item).includes(state.query.toLowerCase()));
  const rows = items.map((item) => rowTemplate(key, item)).join("");

  return `<div class="mb-5 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-end">
    <div>
      <p class="text-sm leading-7 text-slate-400">${config.note}</p>
      <div class="mt-4 flex flex-col gap-3 sm:flex-row">
        <form id="search-form" class="relative w-full max-w-lg">
          <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">⌕</span>
          <input id="table-search" value="${escapeHtml(state.query)}" class="admin-input pl-11" placeholder="Cari ${config.label.toLowerCase()} lalu tekan Enter...">
        </form>
        <span class="rounded-full border border-white/10 px-4 py-3 text-sm font-bold text-slate-300">${items.length} item</span>
      </div>
    </div>
    <button data-add="${key}" class="rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 shadow-glow">Tambah ${config.singular}</button>
  </div>
  ${table(["Item", "Info", "Status", "Aksi"], rows || emptyRow())}`;
}

function rowTemplate(key, item) {
  const primary = item.name || item.title || item.question;
  const secondary = item.description || item.quote || item.answer || "";
  const image = item.image ? `<img src="${item.image}" alt="${escapeHtml(primary)}" class="h-14 w-16 rounded-xl object-cover">` : `<span class="grid h-14 w-16 place-items-center rounded-xl border border-white/10 bg-white/5 text-cyan-200">BC</span>`;
  const info = item.category || item.business || item.price || item.icon || item.rating || "-";
  const status = key === "products" ? item.stock : item.featured ? "Featured" : "Published";

  return `<tr>
    <td class="px-4 py-4">
      <div class="flex items-center gap-3">
        ${["products", "gallery", "categories"].includes(key) ? image : ""}
        <div>
          <p class="font-black text-white">${primary}</p>
          <p class="mt-1 max-w-xl text-xs leading-5 text-slate-400">${secondary.slice(0, 96)}</p>
        </div>
      </div>
    </td>
    <td class="px-4 py-4 text-slate-300">${info}</td>
    <td class="px-4 py-4"><span class="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">${status || "Published"}</span></td>
    <td class="px-4 py-4">
      <div class="flex flex-wrap gap-2">
        <button data-edit="${key}:${item.id}" class="rounded-full bg-cyan-300 px-3 py-1.5 text-xs font-black text-slate-950">Edit</button>
        <button data-delete="${key}:${item.id}" class="rounded-full border border-red-300/30 px-3 py-1.5 text-xs font-bold text-red-200 hover:bg-red-400/10">Hapus</button>
      </div>
    </td>
  </tr>`;
}

function settingsView() {
  const flat = { ...state.data.company, ...state.data.settings };
  return `<form id="settings-form" class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
    <section class="glass rounded-3xl p-6">
      <p class="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Company Profile</p>
      <div class="mt-5 grid gap-4">
        ${settingInput("name", flat.name)}
        ${settingInput("tagline", flat.tagline)}
        ${settingInput("address", flat.address, "textarea")}
        ${settingInput("phone", flat.phone)}
        ${settingInput("whatsapp", flat.whatsapp, "input", "6281234567890")}
        ${settingInput("email", flat.email)}
        ${settingInput("hours", flat.hours)}
      </div>
    </section>

    <div class="grid gap-6">
      <section class="glass rounded-3xl p-6">
        <p class="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Hero Section</p>
        <div class="mt-5 grid gap-4">
          ${settingInput("heroTitle", flat.heroTitle, "textarea")}
          ${settingInput("heroSubtitle", flat.heroSubtitle, "textarea")}
          <div class="grid gap-4 md:grid-cols-2">
            ${settingInput("primaryCta", flat.primaryCta)}
            ${settingInput("secondaryCta", flat.secondaryCta)}
          </div>
          ${settingInput("whatsappMessage", flat.whatsappMessage, "textarea")}
        </div>
      </section>

      <section class="glass rounded-3xl p-6">
        <p class="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">SEO Lokal Bali</p>
        <div class="mt-5 grid gap-4">
          ${settingInput("siteTitle", flat.siteTitle, "textarea")}
          ${settingInput("metaDescription", flat.metaDescription, "textarea")}
          ${settingInput("keywords", flat.keywords, "textarea")}
        </div>
      </section>
    </div>

    <div class="xl:col-span-2 flex flex-wrap items-center gap-3">
      <button class="rounded-full bg-cyan-300 px-6 py-3 text-sm font-black text-slate-950 shadow-glow">Simpan Pengaturan</button>
      <button type="button" data-view="preview" class="nav-item rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-slate-200 hover:bg-white/10">Lihat Preview</button>
    </div>
  </form>`;
}

function previewView() {
  return `<div class="grid gap-5">
    <div class="glass flex flex-col gap-3 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Live Preview</p>
        <p class="mt-2 text-sm text-slate-300">Preview membaca data dari dashboard yang tersimpan di browser.</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <a href="../index.html" target="_blank" class="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-black text-slate-950">Open Full Page</a>
        <button data-view="settings" class="nav-item rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-slate-200">Edit Settings</button>
      </div>
    </div>
    <div class="glass rounded-[2rem] p-3">
      <div class="rounded-[1.5rem] border border-white/10 bg-slate-950 p-2">
        <div class="mb-2 flex items-center gap-2 px-3 py-2">
          <span class="h-3 w-3 rounded-full bg-red-400"></span>
          <span class="h-3 w-3 rounded-full bg-yellow-300"></span>
          <span class="h-3 w-3 rounded-full bg-green-400"></span>
          <span class="ml-3 rounded-full bg-white/5 px-4 py-1 text-xs text-slate-400">localhost preview</span>
        </div>
        <iframe src="../index.html" title="Live preview website" class="h-[760px] w-full rounded-2xl border-0 bg-white"></iframe>
      </div>
    </div>
  </div>`;
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      state.active = button.dataset.view;
      state.query = "";
      render();
    });
  });

  document.querySelector("#logout")?.addEventListener("click", () => {
    localStorage.removeItem("bct_admin_session");
    window.location.href = "login.html";
  });

  document.querySelector("#export-data")?.addEventListener("click", exportData);
  document.querySelector("#export-data-top")?.addEventListener("click", exportData);
  document.querySelector("#reset-data")?.addEventListener("click", resetData);

  document.querySelector("#table-search")?.addEventListener("change", (event) => {
    state.query = event.target.value;
    render();
  });
  document.querySelector("#search-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    state.query = document.querySelector("#table-search")?.value || "";
    render();
  });

  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => openEditor(button.dataset.add));
  });

  document.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      const [key, id] = button.dataset.edit.split(":");
      openEditor(key, id);
    });
  });

  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      const [key, id] = button.dataset.delete.split(":");
      deleteItem(key, id);
    });
  });

  document.querySelector("#settings-form")?.addEventListener("submit", saveSettings);
}

function openEditor(key, id = null) {
  const config = collectionConfig[key];
  const current = id ? state.data[key].find((item) => item.id === id) : { id: `${key.slice(0, 1)}${Date.now()}` };
  const body = `<form id="editor-form" data-key="${key}" data-id="${current.id}" class="grid gap-5 lg:grid-cols-[1fr_320px]">
    <div class="grid gap-4">${config.fields.map((field) => fieldTemplate(field, current[field], key)).join("")}</div>
    <aside class="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <p class="text-sm font-black text-white">Preview</p>
      <div id="form-image-preview" class="image-preview mt-4 grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-sm text-slate-500">
        ${current.image ? `<img src="${current.image}" alt="Preview" class="h-full w-full object-cover">` : "Belum ada gambar"}
      </div>
      <div class="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">Tips</p>
        <p class="mt-2 text-xs leading-6 text-slate-300">Gunakan gambar produk asli dengan rasio landscape atau square agar kartu website terlihat premium.</p>
      </div>
      <button class="mt-5 w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 shadow-glow">Simpan ${config.singular}</button>
    </aside>
  </form>`;

  document.body.insertAdjacentHTML("beforeend", modal(`${id ? "Edit" : "Tambah"} ${config.singular}`, body));
  document.querySelector("[data-close-modal]")?.addEventListener("click", closeModal);
  document.querySelector("#editor-form")?.addEventListener("submit", saveEditor);
  document.querySelector("[data-upload]")?.addEventListener("change", handleUploadPreview);
  document.querySelector('input[name="image"]')?.addEventListener("input", updateFormImagePreview);
}

function fieldTemplate(field, value = "", key) {
  if (field === "featured") {
    return `<label class="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold">
      <span>Produk unggulan homepage</span>
      <input type="checkbox" name="${field}" ${value ? "checked" : ""} class="h-5 w-5 accent-cyan-300">
    </label>`;
  }

  if (field === "category" && key === "products") {
    return `<label class="block">
      <span class="text-sm font-bold">${label(field)}</span>
      <select name="${field}" class="admin-select mt-2">${state.data.categories.map((category) => `<option value="${category.id}" ${category.id === value ? "selected" : ""}>${category.name}</option>`).join("")}</select>
    </label>`;
  }

  if (field === "image") {
    return `<label class="block">
      <span class="text-sm font-bold">${label(field)}</span>
      <input name="${field}" value="${escapeAttribute(value || "")}" class="admin-input mt-2" placeholder="URL gambar produk atau hasil upload">
      <input data-upload type="file" accept="image/*" class="mt-3 w-full rounded-2xl border border-dashed border-cyan-300/25 bg-cyan-300/10 px-4 py-4 text-sm text-cyan-100">
    </label>`;
  }

  if (["description", "specs", "quote", "answer"].includes(field)) {
    return `<label class="block">
      <span class="text-sm font-bold">${label(field)}</span>
      <textarea name="${field}" rows="4" class="admin-textarea mt-2" placeholder="${field === "specs" ? "Satu spesifikasi per baris" : ""}">${Array.isArray(value) ? value.join("\n") : value || ""}</textarea>
    </label>`;
  }

  return `<label class="block">
    <span class="text-sm font-bold">${label(field)}</span>
    <input name="${field}" value="${escapeAttribute(value || "")}" class="admin-input mt-2">
  </label>`;
}

function saveEditor(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const key = form.dataset.key;
  const id = form.dataset.id;
  const data = Object.fromEntries(new FormData(form).entries());
  data.id = id;
  if (collectionConfig[key].fields.includes("featured")) data.featured = form.featured.checked;
  if (data.specs) data.specs = data.specs.split("\n").map((item) => item.trim()).filter(Boolean);

  const index = state.data[key].findIndex((item) => item.id === id);
  if (index >= 0) state.data[key][index] = data;
  else state.data[key].push(data);

  save();
  closeModal();
  render();
  toast(`${collectionConfig[key].singular} tersimpan`);
}

function saveSettings(event) {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget).entries());
  const companyFields = ["name", "tagline", "address", "phone", "whatsapp", "email", "hours"];
  companyFields.forEach((key) => state.data.company[key] = values[key]);
  Object.keys(values).filter((key) => !companyFields.includes(key)).forEach((key) => state.data.settings[key] = values[key]);
  save();
  render();
  toast("Pengaturan website tersimpan");
}

function deleteItem(key, id) {
  const item = state.data[key].find((entry) => entry.id === id);
  const name = item?.name || item?.title || item?.question || "item ini";
  if (!confirm(`Hapus ${name}?`)) return;
  state.data[key] = state.data[key].filter((entry) => entry.id !== id);
  save();
  render();
  toast(`${collectionConfig[key].singular} dihapus`);
}

function handleUploadPreview(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const input = document.querySelector('input[name="image"]');
    input.value = reader.result;
    updateFormImagePreview();
  };
  reader.readAsDataURL(file);
}

function updateFormImagePreview() {
  const preview = document.querySelector("#form-image-preview");
  const value = document.querySelector('input[name="image"]')?.value;
  if (!preview) return;
  preview.innerHTML = value ? `<img src="${value}" alt="Preview" class="h-full w-full object-cover">` : "Belum ada gambar";
}

function closeModal() {
  document.querySelector("#modal")?.remove();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "bali-copytech-data.json";
  link.click();
  URL.revokeObjectURL(url);
  toast("JSON berhasil diexport");
}

async function resetData() {
  if (!confirm("Reset semua perubahan dashboard ke data sample awal?")) return;
  state.data = await loadAdminData({ forceSeed: true });
  render();
  toast("Data demo berhasil direset");
}

function productMiniCard(product) {
  return `<article class="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
    <img src="${product.image}" alt="${escapeHtml(product.name)}" class="h-32 w-full rounded-2xl object-cover">
    <p class="mt-4 font-black text-white">${product.name}</p>
    <p class="mt-1 text-sm text-cyan-200">${product.price}</p>
  </article>`;
}

function settingInput(name, value = "", type = "input", placeholder = "") {
  const isTextArea = type === "textarea";
  return `<label class="block">
    <span class="text-sm font-bold text-slate-200">${label(name)}</span>
    ${isTextArea
      ? `<textarea name="${name}" rows="3" class="admin-textarea mt-2" placeholder="${placeholder}">${value || ""}</textarea>`
      : `<input name="${name}" value="${escapeAttribute(value || "")}" class="admin-input mt-2" placeholder="${placeholder}">`}
  </label>`;
}

function emptyRow() {
  return `<tr><td class="px-4 py-8 text-center text-slate-400" colspan="4">Data belum ditemukan.</td></tr>`;
}

function searchableText(item) {
  return Object.values(item).flat().join(" ").toLowerCase();
}

function toast(message) {
  const element = document.querySelector("#toast");
  if (!element) return;
  element.textContent = message;
  element.classList.remove("opacity-0", "translate-y-4");
  window.setTimeout(() => element.classList.add("opacity-0", "translate-y-4"), 1800);
}

function label(field) {
  const labels = {
    name: "Nama",
    title: "Judul",
    category: "Kategori",
    description: "Deskripsi",
    specs: "Spesifikasi",
    price: "Harga",
    stock: "Status Stok",
    image: "Gambar",
    icon: "Icon",
    business: "Nama Bisnis",
    rating: "Rating",
    quote: "Review",
    question: "Pertanyaan",
    answer: "Jawaban",
    whatsapp: "Nomor WhatsApp",
    heroTitle: "Hero Title",
    heroSubtitle: "Hero Subtitle",
    primaryCta: "Primary CTA",
    secondaryCta: "Secondary CTA",
    whatsappMessage: "Pesan WhatsApp",
    siteTitle: "SEO Title",
    metaDescription: "Meta Description",
    keywords: "SEO Keywords"
  };
  return labels[field] || field.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}
