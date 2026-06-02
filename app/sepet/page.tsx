import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CartPageClient from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Sepetim",
  description:
    "Sepetinizdeki ürünleri inceleyin, kart notunuzu ekleyin ve WhatsApp üzerinden siparişinizi tamamlayın.",
};

export default function CartPage() {
  return (
    <article className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container">
        <Breadcrumb items={[{ label: "Sepetim" }]} className="mb-8" />

        <header className="flex flex-col items-start gap-3 mb-10 max-w-2xl">
          <span className="eyebrow">Sipariş</span>
          <h1 className="heading-display">
            Sepetiniz<span className="text-rose-gold">.</span>
          </h1>
          <p className="text-coffee/70 leading-relaxed">
            Seçtiğiniz ürünleri gözden geçirin, dilerseniz kart notu ve
            teslimat tercihinizi düzenleyin, ardından WhatsApp üzerinden
            siparişinizi tamamlayın.
          </p>
        </header>

        <CartPageClient />
      </div>
    </article>
  );
}
