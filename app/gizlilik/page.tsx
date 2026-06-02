import type { Metadata } from "next";
import LegalLayout from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Floria Garden gizlilik politikası ve veri güvenliği yaklaşımımız.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Gizlilik Politikası"
      lastUpdated="22 Mayıs 2026"
      intro="Floria Garden olarak ziyaretçilerimizin ve müşterilerimizin gizliliğine önem veriyoruz. Bu politika, sitemizi kullanırken paylaştığınız bilgilerin nasıl korunduğunu açıklar."
      sections={[
        {
          title: "Toplanan Bilgiler",
          body: (
            <p>
              Sipariş, iletişim ve bülten kayıt formlarında verdiğiniz ad,
              iletişim ve teslimat bilgileri yalnızca hizmet sunumu amacıyla
              toplanır. Ödeme bilgileriniz tarafımızca saklanmaz; ödeme altyapı
              sağlayıcılarımız üzerinden güvenli bir şekilde işlenir.
            </p>
          ),
        },
        {
          title: "Kullanım Amaçları",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Siparişinizin hazırlanması ve teslim edilmesi</li>
              <li>İletişim talebinize geri dönüş yapmak</li>
              <li>Hizmet kalitemizi iyileştirmek</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>
          ),
        },
        {
          title: "Üçüncü Taraf Paylaşımı",
          body: (
            <p>
              Bilgileriniz; teslimat süreci için kurye/kargo ortaklarımız ve
              ödeme altyapı sağlayıcıları dışında üçüncü taraflarla paylaşılmaz.
              Açık rıza vermediğiniz sürece pazarlama amaçlı paylaşım yapılmaz.
            </p>
          ),
        },
        {
          title: "Veri Güvenliği",
          body: (
            <p>
              Verilerinizi yetkisiz erişime karşı korumak için sektör standartı
              güvenlik önlemleri uyguluyoruz. Buna rağmen internet üzerinden
              iletilen hiçbir verinin %100 güvenli olmadığını hatırlatmak isteriz.
            </p>
          ),
        },
        {
          title: "İletişim",
          body: (
            <p>
              Gizliliğinizle ilgili soru ve talepleriniz için bize her zaman
              ulaşabilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}
