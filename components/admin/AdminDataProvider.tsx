"use client";

import {
  createContext,
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
  Member,
  MemberCode,
  GeneralCode,
  DeliveryZone,
  DeliveryStep,
} from "@/lib/admin/types";
import { buildSeed } from "@/lib/admin/seed";
import { loadAdminData, saveAdminData, resetAdminData } from "@/lib/admin/store";

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
  // Demo sıfırla
  reset: () => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [data, setData] = useState<AdminData>(() => buildSeed());
  const [hydrated, setHydrated] = useState(false);
  const quotaWarned = useRef(false);

  // İlk yüklemede localStorage'dan oku (yoksa seed'ler)
  useEffect(() => {
    setData(loadAdminData());
    setHydrated(true);
  }, []);

  // Her değişiklikte kalıcılaştır (hidrasyon sonrası).
  // Kayıt başarısızsa (örn. çok sayıda fotoğraf → kota dolu) kullanıcıyı uyar.
  useEffect(() => {
    if (!hydrated) return;
    const ok = saveAdminData(data);
    if (!ok && !quotaWarned.current) {
      quotaWarned.current = true;
      toast({
        title: "Depolama sınırına ulaşıldı",
        description:
          "Tarayıcı belleği doldu. Daha az veya daha küçük fotoğraf kullanın; son değişiklik kaydedilemeyebilir.",
        tone: "warning",
      });
    } else if (ok) {
      quotaWarned.current = false;
    }
  }, [data, hydrated, toast]);

  const value: AdminContextValue = {
    data,
    hydrated,

    addCategory: (c) =>
      setData((d) => ({ ...d, categories: [...d.categories, c] })),
    updateCategory: (slug, patch) =>
      setData((d) => ({
        ...d,
        categories: d.categories.map((c) =>
          c.slug === slug ? { ...c, ...patch } : c,
        ),
      })),
    removeCategory: (slug) =>
      setData((d) => ({
        ...d,
        categories: d.categories.filter((c) => c.slug !== slug),
      })),

    addProduct: (p) =>
      setData((d) => ({ ...d, products: [p, ...d.products] })),
    updateProduct: (id, patch) =>
      setData((d) => ({
        ...d,
        products: d.products.map((p) =>
          p.id === id ? { ...p, ...patch } : p,
        ),
      })),
    removeProduct: (id) =>
      setData((d) => ({
        ...d,
        products: d.products.filter((p) => p.id !== id),
      })),

    addMemberCode: (memberId, code) =>
      setData((d) => ({
        ...d,
        members: d.members.map((m) =>
          m.id === memberId ? { ...m, codes: [code, ...m.codes] } : m,
        ),
      })),
    removeMemberCode: (memberId, code) =>
      setData((d) => ({
        ...d,
        members: d.members.map((m) =>
          m.id === memberId
            ? { ...m, codes: m.codes.filter((c) => c.code !== code) }
            : m,
        ),
      })),

    addGeneralCode: (code) =>
      setData((d) => ({ ...d, generalCodes: [code, ...d.generalCodes] })),
    removeGeneralCode: (code) =>
      setData((d) => ({
        ...d,
        generalCodes: d.generalCodes.filter((c) => c.code !== code),
      })),

    addDeliveryZone: (zone) =>
      setData((d) => ({ ...d, deliveryZones: [...d.deliveryZones, zone] })),
    updateDeliveryZone: (id, patch) =>
      setData((d) => ({
        ...d,
        deliveryZones: d.deliveryZones.map((z) =>
          z.id === id ? { ...z, ...patch } : z,
        ),
      })),
    removeDeliveryZone: (id) =>
      setData((d) => ({
        ...d,
        deliveryZones: d.deliveryZones.filter((z) => z.id !== id),
      })),

    addDeliveryStep: (step) =>
      setData((d) => ({ ...d, deliveryProcess: [...d.deliveryProcess, step] })),
    updateDeliveryStep: (id, patch) =>
      setData((d) => ({
        ...d,
        deliveryProcess: d.deliveryProcess.map((s) =>
          s.id === id ? { ...s, ...patch } : s,
        ),
      })),
    removeDeliveryStep: (id) =>
      setData((d) => ({
        ...d,
        deliveryProcess: d.deliveryProcess.filter((s) => s.id !== id),
      })),

    reset: () => setData(resetAdminData()),
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
