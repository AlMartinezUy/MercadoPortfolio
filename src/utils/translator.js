
const MEM = new Map();
const SEP = "\n<<<__SEP__>>>\n";

function getLS(key) {
  try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; }
}
function setLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function cacheGet(key) {
  if (MEM.has(key)) return MEM.get(key);
  const v = getLS(key);
  if (v != null) { MEM.set(key, v); return v; }
  return null;
}
function cacheSet(key, val) { MEM.set(key, val); setLS(key, val); }


async function viaMyMemory(text, to = "es", from = "en") {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(from)}|${encodeURIComponent(to)}`;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const j = await r.json();
    return j?.responseData?.translatedText || text;
  } catch {
    return text; 
  }
}

// Traduce un texto con cache
async function translateOne(text, to = "es", from = "en") {
  const safe = String(text ?? "");
  const key = `mm:${from}|${to}:${safe}`;
  const hit = cacheGet(key);
  if (hit != null) return hit;
  const out = await viaMyMemory(safe, to, from);
  cacheSet(key, out);
  return out;
}

// Para query del usuario (generalmente viene en ES)
export const translateQueryToEn = (q) => translateOne(q || "", "en", "es");

// Para textos de productos (en EN -> ES)
export const translateToEs = (s) => translateOne(s || "", "es", "en");

// Batch “ligero” con deduplicacion.
async function translateBatch(texts, to = "es", from = "en") {
  const arr = texts.map((t) => String(t ?? ""));
  const unique = [...new Set(arr)];
  const results = {};
  await Promise.all(
    unique.map(async (u) => { results[u] = await translateOne(u, to, from); })
  );
  return arr.map((t) => results[t]);
}

const INCLUDE_DESC = false;

export async function translateProductsToEs(items) {
  if (!Array.isArray(items) || items.length === 0) return items || [];

  const titles = items.map(p => String(p?.title ?? ""));
  const cats   = items.map(p => String(p?.category ?? ""));

  const [titlesEs, catsEs] = await Promise.all([
    translateBatch(titles, "es", "en"),
    translateBatch(cats,   "es", "en"),
  ]);

  const out = items.map((p, i) => ({
    ...p,
    title: titlesEs[i],
    category: catsEs[i],
  }));

  if (INCLUDE_DESC) {
    const descs = items.map(p => String(p?.description ?? ""));
    const descsEs = await translateBatch(descs, "es", "en");
    for (let i = 0; i < out.length; i++) out[i].description = descsEs[i];
  }

  return out;
}
