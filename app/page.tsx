import Hero from "@/components/sections/Hero";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";

// Kategoriler veritabanından okunduğu için dinamik
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <LocalBusinessJsonLd />
    </>
  );
}
