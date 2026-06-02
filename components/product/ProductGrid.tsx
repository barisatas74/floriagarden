"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import FadeIn from "@/components/motion/FadeIn";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils/cn";

type SortKey = "default" | "price-asc" | "price-desc" | "name";

type Props = {
  products: Product[];
  /** Üstte ürün sayısı + sıralama */
  showToolbar?: boolean;
};

export default function ProductGrid({ products, showToolbar = true }: Props) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name, "tr"));
      default:
        return list;
    }
  }, [products, sort]);

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Sparkles}
        title="Bu koleksiyon hazırlanıyor"
        description="Bu kategorideki ürünleri özenle hazırlıyoruz. Bu arada diğer koleksiyonlarımıza göz atabilirsiniz."
        primaryCta={{ label: "Tüm Ürünler", href: "/urunler" }}
        secondaryCta={{ label: "İletişim", href: "/iletisim" }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {showToolbar && (
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span className="text-sm text-coffee/65">
            <strong className="text-bordo font-medium">
              {products.length}
            </strong>{" "}
            ürün listeleniyor
          </span>
          <div className="flex items-center gap-2 text-sm">
            <SlidersHorizontal
              size={14}
              strokeWidth={1.6}
              className="text-rose-gold"
              aria-hidden
            />
            <label htmlFor="sort" className="text-coffee/55">
              Sırala:
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-cream/5 border border-rose-gold/20 rounded-full px-4 h-9 text-sm text-coffee focus:outline-none focus:border-rose-gold"
              style={{ colorScheme: "light" }}
            >
              <option value="default">Önerilen</option>
              <option value="price-asc">Fiyat (artan)</option>
              <option value="price-desc">Fiyat (azalan)</option>
              <option value="name">İsim (A-Z)</option>
            </select>
          </div>
        </div>
      )}

      <AnimatePresence mode="popLayout">
        <motion.div
          key={sort}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "grid gap-5 md:gap-6",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          )}
        >
          {sorted.map((product, i) => (
            <FadeIn key={product.id} delay={(i % 8) * 0.04} y={16}>
              <ProductCard product={product} index={i + 1} />
            </FadeIn>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
