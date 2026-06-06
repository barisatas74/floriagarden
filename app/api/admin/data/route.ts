import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin/auth-server";
import { getAdminData } from "@/lib/db/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const data = await getAdminData();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "db_error" },
      { status: 500 },
    );
  }
}
