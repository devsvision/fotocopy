const body = document.body;
const storeId = Number(body.dataset.storeId || 1);
const cashierName = body.dataset.cashier || "Kasir";
const storeName = body.dataset.store || "Bali CopyTech";

const state = {
  products: [],
  categories: [],
  cart: [],
  categoryId: 0,
  query: ""
};

const currency = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

const els = {
  search: document.querySelector("#product-search"),
  reload: document.querySelector("#reload-products"),
  categoryTabs: document.querySelector("#category-tabs"),
  productGrid: document.querySelector("#product-grid"),
  cartItems: document.querySelector("#cart-items"),
  clearCart: document.querySelector("#clear-cart"),
  discount: document.querySelector("#discount-total"),
  tax: document.querySelector("#tax-total"),
  paid: document.querySelector("#paid-amount"),
  method: document.querySelector("#payment-method"),
  subtotal: document.querySelector("#subtotal"),
  discountView: document.querySelector("#discount-view"),
  taxView: document.querySelector("#tax-view"),
  grandTotal: document.querySelector("#grand-total"),
  change: document.querySelector("#change-amount"),
  pay: document.querySelector("#pay-button"),
  message: document.querySelector("#pos-message"),
  receipt: document.querySelector("#receipt")
};

boot();

async function boot() {
  bind();
  await Promise.all([loadCategories(), loadProducts()]);
  render();
}

function bind() {
  els.search.addEventListener("input", debounce((event) => {
    state.query = event.target.value.trim();
    loadProducts();
  }, 260));
  els.reload.addEventListener("click", loadProducts);
  els.clearCart.addEventListener("click", () => {
    state.cart = [];
    renderCart();
  });
  [els.discount, els.tax, els.paid].forEach((input) => input.addEventListener("input", renderTotals));
  els.pay.addEventListener("click", submitTransaction);
}

async function loadCategories() {
  try {
    const result = await api(`../api/categories.php?store_id=${storeId}`);
    state.categories = result.categories || [];
  } catch (error) {
    notify(error.message, "error");
  }
}

async function loadProducts() {
  const params = new URLSearchParams({ store_id: storeId, q: state.query });
  if (state.categoryId) params.set("category_id", state.categoryId);
  try {
    const result = await api(`../api/products.php?${params}`);
    state.products = result.products || [];
    renderProducts();
  } catch (error) {
    notify(error.message, "error");
  }
}

function render() {
  renderCategories();
  renderProducts();
  renderCart();
}

function renderCategories() {
  const tabs = [{ id: 0, name: "Semua" }, ...state.categories];
  els.categoryTabs.innerHTML = tabs.map((category) => `
    <button class="category-tab shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${state.categoryId === Number(category.id) ? "bg-cyan-300 text-slate-950" : "bg-white/5 text-slate-200 hover:bg-white/10"}" data-id="${category.id}">
      ${escapeHtml(category.name)}
    </button>
  `).join("");
  els.categoryTabs.querySelectorAll(".category-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.categoryId = Number(button.dataset.id);
      renderCategories();
      loadProducts();
    });
  });
}

