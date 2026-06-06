import type { Metadata } from "next";
import LegalLayout from "@/components/ui/LegalLayout";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi",
  description:
    "Floria Garden üzerinden gerçekleştirilen alışverişlerde geçerli mesafeli satış sözleşmesi şablonu.",
};

export default function DistanceSalesPage() {
  return (
    <LegalLayout
      title="Mesafeli Satış Sözleşmesi"
      lastUpdated="22 Mayıs 2026"
      intro="Floria Garden üzerinden gerçekleştirilen alışverişlerde 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili yönetmelikler uyarınca geçerli mesafeli satış sözleşmesinin esaslarıdır."
      sections={[
        {
          title: "Taraflar",
          body: (
            <>
              <p>
                <strong className="text-coffee">Satıcı:</strong> {SITE.name} —{" "}
                {SITE.legal.owner} ({SITE.address}). Vergi Dairesi:{" "}
                {SITE.legal.taxOffice}, Vergi No: {SITE.legal.taxNo}.
              </p>
              <p>
                <strong className="text-coffee">Alıcı:</strong> Sipariş veren
                gerçek veya tüzel kişi.
              </p>
            </>
          ),
        },
        {
          title: "Sözleşme Konusu",
          body: (
            <p>
              Alıcının web sitesi üzerinden sipariş ettiği ürünlerin satışı ve
              teslimi ile tarafların hak ve yükümlülüklerinin belirlenmesidir.
            </p>
          ),
        },
        {
          title: "Ürün Bilgileri",
          body: (
            <p>
              Ürün adı, ölçüleri, içeriği, fiyatı ve teslimat süresi web
              sitesinde her ürün sayfasında ayrıca belirtilmiştir. Sipariş
              onayı sırasında alıcıya iletilen bilgiler bağlayıcıdır.
            </p>
          ),
        },
        {
          title: "Ödeme & Teslimat",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Ödeme; havale/EFT, kart ile uzaktan ödeme veya kapıda ödeme şeklinde yapılabilir.</li>
              <li>Aynı gün teslimat 17:00 öncesi siparişler için geçerlidir.</li>
              <li>Teslimat ücretleri bölgeye göre değişiklik gösterir, sipariş onayında netleştirilir.</li>
            </ul>
          ),
        },
        {
          title: "Cayma Hakkı",
          body: (
            <p>
              Çiçek, çabuk bozulan ve nitelikleri itibariyle iade edilemeyen
              ürünler kapsamında olduğundan, 6502 sayılı Kanun ve Mesafeli
              Sözleşmeler Yönetmeliği uyarınca cayma hakkı kullanılamaz. Ancak
              Floria Garden memnuniyet sözü kapsamında ürün tesliminde kalite
              sorunu olması hâlinde değişim veya iade sağlanır.
            </p>
          ),
        },
        {
          title: "Uyuşmazlıkların Çözümü",
          body: (
            <p>
              Bu sözleşmeden doğan uyuşmazlıklarda; Gümrük ve Ticaret Bakanlığı
              tarafından her yıl belirlenen parasal sınırlar dahilinde Alıcının
              veya Satıcının yerleşim yerindeki Tüketici Hakem Heyetleri ve
              Tüketici Mahkemeleri yetkilidir.
            </p>
          ),
        },
      ]}
    />
  );
}
