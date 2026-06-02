import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/sepet", "/api/", "/favoriler"],
    },
    sitemap: "https://floriagarden.com/sitemap.xml",
  };
}
