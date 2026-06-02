"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="hidden md:flex fixed right-6 z-40 h-14 w-14 items-center justify-center rounded-full bg-rose-gold-gradient text-coffee shadow-glow bottom-24 lg:bottom-6"
    >
      <MessageCircle size={22} strokeWidth={1.7} />
      <span className="sr-only">WhatsApp</span>
      {/* Pulsing halo */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full ring-2 ring-rose-gold animate-ping opacity-30"
      />
    </motion.a>
  );
}
