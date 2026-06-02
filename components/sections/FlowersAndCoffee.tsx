"use client";

import { motion } from "framer-motion";
import { Coffee, Flower2 } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";

export default function FlowersAndCoffee() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-coffee" aria-hidden />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(201,164,106,0.18), transparent 40%), radial-gradient(circle at 85% 80%, rgba(142,31,63,0.25), transparent 45%)",
        }}
        aria-hidden
      />

      <div className="container relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Visual */}
        <FadeIn className="lg:col-span-6" y={40}>
          <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-card">
            <div className="absolute inset-0 bg-gradient-to-br from-coffee-soft via-coffee to-bordo-700" />
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 30%, rgba(201,164,106,0.4), transparent 45%), radial-gradient(circle at 70% 70%, rgba(142,31,63,0.4), transparent 45%)",
              }}
            />

            {/* Decorative icons floating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-10 left-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-cream/10 backdrop-blur border border-rose-gold/30 text-rose-gold"
            >
              <Flower2 size={28} strokeWidth={1.3} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute bottom-10 right-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-cream/10 backdrop-blur border border-rose-gold/30 text-rose-gold"
            >
              <Coffee size={28} strokeWidth={1.3} />
            </motion.div>

            {/* Centered tagline */}
            <div className="absolute inset-0 flex items-center justify-center px-10">
              <div className="text-center">
                <span className="text-[0.7rem] uppercase tracking-ultra-wide text-rose-gold">
                  İmza Konseptimiz
                </span>
                <h3 className="mt-4 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
                  Flowers
                  <span className="block italic text-rose-goldLight">and</span>
                  Coffee
                </h3>
                <div className="mt-6 mx-auto h-px w-16 bg-rose-gold/60" />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Text */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-cream">
          <FadeIn>
            <span className="eyebrow">Yeni Bir Buluşma</span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="heading-section text-cream text-balance">
              Çiçeklerin ve kahvenin
              <br />
              <span className="text-rose-goldLight italic">buluştuğu yer</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-cream/75 leading-relaxed text-balance max-w-xl">
              Floria Garden, bir çiçekçiden fazlasıdır. Özenle seçilmiş kahveler
              ile butik çiçek tasarımlarını aynı anda yaşayabileceğiniz, modern
              ve davetkâr bir deneyim sunar.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5 mt-4">
            <FadeIn delay={0.15} className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
              <Flower2 size={22} strokeWidth={1.4} className="text-rose-goldLight" />
              <h4 className="mt-4 font-display text-xl text-cream">
                Premium Çiçekler
              </h4>
              <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                Mevsiminin en taze ithal ve yerli çiçekleriyle el yapımı düzenlemeler.
              </p>
            </FadeIn>
            <FadeIn delay={0.22} className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
              <Coffee size={22} strokeWidth={1.4} className="text-rose-goldLight" />
              <h4 className="mt-4 font-display text-xl text-cream">
                Seçkin Kahveler
              </h4>
              <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                Özel kavrum ve butik markalardan seçilmiş kahve setleri, hediyelik
                paketlerle birlikte.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
