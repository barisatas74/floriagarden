export type Category = {
  slug: string;
  name: string;
  description: string;
  /** Tailwind background gradient classes used as image placeholder */
  gradient: string;
  /** Decorative accent for the card */
  accent: "bordo" | "rose" | "sage" | "coffee";
};

export const CATEGORIES: Category[] = [
  {
    slug: "buketler",
    name: "Buketler",
    description: "El yapımı, mevsim çiçekleriyle hazırlanan zarif buketler.",
    gradient: "from-bordo-400 via-bordo-600 to-bordo-800",
    accent: "bordo",
  },
  {
    slug: "kutuda-cicekler",
    name: "Kutuda Çiçekler",
    description: "Premium kadife kutularda uzun ömürlü düzenlemeler.",
    gradient: "from-rose-gold via-bordo-400 to-bordo-700",
    accent: "rose",
  },
  {
    slug: "saksi-cicekleri",
    name: "Saksı Çiçekleri",
    description: "Eviniz ve ofisiniz için canlı, bakımlı saksı çiçekleri.",
    gradient: "from-rose-goldLight via-rose-gold to-rose-goldDark",
    accent: "rose",
  },
  {
    slug: "ozel-gun-cicekleri",
    name: "Özel Gün Çiçekleri",
    description: "Yıldönümü, doğum günü ve sevdikleriniz için kişisel dokunuş.",
    gradient: "from-bordo-300 via-bordo-500 to-bordo-700",
    accent: "rose",
  },
  {
    slug: "acilis-ve-organizasyon",
    name: "Açılış ve Organizasyon",
    description: "Açılış çelenkleri ve kurumsal etkinlikler için özel tasarımlar.",
    gradient: "from-bordo-500 via-bordo-700 to-coffee",
    accent: "bordo",
  },
  {
    slug: "hediyelik-urunler",
    name: "Hediyelik Ürünler",
    description: "Çikolata, mum, parfüm ve seçkin hediyelikler.",
    gradient: "from-rose-goldLight via-rose-gold to-bordo-400",
    accent: "rose",
  },
  {
    slug: "kahve-ve-cicek-setleri",
    name: "Kahve ve Çiçek Setleri",
    description: "İmza koleksiyonumuz: özenle seçilmiş kahve ve çiçek ikilisi.",
    gradient: "from-coffee-soft via-coffee to-bordo-700",
    accent: "coffee",
  },
];
