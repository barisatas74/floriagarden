import { SITE } from "@/lib/constants";

/**
 * Tüm sayfalarda yer alan kurumsal yapılandırılmış veri.
 * Google Knowledge Graph ve marka panelleri için temel kimlik.
 */
export default function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: "https://floriagarden.com",
    logo: "https://floriagarden.com/icon",
    description: SITE.shortDescription,
    slogan: SITE.tagline,
    sameAs: [SITE.instagram.url],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneDisplay,
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["Turkish"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: SITE.city,
      addressCountry: "TR",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
