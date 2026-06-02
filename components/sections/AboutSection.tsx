"use client";

import { motion } from "framer-motion";
import { Leaf, Sparkles, Heart, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";

const VALUES = [
  {
    icon: Leaf,
    title: "Taze Çiçekler",
    text: "Her gün özenle seçilen, mevsiminin en canlı çiçekleri.",
  },
  {
    icon: Sparkles,
    title: "Lüks Ambalaj",
    text: "Kadife, ipek ve doğal dokuların kullanıldığı butik ambalaj.",
  },
  {
    icon: Heart,
    title: "Kişisel Dokunuş",
    text: "Sizin hikâyenize özel, el yapımı düzenlemeler.",
  },
  {
    icon: ShieldCheck,
    title: "Özenli Teslimat",
    text: "Çiçeğin tazeliğini koruyan, ısı kontrollü teslimat.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="hakkimizda"
      className="relative py-20 md:py-28 lg:py-32 scroll-mt-24 bg-section-wine overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[460px] h-[460px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(201,164,106,0.22), transparent 70%)",
        }}
      />

      <div className="container relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Hikâye kolonu */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <FadeIn>
            <span className="eyebrow">Hakkımızda</span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="heading-section text-balance">
              Çiçek, sadece bir hediye değil;{" "}
              <span className="italic text-bordo">bir histir.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-coffee/75 leading-relaxed text-balance max-w-2xl">
              Floria Garden, Gemlik&apos;te butik çiçekçiliği yeniden tanımlamak
              için yola çıktı. Atölyemizde her buket, mevsiminin en taze
              çiçekleriyle, sevdiklerinize hissettirmek istediğiniz duyguyu
              merkeze alarak hazırlanır.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-coffee/75 leading-relaxed text-balance max-w-2xl">
              Çiçeği ve kahveyi tek bir özenli deneyimde buluşturarak, klasik
              çiçekçinin sınırlarını aşan modern bir marka yaratıyoruz. Her
              ürünümüz; zarafet, kalite ve sıcaklığın bir araya gelmesidir.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="flex flex-wrap gap-6 pt-4">
            <div className="flex flex-col">
              <span className="font-display text-3xl text-bordo">El yapımı</span>
              <span className="text-xs uppercase tracking-wider2 text-coffee/55">
                Her tasarım özenle
              </span>
            </div>
            <div className="hidden sm:block w-px self-stretch bg-rose-gold/20" />
            <div className="flex flex-col">
              <span className="font-display text-3xl text-bordo">Aynı gün</span>
              <span className="text-xs uppercase tracking-wider2 text-coffee/55">
                Gemlik içi teslimat
              </span>
            </div>
            <div className="hidden sm:block w-px self-stretch bg-rose-gold/20" />
            <div className="flex flex-col">
              <span className="font-display text-3xl text-bordo">Taze</span>
              <span className="text-xs uppercase tracking-wider2 text-coffee/55">
                Mevsiminin çiçeği
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Değerler kolonu */}
        <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
          {VALUES.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.07} y={28}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-3xl glass-dark p-6 hover:border-rose-gold/40 transition-colors duration-500"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-gold-gradient text-coffee">
                  <v.icon size={18} strokeWidth={1.5} />
                </span>
                <h4 className="mt-4 font-display text-xl text-coffee">{v.title}</h4>
                <p className="mt-2 text-sm text-coffee/70 leading-relaxed">
                  {v.text}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
