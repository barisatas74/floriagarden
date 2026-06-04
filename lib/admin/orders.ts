import type { Order, OrderStatus, PaymentMethod } from "./types";

export const ORDER_STATUSES: OrderStatus[] = [
  "yeni",
  "hazirlaniyor",
  "yolda",
  "teslim",
  "iptal",
];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  yeni: "Yeni",
  hazirlaniyor: "Hazırlanıyor",
  yolda: "Yolda",
  teslim: "Teslim edildi",
  iptal: "İptal",
};

export const STATUS_STYLE: Record<OrderStatus, string> = {
  yeni: "bg-bordo/10 text-bordo border-bordo/25",
  hazirlaniyor: "bg-rose-gold/15 text-rose-goldDark border-rose-gold/35",
  yolda: "bg-coffee/10 text-coffee border-coffee/20",
  teslim: "bg-sage/15 text-sage-deep border-sage/30",
  iptal: "bg-coffee/5 text-coffee/40 border-coffee/15",
};

export const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  nakit: "Nakit",
  havale: "Havale/EFT",
  kapida: "Kapıda ödeme",
};

export function orderTotal(o: Order): number {
  return o.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

/** Okunabilir sipariş no: FG-YYMMDD-RRR */
export function generateOrderNo(): string {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(
    d.getMonth() + 1,
  ).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const r = Math.floor(100 + Math.random() * 900);
  return `FG-${ymd}-${r}`;
}

/** Yerel bugünün tarihi (yyyy-mm-dd). */
export function todayDateStr(today = new Date()): string {
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(today.getDate()).padStart(2, "0")}`;
}

/** ISO datetime'ın günü bugüne eşit mi? */
export function isCreatedToday(iso: string, today = new Date()): boolean {
  const d = new Date(iso);
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

export function formatOrderDate(iso: string): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

/** WhatsApp için telefonu uluslararası biçime indirger. */
export function normalizeWaPhone(phone: string): string {
  let digits = (phone || "").replace(/\D/g, "");
  if (digits.startsWith("90")) return digits;
  if (digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10) return `90${digits}`;
  return digits;
}

export function waCustomerLink(phone: string, message: string): string {
  return `https://wa.me/${normalizeWaPhone(phone)}?text=${encodeURIComponent(
    message,
  )}`;
}

/** Duruma göre müşteriye gönderilecek hazır mesaj. */
export function statusWaMessage(o: Order): string {
  const ad = o.recipientName || o.customerName || "";
  const isim = ad ? ` ${ad}` : "";
  switch (o.status) {
    case "yeni":
      return `Merhaba${isim}, Floria Garden — siparişinizi aldık, en kısa sürede hazırlıyoruz 🌸`;
    case "hazirlaniyor":
      return `Merhaba${isim}, siparişiniz atölyemizde özenle hazırlanıyor 🌷`;
    case "yolda":
      return `Merhaba${isim}, siparişiniz yola çıktı, çok yakında teslim edilecek 🌿`;
    case "teslim":
      return `Merhaba${isim}, siparişiniz teslim edildi. Bizi tercih ettiğiniz için teşekkürler 🌹`;
    case "iptal":
      return `Merhaba${isim}, siparişinizle ilgili sizinle görüşmek istiyoruz.`;
    default:
      return `Merhaba${isim}, Floria Garden siparişiniz hakkında bilgilendirme.`;
  }
}
