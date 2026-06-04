import {
  Sparkles,
  Gift,
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  Flower2,
  Heart,
  Package,
  Leaf,
  type LucideIcon,
} from "lucide-react";

/** Teslimat süreci adımları için seçilebilir ikonlar. */
export const DELIVERY_ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  gift: Gift,
  truck: Truck,
  shield: ShieldCheck,
  clock: Clock,
  pin: MapPin,
  flower: Flower2,
  heart: Heart,
  package: Package,
  leaf: Leaf,
};

export const DELIVERY_ICON_KEYS = Object.keys(DELIVERY_ICONS);

export function deliveryIcon(key: string): LucideIcon {
  return DELIVERY_ICONS[key] ?? Sparkles;
}
