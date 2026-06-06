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
  return process.env.ADMIN_SECRET ?? "degistir-bu-gizli-anahtari";
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
  return password === real;
}

/** API route'larında: oturum geçerli mi? */
export function isAuthed(): boolean {
  return verifySessionToken(cookies().get(ADMIN_COOKIE)?.value);
}
