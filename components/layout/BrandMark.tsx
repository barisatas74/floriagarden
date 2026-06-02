"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type Props = {
  /** Arka plan teması: koyu üstte (default) krem logo, açık üstte koyu logo */
  variant?: "light" | "dark";
  className?: string;
  withTagline?: boolean;
};

export default function BrandMark({
  variant = "light",
  className,
  withTagline = false,
}: Props) {
  const isLight = variant === "light";
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      aria-label="Floria Garden anasayfa"
      className={cn("inline-flex flex-col leading-none group", className)}
    >
      <span className="flex items-baseline gap-[0.35rem]">
        <span
          className={cn(
            "font-display text-[1.6rem] md:text-[1.85rem] tracking-tight transition-colors duration-300",
            isLight ? "text-cream group-hover:text-rose-goldLight" : "text-coffee group-hover:text-bordo",
          )}
        >
          Floria
        </span>
        <span
          className={cn(
            "font-display text-[1.6rem] md:text-[1.85rem] tracking-tight",
            "text-rose-gold group-hover:text-rose-goldLight transition-colors duration-300",
          )}
        >
          Garden
        </span>
      </span>
      {withTagline && (
        <span
          className={cn(
            "mt-1 text-[0.65rem] uppercase tracking-ultra-wide",
            isLight ? "text-cream/55" : "text-coffee/55",
          )}
        >
          Flowers and Coffee
        </span>
      )}
    </Link>
  );
}
