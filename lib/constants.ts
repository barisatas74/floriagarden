export const SITE = {
  name: "Floria Garden",
  tagline: "Flowers and Coffee",
  shortDescription: "Gemlik'in yeni nesil butik çiçekçisi",
  city: "Gemlik",
  email: "merhaba@floriagarden.com",
  phoneDisplay: "+90 545 000 00 00",
  phoneRaw: "905450000000",
  address: "Hamidiye Mah. Çiçek Sokak No: 12, Gemlik / Bursa",
  hours: "Her gün 09:00 — 22:00",
  instagram: {
    handle: "@floriagarden_",
    url: "https://www.instagram.com/floriagarden_/",
  },
} as const;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Merhaba Floria Garden, ürünleriniz hakkında bilgi almak istiyorum.";

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.phoneRaw}?text=${encoded}`;
}
