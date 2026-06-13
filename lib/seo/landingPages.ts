/**
 * Yerel SEO landing page içerikleri.
 * Her sayfa gerçek bir URL'dir, menüde görünmez ama Google'da indekslenir.
 * Tasarım mevcut sistemle birebir aynı (LandingPage bileşeni render eder).
 *
 * Bu dosyayı silmek/geri almak siteyi eski hâline döndürür (geri alınabilir).
 */

export type LandingFaq = { q: string; a: string };
export type LandingLink = { label: string; href: string };
export type LandingSection = { heading: string; paragraphs: string[] };

export type LandingPageData = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: LandingSection[];
  faqs: LandingFaq[];
  related: LandingLink[];
};

export const LANDING_PAGES: LandingPageData[] = [
  /* ════════════ /gemlik-cicekci ════════════ */
  {
    slug: "gemlik-cicekci",
    title: "Gemlik Çiçekçi — Floria Garden | Aynı Gün Teslimat",
    description:
      "Gemlik çiçekçi Floria Garden: taze buket, kutuda çiçek ve özel tasarım aranjmanlar. Gemlik içi aynı gün özenli teslimat. Hemen sipariş verin.",
    eyebrow: "Gemlik Çiçekçi",
    h1: "Gemlik Çiçekçi — Floria Garden",
    intro:
      "Floria Garden, Gemlik'te taze çiçek ve butik aranjmanlar sunan, çiçeğin ve kahvenin bir araya geldiği yeni nesil bir çiçekçidir. Doğum gününden yıl dönümüne, kutlamadan taziyeye kadar her an için özenle hazırladığımız çiçekleri Gemlik içinde aynı gün adrese teslim ediyoruz.",
    sections: [
      {
        heading: "Gemlik'te taze çiçek ve butik aranjmanlar",
        paragraphs: [
          "Bir çiçeğin değeri tazeliğinde ve hazırlanış özeninde saklıdır. Floria Garden olarak buketlerimizi ve aranjmanlarımızı günlük gelen taze çiçeklerle, sipariş üzerine elde hazırlıyoruz. Gül, lilyum, şakayık, lale ve mevsim çiçeklerinden oluşan düzenlemelerimizi; kutuda çiçek, ayna kutu, saksı orkide ve özel hediye setleri gibi farklı tarzlarda sunuyoruz.",
          "Her sipariş, Gemlik'teki atölyemizde tek tek elden geçer. Çiçeklerin tazeliğini koruyacak şekilde, kadife ve doğal dokulu ambalajlarla hazırlanır. Amacımız yalnızca çiçek satmak değil; karşı tarafa bırakacağınız izlenimi en güzel hâliyle ulaştırmaktır.",
        ],
      },
      {
        heading: "Teslimat bölgelerimiz: Gemlik ve çevresi",
        paragraphs: [
          "Gemlik merkez başta olmak üzere Kumla (Küçük Kumla ve Büyük Kumla), Kurşunlu, Umurbey ve çevre mahallelere çiçek teslimatı yapıyoruz. Gemlik içi siparişlerinizi ısı kontrollü kuryeyle, çiçeğin yol boyunca tazeliğini koruyacak şekilde adrese ulaştırıyoruz.",
          "Bursa merkez ve çevre ilçeler için anlaşmalı kuryelerimizle çalışıyor; Türkiye'nin geri kalanına ise anlaşmalı kargoyla, takip numaralı gönderim yapıyoruz. Teslimat bölgenizden emin değilseniz WhatsApp hattımızdan kısa sürede bilgi alabilirsiniz.",
        ],
      },
      {
        heading: "Hangi günler için çiçek gönderebilirsiniz?",
        paragraphs: [
          "Çiçek her duyguyu anlatabilen ender hediyelerden biridir. Doğum günü ve yıl dönümleri, sevgililer günü, anneler günü, yeni iş ve mağaza açılışları, mezuniyet ve kutlamalar için özel düzenlemeler hazırlıyoruz.",
          "Bunun yanında taziye ve hastane ziyaretleri gibi hassas anlarda da yanınızdayız; bu tür durumlarda sade, saygılı ve uygun aranjmanlar öneriyoruz. Ne göndereceğinize karar veremiyorsanız, bütçenizi ve kimin için olduğunu söylemeniz yeterli — size en uygun seçeneği birlikte belirleriz.",
        ],
      },
      {
        heading: "Nasıl sipariş verilir?",
        paragraphs: [
          "Sipariş vermek çok kolay: web sitemizden beğendiğiniz ürünü seçip teslimat adresi, tarih ve saat aralığını girerek sepete ekleyebilir, ardından siparişinizi oluşturabilirsiniz. Sipariş kaydınız bize anında ulaşır ve teslimat detaylarını WhatsApp üzerinden netleştiririz.",
          "Dilerseniz hiç uğraşmadan, doğrudan WhatsApp hattımızdan da yazabilirsiniz. İstediğiniz çiçeği, bütçenizi ve teslimat bilgisini iletmeniz yeterli; gerisini ekibimiz hallediyor. Çiçeğe iliştirilecek kişisel kart notunuzu da sipariş sırasında ekleyebilirsiniz.",
        ],
      },
      {
        heading: "Neden Floria Garden?",
        paragraphs: [
          "Gemlik'te çiçekçi denince akla gelen güvenilir adres olmayı hedefliyoruz. Taze çiçek, el yapımı butik düzenleme, ısı kontrollü özenli teslimat ve samimi iletişim bizim için standarttır. Siparişinizin her aşamasından haberdar olur, çiçeğiniz teslim edilene kadar süreci takip edersiniz.",
          "Çiçek ve kahvenin buluştuğu marka anlayışımızla, hediyeyi sadece bir ürün değil küçük bir deneyim hâline getiriyoruz. Gemlik ve çevresinde sevdiklerinize zarif bir sürpriz yapmak istediğinizde Floria Garden hep yakınınızda.",
        ],
      },
    ],
    faqs: [
      {
        q: "Gemlik'te aynı gün çiçek teslimatı yapıyor musunuz?",
        a: "Evet. Gemlik içi siparişlerde, saat 17:00'dan önce verilen siparişleri aynı gün ısı kontrollü kuryeyle adrese teslim ediyoruz.",
      },
      {
        q: "Hangi bölgelere teslimat yapıyorsunuz?",
        a: "Gemlik merkez, Kumla, Kurşunlu, Umurbey ve çevre mahalleler için elden teslimat; Bursa ve şehir dışına anlaşmalı kurye/kargo ile gönderim yapıyoruz.",
      },
      {
        q: "Sipariş için minimum tutar var mı?",
        a: "Hayır, minimum tutar uygulamıyoruz. Teslimat ücreti yalnızca bölgeye göre değişebilir.",
      },
      {
        q: "Çiçeğe kart notu ekleyebilir miyim?",
        a: "Elbette. Sipariş sırasında çiçeğe iliştirilecek kişisel kart notunuzu yazabilirsiniz; biz de el yazısıyla kartınıza geçiririz.",
      },
      {
        q: "Sürpriz teslimat mümkün mü?",
        a: "Evet. Gönderen bilgisini gizli tutarak sürpriz teslimat yapabiliriz; detayları WhatsApp üzerinden planlıyoruz.",
      },
    ],
    related: [
      { label: "Tüm Ürünler", href: "/urunler" },
      { label: "Gemlik Aynı Gün Teslimat", href: "/gemlik-ayni-gun-cicek-teslimati" },
      { label: "Gemlik Çiçek Siparişi", href: "/gemlik-cicek-siparisi" },
      { label: "Teslimat Bilgileri", href: "/teslimat" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },

  /* ════════════ /gemlik-cicek-siparisi ════════════ */
  {
    slug: "gemlik-cicek-siparisi",
    title: "Gemlik Çiçek Siparişi — Online & WhatsApp | Floria Garden",
    description:
      "Gemlik çiçek siparişi kolay: siteden seçin, WhatsApp ile onaylayın. Aynı gün teslimat, kart notu ve özel paket seçenekleriyle Floria Garden.",
    eyebrow: "Gemlik Çiçek Siparişi",
    h1: "Gemlik Çiçek Siparişi",
    intro:
      "Gemlik'te çiçek siparişi vermek Floria Garden ile sadece birkaç dakika sürer. İster web sitemizden seçip sepete ekleyin, ister WhatsApp hattımızdan yazın; taze çiçekleri ve butik aranjmanları aynı gün sevdiklerinize ulaştırıyoruz.",
    sections: [
      {
        heading: "Web sitesinden çiçek siparişi nasıl verilir?",
        paragraphs: [
          "Ürünler sayfamızdan beğendiğiniz buketi veya aranjmanı seçin. Ürün sayfasında teslimat bölgesini (Gemlik içi veya şehir dışı), teslimat gününü, saat aralığını ve açık adresi girin. Dilerseniz çiçeğe özel bir kart notu ve paket seçeneği ekleyin.",
          "Bilgileri girdikten sonra ürünü sepete ekleyip siparişinizi tamamlayın. Sipariş kaydınız anında sistemimize düşer ve 'Siparişiniz alındı' sayfasıyla onaylanır. Ardından teslimat ve ödeme detaylarını WhatsApp üzerinden birlikte netleştiririz.",
        ],
      },
      {
        heading: "WhatsApp ile pratik sipariş",
        paragraphs: [
          "Acele eden ya da seçimde destek isteyenler için en hızlı yol WhatsApp'tır. Hangi çiçeği, hangi gün, hangi adrese göndermek istediğinizi yazmanız yeterli; ekibimiz uygun seçenekleri ve fiyatı paylaşır, siparişinizi sizin adınıza oluşturur.",
          "Üye girişi yaptıysanız sipariş geçmişiniz ve kayıtlı adresleriniz hesabınızda saklanır; bir sonraki sipariş çok daha hızlı tamamlanır.",
        ],
      },
      {
        heading: "Ödeme seçenekleri",
        paragraphs: [
          "Ödeme; havale/EFT veya bölgeye göre kapıda ödeme şeklinde yapılabilir. Ödeme detayları, sipariş onayından sonra WhatsApp üzerinden güvenli biçimde paylaşılır. Kart bilgilerinizi asla site üzerinde istemiyoruz.",
        ],
      },
      {
        heading: "Kart notu ve özel paket",
        paragraphs: [
          "Bir çiçeği unutulmaz kılan çoğu zaman yanındaki birkaç kelimedir. Siparişinize ekleyeceğiniz kart notunu el yazısıyla hazırlıyoruz. Ayrıca standart, premium ve lüks paket seçenekleriyle çiçeğinizin sunumunu zenginleştirebilirsiniz.",
        ],
      },
      {
        heading: "Teslimat ve takip",
        paragraphs: [
          "Gemlik içi siparişlerde aynı gün, ısı kontrollü teslimat sunuyoruz. Siparişinizin hazırlanışından teslimine kadar süreçten haberdar olur, gerektiğinde WhatsApp üzerinden anlık bilgi alırsınız. Şehir dışı gönderimlerde takip numaralı kargo kullanıyoruz.",
        ],
      },
    ],
    faqs: [
      {
        q: "Online sipariş güvenli mi?",
        a: "Evet. Site üzerinde kart bilgisi istemiyoruz; ödeme, sipariş onayından sonra havale/EFT veya kapıda ödeme ile güvenli şekilde yapılır.",
      },
      {
        q: "Siparişimi WhatsApp'tan da verebilir miyim?",
        a: "Tabii. WhatsApp hattımızdan istediğiniz çiçeği, teslimat bilgisini ve bütçenizi iletmeniz yeterli; siparişi sizin için oluşturuyoruz.",
      },
      {
        q: "Aynı gün teslimat için son saat kaç?",
        a: "Gemlik içi siparişlerde saat 17:00'dan önce verilen siparişler aynı gün teslim edilir.",
      },
      {
        q: "Kayıtlı adresimi tekrar kullanabilir miyim?",
        a: "Üye girişi yaptıysanız kayıtlı adresleriniz hesabınızda saklanır ve sipariş sırasında tek tıkla seçebilirsiniz.",
      },
    ],
    related: [
      { label: "Tüm Ürünler", href: "/urunler" },
      { label: "Gemlik Çiçekçi", href: "/gemlik-cicekci" },
      { label: "Aynı Gün Teslimat", href: "/gemlik-ayni-gun-cicek-teslimati" },
      { label: "Sıkça Sorulan Sorular", href: "/sss" },
    ],
  },

  /* ════════════ /gemlik-ayni-gun-cicek-teslimati ════════════ */
  {
    slug: "gemlik-ayni-gun-cicek-teslimati",
    title: "Gemlik Aynı Gün Çiçek Teslimatı | Floria Garden",
    description:
      "Gemlik içi aynı gün çiçek teslimatı: 17:00 öncesi siparişler aynı gün, ısı kontrollü kuryeyle adrese. Floria Garden ile hızlı ve özenli teslimat.",
    eyebrow: "Aynı Gün Teslimat",
    h1: "Gemlik Aynı Gün Çiçek Teslimatı",
    intro:
      "Bazı anlar beklemez. Floria Garden, Gemlik içi siparişlerde aynı gün çiçek teslimatı sunar; saat 17:00'dan önce verdiğiniz siparişleri, çiçeğin tazeliğini koruyan ısı kontrollü kuryeyle aynı gün adrese ulaştırırız.",
    sections: [
      {
        heading: "Aynı gün teslimat nasıl işliyor?",
        paragraphs: [
          "Siparişinizi aldıktan sonra çiçeğiniz Gemlik'teki atölyemizde taze malzemelerle hazırlanır ve aynı gün teslimat rotamıza eklenir. Hazırlık ve yola çıkış süreçlerini kısa tutarak, çiçeğin en taze hâliyle alıcıya ulaşmasını sağlıyoruz.",
          "Teslimat sırasında alıcıya ulaşılamazsa, irtibat numarası üzerinden iletişime geçerek en uygun teslim zamanını planlıyoruz. Sürecin her aşamasından WhatsApp üzerinden haberdar olabilirsiniz.",
        ],
      },
      {
        heading: "Aynı gün teslimat için son sipariş saati",
        paragraphs: [
          "Aynı gün teslimat, Gemlik içi siparişlerde saat 17:00'a kadar geçerlidir. 17:00'dan sonra verilen siparişler, ertesi günün ilk teslimatıyla yola çıkar. Yoğun günlerde (sevgililer günü, anneler günü gibi) erken sipariş vermenizi öneririz.",
        ],
      },
      {
        heading: "Aynı gün teslimat yaptığımız bölgeler",
        paragraphs: [
          "Aynı gün elden teslimatı Gemlik merkez ve yakın mahallelerde sunuyoruz. Kumla, Kurşunlu ve Umurbey gibi çevre bölgelere teslimat süresi konuma göre değişebilir; bu bölgeler için uygun teslim saatini sipariş sırasında WhatsApp üzerinden teyit ediyoruz.",
          "Bursa merkez ve şehir dışı gönderimlerde aynı gün garantisi yerine, en hızlı teslim seçeneğini birlikte planlıyoruz.",
        ],
      },
      {
        heading: "Sürpriz ve özel zamanlı teslimat",
        paragraphs: [
          "Sevdiğinize sürpriz yapmak istiyorsanız, gönderen bilgisini gizli tutarak teslimat yapıyoruz. Belirli bir saatte (örneğin bir kutlama anında) teslim edilmesini istediğiniz siparişleri de mümkün olduğunca planlayıp not alıyoruz.",
        ],
      },
    ],
    faqs: [
      {
        q: "Aynı gün teslimat ücretli mi?",
        a: "Teslimat ücreti bölgeye göre belirlenir ve sipariş onayında netleştirilir. Gemlik içi teslimatlarımız hızlı ve özenlidir.",
      },
      {
        q: "Saat kaça kadar sipariş verirsem aynı gün teslim edilir?",
        a: "Gemlik içinde saat 17:00'dan önce verilen siparişler aynı gün teslim edilir.",
      },
      {
        q: "Belirli bir saatte teslim ettirebilir miyim?",
        a: "Tercih ettiğiniz saat aralığını sipariş sırasında seçebilirsiniz; yoğunluğa göre mümkün olduğunca bu aralığa uyuyoruz.",
      },
      {
        q: "Kumla ve Kurşunlu'ya aynı gün teslimat var mı?",
        a: "Konuma göre mümkündür; bu bölgeler için uygun teslim saatini WhatsApp üzerinden teyit ediyoruz.",
      },
    ],
    related: [
      { label: "Gemlik Çiçekçi", href: "/gemlik-cicekci" },
      { label: "Gemlik Çiçek Siparişi", href: "/gemlik-cicek-siparisi" },
      { label: "Kumla Çiçekçi", href: "/kumla-cicekci" },
      { label: "Tüm Ürünler", href: "/urunler" },
    ],
  },

  /* ════════════ /kumla-cicekci ════════════ */
  {
    slug: "kumla-cicekci",
    title: "Kumla Çiçekçi — Aynı Gün Çiçek Teslimatı | Floria Garden",
    description:
      "Kumla (Küçük Kumla) ve çevresine taze çiçek ve buket teslimatı. Gemlik merkezli Floria Garden ile hızlı, özenli çiçek siparişi.",
    eyebrow: "Kumla Çiçekçi",
    h1: "Kumla Çiçekçi — Floria Garden",
    intro:
      "Floria Garden, Gemlik merkezli butik çiçekçi olarak Kumla ve çevresine taze çiçek, buket ve özel tasarım aranjmanlar ulaştırır. Küçük Kumla ve Büyük Kumla'daki sevdiklerinize zarif bir sürpriz yapmak için yanınızdayız.",
    sections: [
      {
        heading: "Kumla'ya çiçek teslimatı",
        paragraphs: [
          "Kumla, özellikle yaz aylarında hareketlenen, sevdiklerimizle vakit geçirdiğimiz güzel bir sahil bölgesi. Floria Garden olarak Gemlik'teki atölyemizden hazırladığımız çiçekleri Kumla'ya özenle ulaştırıyoruz. Doğum günü, yıl dönümü, kutlama ya da sadece 'seni düşünüyorum' demek için taze bir buket göndermek artık çok kolay.",
          "Çiçeklerimiz sipariş üzerine, günlük taze malzemelerle hazırlanır ve ısı kontrollü şekilde taşınır. Böylece sıcak yaz günlerinde bile çiçeğiniz tazeliğini korur.",
        ],
      },
      {
        heading: "Kumla ve çevre bölgeler",
        paragraphs: [
          "Küçük Kumla ve Büyük Kumla başta olmak üzere; Gemlik merkez, Kurşunlu, Umurbey ve çevre mahallelere teslimat yapıyoruz. Yazlık siteler ve tatil bölgelerine teslimatta, adresi mümkün olduğunca ayrıntılı yazmanız (site adı, blok, daire) teslimatı hızlandırır.",
          "Teslimat bölgenizden veya adresinizden emin değilseniz, WhatsApp hattımızdan konum paylaşarak hızlıca teyit alabilirsiniz.",
        ],
      },
      {
        heading: "Yazlık ve tatil dönemi siparişleri",
        paragraphs: [
          "Tatil sezonunda Kumla'daki misafirlerinize ya da sevdiklerinize hoş geldin çiçeği, doğum günü sürprizi veya özel gün düzenlemesi gönderebilirsiniz. Otel, pansiyon ve yazlık adreslerine teslimat konusunda deneyimliyiz; teslim saatini birlikte planlıyoruz.",
        ],
      },
      {
        heading: "Nasıl sipariş verilir?",
        paragraphs: [
          "Web sitemizden ürünü seçip teslimat bölgesi olarak Gemlik içini işaretleyebilir, açık adres alanına Kumla adresinizi yazabilirsiniz. Alternatif olarak WhatsApp hattımızdan da kolayca sipariş verebilir, seçim ve teslimat konusunda destek alabilirsiniz.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kumla'ya aynı gün çiçek teslimatı yapıyor musunuz?",
        a: "Konuma göre çoğu zaman mümkündür. Uygun teslim saatini sipariş sırasında WhatsApp üzerinden teyit ediyoruz.",
      },
      {
        q: "Küçük Kumla ve Büyük Kumla'nın ikisine de teslimat var mı?",
        a: "Evet, her iki bölgeye de teslimat yapıyoruz. Yazlık site adreslerinde site/blok/daire bilgisini eklemeniz teslimatı hızlandırır.",
      },
      {
        q: "Tatil adresine sürpriz gönderebilir miyim?",
        a: "Elbette. Gönderen bilgisini gizli tutarak sürpriz teslimat yapabilir, teslim saatini birlikte planlayabiliriz.",
      },
      {
        q: "Kumla siparişi nasıl veririm?",
        a: "Siteden ürünü seçip açık adrese Kumla adresinizi yazabilir ya da doğrudan WhatsApp hattımızdan sipariş verebilirsiniz.",
      },
    ],
    related: [
      { label: "Gemlik Çiçekçi", href: "/gemlik-cicekci" },
      { label: "Aynı Gün Teslimat", href: "/gemlik-ayni-gun-cicek-teslimati" },
      { label: "Tüm Ürünler", href: "/urunler" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
];

export function getLandingPage(slug: string): LandingPageData | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}
