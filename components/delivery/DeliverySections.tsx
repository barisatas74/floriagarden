"use client";

import { Clock, MapPin } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { deliveryIcon } from "@/lib/admin/deliveryIcons";
import { useDeliveryData } from "./useDeliveryData";

export default function DeliverySections() {
  const { deliveryZones, deliveryProcess } = useDeliveryData();

  return (
    <>
      {/* Bölgeler */}
      <section className="mb-16">
        <FadeIn className="mb-8">
          <h2 className="font-display text-2xl md:text-3xl text-coffee flex items-center gap-2">
            <MapPin size={20} strokeWidth={1.7} className="text-rose-gold" />
            Teslimat Bölgeleri
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deliveryZones.map((z, i) => (
            <FadeIn key={z.id} delay={i * 0.05} y={20}>
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
          {deliveryProcess.map((step, i) => {
            const Icon = deliveryIcon(step.icon);
            return (
              <FadeIn key={step.id} delay={i * 0.06} y={20}>
                <div className="h-full rounded-3xl bg-gradient-to-br from-bordo-500 via-bordo-700 to-bordo-dark border border-rose-gold/25 shadow-card p-6 relative">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-gold-gradient text-coffee">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <span className="absolute top-6 right-6 font-display text-2xl text-rose-goldLight/40">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </>
  );
}
