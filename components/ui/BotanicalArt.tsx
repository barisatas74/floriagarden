import { cn } from "@/lib/utils/cn";

/**
 * Zarif botanik çizgi-sanat placeholder.
 * Gerçek fotoğraf gelene kadar tutarlı, dergisel bir "lookbook" hissi verir.
 * Rastgele renk blokları yerine fildişi zemin + ince bordo/gold çizim.
 *
 * `seed` ürün id'sinden türetilir → her ürüne farklı ama uyumlu bir motif.
 */
function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

const MOTIFS = ["peony", "tulip", "branch", "rose"] as const;

export default function BotanicalArt({
  seed,
  className,
  label,
}: {
  seed: string;
  className?: string;
  label?: string;
}) {
  const h = hash(seed);
  const motif = MOTIFS[h % MOTIFS.length];
  // Hafif ton kayması — fildişi içinde ya pudra ya da krem ağırlıklı
  const warm = h % 2 === 0;

  return (
    <div
      className={cn("relative w-full h-full overflow-hidden bg-cream-soft", className)}
      role="presentation"
      aria-label={label}
      aria-hidden="true"
    >
      {/* Çok hafif ton yıkaması */}
      <div
        className="absolute inset-0"
        style={{
          background: warm
            ? "radial-gradient(120% 90% at 50% 12%, rgba(201,164,106,0.16), transparent 60%)"
            : "radial-gradient(120% 90% at 50% 12%, rgba(142,31,63,0.10), transparent 60%)",
        }}
      />

      {/* İnce çift çerçeve — atölye etiketi hissi */}
      <div className="absolute inset-3 rounded-[1.1rem] border border-rose-gold/25" />

      {/* Botanik çizim */}
      <svg
        viewBox="0 0 200 260"
        className="absolute inset-0 m-auto h-[78%] w-auto text-bordo/35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        {/* Sap */}
        <path d="M100 250 C 100 200 98 170 100 140" />
        {/* Yapraklar */}
        <path d="M100 210 C 78 200 66 184 64 168 C 84 172 96 188 100 206" className="text-sage/50" stroke="currentColor" />
        <path d="M100 190 C 122 182 134 166 136 150 C 116 154 104 168 100 186" />

        {motif === "peony" && (
          <g>
            <circle cx="100" cy="96" r="16" />
            <ellipse cx="100" cy="62" rx="15" ry="26" />
            <ellipse cx="72" cy="84" rx="15" ry="26" transform="rotate(-52 72 84)" />
            <ellipse cx="128" cy="84" rx="15" ry="26" transform="rotate(52 128 84)" />
            <ellipse cx="80" cy="118" rx="14" ry="24" transform="rotate(-128 80 118)" />
            <ellipse cx="120" cy="118" rx="14" ry="24" transform="rotate(128 120 118)" />
            <circle cx="100" cy="96" r="6" className="text-rose-gold" stroke="currentColor" />
          </g>
        )}
        {motif === "tulip" && (
          <g>
            <path d="M82 110 C 80 78 88 58 100 50 C 112 58 120 78 118 110 Z" />
            <path d="M100 50 L 100 104" />
            <path d="M88 106 C 86 84 90 70 96 60" />
            <path d="M112 106 C 114 84 110 70 104 60" />
          </g>
        )}
        {motif === "branch" && (
          <g>
            <circle cx="100" cy="70" r="11" />
            <circle cx="76" cy="100" r="9" />
            <circle cx="124" cy="98" r="9" />
            <circle cx="100" cy="118" r="8" />
            <circle cx="100" cy="70" r="3.5" className="text-rose-gold" stroke="currentColor" />
          </g>
        )}
        {motif === "rose" && (
          <g>
            <circle cx="100" cy="92" r="20" />
            <path d="M100 92 C 92 84 92 100 100 104 C 110 106 112 90 100 84 C 86 80 84 102 100 110" />
            <ellipse cx="74" cy="104" rx="13" ry="22" transform="rotate(-44 74 104)" />
            <ellipse cx="126" cy="104" rx="13" ry="22" transform="rotate(44 126 104)" />
          </g>
        )}
      </svg>
    </div>
  );
}
