"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "floria-recently-viewed-v1";
const MAX_ITEMS = 8;

/**
 * localStorage tabanlı son baktığın ürünler.
 * Her ID en güncel ziyaret tarihine göre listenin başına alınır.
 */
export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setIds(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((arr: string[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch {
      /* ignore */
    }
  }, []);

  const track = useCallback(
    (productId: string) => {
      setIds((arr) => {
        const filtered = arr.filter((x) => x !== productId);
        const next = [productId, ...filtered].slice(0, MAX_ITEMS);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  return { ids, track };
}
