export async function renderModule(root, renderer, data) {
  const html = await renderer(data);
  root.insertAdjacentHTML("beforeend", html);
}

export function sectionShell(id, eyebrow, title, copy, content, className = "") {
  return `<section id="${id}" class="relative py-20 ${className}">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="fade-in mb-10 max-w-3xl">
        <p class="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">${eyebrow}</p>
        <h2 class="text-3xl font-black text-white sm:text-4xl">${title}</h2>
        <p class="mt-4 text-base leading-8 text-slate-300">${copy}</p>
      </div>
      ${content}
    </div>
  </section>`;
}
