import { NextResponse } from "next/server";

/**
 * Basit, bağımlılıksız hız sınırlayıcı (brute-force / spam koruması).
 *
 * Bellekte sabit pencereli sayaç tutar. Vercel serverless'te her örnek
 * kendi belleğini taşıdığı için bu "best-effort" bir korumadır: tek bir
 * saldırganın saniyede yüzlerce denemesini ciddi biçimde yavaşlatır,
 * ama dağıtık bir saldırıya karşı tek başına yeterli değildir. Küçük bir
 * işletme sitesi için pratik ve yeterli ilk savunma hattıdır.
 *
 * Daha güçlü koruma gerekirse: Vercel KV / Upstash gibi paylaşımlı bir
 * sayaç deposuna taşınabilir (aynı arayüz korunur).
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

/** Süresi dolan kovaları ara sıra temizle (bellek sızıntısını önler). */
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  /** Sınır aşıldıysa kaç saniye sonra tekrar denenebileceği. */
  retryAfter: number;
};

/**
 * Belirtilen anahtar için pencere içindeki istek sayısını kontrol eder.
 * @param key      Benzersiz anahtar (örn. `login:1.2.3.4`).
 * @param limit    Pencere başına izin verilen istek sayısı.
 * @param windowMs Pencere uzunluğu (ms).
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/** İstek başlıklarından istemci IP'sini çıkarır (Vercel proxy arkası). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Tek satırlık koruma: sınır aşıldıysa hazır 429 yanıtı döner, aksi halde
 * null döner (çağıran normal akışa devam eder).
 *
 * @param bodyKey  429 gövdesindeki alan adı ("error" veya "reason").
 */
export function enforceRateLimit(
  req: Request,
  opts: {
    name: string;
    limit: number;
    windowMs: number;
    bodyKey?: "error" | "reason";
    message?: string;
  },
): NextResponse | null {
  const { name, limit, windowMs } = opts;
  const result = rateLimit(`${name}:${clientIp(req)}`, limit, windowMs);
  if (result.ok) return null;

  const bodyKey = opts.bodyKey ?? "error";
  const message =
    opts.message ??
    `Çok fazla deneme yaptınız. Lütfen ${result.retryAfter} saniye sonra tekrar deneyin.`;
  return NextResponse.json(
    { ok: false, [bodyKey]: message },
    { status: 429, headers: { "Retry-After": String(result.retryAfter) } },
  );
}
