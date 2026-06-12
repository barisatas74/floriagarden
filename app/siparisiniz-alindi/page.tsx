import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, PackageCheck, UserCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { whatsappLink } from "@/lib/constants";

type Props = {
  searchParams?: {
    order?: string;
  };
};

export const metadata: Metadata = {
  title: "Siparişiniz Alındı",
  description:
    "Floria Garden siparişiniz alındı. Sipariş detaylarını WhatsApp üzerinden tamamlayabilirsiniz.",
};

export default function OrderReceivedPage({ searchParams }: Props) {
  const orderNo = searchParams?.order?.trim() || "";
  const message = orderNo
    ? `Merhaba Floria Garden, ${orderNo} numaralı siparişimin teslimat ve ödeme bilgilerini tamamlamak istiyorum.`
    : "Merhaba Floria Garden, web sitesinden oluşturduğum siparişimin teslimat ve ödeme bilgilerini tamamlamak istiyorum.";

  return (
    <article className="relative overflow-hidden pt-28 md:pt-32 pb-20 md:pb-28 bg-cream-soft">
      <div className="absolute inset-0 edge-vines pointer-events-none" aria-hidden />
      <div className="container relative">
        <Breadcrumb items={[{ label: "Siparişiniz Alındı" }]} className="mb-10" />

        <div className="mx-auto max-w-3xl rounded-[2rem] border border-rose-gold/25 bg-white shadow-card p-7 md:p-10 text-center flex flex-col items-center gap-6">
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-rose-gold-gradient text-coffee shadow-glow">
            <CheckCircle2 size={34} strokeWidth={1.5} />
          </span>

          <div className="flex flex-col gap-3">
            <span className="eyebrow">Floria Garden</span>
            <h1 className="heading-display">
              Siparişiniz alındı
              <span className="text-rose-gold">.</span>
            </h1>
            <p className="text-coffee/65 leading-relaxed max-w-2xl">
              Sipariş kaydınız sisteme düştü. Şimdi teslimat bölgesi, alıcı
              bilgileri ve ödeme yöntemini WhatsApp üzerinden netleştirebiliriz.
            </p>
          </div>

          {orderNo && (
            <div className="rounded-2xl border border-rose-gold/25 bg-cream-soft px-5 py-4">
              <span className="block text-[0.7rem] uppercase tracking-wider2 text-rose-goldDark">
                Sipariş No
              </span>
              <span className="mt-1 block font-display text-3xl text-bordo">
                {orderNo}
              </span>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2 w-full max-w-xl">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="gold" size="lg" className="w-full">
                <MessageCircle size={18} strokeWidth={1.7} />
                WhatsApp&apos;a Devam Et
              </Button>
            </a>
            <Link href="/hesabim">
              <Button variant="outline" size="lg" className="w-full">
                <UserCircle size={18} strokeWidth={1.7} />
                Siparişlerim
              </Button>
            </Link>
          </div>

          <div className="w-full max-w-xl rounded-2xl border border-rose-gold/15 bg-cream-soft/70 p-4 text-left">
            <div className="flex gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-bordo border border-rose-gold/20">
                <PackageCheck size={17} strokeWidth={1.7} />
              </span>
              <p className="text-sm leading-relaxed text-coffee/65">
                Giriş yaptıysanız bu sipariş hesabınızdaki{" "}
                <span className="font-medium text-coffee">Siparişlerim</span>{" "}
                bölümünde görünür. Yönetim panelindeki sipariş listesine de aynı
                anda düştü.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
