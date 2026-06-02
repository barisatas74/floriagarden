import type { Metadata } from "next";
import { Truck, Clock, MapPin, ShieldCheck, Sparkles, Gift } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FadeIn from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Teslimat Bilgileri",
  description:
    "Floria Garden teslimat saatleri, bölgeler ve özenli teslimat süreci hakkında detaylı bilgi.",
};

const TIMELINE = [
  {
    icon: Sparkles,
    title: "Sipariş hazırlama",
    text: "Atölyemizde çiçek şefimiz tarafından özenle hazırlanır.",
  },
  {
    icon: Gift,
    title: "Lüks ambalaj",
    text: "Kadife, ipek ve doğal dokularla butik ambalaj yapılır.",
  },
  {
    icon: Truck,
    title: "Yolda",
    text: "Isı kontrollü ekipmanlarla kuryemiz adrese yola çıkar.",
  },
  {
    icon: ShieldCheck,
    title: "Elden teslim",
    text: "Çiçeğin tazeliği korunarak alıcıya elden teslim edilir.",
  },
];

const ZONES = [
  {
    name: "Gemlik Merkez",
    eta: "60 — 120 dk",
    fee: "Ücretsiz",
    note: "100 ₺ üzeri siparişlerde",
  },
  {
    name: "Gemlik Çevresi",
    eta: "120 — 180 dk",
    fee: "75 ₺",
    note: "Köy yerleşimleri dâhil",
  },
  {
    name: "Bursa Merkez",
    eta: "Aynı gün",
    fee: "150 ₺",
    note: "17:00 öncesi siparişler",
  },
  {
    name: "Çevre İlçeler",
    eta: "1 — 2 iş günü",
    fee: "Mesafeye göre",
    note: "Anlaşmalı kurye",
  },
];

export default function DeliveryPage() {
  return (
    <article className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container">
        <Breadcrumb items={[{ label: "Teslimat" }]} className="mb-10" />

        <header className="flex flex-col items-start gap-4 mb-12 max-w-3xl">
          <FadeIn><span className="eyebrow">Teslimat</span></FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="heading-display">
              Çiçeğiniz, en taze hâliyle
              <br />
              <span className="italic text-bordo">elden teslim</span>
              <span className="text-rose-gold">.</span>
            </h1>
          </FadeIn>
        </header>

        {/* Bölgeler */}
        <section className="mb-16">
          <FadeIn className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-coffee flex items-center gap-2">
              <MapPin size={20} strokeWidth={1.7} className="text-rose-gold" />
              Teslimat Bölgeleri
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ZONES.map((z, i) => (
              <FadeIn key={z.name} delay={i * 0.05} y={20}>
                <div className="h-full rounded-3xl bg-gradient-to-br from-bordo-500 via-bordo-700 to-bordo-dark border border-rose-gold/25 shadow-card p-6">
                  <h3 className="font-display text-xl text-cream">{z.name}</h3>
                  <div className="mt-3 flex items-center gap-2 text-rose-goldLight text-sm">
                    <Clock size={14} strokeWidth={1.6} />
                    <span>{z.eta}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-rose-gold/25">
                    <span className="font-display text-2xl text-cream">{z.fee}</span>
                    <p className="text-xs text-cream/60 mt-1">{z.note}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Süreç */}
        <section className="mb-16">
          <FadeIn className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-coffee">
              Teslimat süreci
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-4">
            {TIMELINE.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.06} y={20}>
                <div className="h-full rounded-3xl bg-gradient-to-br from-bordo-500 via-bordo-700 to-bordo-dark border border-rose-gold/25 shadow-card p-6 relative">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-gold-gradient text-coffee">
                    <step.icon size={20} strokeWidth={1.5} />
                  </span>
                  <span className="absolute top-6 right-6 font-display text-2xl text-rose-goldLight/40">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-cream">{step.title}</h3>
                  <p className="mt-2 text-sm text-cream/70 leading-relaxed">{step.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Önemli bilgiler */}
        <FadeIn>
          <div className="rounded-3xl bg-rose-gold/10 border border-rose-gold/30 p-7 md:p-10">
            <h3 className="font-display text-2xl text-coffee mb-4">
              Önemli bilgiler
            </h3>
            <ul className="space-y-3 text-sm text-coffee/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-rose-gold mt-1.5">·</span>
                <span>
                  Saat 17:00&apos;dan önce verilen siparişler aynı gün teslim edilir.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-gold mt-1.5">·</span>
                <span>
                  Sürpriz teslimatlarda gönderici bilgisi alıcıya açıklanmaz.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-gold mt-1.5">·</span>
                <span>
                  Alıcı adreste değilse iletişim numarası üzerinden iletişime
                  geçilir, gerekirse ertesi gün yeniden teslimat planlanır.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-gold mt-1.5">·</span>
                <span>
                  Çiçeğin tazeliği bizim için garantidir; memnun kalmazsanız
                  yenisini hazırlarız.
                </span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
