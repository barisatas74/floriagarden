"use client";

import { motion } from "framer-motion";

/**
 * Route geçiş animasyonu.
 * `opacity: 0`'dan başlatmıyoruz çünkü sayfa boyutu büyük olduğunda
 * (özellikle koleksiyon sekmesi geçişlerinde) altta loading.tsx veya
 * boş alan görünüp "beyaz flash" hissi yaratıyordu. 0.6'dan başlatınca
 * yeni içerik anında belirir, sadece son rötuş cross-fade ile yumuşar.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0.6, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
