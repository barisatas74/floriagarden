import { NextResponse } from "next/server";
import { getMemberId } from "@/lib/member-auth";
import {
  getMemberAddresses,
  getMemberWithCodes,
} from "@/lib/db/queries";
import type { MemberAddress } from "@/lib/admin/types";

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

    const warnings: string[] = [];
    let addresses: MemberAddress[] = [];

    try {
      addresses = await getMemberAddresses(memberId);
    } catch {
      warnings.push("Adres bilgileri şu anda alınamadı.");
    }

    return NextResponse.json({
      authed: true,
      member,
      addresses,
      orders: [],
      warnings,
    });
  } catch {
    return NextResponse.json(
      { authed: true, error: "Hesap bilgileri alınamadı." },
      { status: 500 },
    );
  }
}
