import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGrid from "@/components/product/ProductGrid";
import { getPublicProducts, getPublicCategories } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Tüm Ürünler",
  description:
    "Floria Garden'ın premium çiçek koleksiyonu — buketler, kutuda çiçekler, saksı çiçekleri, özel gün düzenlemeleri ve daha fazlası.",
};

// Veritabanından canlı okunur
export const dynamic = "force-dynamic";

export default async function AllProductsPage() {
  const [products, categories] = await Promise.all([
    getPublicProducts(),
    getPublicCategories(),
  ]);

  return (
    <article className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container">
        <Breadcrumb items={[{ label: "Tüm Ürünler" }]} className="mb-8" />

        <header className="flex flex-col items-start gap-4 mb-12 max-w-3xl">
          <span className="eyebrow">Koleksiyon</span>
          <h1 className="heading-display">
            Tüm Çiçekler
            <span className="text-rose-gold">.</span>
          </h1>
          <p className="text-coffee/70 leading-relaxed">
            Floria Garden atölyesinden çıkan tüm imza tasarımlar. Bir ürünü
            seçmek için kategoriden başlayabilir veya doğrudan keşfedebilirsiniz.
          </p>
        </header>

        {/* Kategori chip filtreleri */}
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="inline-flex items-center rounded-full bg-rose-gold-gradient text-coffee px-4 h-9 text-xs font-medium tracking-wide">
            Tümü
          </span>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/koleksiyon/${c.slug}`}
              className="inline-flex items-center rounded-full border border-rose-gold/25 bg-cream/5 text-coffee/75 hover:text-coffee hover:border-rose-gold px-4 h-9 text-xs tracking-wide transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>

        <ProductGrid products={products} />
      </div>
    </article>
  );
}
