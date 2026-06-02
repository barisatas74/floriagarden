export type Campaign = {
  id: string;
  /** Banner mesajı */
  title: string;
  /** Kısa altmesaj */
  subtitle?: string;
  /** Hangi sayfaya yönlendirir */
  href: string;
  /** Bitiş tarihi (ISO) — geri sayım için */
  endsAt: string;
  /** UTM/etiket */
  tag?: string;
};

/**
 * Aktif kampanyalar listesi.
 * Tarihe göre otomatik seçilir; hiçbiri aktif değilse banner gösterilmez.
 */
export const CAMPAIGNS: Campaign[] = [
  {
    id: "anneler-gunu-2026",
    title: "Anneler Günü için son siparişler",
    subtitle: "Aynı gün teslimat — Gemlik içi",
    href: "/koleksiyon/ozel-gun-cicekleri",
    endsAt: "2026-05-31T23:59:00+03:00",
    tag: "Sezon",
  },
  {
    id: "yaz-koleksiyonu-2026",
    title: "Yaz Koleksiyonu yayında",
    subtitle: "Yeni mevsim çiçekleri keşfedin",
    href: "/urunler",
    endsAt: "2026-08-31T23:59:00+03:00",
    tag: "Yeni",
  },
];

export function getActiveCampaign(now = new Date()): Campaign | null {
  const active = CAMPAIGNS.filter((c) => new Date(c.endsAt) > now);
  // En yakın bitenden başla — aciliyet hissi
  active.sort(
    (a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime(),
  );
  return active[0] ?? null;
}
