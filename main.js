import { hero } from "./modules/hero.js";
import { initNavbar, navbar } from "./modules/navbar.js";
import { about, businessPackage, ctaContactFooter, galleryTestimonialsFaq, productSection, services } from "./modules/sections.js";
import { mount } from "./utils/dom.js";

mount("#app", `
  ${navbar()}
  <main>
    ${hero()}
    ${about()}
    ${productSection()}
    ${businessPackage()}
    ${services()}
    ${galleryTestimonialsFaq()}
    ${ctaContactFooter()}
  </main>
`);

initNavbar();
