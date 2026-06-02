"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import Button from "@/components/ui/Button";

const STORAGE_KEY = "floria-cookie-consent-v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = window.localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        // Sayfa yüklenir yüklenmez göstermek yerine, küçük gecikmeyle
        const t = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(t);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-20 inset-x-4 md:left-6 md:right-auto md:max-w-md lg:bottom-6 z-50 glass-dark rounded-2xl p-5 shadow-card"
          role="dialog"
          aria-label="Çerez bilgilendirmesi"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-gold-gradient text-coffee">
              <Cookie size={18} strokeWidth={1.7} />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-lg text-coffee">
                Çerez Tercihiniz
              </h3>
              <p className="mt-1 text-xs text-coffee/70 leading-relaxed">
                Floria Garden, deneyiminizi geliştirmek için temel çerezleri
                kullanır.{" "}
                <Link
                  href="/cerez-politikasi"
                  className="text-bordo underline-offset-2 hover:underline"
                >
                  Daha fazla bilgi
                </Link>
                .
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  variant="gold"
                  onClick={accept}
                  className="!h-9 !px-4 text-xs"
                >
                  Kabul Ediyorum
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={dismiss}
                  className="!h-9 !px-4 text-xs"
                >
                  Sadece zorunlu
                </Button>
              </div>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Çerez bildirimini kapat"
              className="text-coffee/50 hover:text-coffee transition-colors"
            >
              <X size={16} strokeWidth={1.6} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
