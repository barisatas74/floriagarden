/* Yönetim panelinde kullanılan küçük yardımcılar. */

const TR_MAP: Record<string, string> = {
  ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u",
  Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u",
};

/** Türkçe karakterleri sadeleştirip URL slug üretir. */
export function slugify(input: string): string {
  return input
    .trim()
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, (ch) => TR_MAP[ch] ?? ch)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Çakışmayan benzersiz id. */
export function makeId(prefix = "id"): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}

/** Genel kampanya kodu için rastgele öneri: FLORIA-XXXX. */
export function generateGeneralCode(): string {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FLORIA-${rand}`;
}

/** Üyeye özel kod: FG-<baş harfler>-<rastgele>. */
export function generateMemberCode(name: string): string {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0] ?? "")
      .join("")
      .replace(/[çğıöşüÇĞİÖŞÜ]/g, (ch) => TR_MAP[ch] ?? ch)
      .slice(0, 2)
      .toUpperCase() || "FG";
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FG-${initials}-${rand}`;
}
