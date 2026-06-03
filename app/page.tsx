import Hero from "@/components/sections/Hero";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <LocalBusinessJsonLd />
    </>
  );
}
