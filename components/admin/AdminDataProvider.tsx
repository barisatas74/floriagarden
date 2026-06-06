"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useToast } from "@/components/toast/ToastProvider";
import type {
  AdminData,
  AdminCategory,
  AdminProduct,
  MemberCode,
  GeneralCode,
  DeliveryZone,
  DeliveryStep,
  Order,
} from "@/lib/admin/types";

type AdminContextValue = {
  data: AdminData;
  hydrated: boolean;
  // Kategoriler
  addCategory: (c: AdminCategory) => void;
  updateCategory: (slug: string, patch: Partial<AdminCategory>) => void;
  removeCategory: (slug: string) => void;
  // Ürünler
  addProduct: (p: AdminProduct) => void;
  updateProduct: (id: string, patch: Partial<AdminProduct>) => void;
  removeProduct: (id: string) => void;
  // Üyeler
  addMemberCode: (memberId: string, code: MemberCode) => void;
  removeMemberCode: (memberId: string, code: string) => void;
  // Genel kodlar
  addGeneralCode: (code: GeneralCode) => void;
  removeGeneralCode: (code: string) => void;
  // Teslimat bölgeleri
  addDeliveryZone: (zone: DeliveryZone) => void;
  updateDeliveryZone: (id: string, patch: Partial<DeliveryZone>) => void;
  removeDeliveryZone: (id: string) => void;
  // Teslimat süreci
  addDeliveryStep: (step: DeliveryStep) => void;
  updateDeliveryStep: (id: string, patch: Partial<DeliveryStep>) => void;
  removeDeliveryStep: (id: string) => void;
  // Siparişler
  addOrder: (order: Order) => void;
  updateOrder: (id: string, patch: Partial<Order>) => void;
  removeOrder: (id: string) => void;
  // Sunucudan yeniden yükle
  reset: () => void;
};

const EMPTY: AdminData = {
  categories: [],
  products: [],
  members: [],
  generalCodes: [],
  deliveryZones: [],
  deliveryProcess: [],
  orders: [],
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [data, setData] = useState<AdminData>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json()) as AdminData;
      setData(json);
    } catch {
      toast({
        title: "Veriler yüklenemedi",
        description: "Veritabanına ulaşılamadı. Sayfayı yenileyin.",
        tone: "warning",
      });
    } finally {
      setHydrated(true);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const send = useCallback(
    async (op: string, payload: unknown) => {
      try {
        const res = await fetch("/api/admin/mutate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ op, data: payload }),
        });
        if (!res.ok) throw new Error(String(res.status));
      } catch {
        toast({
          title: "Kaydedilemedi",
          description: "Sunucuya ulaşılamadı; değişiklik kalıcı olmayabilir.",
          tone: "warning",
        });
      }
    },
    [toast],
  );

  const value: AdminContextValue = {
    data,
    hydrated,

    addCategory: (c) => {
      setData((d) => ({ ...d, categories: [...d.categories, c] }));
      void send("category.create", c);
    },
    updateCategory: (slug, patch) => {
      const existing = dataRef.current.categories.find((c) => c.slug === slug);
      const merged = existing ? { ...existing, ...patch } : undefined;
      setData((d) => ({
        ...d,
        categories: d.categories.map((c) =>
          c.slug === slug ? { ...c, ...patch } : c,
        ),
      }));
      if (merged) void send("category.update", merged);
    },
    removeCategory: (slug) => {
      setData((d) => ({
        ...d,
        categories: d.categories.filter((c) => c.slug !== slug),
      }));
      void send("category.delete", slug);
    },

    addProduct: (p) => {
      setData((d) => ({ ...d, products: [p, ...d.products] }));
      void send("product.create", p);
    },
    updateProduct: (id, patch) => {
      const existing = dataRef.current.products.find((p) => p.id === id);
      const merged = existing ? { ...existing, ...patch } : undefined;
      setData((d) => ({
        ...d,
        products: d.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      }));
      if (merged) void send("product.update", merged);
    },
    removeProduct: (id) => {
      setData((d) => ({
        ...d,
        products: d.products.filter((p) => p.id !== id),
      }));
      void send("product.delete", id);
    },

    addMemberCode: (memberId, code) => {
      setData((d) => ({
        ...d,
        members: d.members.map((m) =>
          m.id === memberId ? { ...m, codes: [code, ...m.codes] } : m,
        ),
      }));
      void send("memberCode.add", { memberId, code });
    },
    removeMemberCode: (memberId, code) => {
      setData((d) => ({
        ...d,
        members: d.members.map((m) =>
          m.id === memberId
            ? { ...m, codes: m.codes.filter((c) => c.code !== code) }
            : m,
        ),
      }));
      void send("memberCode.remove", code);
    },

    addGeneralCode: (code) => {
      setData((d) => ({ ...d, generalCodes: [code, ...d.generalCodes] }));
      void send("generalCode.add", code);
    },
    removeGeneralCode: (code) => {
      setData((d) => ({
        ...d,
        generalCodes: d.generalCodes.filter((c) => c.code !== code),
      }));
      void send("generalCode.remove", code);
    },

    addDeliveryZone: (zone) => {
      setData((d) => ({ ...d, deliveryZones: [...d.deliveryZones, zone] }));
      void send("zone.create", zone);
    },
    updateDeliveryZone: (id, patch) => {
      const existing = dataRef.current.deliveryZones.find((z) => z.id === id);
      const merged = existing ? { ...existing, ...patch } : undefined;
      setData((d) => ({
        ...d,
        deliveryZones: d.deliveryZones.map((z) =>
          z.id === id ? { ...z, ...patch } : z,
        ),
      }));
      if (merged) void send("zone.update", merged);
    },
    removeDeliveryZone: (id) => {
      setData((d) => ({
        ...d,
        deliveryZones: d.deliveryZones.filter((z) => z.id !== id),
      }));
      void send("zone.delete", id);
    },

    addDeliveryStep: (step) => {
      setData((d) => ({ ...d, deliveryProcess: [...d.deliveryProcess, step] }));
      void send("step.create", step);
    },
    updateDeliveryStep: (id, patch) => {
      const existing = dataRef.current.deliveryProcess.find((x) => x.id === id);
      const merged = existing ? { ...existing, ...patch } : undefined;
      setData((d) => ({
        ...d,
        deliveryProcess: d.deliveryProcess.map((x) =>
          x.id === id ? { ...x, ...patch } : x,
        ),
      }));
      if (merged) void send("step.update", merged);
    },
    removeDeliveryStep: (id) => {
      setData((d) => ({
        ...d,
        deliveryProcess: d.deliveryProcess.filter((x) => x.id !== id),
      }));
      void send("step.delete", id);
    },

    addOrder: (order) => {
      setData((d) => ({ ...d, orders: [order, ...d.orders] }));
      void send("order.create", order);
    },
    updateOrder: (id, patch) => {
      const existing = dataRef.current.orders.find((o) => o.id === id);
      const merged = existing ? { ...existing, ...patch } : undefined;
      setData((d) => ({
        ...d,
        orders: d.orders.map((o) => (o.id === id ? { ...o, ...patch } : o)),
      }));
      if (merged) void send("order.update", merged);
    },
    removeOrder: (id) => {
      setData((d) => ({
        ...d,
        orders: d.orders.filter((o) => o.id !== id),
      }));
      void send("order.delete", id);
    },

    reset: () => {
      void load();
    },
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminContext);
  if (!ctx)
    throw new Error("useAdminData, AdminDataProvider içinde kullanılmalı.");
  return ctx;
}
