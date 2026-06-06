import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin/auth-server";
import * as db from "@/lib/db/queries";
import type {
  AdminCategory,
  AdminProduct,
  GeneralCode,
  MemberCode,
  DeliveryZone,
  DeliveryStep,
  Order,
} from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function POST(req: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let op = "";
  let data: any = null;
  try {
    const body = await req.json();
    op = String(body?.op ?? "");
    data = body?.data ?? null;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    switch (op) {
      // Kategoriler
      case "category.create":
        await db.createCategory(data as AdminCategory);
        break;
      case "category.update":
        await db.updateCategory((data as AdminCategory).slug, data as AdminCategory);
        break;
      case "category.delete":
        await db.deleteCategory(String(data));
        break;

      // Ürünler
      case "product.create":
        await db.createProduct(data as AdminProduct);
        break;
      case "product.update":
        await db.updateProduct((data as AdminProduct).id, data as AdminProduct);
        break;
      case "product.delete":
        await db.deleteProduct(String(data));
        break;

      // Üye kodları
      case "memberCode.add":
        await db.addMemberCode(
          String(data.memberId),
          data.code as MemberCode,
        );
        break;
      case "memberCode.remove":
        await db.removeMemberCode(String(data));
        break;

      // Genel kodlar
      case "generalCode.add":
        await db.addGeneralCode(data as GeneralCode);
        break;
      case "generalCode.remove":
        await db.removeGeneralCode(String(data));
        break;

      // Teslimat bölgeleri
      case "zone.create":
        await db.createDeliveryZone(data as DeliveryZone);
        break;
      case "zone.update":
        await db.updateDeliveryZone((data as DeliveryZone).id, data as DeliveryZone);
        break;
      case "zone.delete":
        await db.deleteDeliveryZone(String(data));
        break;

      // Teslimat süreci
      case "step.create":
        await db.createDeliveryStep(data as DeliveryStep);
        break;
      case "step.update":
        await db.updateDeliveryStep((data as DeliveryStep).id, data as DeliveryStep);
        break;
      case "step.delete":
        await db.deleteDeliveryStep(String(data));
        break;

      // Siparişler
      case "order.create":
        await db.createOrder(data as Order);
        break;
      case "order.update":
        await db.updateOrder((data as Order).id, data as Order);
        break;
      case "order.delete":
        await db.deleteOrder(String(data));
        break;

      default:
        return NextResponse.json({ error: "unknown_op" }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "db_error" },
      { status: 500 },
    );
  }
}
