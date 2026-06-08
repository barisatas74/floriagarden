import type { Order } from "@/lib/admin/types";
import { orderTotal, formatOrderDate, PAYMENT_LABEL } from "@/lib/admin/orders";
import { formatPrice } from "@/lib/utils/format";
import { SITE, whatsappLink } from "@/lib/constants";

function esc(t: string): string {
  return String(t ?? "").replace(/[&<>]/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;",
  );
}

function itemRows(o: Order): string {
  return o.items
    .map(
      (it) =>
        `<tr><td style="padding:6px 0;border-bottom:1px solid #f0e6da">${esc(it.name)} <span style="color:#a08">×${it.quantity}</span></td><td style="padding:6px 0;border-bottom:1px solid #f0e6da;text-align:right">${esc(formatPrice(it.price * it.quantity))}</td></tr>`,
    )
    .join("");
}

function wrap(inner: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;color:#2a1a14;max-width:560px;margin:auto;padding:24px">
    <div style="font-family:Georgia,serif;font-size:22px;color:#8e1f3f;font-weight:700">Floria Garden</div>
    <div style="font-size:12px;color:#a3823f;letter-spacing:1px;text-transform:uppercase;margin-bottom:16px">${esc(SITE.tagline)}</div>
    ${inner}
    <div style="margin-top:20px;font-size:12px;color:#8a7a70">${esc(SITE.address)} · ${esc(SITE.phoneDisplay)}</div>
  </div>`;
}

/** İşletmeye giden yeni sipariş bildirimi. */
export function buildBusinessEmail(o: Order): { subject: string; html: string } {
  const inner = `
    <h2 style="font-size:18px;margin:0 0 4px">Yeni sipariş 🌸 ${esc(o.orderNo)}</h2>
    <p style="color:#8a7a70;font-size:13px;margin:0 0 14px">${esc(formatOrderDate(o.createdAt))}</p>
    <div style="background:#faf6f0;border-radius:10px;padding:12px;font-size:14px">
      <b>Müşteri:</b> ${esc(o.customerName)} — ${esc(o.customerPhone)}${o.customerEmail ? ` — ${esc(o.customerEmail)}` : ""}<br>
      <b>Alıcı:</b> ${esc(o.recipientName || "-")} — ${esc(o.recipientPhone || "-")}<br>
      <b>Adres:</b> ${esc(o.address || "-")}<br>
      <b>Teslimat:</b> ${esc(o.deliveryZone || "-")} · ${esc(formatOrderDate(o.deliveryDate))} ${esc(o.deliverySlot || "")}<br>
      <b>Ödeme:</b> ${esc(PAYMENT_LABEL[o.payment])}${o.surprise ? " · Sürpriz" : ""}
    </div>
    ${o.cardNote ? `<div style="margin-top:10px"><b>Kart notu:</b><div style="font-style:italic;background:#faf6f0;border-radius:8px;padding:10px;margin-top:4px">${esc(o.cardNote)}</div></div>` : ""}
    <table style="width:100%;border-collapse:collapse;margin-top:14px;font-size:14px">${itemRows(o)}</table>
    <div style="text-align:right;font-weight:700;color:#8e1f3f;font-size:16px;margin-top:8px">Toplam: ${esc(formatPrice(orderTotal(o)))}</div>`;
  return { subject: `Yeni sipariş ${o.orderNo} — ${o.customerName}`, html: wrap(inner) };
}

/** Müşteriye giden sipariş onayı. */
export function buildCustomerEmail(o: Order): { subject: string; html: string } {
  const ad = o.recipientName || o.customerName || "";
  const inner = `
    <h2 style="font-size:18px;margin:0 0 6px">Siparişinizi aldık 🌸</h2>
    <p style="font-size:14px;line-height:1.6;color:#4a3a32">Merhaba ${esc(o.customerName)}, siparişiniz bize ulaştı ve özenle hazırlanmaya başlandı. Aşağıda özetini bulabilirsiniz.</p>
    <div style="background:#faf6f0;border-radius:10px;padding:12px;font-size:14px;margin-top:10px">
      <b>Sipariş No:</b> ${esc(o.orderNo)}<br>
      <b>Teslim tarihi:</b> ${esc(formatOrderDate(o.deliveryDate))} ${esc(o.deliverySlot || "")}<br>
      ${o.deliveryZone ? `<b>Bölge:</b> ${esc(o.deliveryZone)}` : ""}
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:14px;font-size:14px">${itemRows(o)}</table>
    <div style="text-align:right;font-weight:700;color:#8e1f3f;font-size:16px;margin-top:8px">Toplam: ${esc(formatPrice(orderTotal(o)))}</div>
    <p style="font-size:13px;color:#8a7a70;margin-top:16px">Sorularınız için <a href="${whatsappLink(`Merhaba, ${o.orderNo} numaralı siparişim hakkında...`)}" style="color:#8e1f3f">WhatsApp</a> üzerinden bize ulaşabilirsiniz.${ad ? "" : ""}</p>`;
  return { subject: `Siparişiniz alındı — ${o.orderNo} · Floria Garden`, html: wrap(inner) };
}
