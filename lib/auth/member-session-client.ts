"use client";

const MEMBER_AUTH_KEY = "floria-member-authed";
const MEMBER_AUTH_EVENT = "floria-member-auth-change";

export function getCachedMemberAuthed(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.sessionStorage.getItem(MEMBER_AUTH_KEY);
    if (value === "1") return true;
    if (value === "0") return false;
  } catch {
    /* ignore */
  }
  return null;
}

export function setCachedMemberAuthed(authed: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(MEMBER_AUTH_KEY, authed ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function notifyMemberAuthChanged(authed: boolean) {
  setCachedMemberAuthed(authed);
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(MEMBER_AUTH_EVENT, { detail: { authed } }),
  );
}

export function listenMemberAuthChanged(callback: (authed: boolean) => void) {
  if (typeof window === "undefined") return () => {};
  const handler = (event: Event) => {
    const detail = (event as CustomEvent<{ authed?: boolean }>).detail;
    if (typeof detail?.authed === "boolean") callback(detail.authed);
  };
  window.addEventListener(MEMBER_AUTH_EVENT, handler);
  return () => window.removeEventListener(MEMBER_AUTH_EVENT, handler);
}
