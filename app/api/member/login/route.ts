import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getMemberAuthByEmail } from "@/lib/db/queries";
import {
  verifyPassword,
  createMemberSession,
  MEMBER_COOKIE,
  MEMBER_TTL,
} from "@/lib/member-auth";
import { enforceRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Brute-force koruması: IP başına 15 dakikada en fazla 10 deneme.
  const limited = enforceRateLimit(req, {
    name: "member-login",
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const b = await req.json();
    const email = String(b?.email ?? "").trim().toLowerCase();
    const password = String(b?.password ?? "");
    if (!email || !password) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const m = await getMemberAuthByEmail(email);
    if (!m || !m.passwordHash || !verifyPassword(password, m.passwordHash)) {
      return NextResponse.json(
        { ok: false, error: "E-posta veya şifre hatalı." },
        { status: 401 },
      );
    }

    cookies().set(MEMBER_COOKIE, createMemberSession(m.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MEMBER_TTL,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
