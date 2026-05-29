export function mount(selector, html) {
  const target = document.querySelector(selector);
  if (target) target.innerHTML = html;
  return target;
}

export function on(selector, event, handler) {
  document.querySelector(selector)?.addEventListener(event, handler);
}

export function debounce(fn, delay = 250) {
  let timer;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
}
