import type { Metadata } from "next";
import LegalLayout from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "Floria Garden web sitesinde kullanılan çerez türleri ve amaçları hakkında bilgilendirme.",
};

export default function CookiePage() {
  return (
    <LegalLayout
      title="Çerez Politikası"
      lastUpdated="22 Mayıs 2026"
      intro="Floria Garden web sitesinde deneyiminizi geliştirmek amacıyla çerezler kullanılır. Bu sayfa kullanılan çerez türlerini ve amaçlarını açıklar."
      sections={[
        {
          title: "Çerez Nedir?",
          body: (
            <p>
              Çerezler (cookies), ziyaret ettiğiniz web sitelerinin tarayıcınız
              aracılığıyla cihazınıza küçük metin dosyaları kaydetmesidir. Bu
              dosyalar size daha iyi bir deneyim sunmak için kullanılır.
            </p>
          ),
        },
        {
          title: "Kullandığımız Çerez Türleri",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-coffee">Zorunlu çerezler:</strong> Sepet,
                oturum ve site temel işlevleri için gereklidir.
              </li>
              <li>
                <strong className="text-coffee">Performans çerezleri:</strong>{" "}
                Anonim ziyaret istatistikleri için (örn. Google Analytics).
              </li>
              <li>
                <strong className="text-coffee">Tercih çerezleri:</strong> Dil ve
                tema gibi tercihlerinizi hatırlamak için.
              </li>
            </ul>
          ),
        },
        {
          title: "Çerezleri Kontrol Etme",
          body: (
            <p>
              Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz.
              Bazı çerezleri devre dışı bırakmanız sitenin bazı işlevlerini
              etkileyebilir.
            </p>
          ),
        },
        {
          title: "Tercihinizi Değiştirme",
          body: (
            <p>
              Site ilk açıldığında gösterilen çerez bildirim panelinden
              tercihinizi her zaman güncelleyebilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}