function renderProducts() {
  if (!state.products.length) {
    els.productGrid.innerHTML = `<div class="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">Produk tidak ditemukan.</div>`;
    return;
  }

  els.productGrid.innerHTML = state.products.map((product) => `
    <button class="product-card text-left" data-id="${product.id}">
      <div class="flex min-h-16 items-start justify-between gap-3">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">${escapeHtml(product.category_name || "Produk")}</p>
          <h3 class="mt-2 text-base font-black text-white">${escapeHtml(product.name)}</h3>
        </div>
        <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">${Number(product.stock)} ${escapeHtml(product.unit || "pcs")}</span>
      </div>
      <p class="mt-4 text-xl font-black text-cyan-100">${currency.format(Number(product.selling_price || 0))}</p>
      <p class="mt-2 text-xs text-slate-400">${escapeHtml(product.sku || "-")} ${product.barcode ? " / " + escapeHtml(product.barcode) : ""}</p>
    </button>
  `).join("");
  els.productGrid.querySelectorAll(".product-card").forEach((button) => {
    button.addEventListener("click", () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(productId) {
  const product = state.products.find((item) => Number(item.id) === productId);
  if (!product) return;

  const existing = state.cart.find((item) => Number(item.product_id) === productId);
  if (existing) existing.qty += 1;
  else state.cart.push({
    product_id: Number(product.id),
    name: product.name,
    sku: product.sku,
    price: Number(product.selling_price || 0),
    qty: 1,
    stock: Number(product.stock || 0)
  });

  renderCart();
}

function renderCart() {
  if (!state.cart.length) {
    els.cartItems.innerHTML = `<div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-400">Cart kosong. Pilih produk atau scan barcode.</div>`;
    renderTotals();
    return;
  }

  els.cartItems.innerHTML = state.cart.map((item) => `
    <article class="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="font-black">${escapeHtml(item.name)}</h3>
          <p class="mt-1 text-xs text-slate-400">${escapeHtml(item.sku || "")}</p>
        </div>
        <button class="remove-item pos-icon-button h-8 w-8 text-sm" data-id="${item.product_id}">×</button>
      </div>
      <div class="mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <button class="qty-minus pos-icon-button h-9 w-9 text-sm" data-id="${item.product_id}">-</button>
        <input class="qty-input pos-input py-2 text-center" data-id="${item.product_id}" type="number" min="1" max="${item.stock}" value="${item.qty}">
        <button class="qty-plus pos-icon-button h-9 w-9 text-sm" data-id="${item.product_id}">+</button>
      </div>
      <div class="mt-3 flex justify-between text-sm text-slate-200">
        <span>${currency.format(item.price)}</span>
        <strong>${currency.format(item.price * item.qty)}</strong>
      </div>
    </article>
  `).join("");

  els.cartItems.querySelectorAll(".remove-item").forEach((button) => button.addEventListener("click", () => removeItem(Number(button.dataset.id))));
  els.cartItems.querySelectorAll(".qty-minus").forEach((button) => button.addEventListener("click", () => changeQty(Number(button.dataset.id), -1)));
  els.cartItems.querySelectorAll(".qty-plus").forEach((button) => button.addEventListener("click", () => changeQty(Number(button.dataset.id), 1)));
  els.cartItems.querySelectorAll(".qty-input").forEach((input) => input.addEventListener("input", () => setQty(Number(input.dataset.id), Number(input.value || 1))));
  renderTotals();
}

function removeItem(productId) {
  state.cart = state.cart.filter((item) => item.product_id !== productId);
  renderCart();
}

function changeQty(productId, delta) {
  const item = state.cart.find((entry) => entry.product_id === productId);
  if (!item) return;
  item.qty = Math.max(1, Math.min(item.stock, item.qty + delta));
  renderCart();
}

function setQty(productId, qty) {
  const item = state.cart.find((entry) => entry.product_id === productId);
  if (!item) return;
  item.qty = Math.max(1, Math.min(item.stock, qty));
  renderTotals();
}

function totals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = Number(els.discount.value || 0);
  const tax = Number(els.tax.value || 0);
  const grandTotal = Math.max(0, subtotal - discount + tax);
  const paid = Number(els.paid.value || 0);
  return { subtotal, discount, tax, grandTotal, paid, change: Math.max(0, paid - grandTotal) };
}

function renderTotals() {
  const value = totals();
  els.subtotal.textContent = currency.format(value.subtotal);
  els.discountView.textContent = currency.format(value.discount);
  els.taxView.textContent = currency.format(value.tax);
  els.grandTotal.textContent = currency.format(value.grandTotal);
  els.change.textContent = currency.format(value.change);
}

async function submitTransaction() {
  const value = totals();
  if (!state.cart.length) return notify("Cart masih kosong.", "error");
  if (value.paid < value.grandTotal) return notify("Nominal dibayar kurang dari total.", "error");

  try {
    els.pay.disabled = true;
    const result = await api("../api/transactions.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        store_id: storeId,
        items: state.cart.map((item) => ({ product_id: item.product_id, qty: item.qty })),
        discount_total: value.discount,
        tax_total: value.tax,
        paid_amount: value.paid,
        payment_method: els.method.value
      })
    });
    renderReceipt(result.transaction, value);
    window.print();
    state.cart = [];
    els.paid.value = 0;
    await loadProducts();
    renderCart();
    notify("Transaksi tersimpan.", "success");
  } catch (error) {
    notify(error.message, "error");
  } finally {
    els.pay.disabled = false;
  }
}

function renderReceipt(transaction, total) {
  els.receipt.innerHTML = `
    <div style="text-align:center">
      <strong>${escapeHtml(storeName)}</strong><br>
      Denpasar, Bali<br>
      ${new Date().toLocaleString("id-ID")}
    </div>
    <hr>
    Invoice: ${escapeHtml(transaction.invoice_number)}<br>
    Kasir: ${escapeHtml(cashierName)}<br>
    <hr>
    ${state.cart.map((item) => `
      ${escapeHtml(item.name)}<br>
      ${item.qty} x ${currency.format(item.price)} = ${currency.format(item.qty * item.price)}<br>
    `).join("")}
    <hr>
    Subtotal: ${currency.format(total.subtotal)}<br>
    Diskon: ${currency.format(total.discount)}<br>
    Pajak: ${currency.format(total.tax)}<br>
    <strong>Total: ${currency.format(total.grandTotal)}</strong><br>
    Bayar: ${currency.format(total.paid)}<br>
    Kembali: ${currency.format(total.change)}<br>
    <hr>
    <div style="text-align:center">Terima kasih</div>
  `;
}

async function api(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || "Request gagal.");
  return data;
}

function notify(message, type = "success") {
  els.message.textContent = message;
  els.message.className = `mt-3 rounded-xl px-4 py-3 text-sm ${type === "error" ? "border border-red-400/30 bg-red-500/10 text-red-200" : "border border-cyan-300/30 bg-cyan-500/10 text-cyan-100"}`;
  window.setTimeout(() => els.message.classList.add("hidden"), 2800);
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
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
