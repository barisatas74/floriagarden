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
  /** Görsel yer tutucu için gradient (gerçek fotoğraf gelene kadar) */
  gradient: string;
  /** Galeride birden fazla "görsel" simülasyonu için ek gradientler */
  galleryGradients?: string[];
  /** Bu ürünle iyi giden ürün ID'leri */
  pairings?: string[];
  /** Boyut / ölçüler */
  dimensions?: string;
  /** Stok durumu */
  stock?: "var" | "az" | "tukendi";
};

export const PRODUCTS: Product[] = [
  {
    id: "bordo-ask-buketi",
    slug: "bordo-ask-buketi",
    name: "Bordo Aşk Buketi",
    shortDescription: "21 adet bordo gül, el yapımı kadife ambalaj.",
    longDescription:
      "Aşkın en yoğun rengiyle hazırlanan imza buketimiz. 21 adet ithal bordo gül, kadife ambalaj ve rose gold şerit detayıyla taçlandırılır. Atölyemizde her bir gül tek tek seçilir, sabah erken saatlerden sonra ilk teslimatlara hazır hâle gelir.",
    contents: [
      "21 adet ithal bordo gül",
      "Premium kadife ambalaj",
      "Rose gold satin şerit",
      "El yazısı kart",
    ],
    careTips: [
      "Direkt güneş ışığından uzak tutun.",
      "Suyu 2 günde bir değiştirin.",
      "Vazoya yerleştirirken sap uçlarını eğik kesin.",
    ],
    price: 1450,
    category: "buketler",
    gradient: "from-bordo-400 via-bordo-600 to-bordo-700",
    galleryGradients: [
      "from-bordo-300 via-bordo-500 to-bordo-700",
      "from-bordo-500 via-bordo-700 to-wine",
      "from-bordo-400 via-bordo-600 to-coffee",
    ],
    pairings: ["kadife-kutuda-guller", "kahve-cicek-seti"],
    dimensions: "Yükseklik ~55 cm · Çap ~35 cm",
    stock: "var",
    badge: "Yeni",
  },
  {
    id: "kadife-kutuda-guller",
    slug: "kadife-kutuda-guller",
    name: "Kadife Kutuda Güller",
    shortDescription: "Şampanya rengi premium kutuda, 25 ithal gül.",
    longDescription:
      "El yapımı kadife kutuda, mum yastık üzerine özenle yerleştirilmiş 25 adet ithal gül. Şampanya rengi kutu, hediye eden kişinin zarafetini yansıtır. Saklama koşullarında 7-10 gün taze kalır.",
    contents: [
      "25 adet ithal şampanya gül",
      "El yapımı kadife kutu",
      "Rose gold monogram",
      "Hediye kartı dahil",
    ],
    careTips: [
      "Oda sıcaklığında, nemden uzak saklayın.",
      "Kutuyu kapağı kapalı tutmayın.",
    ],
    price: 1890,
    category: "kutuda-cicekler",
    gradient: "from-rose-goldLight via-rose-gold to-bordo-500",
    galleryGradients: [
      "from-rose-gold via-bordo-400 to-bordo-700",
      "from-cream-deep via-rose-goldLight to-rose-gold",
    ],
    pairings: ["bordo-ask-buketi", "yildonumu-ozel"],
    dimensions: "30 × 30 × 22 cm",
    stock: "az",
    badge: "Çok Satan",
  },
  {
    id: "yesil-huzur-saksisi",
    slug: "yesil-huzur-saksisi",
    name: "Yeşil Huzur Saksısı",
    shortDescription: "Seramik saksıda bakımı kolay, ferah yeşillik.",
    longDescription:
      "Bakımı düşük, ışık ihtiyacı az yeşillikler ile ofis ve evlere uygun saksı düzenlemesi. Mat seramik saksı, modern iç mekânlarla zarif bir kontrast yaratır.",
    contents: [
      "Karışık tropik yeşillikler",
      "Mat seramik saksı",
      "Doğal saman toprak örtüsü",
    ],
    careTips: [
      "Haftada bir defa su verin.",
      "Doğrudan kalorifer yakınında bulundurmayın.",
    ],
    price: 690,
    category: "saksi-cicekleri",
    gradient: "from-sage-soft via-sage to-sage-deep",
    pairings: ["lux-orkide"],
    dimensions: "Yükseklik ~40 cm",
    stock: "var",
  },
  {
    id: "mevsim-buketi",
    slug: "mevsim-buketi",
    name: "Mevsim Buketi",
    shortDescription: "Şefimizin günün çiçekleriyle hazırladığı zarif sürpriz.",
    longDescription:
      "Her gün atölyemize gelen en taze çiçeklerle, çiçek şefimizin o günkü ilhamına göre hazırladığı tek-bir-örnek buket. Hiçbiri diğerine benzemez.",
    contents: [
      "Şefin günün seçimi çiçekler",
      "Doğal kraft ambalaj",
      "El yazısı kart",
    ],
    careTips: [
      "Vazoya yerleştirmeden önce sap uçlarını kesin.",
      "Suyu temiz tutun.",
    ],
    price: 1190,
    category: "buketler",
    gradient: "from-bordo-300 via-bordo-500 to-bordo-700",
    pairings: ["kahve-cicek-seti"],
    stock: "var",
  },
  {
    id: "kahve-cicek-seti",
    slug: "kahve-cicek-seti",
    name: "Kahve & Çiçek Seti",
    shortDescription: "Özel kavrum kahve ve mini buket bir arada.",
    longDescription:
      "Floria Garden imzası: özenle seçilmiş butik kavrum kahve ile mini bir çiçek aranjmanı tek bir hediye kutusunda. Yıldönümleri, sabah sürprizleri ve sevdiklerinize küçük dokunuşlar için ideal.",
    contents: [
      "250g özel kavrum çekirdek kahve",
      "Mini mevsim buketi",
      "Floria Garden ambalaj",
      "Hediye kartı",
    ],
    careTips: [
      "Kahveyi serin ve karanlık yerde saklayın.",
      "Çiçeği vazoya yerleştirin.",
    ],
    price: 950,
    category: "kahve-ve-cicek-setleri",
    gradient: "from-coffee-soft via-coffee to-bordo-700",
    pairings: ["bordo-ask-buketi", "mevsim-buketi"],
    stock: "var",
    badge: "İmza Set",
  },
  {
    id: "lux-orkide",
    slug: "lux-orkide",
    name: "Lüks Orkide",
    shortDescription: "Beyaz phalaenopsis, mermer desenli seramik kapta.",
    longDescription:
      "Uzun ömürlü, premium beyaz phalaenopsis orkide. Mermer desenli seramik kabıyla minimalist iç mekânlara yakışır. Doğru bakımla 8-12 hafta çiçek açar.",
    contents: [
      "Çift dallı beyaz phalaenopsis orkide",
      "Mermer desenli seramik kap",
      "Bakım rehberi kartı",
    ],
    careTips: [
      "Haftada 1 defa, alt tepside su.",
      "Parlak ama direkt güneş almayan ortam.",
    ],
    price: 1750,
    category: "saksi-cicekleri",
    gradient: "from-cream-deep via-rose-goldLight to-rose-gold",
    pairings: ["yesil-huzur-saksisi"],
    dimensions: "Yükseklik ~60 cm",
    stock: "az",
  },
  {
    id: "yildonumu-ozel",
    slug: "yildonumu-ozel",
    name: "Yıldönümü Özel",
    shortDescription: "Bordo güller, çikolata ve el yazısı kart bir arada.",
    longDescription:
      "Yıldönümü kutlamalarınız için tasarlanmış, her detayı düşünülmüş premium set. Bordo güllerin yanına butik çikolata, parfümlü mum ve el yazısı kart eşlik eder.",
    contents: [
      "15 adet bordo gül",
      "Butik çikolata kutusu",
      "Parfümlü soy mum",
      "El yazısı kart",
    ],
    careTips: [
      "Çiçekleri direkt güneşten uzak tutun.",
      "Mumu yanıcı maddelerden uzak yakın.",
    ],
    price: 2150,
    category: "ozel-gun-cicekleri",
    gradient: "from-bordo-500 via-bordo-700 to-coffee",
    pairings: ["bordo-ask-buketi", "kadife-kutuda-guller"],
    stock: "var",
    badge: "Hediye Seti",
  },
  {
    id: "altin-detay-buket",
    slug: "altin-detay-buket",
    name: "Altın Detay Buket",
    shortDescription: "Pudra güller ve rose gold yaprak detayları.",
    longDescription:
      "Pudra renginde gül seçkisi, dekoratif rose gold metal yapraklarla zenginleştirilmiş özel tasarım. Düğün, nişan ve özel kutlamalar için ideal.",
    contents: [
      "18 adet pudra gül",
      "Rose gold metal yaprak detayları",
      "İpek şerit",
    ],
    careTips: ["Vazoya hemen yerleştirin.", "Suyu temiz tutun."],
    price: 1390,
    category: "buketler",
    gradient: "from-rose-goldLight via-rose-gold to-rose-goldDark",
    pairings: ["yildonumu-ozel"],
    stock: "var",
  },
];

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
