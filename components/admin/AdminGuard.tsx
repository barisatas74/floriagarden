"use client";

import { useEffect, useState, type ReactNode } from "react";
import AdminLogin from "./AdminLogin";

/**
 * Sunucu tarafı oturum kapısı. Oturum httpOnly cookie ile sunucuda doğrulanır
 * (gerçek güvenlik). Şifre ADMIN_PASSWORD ortam değişkeninde tutulur.
 */
export default function AdminGuard({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setAuthed(Boolean(j?.authed)))
      .catch(() => setAuthed(false))
      .finally(() => setReady(true));
  }, []);

  if (!ready) {
    return <div className="min-h-screen bg-section-coffee" aria-hidden />;
  }

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return <>{children}</>;
}
