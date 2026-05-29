import { loadSiteData } from "./utils/fetchData.js";
import { applySeo } from "./utils/seo.js";
import { initAnimations, initMouseLight, hideLoader } from "./utils/animation.js";
import { initLazyImages } from "./utils/lazyload.js";
import { navbar, initNavbar } from "./modules/navbar.js";
import { hero } from "./modules/hero.js";
import { about } from "./modules/about.js";
import { categories } from "./modules/categories.js";
import { services } from "./modules/services.js";
import { featuredProducts } from "./modules/featured-products.js";
import { businessPackage } from "./modules/business-package.js";
import { gallery } from "./modules/gallery.js";
import { testimonials } from "./modules/testimonials.js";
import { faq } from "./modules/faq.js";
import { cta } from "./modules/cta.js";
import { contact } from "./modules/contact.js";
import { footer } from "./modules/footer.js";

const app = document.querySelector("#app");

async function boot() {
  try {
    const data = await loadSiteData();
    applySeo(data.settings, data.company);

    app.innerHTML = [
      navbar(data),
      hero(data),
      about(data),
      categories(data),
      services(data),
      featuredProducts(data),
      businessPackage(data),
      gallery(data),
      testimonials(data),
      faq(data),
      cta(data),
      contact(data),
      footer(data)
    ].join("");

    initNavbar();
    initAnimations();
    initMouseLight();
    initLazyImages();
    hideLoader();
  } catch (error) {
    console.error(error);
    app.innerHTML = `<main class="grid min-h-screen place-items-center px-4 text-center">
      <div class="glass max-w-xl rounded-3xl p-8">
        <h1 class="text-2xl font-black text-white">Website belum bisa dimuat</h1>
        <p class="mt-3 text-slate-300">Pastikan project dijalankan melalui local server VS Code, bukan dibuka langsung sebagai file.</p>
      </div>
    </main>`;
    hideLoader();
  }
}

boot();
