import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import ProductShowcase from "@/components/sections/ProductShowcase";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";

// Kategoriler veritabanından okunduğu için dinamik
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedCategories />
      <ProductShowcase />
      <LocalBusinessJsonLd />
    </>
  );
}
