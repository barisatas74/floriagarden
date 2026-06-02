"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/lib/hooks/useRecentlyViewed";

/**
 * Ürün detay sayfasında mount olunca o ürünü "son baktıklarına" ekler.
 * Görsel render etmez, sadece tracker.
 */
export default function RecentlyViewedTracker({ productId }: { productId: string }) {
  const { track } = useRecentlyViewed();

  useEffect(() => {
    track(productId);
  }, [productId, track]);

  return null;
}
