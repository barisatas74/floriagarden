"use client";

import { Gift } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/format";

const OPTIONS = [
  {
    id: "standart" as const,
    name: "Standart",
    description: "Floria kraft ambalaj + rose gold şerit",
    extra: 0,
  },
  {
    id: "premium" as const,
    name: "Premium",
    description: "Kadife ambalaj + el yazısı kart",
    extra: 75,
  },
  {
    id: "luks" as const,
    name: "Lüks Kutu",
    description: "Kadife hediye kutusu + parfümlü kâğıt",
    extra: 150,
  },
];

type Props = {
  value: "standart" | "premium" | "luks";
  onChange: (v: "standart" | "premium" | "luks") => void;
};

export default function GiftWrapSelector({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-2 text-[0.7rem] uppercase tracking-wider2 text-rose-gold">
        <Gift size={13} strokeWidth={1.7} />
        Hediye Paketi
      </span>
      <div className="grid gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={value === opt.id}
            className={cn(
              "flex items-start justify-between gap-4 p-4 rounded-2xl border text-left transition-all duration-300",
              value === opt.id
                ? "border-rose-gold bg-rose-gold/10 shadow-glow"
                : "border-rose-gold/15 bg-cream/5 hover:border-rose-gold/40",
            )}
          >
            <div className="flex flex-col">
              <span className="font-display text-lg text-coffee">{opt.name}</span>
              <span className="text-xs text-coffee/65 mt-0.5">{opt.description}</span>
            </div>
            <span className="text-sm font-medium text-bordo whitespace-nowrap">
              {opt.extra === 0 ? "Ücretsiz" : `+${formatPrice(opt.extra)}`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export const GIFT_WRAP_PRICES = {
  standart: 0,
  premium: 75,
  luks: 150,
} as const;
