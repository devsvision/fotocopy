export function applySeo(settings, company) {
  document.title = settings.siteTitle;
  setMeta("description", settings.metaDescription);
  setMeta("keywords", settings.keywords);
  setMeta("og:title", settings.siteTitle, "property");
  setMeta("og:description", settings.metaDescription, "property");
  setMeta("og:type", "website", "property");

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": company.name,
    "description": settings.metaDescription,
    "address": company.address,
    "telephone": company.phone,
    "areaServed": "Bali, Indonesia",
    "url": window.location.href,
    "sameAs": Object.values(company.socials)
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function setMeta(name, content, attr = "name") {
  let meta = document.querySelector(`meta[${attr}="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}
