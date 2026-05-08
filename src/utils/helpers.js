export function pickRandom(arr, count) {
  const capped = Math.min(count, arr.length);
  return new Set([...arr].sort(() => Math.random() - 0.5).slice(0, capped));
}

export function normalize(str) {
  return str.trim().toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
}
