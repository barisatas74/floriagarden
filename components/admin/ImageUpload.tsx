"use client";

import { useCallback, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import { Upload, Pencil, Trash2, Check, X, RefreshCw, ImagePlus } from "lucide-react";
import GradientPicker from "./GradientPicker";
import { adminLabel } from "./AdminUI";

type Props = {
  /** Yüklenen görsel (WebP data URL) — yoksa gradient kullanılır */
  value?: string;
  onChange: (image: string | undefined) => void;
  /** Görsel yokken kullanılacak yer tutucu gradient */
  gradient: string;
  onGradientChange: (gradient: string) => void;
  /** Kırpma oranı (genişlik/yükseklik) */
  aspect?: number;
};

const MAX_OUTPUT_WIDTH = 1000;
const WEBP_QUALITY = 0.82;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Seçilen alanı kırpıp WebP data URL döndürür. */
async function cropToWebp(src: string, area: Area): Promise<string> {
  const img = await loadImage(src);
  const scale = Math.min(1, MAX_OUTPUT_WIDTH / area.width);
  const w = Math.max(1, Math.round(area.width * scale));
  const h = Math.max(1, Math.round(area.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas yok");
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, w, h);

  // Tüm formatlar burada WebP'e çevrilir.
  return canvas.toDataURL("image/webp", WEBP_QUALITY);
}

export default function ImageUpload({
  value,
  onChange,
  gradient,
  onGradientChange,
  aspect = 5 / 4,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [areaPixels, setAreaPixels] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setAreaPixels(pixels);
  }, []);

  const startEditing = (src: string) => {
    setSource(src);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAreaPixels(null);
    setFailed(false);
    setEditing(true);
  };

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // aynı dosya tekrar seçilebilsin
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => startEditing(reader.result as string);
    reader.readAsDataURL(file);
  };

  const applyCrop = async () => {
    if (!source || !areaPixels) return;
    setBusy(true);
    setFailed(false);
    try {
      const webp = await cropToWebp(source, areaPixels);
      onChange(webp);
      setEditing(false);
      setSource(null);
    } catch {
      // Görsel işlenemedi — düzenleme açık kalır, kullanıcı tekrar deneyebilir
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setSource(null);
  };

  return (
    <div>
      <span className={adminLabel}>Görsel</span>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onPickFile}
        className="hidden"
      />

      {/* ── Düzenleme (kırpma) modu ── */}
      {editing && source ? (
        <div className="flex flex-col gap-3">
          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-coffee-deep">
            <Cropper
              image={source}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              showGrid
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-coffee/55 whitespace-nowrap">
              Yakınlaştır
            </span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              aria-label="Yakınlaştırma"
              className="flex-1 accent-bordo cursor-pointer"
            />
          </div>

          <p className="text-xs text-coffee/45">
            Sürükleyerek konumlandırın, kaydırıcıyla yakınlaştırın. Kaydedince
            otomatik WebP&apos;e çevrilir.
          </p>

          {failed && (
            <p className="text-xs text-bordo">
              Görsel işlenemedi. Lütfen başka bir fotoğraf deneyin.
            </p>
          )}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-gold/30 text-coffee/70 hover:text-bordo hover:border-bordo px-4 h-10 text-sm transition-colors"
            >
              <X size={15} strokeWidth={1.8} />
              İptal
            </button>
            <button
              type="button"
              onClick={applyCrop}
              disabled={busy || !areaPixels}
              className="inline-flex items-center gap-1.5 rounded-full bg-bordo text-cream hover:bg-bordo-dark px-5 h-10 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Check size={15} strokeWidth={2} />
              {busy ? "İşleniyor…" : "Uygula"}
            </button>
          </div>
        </div>
      ) : value ? (
        /* ── Yüklü görsel önizleme ── */
        <div className="flex flex-col gap-3">
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-rose-gold/20"
            style={{ aspectRatio: String(aspect) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Yüklenen görsel"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => startEditing(value)}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-gold/30 text-coffee/75 hover:text-bordo hover:border-bordo px-4 h-10 text-sm transition-colors"
            >
              <Pencil size={14} strokeWidth={1.8} />
              Düzenle
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-gold/30 text-coffee/75 hover:text-bordo hover:border-bordo px-4 h-10 text-sm transition-colors"
            >
              <RefreshCw size={14} strokeWidth={1.8} />
              Değiştir
            </button>
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-gold/30 text-coffee/75 hover:text-bordo hover:border-bordo px-4 h-10 text-sm transition-colors"
            >
              <Trash2 size={14} strokeWidth={1.8} />
              Kaldır
            </button>
          </div>
        </div>
      ) : (
        /* ── Boş: yükleme + gradient yer tutucu ── */
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group flex flex-col items-center justify-center gap-2 w-full rounded-2xl border-2 border-dashed border-rose-gold/30 hover:border-bordo bg-cream-soft/60 hover:bg-cream-soft px-6 py-8 transition-colors"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-gold-gradient text-coffee">
              <Upload size={20} strokeWidth={1.7} />
            </span>
            <span className="text-sm font-medium text-coffee">
              Fotoğraf Yükle
            </span>
            <span className="text-xs text-coffee/50 text-center">
              JPG, PNG, HEIC, WebP… — otomatik WebP&apos;e çevrilir
            </span>
          </button>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-rose-gold/15" />
            <span className="text-[0.65rem] uppercase tracking-wider2 text-coffee/40">
              veya hazır renk
            </span>
            <span className="h-px flex-1 bg-rose-gold/15" />
          </div>

          <div className="flex items-start gap-2 text-coffee/45">
            <ImagePlus size={14} strokeWidth={1.7} className="mt-0.5 flex-shrink-0" />
            <p className="text-xs leading-relaxed">
              Fotoğraf yüklemezseniz aşağıdaki renk yer tutucu kullanılır.
            </p>
          </div>

          <GradientPicker value={gradient} onChange={onGradientChange} hideLabel />
        </div>
      )}
    </div>
  );
}
