"use client";

import { Heart } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductCard from "@/components/ui/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import FadeIn from "@/components/motion/FadeIn";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { useCatalog } from "@/lib/catalog-client";

export default function FavoritesPage() {
  const { ids } = useWishlist();
  const { products: all } = useCatalog();
  const products = all.filter((p) => ids.includes(p.id));

  return (
    <article className="pt-24 md:pt-28 pb-20 md:pb-28">
      <div className="container">
        <Breadcrumb items={[{ label: "Favorilerim" }]} className="mb-10" />

        <header className="flex flex-col items-start gap-3 mb-12">
          <FadeIn className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-gold-gradient text-coffee">
              <Heart size={18} strokeWidth={1.7} />
            </span>
            <span className="eyebrow">Favorilerim</span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="heading-display">
              Beğendikleriniz <span className="text-rose-gold">.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-coffee/70 max-w-xl">
              Daha sonra dönmek istediğiniz çiçekleri burada saklayın.
              Favorileriniz cihazınıza özeldir, kayıt gerektirmez.
            </p>
          </FadeIn>
        </header>

        {products.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Henüz favori eklemediniz"
            description="Ürün kartlarındaki kalp ikonuna basarak beğendiklerinizi burada toplayabilirsiniz."
            primaryCta={{ label: "Ürünleri Keşfet", href: "/urunler" }}
            secondaryCta={{ label: "İletişim", href: "/iletisim" }}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, i) => (
              <FadeIn key={p.id} delay={(i % 8) * 0.04}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
