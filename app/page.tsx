import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";

export default function HomePage() {
  return (
    <>
      {/* Anasayfa şimdilik boş — kendi tasarımın için hazır.
          Eski bölümler components/sections/ altında duruyor:
          Hero, TrustStrip, FeaturedCategories, FlowersAndCoffee,
          InstagramGallery, AboutSection, ContactSection */}
      <div className="min-h-[60vh]" />

      <LocalBusinessJsonLd />
    </>
  );
}
