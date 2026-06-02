import SectionHeading from "@/components/ui/SectionHeading";
import CategoryCard from "@/components/ui/CategoryCard";
import FadeIn from "@/components/motion/FadeIn";
import { CATEGORIES } from "@/lib/data/categories";

export default function FeaturedCategories() {
  return (
    <section
      id="koleksiyon"
      className="relative py-20 md:py-28 lg:py-32 scroll-mt-24 bg-section-coffee overflow-hidden"
    >
      <div className="container relative flex flex-col gap-14">
        <SectionHeading
          theme="light"
          eyebrow="Koleksiyonlarımız"
          title="Her duyguya bir koleksiyon"
          description="Aşktan zarif jestlere, açılışlardan günün küçük mutluluklarına kadar her ana eşlik eden özenle hazırlanmış koleksiyonlar."
        />

        <div className="grid gap-5 md:gap-6 grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, i) => (
            <FadeIn key={category.slug} delay={(i % 4) * 0.07} y={28} className="h-full">
              <CategoryCard category={category} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
