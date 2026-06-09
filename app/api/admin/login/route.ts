import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  checkPassword,
  createSessionToken,
} from "@/lib/admin/auth-server";
import { enforceRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Brute-force koruması: IP başına 15 dakikada en fazla 8 deneme.
  const limited = enforceRateLimit(req, {
    name: "admin-login",
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) return limited;

  let password = "";
  try {
    const body = await req.json();
    password = String(body?.password ?? "");
  } catch {
    /* boş */
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  cookies().set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return NextResponse.json({ ok: true });
}
