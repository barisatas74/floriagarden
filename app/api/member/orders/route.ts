import { NextResponse } from "next/server";
import { getMemberId } from "@/lib/member-auth";
import { getMemberById, getMemberOrders } from "@/lib/db/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const memberId = getMemberId();
  if (!memberId) {
    return NextResponse.json({ authed: false }, { status: 401 });
  }

  try {
    const member = await getMemberById(memberId);
    if (!member) return NextResponse.json({ authed: false }, { status: 401 });

    const orders = await getMemberOrders(member);
    return NextResponse.json({ authed: true, orders });
  } catch {
    return NextResponse.json(
      { authed: true, orders: [], error: "Sipariş bilgileri alınamadı." },
      { status: 500 },
    );
  }
}
