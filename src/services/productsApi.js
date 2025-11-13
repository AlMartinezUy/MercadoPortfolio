import { translateQueryToEn, translateProductsToEs } from '../utils/translator';

export async function fetchProducts({ query = "", limit = 24, skip = 0 } = {}) {
  // ES -> EN para consultar la API externa
  const queryEn = query ? await translateQueryToEn(query) : "";

  const base = "https://dummyjson.com/products";
  const params = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  if (queryEn) params.set("q", queryEn);

  const url = queryEn ? `${base}/search?${params}` : `${base}?${params}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const items = json.products || json || [];
    
    const mapped = items.map((p) => {
      const discountPct = p.discountPercentage ?? p.discount;
      const price = p.price;
      const originalPrice =
        typeof discountPct === "number" ? Math.round(price / (1 - discountPct / 100)) : undefined;

      return {
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        brand: p.brand,
        image: p.thumbnail || (p.images && p.images[0]) || "",
        price,
        originalPrice,
        tags: [p.category, p.brand].filter(Boolean),
        discount: discountPct ? Math.round(discountPct) : undefined,
        _raw: p,
      };
    });

    // EN -> ES para mostrar en la UI
    const translated = await translateProductsToEs(mapped);
    return translated;

  } catch (err) {
    console.error("fetchProducts error:", err);
    return [];
  }
}

