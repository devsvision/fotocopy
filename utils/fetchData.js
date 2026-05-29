const cache = new Map();

export async function fetchJson(path) {
  if (cache.has(path)) return cache.get(path);
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Gagal memuat ${path}`);
  const data = await response.json();
  cache.set(path, data);
  return data;
}

export async function loadSiteData() {
  const adminData = localStorage.getItem("bct_admin_data");
  if (adminData) return JSON.parse(adminData);

  const [company, settings, categories, products, services, gallery, testimonials, faq] = await Promise.all([
    fetchJson("data/company.json"),
    fetchJson("data/settings.json"),
    fetchJson("data/categories.json"),
    fetchJson("data/products.json"),
    fetchJson("data/services.json"),
    fetchJson("data/gallery.json"),
    fetchJson("data/testimonials.json"),
    fetchJson("data/faq.json")
  ]);

  return { company, settings, categories, products, services, gallery, testimonials, faq };
}
