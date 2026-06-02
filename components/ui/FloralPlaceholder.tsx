import { cn } from "@/lib/utils/cn";

type Props = {
  gradient: string;
  className?: string;
  label?: string;
};

/**
 * Renders a premium, decorative placeholder used in lieu of real photography.
 * Replace with <Image src=... /> when product photos are available.
 */
export default function FloralPlaceholder({ gradient, className, label }: Props) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden",
        "bg-gradient-to-br",
        gradient,
        className,
      )}
      role="presentation"
      aria-label={label}
      aria-hidden="true"
    >
      {/* Soft noise / vignette */}
      <div className="absolute inset-0 bg-noise opacity-90" aria-hidden />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 45%), radial-gradient(circle at 70% 75%, rgba(0,0,0,0.25), transparent 50%)",
        }}
        aria-hidden
      />
      {/* Floral SVG motif */}
      <svg
        viewBox="0 0 200 200"
        className="absolute -right-6 -bottom-6 w-44 h-44 opacity-25 text-cream"
        aria-hidden
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="100" cy="100" r="22" />
          <ellipse cx="100" cy="60" rx="16" ry="28" />
          <ellipse cx="100" cy="140" rx="16" ry="28" />
          <ellipse cx="60" cy="100" rx="28" ry="16" />
          <ellipse cx="140" cy="100" rx="28" ry="16" />
          <ellipse cx="70" cy="70" rx="14" ry="24" transform="rotate(-45 70 70)" />
          <ellipse cx="130" cy="70" rx="14" ry="24" transform="rotate(45 130 70)" />
          <ellipse cx="70" cy="130" rx="14" ry="24" transform="rotate(45 70 130)" />
          <ellipse cx="130" cy="130" rx="14" ry="24" transform="rotate(-45 130 130)" />
        </g>
      </svg>
      {/* Rose gold corner accent */}
      <div className="absolute top-4 left-4 h-px w-12 bg-rose-gold/60" aria-hidden />
      <div className="absolute top-4 left-4 w-px h-12 bg-rose-gold/60" aria-hidden />
    </div>
  );
}
