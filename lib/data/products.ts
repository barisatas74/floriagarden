/**
 * Bir görselin ürün kartı içinde nasıl konumlanacağı (masaüstü + mobil ayrı).
 * x/y: object-position yüzdesi (0–100, varsayılan 50 = ortalı).
 * zoom: 1–3 arası ölçek (varsayılan 1).
 * imageSettings dizisi, images dizisiyle index hizalıdır.
 */
export type ImageSetting = {
  dx: number;
  dy: number;
  dz: number;
  mx: number;
  my: number;
  mz: number;
};

export const DEFAULT_IMAGE_SETTING: ImageSetting = {
  dx: 50,
  dy: 50,
  dz: 1,
  mx: 50,
  my: 50,
  mz: 1,
};

/**
 * Kart görselinde kullanılacak CSS değişkenleri. globals.css'teki
 * `.product-card-img` kuralı bunları responsive uygular (mobil/masaüstü).
 * Ayar yoksa varsayılan (ortalı, zoom 1) döner.
 */
export function imageSettingVars(
  s?: Partial<ImageSetting> | null,
): Record<string, string | number> {
  const v = { ...DEFAULT_IMAGE_SETTING, ...(s ?? {}) };
  return {
    "--mx": `${v.mx}%`,
    "--my": `${v.my}%`,
    "--mz": v.mz,
    "--dx": `${v.dx}%`,
    "--dy": `${v.dy}%`,
    "--dz": v.dz,
  };
}

export type Product = {
  id: string;
  /** URL slug — id ile aynı olabilir */
  slug: string;
  name: string;
  shortDescription: string;
  /** Ürün detay sayfasında genişletilmiş açıklama */
  longDescription: string;
  /** İçerdiği çiçekler / bileşenler */
  contents: string[];
  /** Bakım notları */
  careTips: string[];
  price: number;
  category: string;
  /** Hex etiket (badge) örn: "Yeni", "Çok Satan" */
  badge?: string;
  /** Görsel yer tutucu için gradient (foto yoksa kullanılır) */
  gradient: string;
  /** Yüklenen gerçek görsel (WebP data URL veya URL) */
  image?: string;
  /** Ürün galerisindeki gerçek görseller. İlk görsel ana görsel olarak kullanılır. */
  images?: string[];
  /** Görsel konum/zoom ayarları (images ile index hizalı). */
  imageSettings?: ImageSetting[];
  /** Galeride birden fazla "görsel" simülasyonu için ek gradientler */
  galleryGradients?: string[];
  /** Bu ürünle iyi giden ürün ID'leri */
  pairings?: string[];
  /** Boyut / ölçüler */
  dimensions?: string;
  /** Stok durumu */
  stock?: "var" | "az" | "tukendi";
};

export const PRODUCTS: Product[] = [];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.category === categorySlug);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return [];
  // Önce pairings, sonra aynı kategoriden, sonra random doldur
  const paired = (product.pairings ?? [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== productId,
  );
  const merged = [...paired, ...sameCategory].filter(
    (p, idx, arr) => arr.findIndex((x) => x.id === p.id) === idx,
  );
  return merged.slice(0, limit);
}
