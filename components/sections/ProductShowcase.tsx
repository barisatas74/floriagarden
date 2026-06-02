import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import FadeIn from "@/components/motion/FadeIn";
import { PRODUCTS } from "@/lib/data/products";

export default function ProductShowcase() {
  return (
    <section
      id="urunler"
      className="relative py-20 md:py-28 lg:py-32 scroll-mt-24 bg-section-wine overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-gold/35 to-transparent"
      />

      <div className="container relative flex flex-col gap-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading
            align="left"
            eyebrow="Öne Çıkan Ürünler"
            title="Sevilerek seçilen tasarımlar"
            description="Floria Garden çiçek şefinin günün en taze çiçekleriyle hazırladığı imza ürünler."
            className="md:max-w-2xl"
          />
          <FadeIn delay={0.1}>
            <Link
              href="/urunler"
              className="group inline-flex items-center gap-2 text-sm tracking-wide text-rose-goldLight hover:text-cream transition-colors"
            >
              <span>Tümünü görüntüle</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-gold/30 group-hover:border-rose-gold group-hover:bg-rose-gold group-hover:text-coffee transition-all duration-300">
                <ArrowRight size={14} strokeWidth={1.7} />
              </span>
            </Link>
          </FadeIn>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <FadeIn key={product.id} delay={(i % 4) * 0.06} y={28}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
