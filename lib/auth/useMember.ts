"use client";

import { useEffect, useState } from "react";
import {
  getCachedMemberAuthed,
  listenMemberAuthChanged,
  setCachedMemberAuthed,
} from "./member-session-client";

/**
 * Üyelik durumu.
 * httpOnly cookie tarayıcıdan okunamadığı için sunucu oturumunu API üzerinden
 * kontrol eder. Çağıran bileşenler yalnızca boolean sonucu kullanır.
 */
export function useMember(): boolean {
  const [isMember, setIsMember] = useState(
    () => getCachedMemberAuthed() ?? false,
  );

  useEffect(
    () => listenMemberAuthChanged((authed) => setIsMember(authed)),
    [],
  );

  useEffect(() => {
    let active = true;
    fetch("/api/member/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { authed: false }))
      .then((j) => {
        const authed = Boolean(j?.authed);
        setCachedMemberAuthed(authed);
        if (active) setIsMember(authed);
      })
      .catch(() => {
        setCachedMemberAuthed(false);
        if (active) setIsMember(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return isMember;
}
