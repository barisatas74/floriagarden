import crypto from "crypto";
import { NextResponse } from "next/server";
import {
  getValidPasswordResetMember,
  markPasswordResetTokenUsed,
  updateMemberPassword,
} from "@/lib/db/queries";
import { hashPassword } from "@/lib/member-auth";
import { enforceRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function tokenHash(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(req: Request) {
  // Token tahmin/deneme koruması: IP başına saatte en fazla 20 deneme.
  const limited = enforceRateLimit(req, {
    name: "reset-confirm",
    limit: 20,
    windowMs: 60 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();
    const token = String(body?.token ?? "").trim();
    const password = String(body?.password ?? "");

    if (!token || password.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Bağlantı geçersiz veya şifre çok kısa." },
        { status: 400 },
      );
    }

    const hash = tokenHash(token);
    const memberId = await getValidPasswordResetMember(hash);
    if (!memberId) {
      return NextResponse.json(
        { ok: false, error: "Sıfırlama bağlantısı geçersiz veya süresi dolmuş." },
        { status: 400 },
      );
    }

    await updateMemberPassword(memberId, hashPassword(password));
    await markPasswordResetTokenUsed(hash);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Şifre güncellenemedi. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}
