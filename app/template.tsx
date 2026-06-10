/**
 * Route geçiş animasyonu — CSS ile (compositor/GPU thread'de çalışır).
 *
 * Önceden framer-motion kullanıyordu; bu animasyon JavaScript ana iş
 * parçacığında döndüğü için Android cihazlarda sayfa geçişlerinde
 * (özellikle /giris, /uye-ol, /yonetim) takılmaya yol açıyordu.
 *
 * Görünüm BİREBİR aynı: 0.6 opaklıktan ve 6px aşağıdan yumuşak cross-fade
 * (cubic-bezier 0.22,1,0.36,1 · 0.25s). Tek fark: artık CSS keyframe olduğu
 * için JS'i meşgul etmez → Android'de akıcı.
 *
 * Not: animasyon fill-mode kullanmaz; bitince transform "none"a döner, böylece
 * sayfa içindeki position:fixed öğeler (ör. ürün detay alt çubuğu) etkilenmez.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
