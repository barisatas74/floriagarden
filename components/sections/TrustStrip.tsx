import { Flower2, Truck, ShieldCheck, Heart } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";

const ITEMS = [
  {
    icon: Flower2,
    title: "Taze Garanti",
    text: "Her sabah taze gelen çiçekler",
  },
  {
    icon: Truck,
    title: "Aynı Gün Teslimat",
    text: "Gemlik içi 2 saatte kapınızda",
  },
  {
    icon: ShieldCheck,
    title: "Güvenli Sipariş",
    text: "WhatsApp doğrulama + havale/kapıda",
  },
  {
    icon: Heart,
    title: "Memnuniyet Sözü",
    text: "Beğenmezseniz yenisini yapalım",
  },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Güvence şeridi"
      className="relative py-10 md:py-12 border-y border-rose-gold/20 bg-cream"
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {ITEMS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06} y={20}>
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-rose-gold-gradient text-coffee">
                  <item.icon size={18} strokeWidth={1.6} />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[0.7rem] uppercase tracking-wider2 text-rose-goldDark">
                    {item.title}
                  </span>
                  <span className="mt-1 text-sm text-coffee/75">{item.text}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
