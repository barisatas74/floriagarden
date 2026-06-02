import { type ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";

type Section = {
  title: string;
  body: ReactNode;
};

type Props = {
  title: string;
  intro?: string;
  lastUpdated: string;
  sections: Section[];
};

/**
 * Yasal sayfalar (KVKK, Gizlilik, Çerez, Mesafeli Satış) için ortak şablon.
 * Bilgilendirme amaçlı şablon metinlerdir — canlıya geçmeden bir hukukçuya
 * onaylatılmalıdır.
 */
export default function LegalLayout({
  title,
  intro,
  lastUpdated,
  sections,
}: Props) {
  return (
    <article className="pt-28 md:pt-32 pb-20 md:pb-24">
      <div className="container max-w-4xl">
        <Breadcrumb items={[{ label: title }]} className="mb-10" />

        <header className="flex flex-col items-start gap-4 mb-10">
          <span className="eyebrow">Yasal</span>
          <h1 className="heading-display">{title}</h1>
          <span className="text-xs text-coffee/45 uppercase tracking-wider2">
            Son güncelleme: {lastUpdated}
          </span>
          {intro && (
            <p className="text-coffee/75 leading-relaxed text-balance max-w-2xl mt-2">
              {intro}
            </p>
          )}
        </header>

        <div className="rounded-3xl glass-dark p-8 md:p-12">
          <div className="prose-floria flex flex-col gap-10">
            {sections.map((s, i) => (
              <section key={s.title}>
                <h2 className="font-display text-2xl md:text-3xl text-coffee mb-3">
                  <span className="text-rose-gold mr-2 text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <div className="text-coffee/75 leading-relaxed space-y-3 text-[0.95rem]">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-coffee/45 leading-relaxed">
          Bu metin bilgilendirme amaçlıdır; bağlayıcı yasal değerlendirme için
          bir hukuk müşaviri ile çalışmanızı öneririz.
        </p>
      </div>
    </article>
  );
}
