import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Sunucu tarafı admin oturumu.
 * Şifre ve gizli anahtar ortam değişkenlerinden gelir:
 *   ADMIN_PASSWORD  — panel giriş şifresi
 *   ADMIN_SECRET    — oturum imzalama anahtarı (uzun rastgele bir metin)
 * Oturum httpOnly cookie'de tutulur (tarayıcıdan okunamaz, güvenli).
 */

export const ADMIN_COOKIE = "floria_admin";
const TTL_SECONDS = 7 * 24 * 60 * 60; // 7 gün

function secret(): string {
  const value = process.env.ADMIN_SECRET;
  if (!value) {
    // Üretimde gizli anahtar yoksa oturum token'ları taklit edilebilir.
    // Sessizce zayıf bir varsayılana düşmek yerine net hata veriyoruz.
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "ADMIN_SECRET tanımlı değil. Vercel → Settings → Environment Variables içine en az 32 karakterlik bir değer girin.",
      );
    }
    return "dev-only-insecure-admin-secret";
  }
  return value;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const exp = Date.now() + TTL_SECONDS * 1000;
  const payload = `admin.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [who, exp, sig] = parts;
  if (sign(`${who}.${exp}`) !== sig) return false;
  if (Number(exp) < Date.now()) return false;
  return true;
}

export function checkPassword(password: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  // Sabit zamanlı karşılaştırma (timing saldırısına kapalı).
  const a = Buffer.from(password, "utf8");
  const b = Buffer.from(real, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** API route'larında: oturum geçerli mi? */
export function isAuthed(): boolean {
  return verifySessionToken(cookies().get(ADMIN_COOKIE)?.value);
}
