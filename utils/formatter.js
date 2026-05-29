export function byId(items, id) {
  return items.find((item) => item.id === id);
}

export function stars(rating = 5) {
  return Array.from({ length: 5 }, (_, index) => index < rating ? "★" : "☆").join("");
}

export function imageFallback(url) {
  return url || "https://images.unsplash.com/photo-1581093458791-9d42cc0301da?auto=format&fit=crop&w=900&q=80";
}
