import { APP_CONFIG } from "../config/supabase.js";
import { isSupabaseConfigured, supabase } from "./supabaseClient.js";

const demoProducts = [
  { id: "p1", name: "Canon iR ADV 4525", sku: "FC-4525", barcode: "899100000001", category: "Mesin Fotocopy", price: 24500000, stock: 3 },
  { id: "p2", name: "Ricoh MP 3055", sku: "FC-3055", barcode: "899100000002", category: "Mesin Fotocopy", price: 26000000, stock: 2 },
  { id: "p3", name: "Toner NPG-67", sku: "TON-NPG67", barcode: "899100000003", category: "Sparepart", price: 275000, stock: 24 },
  { id: "p4", name: "Kertas HVS A4 80gsm", sku: "ATK-HVS-A4", barcode: "899100000004", category: "ATK", price: 62000, stock: 50 },
  { id: "p5", name: "Mesin Laminating A3", sku: "LAM-A3", barcode: "899100000005", category: "Alat Printing", price: 950000, stock: 6 }
];

export async function listProducts({ storeId = APP_CONFIG.defaultStoreId, query = "", category = "" } = {}) {
  if (!isSupabaseConfigured()) {
    const needle = query.toLowerCase();
    return demoProducts.filter((item) =>
      (!category || item.category === category) &&
      [item.name, item.sku, item.barcode].join(" ").toLowerCase().includes(needle)
    );
  }

  let request = supabase
    .from("products")
    .select("*, categories(name)")
    .eq("store_id", storeId)
    .eq("is_active", true)
    .order("name");

  if (query) request = request.or(`name.ilike.%${query}%,sku.ilike.%${query}%,barcode.ilike.%${query}%`);
  const { data, error } = await request;
  if (error) throw error;
  return data.map((item) => ({
    ...item,
    category: item.categories?.name || "Produk",
    price: Number(item.selling_price || 0)
  }));
}

export async function createTransaction(payload) {
  if (!isSupabaseConfigured()) {
    return {
      id: crypto.randomUUID(),
      invoice_number: `DEMO-${Date.now()}`,
      ...payload
    };
  }

  const { data, error } = await supabase.rpc("create_pos_transaction", payload);
  if (error) throw error;
  return data;
}

export async function getDashboardStats(storeId = APP_CONFIG.defaultStoreId) {
  if (!isSupabaseConfigured()) {
    return {
      salesToday: 12850000,
      transactions: 18,
      products: demoProducts.length,
      lowStock: 3,
      stores: 2
    };
  }

  const { data, error } = await supabase.rpc("dashboard_stats", { target_store_id: storeId });
  if (error) throw error;
  return data;
}

export function demoProductCategories() {
  return ["Semua", ...new Set(demoProducts.map((item) => item.category))];
}
