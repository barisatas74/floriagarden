export const SITE = {
  name: "Floria Garden",
  tagline: "Flowers and Coffee",
  shortDescription: "Gemlik'in yeni nesil butik çiçekçisi",
  city: "Gemlik",
  // TODO: gerçek işletme e-postası gelince güncellenecek
  email: "merhaba@floriagarden.com",
  phoneDisplay: "+90 541 623 98 16",
  phoneRaw: "905416239816",
  address:
    "Demirsubaşı Mah. Şehit Gökhan Aydınlı Sk. No: 9 İç Kapı: A, Gemlik / Bursa",
  // TODO: gerçek çalışma saatleri gelince güncellenecek
  hours: "Her gün 09:00 — 22:00",
  instagram: {
    handle: "@floriagarden_",
    url: "https://www.instagram.com/floriagarden_/",
  },
  // Yasal bilgiler (şahıs işletmesi). TC kimlik no gizli tutulur, siteye konmaz.
  legal: {
    owner: "Müge Eker",
    taxOffice: "Gemlik Vergi Dairesi",
    taxNo: "4180532808",
  },
} as const;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Merhaba Floria Garden, ürünleriniz hakkında bilgi almak istiyorum.";

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.phoneRaw}?text=${encoded}`;
}
