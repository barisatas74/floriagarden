"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  quantity: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
};

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
}: Props) {
  return (
    <div className="inline-flex items-center rounded-full border border-rose-gold/30 bg-cream/5">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        aria-label="Adet azalt"
        className="inline-flex h-11 w-11 items-center justify-center text-coffee/80 hover:text-bordo disabled:opacity-40 disabled:pointer-events-none"
      >
        <Minus size={14} strokeWidth={2} />
      </button>
      <span className="font-display text-xl text-coffee w-10 text-center">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label="Adet artır"
        className="inline-flex h-11 w-11 items-center justify-center text-coffee/80 hover:text-bordo disabled:opacity-40 disabled:pointer-events-none"
      >
        <Plus size={14} strokeWidth={2} />
      </button>
    </div>
  );
}
