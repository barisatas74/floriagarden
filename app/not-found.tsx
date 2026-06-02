import Link from "next/link";
import { ArrowLeft, Flower2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center pt-28 pb-20">
      <div className="container max-w-3xl text-center flex flex-col items-center gap-8">
        <div className="relative">
          <span className="font-display text-[10rem] md:text-[14rem] leading-none text-rose-gold/15">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center">
            <Flower2
              size={80}
              strokeWidth={1.2}
              className="text-rose-gold opacity-90"
            />
          </span>
        </div>

        <div className="flex flex-col gap-4 max-w-lg">
          <span className="eyebrow">Sayfa Bulunamadı</span>
          <h1 className="heading-display">
            Bu çiçek henüz <span className="italic text-bordo">açmamış</span>
            <span className="text-rose-gold">.</span>
          </h1>
          <p className="text-coffee/70 leading-relaxed">
            Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Anasayfadan
            yeniden başlayabilir veya koleksiyonumuzu inceleyebilirsiniz.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button variant="gold" size="lg">
              <ArrowLeft size={16} strokeWidth={1.7} />
              <span>Anasayfa</span>
            </Button>
          </Link>
          <Link href="/urunler">
            <Button variant="outline" size="lg">
              Ürünleri Keşfet
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
