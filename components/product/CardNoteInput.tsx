"use client";

import { PenLine } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
};

export default function CardNoteInput({
  value,
  onChange,
  maxLength = 180,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="card-note"
        className="flex items-center gap-2 text-[0.7rem] uppercase tracking-wider2 text-rose-gold"
      >
        <PenLine size={13} strokeWidth={1.7} />
        Hediye Kartı Notu (opsiyonel)
      </label>
      <textarea
        id="card-note"
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder="Örn: Doğum günün kutlu olsun. Hep yanındayım."
        className="w-full rounded-2xl bg-cream/5 border border-rose-gold/20 px-4 py-3 text-sm text-coffee placeholder:text-coffee/35 focus:outline-none focus:border-rose-gold focus:bg-cream/10 transition-colors resize-none font-display italic"
      />
      <div className="flex justify-between text-[0.65rem] text-coffee/45">
        <span>El yazısıyla kartınıza yazılır</span>
        <span>{value.length} / {maxLength}</span>
      </div>
    </div>
  );
}
