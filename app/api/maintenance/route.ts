import { NextResponse } from "next/server";
import { getSetting } from "@/lib/db/queries";

/** Public: bakım modu açık mı? (settings tablosundan) */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Bakım modu nadiren değişir → CDN + tarayıcıda 60 sn önbelleklenir.
// Böylece her sayfa açılışı sunucuya/DB'ye gitmez (Edge Request tasarrufu).
const CACHE = "public, max-age=60, s-maxage=60, stale-while-revalidate=300";

export async function GET() {
  try {
    const v = await getSetting("maintenance");
    return NextResponse.json(
      { maintenance: v === "1" },
      { headers: { "Cache-Control": CACHE } },
    );
  } catch {
    return NextResponse.json(
      { maintenance: false },
      { headers: { "Cache-Control": CACHE } },
    );
  }
}
