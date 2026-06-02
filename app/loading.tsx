import { Flower2 } from "lucide-react";

export default function Loading() {
  return (
    <section
      className="min-h-[70vh] flex items-center justify-center pt-28 pb-20"
      aria-label="Sayfa yükleniyor"
      role="status"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinning halo */}
        <div className="relative inline-flex items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-rose-gold/15"
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-rose-gold animate-spin"
            style={{ animationDuration: "1.4s" }}
          />
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-rose-gold/10">
            <Flower2 size={28} strokeWidth={1.4} className="text-bordo" />
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[0.7rem] uppercase tracking-ultra-wide text-rose-gold">
            Floria Garden
          </span>
          <span className="text-coffee/70 text-sm">Hazırlanıyor…</span>
        </div>
      </div>
    </section>
  );
}
