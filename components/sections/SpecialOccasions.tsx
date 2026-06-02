"use client";

import { motion } from "framer-motion";
import { Cake, Heart, HeartHandshake, Store, GraduationCap, Gift } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";
import { whatsappLink } from "@/lib/constants";

const OCCASIONS = [
  {
    icon: Heart,
    title: "Yıldönümü",
    description: "Aşkınızı taçlandıracak özel düzenlemeler.",
  },
  {
    icon: Cake,
    title: "Doğum Günü",
    description: "Sürpriz teslimatla unutulmaz anlar.",
  },
  {
    icon: HeartHandshake,
    title: "Anneler Günü",
    description: "Annenizin yüzünü güldürecek butik buketler.",
  },
  {
    icon: Store,
    title: "Açılış & Organizasyon",
    description: "Kurumsal görselliğe yakışır çelenk ve düzenlemeler.",
  },
  {
    icon: GraduationCap,
    title: "Mezuniyet",
    description: "Yeni başlangıçlara zarif bir dokunuş.",
  },
  {
    icon: Gift,
    title: "Sürpriz Hediye",
    description: "Sevdiklerinize sebepsiz, içten bir jest.",
  },
];

export default function SpecialOccasions() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 bg-section-bordo overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(201,164,106,0.25), transparent 70%)",
        }}
      />

      <div className="container relative flex flex-col gap-14">
        <SectionHeading
          eyebrow="Özel Günler"
          title="Her anı bir kutlamaya dönüştürün"
          description="Floria Garden, hayatınızın özel anlarına özenle hazırlanmış çiçeklerle eşlik eder. Doğru çiçeği birlikte seçelim."
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {OCCASIONS.map((occ, i) => (
            <FadeIn key={occ.title} delay={i * 0.05} y={28}>
              <motion.a
                href={whatsappLink(
                  `Merhaba Floria Garden, "${occ.title}" için bir öneri almak istiyorum.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group block h-full rounded-3xl glass-dark p-7 hover:border-rose-gold/45 hover:shadow-card transition-all duration-500"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-gold-gradient text-coffee shadow-glow group-hover:scale-105 transition-transform duration-500">
                  <occ.icon size={20} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-cream">
                  {occ.title}
                </h3>
                <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                  {occ.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-wider2 text-rose-goldLight group-hover:text-rose-gold">
                  Öneri al
                  <span aria-hidden>→</span>
                </span>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
