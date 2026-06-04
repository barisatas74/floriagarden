"use client";

import { useState, type FormEvent } from "react";
import { Plus, Pencil, Trash2, MapPin, Route, Clock } from "lucide-react";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import {
  AdminPageHeader,
  AdminCard,
  Modal,
  ConfirmDialog,
  adminInput,
  adminLabel,
} from "@/components/admin/AdminUI";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/toast/ToastProvider";
import { makeId } from "@/lib/admin/store";
import {
  DELIVERY_ICON_KEYS,
  deliveryIcon,
} from "@/lib/admin/deliveryIcons";
import { cn } from "@/lib/utils/cn";
import type { DeliveryZone, DeliveryStep } from "@/lib/admin/types";

export default function TeslimatPage() {
  const {
    data,
    addDeliveryZone,
    updateDeliveryZone,
    removeDeliveryZone,
    addDeliveryStep,
    updateDeliveryStep,
    removeDeliveryStep,
  } = useAdminData();
  const { toast } = useToast();

  /* ── Bölge state ── */
  const [zoneOpen, setZoneOpen] = useState(false);
  const [zoneEdit, setZoneEdit] = useState<DeliveryZone | null>(null);
  const [zoneDelete, setZoneDelete] = useState<DeliveryZone | null>(null);
  const [zName, setZName] = useState("");
  const [zEta, setZEta] = useState("");
  const [zFee, setZFee] = useState("");
  const [zNote, setZNote] = useState("");

  const openZone = (z?: DeliveryZone) => {
    setZoneEdit(z ?? null);
    setZName(z?.name ?? "");
    setZEta(z?.eta ?? "");
    setZFee(z?.fee ?? "");
    setZNote(z?.note ?? "");
    setZoneOpen(true);
  };

  const submitZone = (e: FormEvent) => {
    e.preventDefault();
    if (!zName.trim()) return;
    const base = {
      name: zName.trim(),
      eta: zEta.trim(),
      fee: zFee.trim(),
      note: zNote.trim(),
    };
    if (zoneEdit) {
      updateDeliveryZone(zoneEdit.id, base);
      toast({ title: "Bölge güncellendi", tone: "success" });
    } else {
      addDeliveryZone({ id: makeId("zone"), ...base });
      toast({ title: "Bölge eklendi", tone: "success" });
    }
    setZoneOpen(false);
  };

  /* ── Süreç state ── */
  const [stepOpen, setStepOpen] = useState(false);
  const [stepEdit, setStepEdit] = useState<DeliveryStep | null>(null);
  const [stepDelete, setStepDelete] = useState<DeliveryStep | null>(null);
  const [sIcon, setSIcon] = useState(DELIVERY_ICON_KEYS[0]);
  const [sTitle, setSTitle] = useState("");
  const [sText, setSText] = useState("");

  const openStep = (s?: DeliveryStep) => {
    setStepEdit(s ?? null);
    setSIcon(s?.icon ?? DELIVERY_ICON_KEYS[0]);
    setSTitle(s?.title ?? "");
    setSText(s?.text ?? "");
    setStepOpen(true);
  };

  const submitStep = (e: FormEvent) => {
    e.preventDefault();
    if (!sTitle.trim()) return;
    const base = { icon: sIcon, title: sTitle.trim(), text: sText.trim() };
    if (stepEdit) {
      updateDeliveryStep(stepEdit.id, base);
      toast({ title: "Adım güncellendi", tone: "success" });
    } else {
      addDeliveryStep({ id: makeId("step"), ...base });
      toast({ title: "Adım eklendi", tone: "success" });
    }
    setStepOpen(false);
  };

  return (
    <div>
      <AdminPageHeader
        title="Teslimat"
        description="Teslimat bölgeleri, süreleri, fiyatları ve teslimat sürecini düzenleyin."
      />

      {/* ── BÖLGELER ── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 font-display text-2xl text-coffee">
          <MapPin size={20} strokeWidth={1.7} className="text-rose-gold" />
          Teslimat Bölgeleri
        </h2>
        <Button variant="gold" size="sm" onClick={() => openZone()}>
          <Plus size={16} strokeWidth={2} />
          Yeni Bölge
        </Button>
      </div>

      <AdminCard className="divide-y divide-rose-gold/12 overflow-hidden mb-10">
        {data.deliveryZones.length === 0 ? (
          <p className="p-6 text-sm text-coffee/50">Henüz bölge yok.</p>
        ) : (
          data.deliveryZones.map((z) => (
            <div
              key={z.id}
              className="flex items-center gap-4 p-4 sm:p-5 hover:bg-cream-soft/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg text-coffee leading-tight">
                  {z.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-coffee/55 mt-0.5">
                  <Clock size={13} strokeWidth={1.6} className="text-rose-goldDark" />
                  <span>{z.eta || "—"}</span>
                </div>
              </div>
              <div className="text-right mr-1">
                <span className="font-display text-lg text-bordo">
                  {z.fee || "—"}
                </span>
                <p className="text-xs text-coffee/45">{z.note}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openZone(z)}
                  aria-label={`${z.name} düzenle`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-gold/25 text-coffee/70 hover:text-bordo hover:border-bordo transition-colors"
                >
                  <Pencil size={15} strokeWidth={1.7} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoneDelete(z)}
                  aria-label={`${z.name} sil`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-gold/25 text-coffee/70 hover:text-bordo hover:border-bordo transition-colors"
                >
                  <Trash2 size={15} strokeWidth={1.7} />
                </button>
              </div>
            </div>
          ))
        )}
      </AdminCard>

      {/* ── SÜREÇ ── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 font-display text-2xl text-coffee">
          <Route size={20} strokeWidth={1.7} className="text-rose-gold" />
          Teslimat Süreci
        </h2>
        <Button variant="gold" size="sm" onClick={() => openStep()}>
          <Plus size={16} strokeWidth={2} />
          Yeni Adım
        </Button>
      </div>

      <AdminCard className="divide-y divide-rose-gold/12 overflow-hidden">
        {data.deliveryProcess.length === 0 ? (
          <p className="p-6 text-sm text-coffee/50">Henüz adım yok.</p>
        ) : (
          data.deliveryProcess.map((s, i) => {
            const Icon = deliveryIcon(s.icon);
            return (
              <div
                key={s.id}
                className="flex items-center gap-4 p-4 sm:p-5 hover:bg-cream-soft/50 transition-colors"
              >
                <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-rose-gold-gradient text-coffee">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg text-coffee leading-tight">
                    <span className="text-rose-goldDark/60 mr-1.5">{i + 1}.</span>
                    {s.title}
                  </h3>
                  <p className="text-sm text-coffee/55 truncate">{s.text}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openStep(s)}
                    aria-label={`${s.title} düzenle`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-gold/25 text-coffee/70 hover:text-bordo hover:border-bordo transition-colors"
                  >
                    <Pencil size={15} strokeWidth={1.7} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setStepDelete(s)}
                    aria-label={`${s.title} sil`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-gold/25 text-coffee/70 hover:text-bordo hover:border-bordo transition-colors"
                  >
                    <Trash2 size={15} strokeWidth={1.7} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </AdminCard>

      {/* Bölge formu */}
      <Modal
        open={zoneOpen}
        onClose={() => setZoneOpen(false)}
        title={zoneEdit ? "Bölgeyi Düzenle" : "Yeni Bölge"}
      >
        <form onSubmit={submitZone} className="flex flex-col gap-5">
          <div>
            <label htmlFor="z-name" className={adminLabel}>
              Bölge adı
            </label>
            <input
              id="z-name"
              value={zName}
              onChange={(e) => setZName(e.target.value)}
              placeholder="Örn. Gemlik Merkez"
              autoFocus
              className={adminInput}
            />
          </div>
          <div>
            <label htmlFor="z-eta" className={adminLabel}>
              Süre
            </label>
            <input
              id="z-eta"
              value={zEta}
              onChange={(e) => setZEta(e.target.value)}
              placeholder="Örn. 60 — 120 dk"
              className={adminInput}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="z-fee" className={adminLabel}>
                Ücret
              </label>
              <input
                id="z-fee"
                value={zFee}
                onChange={(e) => setZFee(e.target.value)}
                placeholder="Örn. Ücretsiz / 75 ₺"
                className={adminInput}
              />
            </div>
            <div>
              <label htmlFor="z-note" className={adminLabel}>
                Açıklama
              </label>
              <input
                id="z-note"
                value={zNote}
                onChange={(e) => setZNote(e.target.value)}
                placeholder="Örn. 100 ₺ üzeri siparişlerde"
                className={adminInput}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={() => setZoneOpen(false)}>
              Vazgeç
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {zoneEdit ? "Kaydet" : "Ekle"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Adım formu */}
      <Modal
        open={stepOpen}
        onClose={() => setStepOpen(false)}
        title={stepEdit ? "Adımı Düzenle" : "Yeni Adım"}
      >
        <form onSubmit={submitStep} className="flex flex-col gap-5">
          <div>
            <span className={adminLabel}>İkon</span>
            <div className="grid grid-cols-5 gap-2">
              {DELIVERY_ICON_KEYS.map((key) => {
                const Icon = deliveryIcon(key);
                const active = sIcon === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSIcon(key)}
                    aria-label={key}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center justify-center aspect-square rounded-xl transition-all",
                      active
                        ? "bg-rose-gold-gradient text-coffee ring-2 ring-bordo ring-offset-2 ring-offset-white"
                        : "bg-cream-soft text-coffee/60 hover:text-bordo ring-1 ring-rose-gold/20",
                    )}
                  >
                    <Icon size={18} strokeWidth={1.6} />
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label htmlFor="s-title" className={adminLabel}>
              Başlık
            </label>
            <input
              id="s-title"
              value={sTitle}
              onChange={(e) => setSTitle(e.target.value)}
              placeholder="Örn. Sipariş hazırlama"
              autoFocus
              className={adminInput}
            />
          </div>
          <div>
            <label htmlFor="s-text" className={adminLabel}>
              Açıklama
            </label>
            <textarea
              id="s-text"
              value={sText}
              onChange={(e) => setSText(e.target.value)}
              placeholder="Adımın kısa açıklaması"
              rows={2}
              className={`${adminInput} h-auto py-3 resize-none`}
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={() => setStepOpen(false)}>
              Vazgeç
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {stepEdit ? "Kaydet" : "Ekle"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Silme onayları */}
      <ConfirmDialog
        open={!!zoneDelete}
        title="Bölgeyi sil"
        message={`"${zoneDelete?.name}" teslimat bölgesi silinecek. Devam edilsin mi?`}
        onConfirm={() => {
          if (zoneDelete) removeDeliveryZone(zoneDelete.id);
          toast({ title: "Bölge silindi", tone: "info" });
        }}
        onClose={() => setZoneDelete(null)}
      />
      <ConfirmDialog
        open={!!stepDelete}
        title="Adımı sil"
        message={`"${stepDelete?.title}" adımı silinecek. Devam edilsin mi?`}
        onConfirm={() => {
          if (stepDelete) removeDeliveryStep(stepDelete.id);
          toast({ title: "Adım silindi", tone: "info" });
        }}
        onClose={() => setStepDelete(null)}
      />
    </div>
  );
}
