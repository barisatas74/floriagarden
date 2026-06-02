"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";
import Button from "@/components/ui/Button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    // Üretimde Sentry gibi bir izleme servisine gönderilecek
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <section className="min-h-[80vh] flex items-center pt-28 pb-20">
      <div className="container max-w-2xl text-center flex flex-col items-center gap-7">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-bordo-300/15 border border-bordo-300/40 text-bordo-200">
          <AlertTriangle size={26} strokeWidth={1.5} />
        </span>

        <div className="flex flex-col gap-3 max-w-md">
          <span className="eyebrow">Bir şeyler ters gitti</span>
          <h1 className="heading-display">
            Çiçek demetini{" "}
            <span className="italic text-rose-goldLight">toparlayamadık</span>
            <span className="text-rose-gold">.</span>
          </h1>
          <p className="text-coffee/70 leading-relaxed">
            Beklenmeyen bir sorun yaşadık. Sayfayı yenilemeyi deneyin; sorun
            sürerse WhatsApp&apos;tan bize ulaşabilirsiniz.
          </p>
          {error.digest && (
            <p className="text-xs text-coffee/40 font-mono">
              Hata kodu: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="gold" size="lg" onClick={reset}>
            <RefreshCw size={16} strokeWidth={1.7} />
            <span>Yeniden Dene</span>
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              <Home size={16} strokeWidth={1.7} />
              <span>Anasayfa</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
