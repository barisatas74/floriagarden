import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Floria Garden — Yeni Nesil Çiçekçi",
    short_name: "Floria Garden",
    description:
      "Floria Garden, Gemlik'in butik çiçekçisi. Premium buketler, kutuda çiçekler, hediyelik ürünler ve özenli aynı gün teslimat.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#5F1228",
    theme_color: "#5F1228",
    lang: "tr-TR",
    categories: ["shopping", "lifestyle"],
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Ürünleri Keşfet",
        url: "/urunler",
        description: "Tüm koleksiyonu görüntüle",
      },
      {
        name: "Sepet",
        url: "/sepet",
        description: "Sepetini görüntüle",
      },
    ],
  };
}
