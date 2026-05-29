export function initLazyImages() {
  document.querySelectorAll("img[data-src]").forEach((img) => {
    img.setAttribute("src", img.dataset.src);
    img.removeAttribute("data-src");
  });
}
