import { NextResponse } from "next/server";
import { getSetting } from "@/lib/db/queries";

/** Public: bakım modu açık mı? (settings tablosundan) */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const v = await getSetting("maintenance");
    return NextResponse.json({ maintenance: v === "1" });
  } catch {
    return NextResponse.json({ maintenance: false });
  }
}
