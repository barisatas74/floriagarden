import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Üye kimlik doğrulama (admin'den ayrı).
 * Şifreler scrypt ile hash'lenir; oturum httpOnly imzalı cookie.
 */

export const MEMBER_COOKIE = "floria_member";
const TTL_SECONDS = 30 * 24 * 60 * 60;

function secret(): string {
  const value = process.env.MEMBER_SECRET ?? process.env.ADMIN_SECRET;
  if (!value) {
    // Üretimde gizli anahtar yoksa üye oturumları taklit edilebilir.
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "MEMBER_SECRET (veya ADMIN_SECRET) tanımlı değil. Vercel → Settings → Environment Variables içine en az 32 karakterlik bir değer girin.",
      );
    }
    return "dev-only-insecure-member-secret";
  }
  return value;
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  if (!stored || !stored.includes(":")) return false;
  const [salt, hash] = stored.split(":");
  try {
    const test = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(test, "hex"));
  } catch {
    return false;
  }
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

function encodePayload(memberId: string, exp: number): string {
  return Buffer.from(JSON.stringify({ memberId, exp }), "utf8").toString(
    "base64url",
  );
}

function parsePayload(payload: string): { memberId: string; exp: number } | null {
  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { memberId?: unknown; exp?: unknown };
    if (typeof parsed.memberId !== "string") return null;
    const exp = Number(parsed.exp);
    if (!Number.isFinite(exp)) return null;
    return { memberId: parsed.memberId, exp };
  } catch {
    return null;
  }
}

export function createMemberSession(memberId: string): string {
  const exp = Date.now() + TTL_SECONDS * 1000;
  const payload = encodePayload(memberId, exp);
  return `${payload}.${sign(payload)}`;
}

/** Geçerli oturumdaki üye id'si (yoksa null). */
export function getMemberId(): string | null {
  const token = cookies().get(MEMBER_COOKIE)?.value;
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length === 2) {
    const [payload, sig] = parts;
    if (sign(payload) !== sig) return null;
    const parsed = parsePayload(payload);
    if (!parsed || parsed.exp < Date.now()) return null;
    return parsed.memberId;
  }
  if (parts.length === 3) {
    const [id, exp, sig] = parts;
    if (sign(`${id}.${exp}`) !== sig) return null;
    if (Number(exp) < Date.now()) return null;
    return id;
  }
  return null;
}

export const MEMBER_TTL = TTL_SECONDS;
