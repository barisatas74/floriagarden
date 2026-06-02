"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";
import { SITE } from "@/lib/constants";

const GALLERY_TILES = [
  "from-bordo-400 via-bordo-600 to-bordo-700",
  "from-rose-goldLight via-rose-gold to-rose-goldDark",
  "from-bordo-500 via-bordo-700 to-wine-deep",
  "from-bordo-300 via-bordo-500 to-bordo-700",
  "from-coffee-soft via-coffee to-bordo-700",
  "from-rose-gold via-bordo-500 to-wine",
  "from-bordo-500 via-bordo-700 to-coffee",
  "from-rose-gold via-bordo-600 to-bordo-800",
];

export default function InstagramGallery() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 bg-section-coffee overflow-hidden">
      <div className="container relative flex flex-col gap-14">
        <SectionHeading
          eyebrow="Sosyal"
          title="Instagram'da Floria Garden"
          description="Günlük tasarımlarımız, atölye anlarımız ve mutlu müşterilerimizden geri dönüşler."
        />

        <FadeIn className="flex flex-col items-center gap-2">
          <a
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-bordo hover:text-rose-goldDark font-display text-2xl transition-colors"
          >
            <Instagram size={20} strokeWidth={1.6} />
            <span>{SITE.instagram.handle}</span>
          </a>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_TILES.map((gradient, i) => (
            <FadeIn key={i} delay={(i % 4) * 0.05}>
              <motion.a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block aspect-square rounded-2xl overflow-hidden shadow-soft ring-1 ring-rose-gold/15"
                aria-label="Instagram gönderisini görüntüle"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                <div className="absolute inset-0 bg-noise opacity-80" />
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-55"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 45%), radial-gradient(circle at 70% 75%, rgba(0,0,0,0.4), transparent 50%)",
                  }}
                />
                <div className="absolute inset-0 bg-coffee/0 group-hover:bg-coffee/55 transition-colors duration-500 flex items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-gold text-coffee shadow-card"
                  >
                    <Instagram size={18} strokeWidth={1.7} />
                  </motion.span>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="flex justify-center">
          <a
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-bordo/30 bg-white shadow-soft px-6 h-12 text-sm tracking-wide text-bordo hover:border-bordo hover:bg-bordo hover:text-cream transition-all duration-300"
          >
            <Instagram size={16} strokeWidth={1.7} />
            <span>Instagram&apos;da takip edin</span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
