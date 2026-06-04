"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles, ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/lib/constants";

/**
 * Koleksiyon ızgarasındaki son boş hücreyi dolduran özel tasarım CTA kartı.
 * Bordo zeminli, koleksiyon kartlarıyla aynı ölçüde.
 */
export default function CategoryCtaCard() {
  return (
    <motion.a
      href={whatsappLink(
        "Merhaba Floria Garden, aklımda özel bir tasarım var. Yardımcı olur musunuz?",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Size özel tasarım için WhatsApp'tan yazın"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full flex flex-col overflow-hidden rounded-3xl border border-bordo/40 shadow-soft hover:shadow-card transition-all duration-500"
    >
      {/* Bordo zemin */}
      <div className="absolute inset-0 bg-gradient-to-br from-bordo via-bordo-dark to-wine" />

      {/* Sıcak gold ışık */}
      <div
        className="absolute inset-0 opacity-70 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(201,164,106,0.5), transparent 50%), radial-gradient(circle at 80% 85%, rgba(201,164,106,0.25), transparent 55%)",
        }}
        aria-hidden
      />

      {/* Botanik çizim */}
      <svg
        viewBox="0 0 200 200"
        className="absolute -right-6 -bottom-6 w-44 h-44 text-rose-gold/30 group-hover:text-rose-gold/45 transition-colors duration-500"
        aria-hidden
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.1">
          <ellipse cx="100" cy="90" rx="16" ry="26" />
          <ellipse cx="78" cy="100" rx="14" ry="22" transform="rotate(-35 78 100)" />
          <ellipse cx="122" cy="100" rx="14" ry="22" transform="rotate(35 122 100)" />
          <ellipse cx="92" cy="68" rx="11" ry="19" transform="rotate(-15 92 68)" />
          <ellipse cx="112" cy="68" rx="11" ry="19" transform="rotate(15 112 68)" />
          <circle cx="100" cy="100" r="8" />
          <path d="M100 120 Q 90 170 100 200" />
          <path d="M100 120 Q 110 170 100 200" />
        </g>
      </svg>

      {/* İçerik */}
      <div className="relative flex flex-1 flex-col p-5 md:p-6 text-cream">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cream/15 backdrop-blur px-3 py-1 text-[0.6rem] uppercase tracking-wider2 text-cream">
          <Sparkles size={11} strokeWidth={1.8} className="text-rose-gold" />
          Size Özel
        </span>

        <h3 className="mt-auto font-display text-xl md:text-2xl leading-tight">
          Hayalinizdeki tasarımı birlikte yapalım
        </h3>
        <p className="mt-2 text-sm text-cream/75 leading-relaxed line-clamp-2">
          Özel buket, kutu veya etkinlik düzenlemesi mi istiyorsunuz? WhatsApp&apos;tan
          yazın, size özel hazırlayalım.
        </p>

        <div className="mt-5 pt-4 border-t border-cream/20 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider2 text-rose-gold group-hover:text-cream transition-colors">
            <MessageCircle size={13} strokeWidth={1.8} />
            WhatsApp&apos;tan Yazın
          </span>
          <motion.span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cream/30 text-cream group-hover:bg-cream group-hover:text-bordo group-hover:border-cream transition-all duration-300"
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArrowUpRight size={14} strokeWidth={1.7} />
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}
