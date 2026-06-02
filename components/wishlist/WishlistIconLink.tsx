"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "./WishlistProvider";
import { cn } from "@/lib/utils/cn";

export default function WishlistIconLink({ className }: { className?: string }) {
  const { count } = useWishlist();

  return (
    <Link
      href="/favoriler"
      aria-label={`Favorilerim (${count} ürün)`}
      className={cn(
        "relative inline-flex items-center justify-center h-11 w-11 rounded-full border border-rose-gold/30 bg-cream/5 text-cream hover:bg-rose-gold hover:text-coffee hover:border-rose-gold transition-all duration-300",
        className,
      )}
    >
      <Heart size={17} strokeWidth={1.7} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 inline-flex items-center justify-center rounded-full bg-rose-gold text-coffee text-[0.65rem] font-semibold tracking-tight shadow-soft"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
