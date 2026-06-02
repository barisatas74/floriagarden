import { SITE } from "@/lib/constants";

/**
 * Anasayfaya yerleştirilen LocalBusiness/Florist JSON-LD.
 * Google'da harita, telefon, çalışma saatleri gibi zengin sonuçlar için.
 */
export default function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: SITE.name,
    description: SITE.shortDescription,
    image: "https://floriagarden.com/opengraph-image",
    url: "https://floriagarden.com",
    telephone: `+${SITE.phoneRaw}`,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: SITE.city,
      addressCountry: "TR",
    },
    openingHours: "Mo-Su 09:00-22:00",
    priceRange: "₺₺-₺₺₺",
    sameAs: [SITE.instagram.url],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
