"use client";

import { Search } from "lucide-react";
import { useSearch } from "./SearchProvider";
import { cn } from "@/lib/utils/cn";

type Props = {
  variant?: "icon" | "bar";
  className?: string;
};

export default function SearchButton({ variant = "icon", className }: Props) {
  const { openPalette } = useSearch();

  if (variant === "bar") {
    return (
      <button
        type="button"
        onClick={openPalette}
        aria-label="Aramayı aç"
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-rose-gold/25 bg-cream/5 text-cream/65 hover:bg-cream/10 hover:border-rose-gold/45 transition-colors px-4 h-11 min-w-[200px]",
          className,
        )}
      >
        <Search size={15} strokeWidth={1.7} className="text-rose-goldLight" />
        <span className="flex-1 text-left text-sm">Ürün ara...</span>
        <kbd className="hidden md:inline-flex items-center rounded-md border border-cream/15 bg-cream/5 px-1.5 py-0.5 text-[0.65rem] font-mono text-cream/55">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Aramayı aç (Cmd+K)"
      className={cn(
        "inline-flex items-center justify-center h-11 w-11 rounded-full border border-rose-gold/30 bg-cream/5 text-cream hover:bg-rose-gold hover:text-coffee hover:border-rose-gold transition-all duration-300",
        className,
      )}
    >
      <Search size={17} strokeWidth={1.7} />
    </button>
  );
}
