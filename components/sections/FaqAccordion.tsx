"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { FAQ } from "@/lib/data/faqs";
import { cn } from "@/lib/utils/cn";

type Props = {
  items: FAQ[];
};

export default function FaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null);

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = open === item.question;
        return (
          <li
            key={item.question}
            className={cn(
              "rounded-2xl glass-dark overflow-hidden transition-all duration-500",
              isOpen && "border-rose-gold/40 shadow-card",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.question)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
            >
              <span className="font-display text-lg md:text-xl text-coffee">
                {item.question}
              </span>
              <span
                className={cn(
                  "inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                  isOpen
                    ? "rotate-45 bg-rose-gold-gradient text-coffee border-rose-gold"
                    : "border-rose-gold/30 text-bordo",
                )}
              >
                <Plus size={14} strokeWidth={1.8} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 md:px-6 pb-6 text-sm text-coffee/75 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
