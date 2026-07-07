"use client";

import { useEffect, useState } from "react";

// Ortam değişkeni ile global zorlama (derleme anında gömülür).
const ENV_MAINTENANCE = process.env.NEXT_PUBLIC_MAINTENANCE === "1";

// Modül düzeyinde önbellek — aynı sayfadaki birden çok bileşen tek istek paylaşır.
let cache: Promise<boolean> | null = null;

function fetchMaintenance(): Promise<boolean> {
  if (ENV_MAINTENANCE) return Promise.resolve(true);
  if (!cache) {
    cache = fetch("/api/maintenance")
      .then((r) => (r.ok ? r.json() : { maintenance: false }))
      .then((j) => Boolean(j?.maintenance))
      .catch(() => false);
  }
  return cache;
}

/**
 * Bakım modu açık mı? Veritabanından (settings) okunur; NEXT_PUBLIC_MAINTENANCE
 * ile global zorlanabilir.
 */
export function useMaintenance(): boolean {
  const [on, setOn] = useState<boolean>(ENV_MAINTENANCE);

  useEffect(() => {
    let active = true;
    fetchMaintenance().then((v) => {
      if (active) setOn(v);
    });
    return () => {
      active = false;
    };
  }, []);

  return on;
}
