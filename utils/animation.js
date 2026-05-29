export function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".fade-in").forEach((node) => observer.observe(node));

  window.addEventListener("scroll", () => {
    const y = window.scrollY * 0.08;
    document.documentElement.style.setProperty("--parallax-y", `${y}px`);
  }, { passive: true });
}

export function initMouseLight() {
  const light = document.querySelector(".mouse-light");
  if (!light) return;

  window.addEventListener("pointermove", (event) => {
    light.style.transform = `translate(${event.clientX - 180}px, ${event.clientY - 180}px)`;
  }, { passive: true });
}

export function hideLoader() {
  const loader = document.querySelector("#loader");
  if (!loader) return;
  window.setTimeout(() => loader.classList.add("loader-hidden"), 450);
}
