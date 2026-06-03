"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowRight, Flower2, LayoutGrid, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";
import { CATEGORIES } from "@/lib/data/categories";
import { formatPrice } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

type StaticPage = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
};

const STATIC_PAGES: StaticPage[] = [
  { title: "Tüm Ürünler", description: "Koleksiyonun tamamı", href: "/urunler", keywords: ["ürün", "tümü", "koleksiyon"] },
  { title: "Hakkımızda", description: "Floria Garden hikâyesi", href: "/hakkimizda", keywords: ["hakkımızda", "marka", "biz"] },
  { title: "İletişim", description: "Bize ulaşın", href: "/iletisim", keywords: ["iletişim", "telefon", "adres"] },
  { title: "SSS", description: "Sıkça sorulan sorular", href: "/sss", keywords: ["sss", "soru", "yardım"] },
  { title: "Teslimat", description: "Teslimat bölgeleri ve süreleri", href: "/teslimat", keywords: ["teslimat", "kargo", "kurye"] },
  { title: "Favorilerim", description: "Beğendiğim ürünler", href: "/favoriler", keywords: ["favori", "beğen", "kalp"] },
  { title: "Sepetim", description: "Sepetimi görüntüle", href: "/sepet", keywords: ["sepet", "cart"] },
];

type Result =
  | { kind: "product"; id: string; title: string; subtitle: string; price?: string; href: string }
  | { kind: "category"; id: string; title: string; subtitle: string; href: string }
  | { kind: "page"; id: string; title: string; subtitle: string; href: string };

const normalize = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

function searchAll(query: string): Result[] {
  const q = normalize(query.trim());
  if (!q) return [];

  const out: Result[] = [];

  PRODUCTS.forEach((p) => {
    const haystack = normalize(`${p.name} ${p.shortDescription} ${p.category}`);
    if (haystack.includes(q)) {
      out.push({
        kind: "product",
        id: p.id,
        title: p.name,
        subtitle: p.shortDescription,
        price: formatPrice(p.price),
        href: `/urun/${p.slug}`,
      });
    }
  });

  CATEGORIES.forEach((c) => {
    const haystack = normalize(`${c.name} ${c.description}`);
    if (haystack.includes(q)) {
      out.push({
        kind: "category",
        id: c.slug,
        title: c.name,
        subtitle: c.description,
        href: `/koleksiyon/${c.slug}`,
      });
    }
  });

  STATIC_PAGES.forEach((p) => {
    const haystack = normalize(
      `${p.title} ${p.description} ${p.keywords.join(" ")}`,
    );
    if (haystack.includes(q)) {
      out.push({
        kind: "page",
        id: p.href,
        title: p.title,
        subtitle: p.description,
        href: p.href,
      });
    }
  });

  return out.slice(0, 20);
}

const KIND_META = {
  product: { icon: Flower2, label: "Ürün" },
  category: { icon: LayoutGrid, label: "Koleksiyon" },
  page: { icon: Sparkles, label: "Sayfa" },
} as const;

const SUGGESTIONS = [
  { label: "Bordo buketler", q: "bordo" },
  { label: "Kahve & çiçek", q: "kahve" },
  { label: "Orkide", q: "orkide" },
  { label: "Kutuda çiçek", q: "kutu" },
  { label: "Saksı", q: "saksı" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => searchAll(query), [query]);

  // Açıldığında inputa odaklan + query sıfırla
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Klavye gezintisi
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(results.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        const r = results[activeIdx];
        if (r) {
          router.push(r.href);
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, activeIdx, onClose, router]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-coffee-deep/75"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-20 md:top-28 z-[81] mx-auto max-w-2xl bg-white border border-rose-gold/25 rounded-3xl shadow-card overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Arama"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 p-4 border-b border-rose-gold/15">
              <Search size={18} strokeWidth={1.7} className="text-bordo flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIdx(0);
                }}
                placeholder="Ürün, koleksiyon veya sayfa ara..."
                className="flex-1 bg-transparent border-none outline-none text-coffee placeholder:text-coffee/40"
                aria-label="Arama"
              />
              <kbd className="hidden sm:inline-flex items-center rounded-md border border-coffee/15 bg-cream px-2 py-0.5 text-[0.65rem] text-coffee/55 font-mono">
                Esc
              </kbd>
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="sm:hidden text-coffee/55 hover:text-coffee"
              >
                <X size={18} strokeWidth={1.7} />
              </button>
            </div>

            {/* Sonuçlar */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim().length === 0 ? (
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider2 text-rose-gold mb-3">
                    Öneriler
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s.q}
                        onClick={() => setQuery(s.q)}
                        className="rounded-full border border-rose-gold/25 bg-cream hover:bg-cream/10 hover:border-rose-gold px-3 py-1.5 text-xs text-coffee/80 transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-coffee/65">
                    &ldquo;{query}&rdquo; için sonuç bulunamadı.
                  </p>
                  <p className="text-xs text-coffee/45 mt-2">
                    Farklı bir kelime deneyin veya yukarıdaki önerileri kullanın.
                  </p>
                </div>
              ) : (
                <ul role="listbox" className="flex flex-col">
                  {results.map((r, i) => {
                    const meta = KIND_META[r.kind];
                    return (
                      <li key={`${r.kind}-${r.id}`} role="option" aria-selected={i === activeIdx}>
                        <button
                          type="button"
                          onClick={() => {
                            router.push(r.href);
                            onClose();
                          }}
                          onMouseEnter={() => setActiveIdx(i)}
                          className={cn(
                            "w-full text-left flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors",
                            i === activeIdx
                              ? "bg-rose-gold/15"
                              : "hover:bg-cream",
                          )}
                        >
                          <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-cream text-bordo">
                            <meta.icon size={15} strokeWidth={1.6} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-coffee truncate">
                                {r.title}
                              </span>
                              <span className="text-[0.6rem] uppercase tracking-wider2 text-rose-gold/70">
                                {meta.label}
                              </span>
                            </div>
                            <p className="text-xs text-coffee/55 truncate">
                              {r.subtitle}
                            </p>
                          </div>
                          {r.kind === "product" && "price" in r && r.price && (
                            <span className="text-sm text-bordo">
                              {r.price}
                            </span>
                          )}
                          <ArrowRight
                            size={14}
                            strokeWidth={1.7}
                            className="text-coffee/40 flex-shrink-0"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer ipucu */}
            <div className="px-4 py-3 border-t border-rose-gold/10 text-[0.65rem] text-coffee/45 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-coffee/15 bg-cream px-1.5 py-0.5">↑↓</kbd> seç
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-coffee/15 bg-cream px-1.5 py-0.5">Enter</kbd> aç
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-coffee/15 bg-cream px-1.5 py-0.5">Esc</kbd> kapat
              </span>
              <span className="ml-auto">{results.length} sonuç</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
