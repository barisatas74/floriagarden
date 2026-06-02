"use client";

import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const SLOTS = [
  { id: "09-12", label: "09:00 — 12:00" },
  { id: "12-15", label: "12:00 — 15:00" },
  { id: "15-18", label: "15:00 — 18:00" },
  { id: "18-22", label: "18:00 — 22:00" },
];

type Props = {
  date: string;
  slot: string;
  onDateChange: (v: string) => void;
  onSlotChange: (v: string) => void;
};

function getMinDateIso() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function getMaxDateIso() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

export default function DeliverySchedule({
  date,
  slot,
  onDateChange,
  onSlotChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="delivery-date"
          className="flex items-center gap-2 text-[0.7rem] uppercase tracking-wider2 text-rose-gold"
        >
          <Calendar size={13} strokeWidth={1.7} />
          Teslimat Günü
        </label>
        <input
          id="delivery-date"
          type="date"
          value={date}
          min={getMinDateIso()}
          max={getMaxDateIso()}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full rounded-2xl bg-cream/5 border border-rose-gold/20 px-4 h-12 text-sm text-coffee focus:outline-none focus:border-rose-gold focus:bg-cream/10 transition-colors"
          style={{ colorScheme: "light" }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-2 text-[0.7rem] uppercase tracking-wider2 text-rose-gold">
          <Clock size={13} strokeWidth={1.7} />
          Saat Aralığı
        </span>
        <div className="grid grid-cols-2 gap-2">
          {SLOTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onSlotChange(s.id)}
              aria-pressed={slot === s.id}
              className={cn(
                "h-11 rounded-full text-xs tracking-wide transition-all duration-300",
                slot === s.id
                  ? "bg-rose-gold-gradient text-coffee shadow-glow"
                  : "bg-cream/5 text-coffee/75 border border-rose-gold/20 hover:border-rose-gold/50",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
