import { createTransaction, demoProductCategories, listProducts } from "../services/dataService.js";
import { debounce } from "../utils/dom.js";
import { escapeHtml, rupiah } from "../utils/format.js";

const app = document.querySelector("#kasir-app");
const receipt = document.querySelector("#receipt");
const state = { products: [], cart: [], query: "", category: "Semua" };

await loadProducts();
render();

async function loadProducts() {
  state.products = await listProducts({ query: state.query, category: state.category === "Semua" ? "" : state.category });
}

function render() {
  app.innerHTML = `<main class="grid min-h-screen gap-4 p-3 lg:grid-cols-[1fr_430px] lg:p-5">
    <section class="glass rounded-3xl p-4">
      <header class="flex flex-col gap-4 border-b border-white/10 pb-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p class="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">POS Kasir</p>
          <h1 class="mt-2 text-2xl font-black">Transaksi Multi Toko</h1>
        </div>
        <input id="search" class="field max-w-xl" placeholder="Scan barcode / cari produk">
      </header>
      <div id="categories" class="mt-4 flex gap-2 overflow-x-auto pb-2">${categoryButtons()}</div>
      <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">${productCards()}</div>
    </section>
    <aside class="glass rounded-3xl p-4">
      <div class="flex items-center justify-between border-b border-white/10 pb-4">
        <div><p class="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Cart</p><h2 class="text-xl font-black">Pembayaran</h2></div>
        <button id="clear" class="btn-secondary px-4 py-2">Clear</button>
      </div>
      <div id="cart" class="mt-4 max-h-[42vh] space-y-3 overflow-auto">${cartItems()}</div>
      <div class="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <input id="discount" class="field" type="number" min="0" value="0" placeholder="Diskon">
        <input id="paid" class="field" type="number" min="0" value="${total()}" placeholder="Dibayar">
        <select id="payment" class="field"><option value="cash">Cash</option><option value="transfer">Transfer</option><option value="qris">QRIS</option></select>
      </div>
      <div id="totals" class="mt-4">${totalsView()}</div>
      <button id="pay" class="btn-primary mt-5 w-full">Simpan & Print Receipt</button>
    </aside>
  </main>`;
  bind();
}

function categoryButtons() {
  return demoProductCategories().map((category) => `<button data-category="${category}" class="category shrink-0 rounded-full px-4 py-2 text-sm font-bold ${state.category === category ? "bg-cyan-300 text-slate-950" : "bg-white/5 text-slate-200"}">${category}</button>`).join("");
}

function productCards() {
  return state.products.map((product) => `<button data-id="${product.id}" class="product glass glow-hover rounded-3xl p-5 text-left">
    <p class="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">${escapeHtml(product.category)}</p>
    <h3 class="mt-3 text-lg font-black">${escapeHtml(product.name)}</h3>
    <p class="mt-3 text-2xl font-black text-cyan-100">${rupiah.format(product.price)}</p>
    <p class="mt-2 text-xs text-slate-400">Stok ${product.stock} · ${escapeHtml(product.sku)}</p>
  </button>`).join("");
}

function cartItems() {
  if (!state.cart.length) return `<p class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-400">Cart kosong.</p>`;
  return state.cart.map((item) => `<article class="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
    <div class="flex justify-between gap-3"><strong>${escapeHtml(item.name)}</strong><button data-id="${item.id}" class="remove text-cyan-200">Hapus</button></div>
    <div class="mt-3 flex items-center gap-2"><button data-id="${item.id}" class="minus btn-secondary px-3 py-1">-</button><span class="font-black">${item.qty}</span><button data-id="${item.id}" class="plus btn-secondary px-3 py-1">+</button><strong class="ml-auto">${rupiah.format(item.qty * item.price)}</strong></div>
  </article>`).join("");
}

function bind() {
  document.querySelector("#search").addEventListener("input", debounce(async (event) => {
    state.query = event.target.value;
    await loadProducts();
    render();
  }));
  document.querySelectorAll(".category").forEach((button) => button.addEventListener("click", async () => {
    state.category = button.dataset.category;
    await loadProducts();
    render();
  }));
  document.querySelectorAll(".product").forEach((button) => button.addEventListener("click", () => add(button.dataset.id)));
  document.querySelectorAll(".plus").forEach((button) => button.addEventListener("click", () => qty(button.dataset.id, 1)));
  document.querySelectorAll(".minus").forEach((button) => button.addEventListener("click", () => qty(button.dataset.id, -1)));
  document.querySelectorAll(".remove").forEach((button) => button.addEventListener("click", () => remove(button.dataset.id)));
  document.querySelector("#clear").addEventListener("click", () => { state.cart = []; render(); });
  document.querySelector("#discount").addEventListener("input", updateTotals);
  document.querySelector("#paid").addEventListener("input", updateTotals);
  document.querySelector("#pay").addEventListener("click", pay);
}

function add(id) {
  const product = state.products.find((item) => item.id === id);
  const item = state.cart.find((entry) => entry.id === id);
  if (item) item.qty += 1;
  else state.cart.push({ ...product, qty: 1 });
  render();
}

function qty(id, delta) {
  const item = state.cart.find((entry) => entry.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  render();
}

function remove(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  render();
}

function total() {
  return state.cart.reduce((sum, item) => sum + item.qty * item.price, 0);
}

function totalsView() {
  return `<div class="space-y-2 text-sm">
    <div class="flex justify-between text-slate-300"><span>Subtotal</span><strong>${rupiah.format(total())}</strong></div>
    <div class="flex justify-between border-t border-white/10 pt-3 text-lg"><span>Total</span><strong id="grand">${rupiah.format(total())}</strong></div>
    <div class="flex justify-between text-cyan-200"><span>Kembalian</span><strong id="change">${rupiah.format(0)}</strong></div>
  </div>`;
}

function updateTotals() {
  const discount = Number(document.querySelector("#discount").value || 0);
  const paid = Number(document.querySelector("#paid").value || 0);
  const grand = Math.max(0, total() - discount);
  document.querySelector("#grand").textContent = rupiah.format(grand);
  document.querySelector("#change").textContent = rupiah.format(Math.max(0, paid - grand));
}

async function pay() {
  const discount = Number(document.querySelector("#discount").value || 0);
  const paid = Number(document.querySelector("#paid").value || 0);
  const grand = Math.max(0, total() - discount);
  if (!state.cart.length || paid < grand) return;
  const trx = await createTransaction({ items: state.cart, discount_total: discount, paid_amount: paid, payment_method: document.querySelector("#payment").value });
  receipt.innerHTML = `<div style="text-align:center"><strong>Bali CopyTech</strong><br>Denpasar Bali<br>${new Date().toLocaleString("id-ID")}</div><hr>Invoice: ${trx.invoice_number}<hr>${state.cart.map((item) => `${escapeHtml(item.name)}<br>${item.qty} x ${rupiah.format(item.price)} = ${rupiah.format(item.qty * item.price)}<br>`).join("")}<hr>Total: ${rupiah.format(grand)}<br>Bayar: ${rupiah.format(paid)}<br>Kembali: ${rupiah.format(Math.max(0, paid - grand))}<hr><div style="text-align:center">Terima kasih</div>`;
  window.print();
  state.cart = [];
  render();
}
