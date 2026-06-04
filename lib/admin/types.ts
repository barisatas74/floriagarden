/**
 * Admin panel veri tipleri.
 *
 * Bu tipler hem demo (localStorage) hem de ileride gerçek veritabanı
 * için ortak sözleşmedir. Veritabanına geçerken yalnızca lib/admin/store.ts
 * içindeki okuma/yazma fonksiyonları değişir — bu tipler ve sayfalar aynı kalır.
 */

export type AdminCategory = {
  slug: string;
  name: string;
  description: string;
  /** Görsel yer tutucu gradient (foto yokken kullanılır) */
  gradient: string;
  /** Yüklenen görsel (WebP data URL) — varsa gradient yerine kullanılır */
  image?: string;
};

export type StockState = "var" | "az" | "tukendi";

export type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  price: number;
  /** Kategori slug'ı */
  category: string;
  stock: StockState;
  /** Opsiyonel rozet: "Yeni", "Çok Satan" vb. */
  badge?: string;
  /** Görsel yer tutucu gradient (foto yokken kullanılır) */
  gradient: string;
  /** Yüklenen görsel (WebP data URL) — varsa gradient yerine kullanılır */
  image?: string;
};

/** Üyeye özel üretilen kod — hem indirim hem takip için */
export type MemberCode = {
  /** Benzersiz takip + kupon kodu, örn. FG-AY-3F9K */
  code: string;
  /** İndirim türü */
  discountType: "percent" | "fixed";
  /** Yüzde için 0–100, sabit için ₺ tutarı */
  discountValue: number;
  /** Oluşturulma tarihi (ISO) */
  createdAt: string;
  /** Admin notu (opsiyonel) */
  note?: string;
};

/** Tüm üyelerin kullanabileceği genel (kampanya) kod */
export type GeneralCode = {
  /** Kupon kodu, örn. BAHAR15 */
  code: string;
  discountType: "percent" | "fixed";
  /** Yüzde için 0–100, sabit için ₺ tutarı */
  discountValue: number;
  /** Oluşturulma tarihi (ISO) */
  createdAt: string;
  /** Açıklama / kampanya notu (opsiyonel) */
  note?: string;
};

export type Member = {
  id: string;
  name: string;
  phone: string;
  email: string;
  /** Doğum tarihi (ISO yyyy-mm-dd, opsiyonel) */
  birthDate?: string;
  /** Üyelik tarihi (ISO) */
  joinedAt: string;
  /** Bu üyeye üretilmiş özel kodlar */
  codes: MemberCode[];
};

/** Teslimat bölgesi (süre + ücret) */
export type DeliveryZone = {
  id: string;
  name: string;
  /** Tahmini süre, örn. "60 — 120 dk" */
  eta: string;
  /** Ücret metni, örn. "Ücretsiz" veya "75 ₺" */
  fee: string;
  /** Alt açıklama, örn. "100 ₺ üzeri siparişlerde" */
  note: string;
};

/** Teslimat süreci adımı */
export type DeliveryStep = {
  id: string;
  /** İkon anahtarı (lib/admin/deliveryIcons) */
  icon: string;
  title: string;
  text: string;
};

/** localStorage'da tutulan tüm admin verisi */
export type AdminData = {
  categories: AdminCategory[];
  products: AdminProduct[];
  members: Member[];
  /** Tüm üyelerin kullanabileceği genel kodlar */
  generalCodes: GeneralCode[];
  /** Teslimat bölgeleri ve fiyatları */
  deliveryZones: DeliveryZone[];
  /** Teslimat süreci adımları */
  deliveryProcess: DeliveryStep[];
};
