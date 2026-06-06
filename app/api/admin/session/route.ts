import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin/auth-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ authed: isAuthed() });
}
