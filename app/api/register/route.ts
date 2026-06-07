import { NextResponse } from "next/server";
import { createMember, memberExistsByEmail } from "@/lib/db/queries";
import { makeId } from "@/lib/admin/store";

/** Public üye kaydı — members tablosuna yazar. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const name = String(b?.name ?? "").trim();
    const phone = String(b?.phone ?? "").trim();
    const email = String(b?.email ?? "").trim();
    const birthDate = b?.birthDate ? String(b.birthDate) : undefined;

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Ad ve telefon gereklidir." },
        { status: 400 },
      );
    }

    if (email && (await memberExistsByEmail(email))) {
      return NextResponse.json(
        { ok: false, error: "Bu e-posta ile zaten kayıt var." },
        { status: 409 },
      );
    }

    await createMember({ id: makeId("uye"), name, phone, email, birthDate });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Kayıt sırasında bir hata oluştu." },
      { status: 500 },
    );
  }
}
