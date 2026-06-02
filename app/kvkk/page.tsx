import type { Metadata } from "next";
import LegalLayout from "@/components/ui/LegalLayout";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Floria Garden olarak 6698 sayılı KVKK kapsamında kişisel verilerinizin işlenmesine ilişkin aydınlatma metnimiz.",
};

export default function KvkkPage() {
  return (
    <LegalLayout
      title="KVKK Aydınlatma Metni"
      lastUpdated="22 Mayıs 2026"
      intro="6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca, kişisel verilerinizin işlenme amacı, hukuki sebebi ve haklarınız hakkında bilgilendirme metnidir."
      sections={[
        {
          title: "Veri Sorumlusu",
          body: (
            <>
              <p>
                Floria Garden, {SITE.address} adresinde faaliyet gösteren butik
                çiçekçi işletmesi olarak veri sorumlusu sıfatıyla hareket eder.
              </p>
              <p>
                İletişim: {SITE.email} · {SITE.phoneDisplay}
              </p>
            </>
          ),
        },
        {
          title: "İşlenen Kişisel Veriler",
          body: (
            <>
              <p>Sipariş ve hizmet süreçlerimiz kapsamında aşağıdaki veriler işlenir:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Kimlik: ad, soyad</li>
                <li>İletişim: telefon, e-posta, teslimat adresi</li>
                <li>Müşteri işlem: sipariş geçmişi, ürün tercihleri, kart notu</li>
                <li>Pazarlama (onaya bağlı): e-bülten kayıtları</li>
              </ul>
            </>
          ),
        },
        {
          title: "İşleme Amaçları",
          body: (
            <>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Sipariş hazırlama ve teslimat süreçlerini yürütmek</li>
                <li>Müşteri ilişkilerini yönetmek ve destek sağlamak</li>
                <li>Yasal yükümlülükleri yerine getirmek (fatura vb.)</li>
                <li>Açık rızanız ile pazarlama iletişimi kurmak</li>
              </ul>
            </>
          ),
        },
        {
          title: "Aktarım",
          body: (
            <p>
              Verileriniz; kargo/kurye iş ortaklarımız, ödeme altyapı sağlayıcıları
              ve yasal zorunluluk hâlinde yetkili kamu kurumları ile sınırlı olarak
              paylaşılabilir.
            </p>
          ),
        },
        {
          title: "Haklarınız",
          body: (
            <>
              <p>KVKK 11. madde kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Düzeltme, silme veya yok edilmesini isteme</li>
                <li>İşlemeye itiraz etme</li>
                <li>Zararın giderilmesini talep etme</li>
              </ul>
              <p className="mt-3">
                Talepleriniz için <a href={`mailto:${SITE.email}`} className="text-rose-goldLight underline-offset-2 hover:underline">{SITE.email}</a> adresinden bize ulaşabilirsiniz.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
