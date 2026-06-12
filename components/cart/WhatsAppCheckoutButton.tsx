"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCart } from "./CartProvider";
import { useToast } from "@/components/toast/ToastProvider";

type Props = {
  label?: string;
  className?: string;
  onDone?: () => void;
};

type CheckoutResponse = {
  ok?: boolean;
  orderNo?: string;
  whatsappUrl?: string;
  error?: string;
};

export default function WhatsAppCheckoutButton({
  label = "WhatsApp ile Siparişi Tamamla",
  className,
  onDone,
}: Props) {
  const router = useRouter();
  const { state, subtotal, discount, total, coupon, clear } = useCart();
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  const submit = async () => {
    if (pending || state.items.length === 0) return;
    setPending(true);

    const waWindow = window.open("about:blank", "_blank");

    try {
      const res = await fetch("/api/orders/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: state.items,
          coupon: coupon
            ? {
                code: coupon.code,
                discount,
              }
            : null,
          totals: {
            subtotal,
            discount,
            total,
          },
        }),
      });
      const json = (await res.json()) as CheckoutResponse;
      if (!res.ok || !json.ok || !json.orderNo || !json.whatsappUrl) {
        throw new Error(json.error || "Sipariş kaydı oluşturulamadı.");
      }

      if (waWindow) {
        waWindow.opener = null;
        waWindow.location.href = json.whatsappUrl;
      }

      clear();
      onDone?.();
      router.push(
        `/siparisiniz-alindi?order=${encodeURIComponent(json.orderNo)}`,
      );
    } catch (error) {
      if (waWindow) waWindow.close();
      toast({
        title: "Sipariş oluşturulamadı",
        description:
          error instanceof Error
            ? error.message
            : "Lütfen tekrar deneyin veya WhatsApp'tan yazın.",
        tone: "warning",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      type="button"
      variant="gold"
      size="lg"
      className={className}
      onClick={submit}
      disabled={pending}
    >
      <MessageCircle size={18} strokeWidth={1.7} />
      <span>{pending ? "Sipariş oluşturuluyor..." : label}</span>
    </Button>
  );
}
