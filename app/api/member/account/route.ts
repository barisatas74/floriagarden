import { NextResponse } from "next/server";
import { getMemberId } from "@/lib/member-auth";
import {
  getMemberAddresses,
  getMemberOrders,
  getMemberWithCodes,
} from "@/lib/db/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const memberId = getMemberId();
  if (!memberId) {
    return NextResponse.json({ authed: false }, { status: 401 });
  }

  try {
    const member = await getMemberWithCodes(memberId);
    if (!member) return NextResponse.json({ authed: false }, { status: 401 });

    const [addressesResult, ordersResult] = await Promise.allSettled([
      getMemberAddresses(memberId),
      getMemberOrders(member),
    ]);
    const warnings: string[] = [];

    if (addressesResult.status === "rejected") {
      warnings.push("Adres bilgileri şu anda alınamadı.");
    }
    if (ordersResult.status === "rejected") {
      warnings.push("Sipariş bilgileri şu anda alınamadı.");
    }

    return NextResponse.json({
      authed: true,
      member,
      addresses:
        addressesResult.status === "fulfilled" ? addressesResult.value : [],
      orders: ordersResult.status === "fulfilled" ? ordersResult.value : [],
      warnings,
    });
  } catch {
    return NextResponse.json(
      { authed: true, error: "Hesap bilgileri alınamadı." },
      { status: 500 },
    );
  }
}
