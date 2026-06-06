export type Coupon = {
  code: string;
  /** İndirim türü */
  type: "percent" | "fixed";
  /** Yüzde için 0–100, sabit için TRY tutarı */
  value: number;
  /** Uygulanabilir minimum sepet tutarı */
  minSubtotal?: number;
  /** Kullanıcıya gösterilen kısa açıklama */
  description: string;
  /** Son kullanma tarihi (ISO, opsiyonel) */
  expiresAt?: string;
};

/**
 * Statik kupon havuzu — gerçek kullanım hesabı için backend gerek
 * ama indirim doğrulaması ve UX akışı tamamen client-side çalışır.
 */
export const COUPONS: Coupon[] = [];

export type CouponValidation =
  | { ok: true; coupon: Coupon; discount: number }
  | { ok: false; reason: string };

export function validateCoupon(
  code: string,
  subtotal: number,
  now = new Date(),
): CouponValidation {
  const normalized = code.trim().toUpperCase();
  const coupon = COUPONS.find((c) => c.code === normalized);
  if (!coupon) {
    return { ok: false, reason: "Kupon kodu geçersiz." };
  }
  if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
    return { ok: false, reason: "Kuponun süresi dolmuş." };
  }
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      ok: false,
      reason: `Bu kupon ${new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        maximumFractionDigits: 0,
      }).format(coupon.minSubtotal)} üzeri sepetlerde geçerlidir.`,
    };
  }
  const discount =
    coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value;
  return { ok: true, coupon, discount };
}
