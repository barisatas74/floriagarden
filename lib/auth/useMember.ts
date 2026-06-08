"use client";

import { useEffect, useState } from "react";

/**
 * Üyelik durumu.
 * httpOnly cookie tarayıcıdan okunamadığı için sunucu oturumunu API üzerinden
 * kontrol eder. Çağıran bileşenler yalnızca boolean sonucu kullanır.
 */
export function useMember(): boolean {
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/member/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { authed: false }))
      .then((j) => {
        if (active) setIsMember(Boolean(j?.authed));
      })
      .catch(() => {
        if (active) setIsMember(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return isMember;
}
