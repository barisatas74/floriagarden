import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import FadeIn from "@/components/motion/FadeIn";
import { getRelatedProducts } from "@/lib/data/products";

type Props = {
  productId: string;
};

export default function RelatedProducts({ productId }: Props) {
  const products = getRelatedProducts(productId, 4);
  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-20 border-t border-rose-gold/15">
      <div className="container flex flex-col gap-10">
        <SectionHeading
          align="left"
          eyebrow="Birlikte İyi Gider"
          title="Bunlara da göz atın"
          description="Birlikte sıkça tercih edilen ürünlerimiz."
          className="md:max-w-2xl"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={(i % 4) * 0.06} y={20}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
