"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, LayoutGrid, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { whatsappLink } from "@/lib/constants";

export default function MobileBottomBar() {
  const { totalQuantity, openDrawer } = useCart();

  return (
    <motion.nav
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-bordo-dark/95 backdrop-blur-lg border-t border-rose-gold/20 shadow-card"
      aria-label="Hızlı erişim çubuğu"
    >
      <div className="grid grid-cols-4 h-16">
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-1 text-cream/75 hover:text-rose-goldLight transition-colors"
          aria-label="Anasayfa"
        >
          <Home size={18} strokeWidth={1.6} />
          <span className="text-[0.65rem] uppercase tracking-wider2">Ana</span>
        </Link>

        <Link
          href="/urunler"
          className="flex flex-col items-center justify-center gap-1 text-cream/75 hover:text-rose-goldLight transition-colors"
          aria-label="Tüm ürünler"
        >
          <LayoutGrid size={18} strokeWidth={1.6} />
          <span className="text-[0.65rem] uppercase tracking-wider2">Ürün</span>
        </Link>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-cream/75 hover:text-rose-goldLight transition-colors"
          aria-label="WhatsApp"
        >
          <MessageCircle size={18} strokeWidth={1.6} />
          <span className="text-[0.65rem] uppercase tracking-wider2">Mesaj</span>
        </a>

        <button
          type="button"
          onClick={openDrawer}
          className="relative flex flex-col items-center justify-center gap-1 text-cream/75 hover:text-rose-goldLight transition-colors"
          aria-label={`Sepet (${totalQuantity} ürün)`}
        >
          <ShoppingBag size={18} strokeWidth={1.6} />
          <span className="text-[0.65rem] uppercase tracking-wider2">Sepet</span>
          {totalQuantity > 0 && (
            <span className="absolute top-1.5 right-[28%] min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center rounded-full bg-rose-gold text-coffee text-[0.6rem] font-semibold">
              {totalQuantity > 9 ? "9+" : totalQuantity}
            </span>
          )}
        </button>
      </div>
    </motion.nav>
  );
}
