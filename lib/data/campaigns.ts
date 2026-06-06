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
export const CAMPAIGNS: Campaign[] = [];

export function getActiveCampaign(now = new Date()): Campaign | null {
  const active = CAMPAIGNS.filter((c) => new Date(c.endsAt) > now);
  // En yakın bitenden başla — aciliyet hissi
  active.sort(
    (a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime(),
  );
  return active[0] ?? null;
}
