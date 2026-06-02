import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FaqAccordion from "@/components/sections/FaqAccordion";
import FadeIn from "@/components/motion/FadeIn";
import { FAQS } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description:
    "Floria Garden — sipariş, teslimat, ödeme, iade ve çiçek bakımı hakkında sıkça sorulan sorular.",
};

const CATEGORIES = [
  { key: "siparis", label: "Sipariş" },
  { key: "teslimat", label: "Teslimat" },
  { key: "odeme", label: "Ödeme" },
  { key: "iade", label: "İade & Memnuniyet" },
  { key: "bakim", label: "Bakım" },
] as const;

export default function FaqPage() {
  return (
    <article className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container">
        <Breadcrumb items={[{ label: "SSS" }]} className="mb-10" />

        <header className="flex flex-col items-start gap-4 mb-12 max-w-3xl">
          <FadeIn><span className="eyebrow">Yardım Merkezi</span></FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="heading-display">
              Sıkça Sorulan
              <br />
              <span className="italic text-bordo">Sorular</span>
              <span className="text-rose-gold">.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-coffee/75 leading-relaxed max-w-2xl">
              Aradığınız cevabı bulamazsanız WhatsApp&apos;tan ekibimize her zaman
              ulaşabilirsiniz.
            </p>
          </FadeIn>
        </header>

        <div className="flex flex-col gap-12">
          {CATEGORIES.map(({ key, label }) => {
            const items = FAQS.filter((f) => f.category === key);
            if (items.length === 0) return null;
            return (
              <section key={key} className="flex flex-col gap-5">
                <h2 className="font-display text-2xl md:text-3xl text-coffee">
                  {label}
                </h2>
                <FaqAccordion items={items} />
              </section>
            );
          })}
        </div>
      </div>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
          }),
        }}
      />
    </article>
  );
}
