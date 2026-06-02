"use client";

import { useRecentlyViewed } from "@/lib/hooks/useRecentlyViewed";
import ProductCard from "@/components/ui/ProductCard";
import FadeIn from "@/components/motion/FadeIn";
import { PRODUCTS } from "@/lib/data/products";

type Props = {
  /** Bu ID hariç tutulur — ürün detay sayfasında "mevcut" ürünü göstermemek için */
  excludeId?: string;
  title?: string;
  limit?: number;
};

export default function RecentlyViewed({
  excludeId,
  title = "Son baktıklarınız",
  limit = 4,
}: Props) {
  const { ids } = useRecentlyViewed();

  const products = ids
    .filter((id) => id !== excludeId)
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p))
    .slice(0, limit);

  if (products.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-rose-gold/15">
      <FadeIn className="mb-8">
        <span className="eyebrow">Tekrar bakmak ister misiniz?</span>
        <h2 className="heading-section mt-3">{title}</h2>
      </FadeIn>

      {/* Mobil: yatay scroll · sm+: grid */}
      <div className="sm:hidden -mx-5 px-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex gap-4 w-max">
          {products.map((p) => (
            <li key={p.id} className="w-64 flex-shrink-0">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden sm:grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.05}>
            <ProductCard product={p} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
