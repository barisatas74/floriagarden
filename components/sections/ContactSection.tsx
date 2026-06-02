"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin, Phone, Clock, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/motion/FadeIn";
import { SITE, whatsappLink } from "@/lib/constants";

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: "Adres",
    value: SITE.address,
  },
  {
    icon: Phone,
    label: "Telefon",
    value: SITE.phoneDisplay,
    href: `tel:${SITE.phoneRaw}`,
  },
  {
    icon: Mail,
    label: "E-posta",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: SITE.hours,
  },
];

export default function ContactSection() {
  return (
    <section
      id="iletisim"
      className="relative py-20 md:py-28 lg:py-32 scroll-mt-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-bordo-gradient" aria-hidden />
      <div className="absolute inset-0 bg-noise opacity-60" aria-hidden />
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full opacity-20"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(201,164,106,0.6), transparent)",
        }}
      />

      <div className="container relative grid lg:grid-cols-12 gap-12 items-center">
        {/* CTA column */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-cream">
          <FadeIn>
            <span className="eyebrow">İletişim</span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="heading-section text-cream text-balance">
              Sipariş ve sorularınız için
              <br />
              <span className="italic text-rose-goldLight">bir mesaj uzaktayız</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-cream/80 leading-relaxed text-balance max-w-xl">
              Floria Garden ekibi size en uygun çiçeği seçmek, kişisel notlarınızı
              eklemek ve teslimat detaylarını planlamak için WhatsApp üzerinden
              hızlıca yanıt veriyor.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp üzerinden sipariş ver"
            >
              <Button size="lg" variant="gold">
                <MessageCircle size={18} strokeWidth={1.7} />
                <span>WhatsApp&apos;tan Sipariş Ver</span>
              </Button>
            </a>
            <a
              href={`tel:${SITE.phoneRaw}`}
              aria-label="Telefonla ara"
            >
              <Button size="lg" variant="outline-light">
                <Phone size={18} strokeWidth={1.7} />
                <span>Hemen Ara</span>
              </Button>
            </a>
          </FadeIn>
        </div>

        {/* Info column */}
        <FadeIn delay={0.2} className="lg:col-span-5">
          <div className="rounded-3xl glass-cream p-6 md:p-8 flex flex-col gap-5">
            {CONTACT_ITEMS.map((item) => {
              const Content = (
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-bordo text-cream shadow-soft">
                    <item.icon size={17} strokeWidth={1.6} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[0.7rem] uppercase tracking-wider2 text-coffee/55">
                      {item.label}
                    </span>
                    <span className="text-coffee mt-1 leading-relaxed">
                      {item.value}
                    </span>
                  </div>
                </div>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl -m-2 p-2 hover:bg-cream/40 transition-colors duration-300"
                >
                  {Content}
                </a>
              ) : (
                <div key={item.label}>{Content}</div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
