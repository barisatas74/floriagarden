"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FloralPlaceholder from "./FloralPlaceholder";
import type { Category } from "@/lib/data/categories";

type Props = {
  category: Category;
  size?: "default" | "large";
};

export default function CategoryCard({ category }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full flex flex-col overflow-hidden rounded-3xl bg-white border border-rose-gold/20 shadow-soft hover:shadow-card hover:border-rose-gold/45 transition-all duration-500"
    >
      <Link
        href={`/koleksiyon/${category.slug}`}
        className="flex flex-col h-full"
        aria-label={`${category.name} koleksiyonunu keşfet`}
      >
        {/* Görsel alanı */}
        <div className="relative aspect-[5/4] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <FloralPlaceholder gradient={category.gradient} label={category.name} />
          </motion.div>

          {/* Üst koleksiyon etiketi */}
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[0.6rem] uppercase tracking-wider2 text-bordo shadow-soft">
            Koleksiyon
          </span>

          {/* Alt yumuşak gölge — görsel ile içerik geçişi */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/30 to-transparent"
            aria-hidden
          />
        </div>

        {/* İçerik alanı — beyaz */}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="font-display text-xl md:text-2xl text-coffee leading-tight">
            {category.name}
          </h3>
          <p className="mt-2 text-sm text-coffee/60 leading-relaxed line-clamp-2">
            {category.description}
          </p>

          <div className="mt-5 pt-4 border-t border-rose-gold/15 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider2 text-rose-goldDark group-hover:text-bordo transition-colors">
              Keşfet
            </span>
            <motion.span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-gold/30 text-rose-goldDark group-hover:bg-bordo group-hover:text-cream group-hover:border-bordo transition-all duration-300"
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArrowUpRight size={14} strokeWidth={1.7} />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
