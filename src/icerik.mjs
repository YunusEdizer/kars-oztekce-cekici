// Site içeriği. Metinlerde basit HTML (<a>, <b>) kullanılabilir.
// Kural: doğrulanmamış bilgi (kuruluş yılı, araç sayısı, kesin varış süresi, fiyat) yazılmaz.
// Mesafeler Google Haritalar'dan Kars merkezden ölçülmüştür (kars-camlica-taksi projesi, 16–17.09.2026).

export const KARS_MERKEZ = [40.6013, 43.0950];

// ---------------------------------------------------------------- HİZMETLER
export const HIZMETLER = [
  {
    slug: "arac-cekme",
    ad: "Araç Çekme",
    ikon: "cekici",
    kisa: "Arızalı ya da kazalı aracınızı servise, sanayiye, evinize veya otoparka taşırız.",
    baslik: "Kars Araç Çekme Hizmeti 7/24 | Öztekçe Oto Kurtarma",
    aciklama: "Kars'ta arızalı veya kazalı aracınızı servise, eve ya da otoparka taşıyoruz. Fiyat yola çıkmadan belli. 7/24 ulaşın: 0545 205 86 79",
    h1: "Kars'ta araç çekme",
    giris: "Aracınız çalışmıyor ya da yola devam etmesi güvenli değilse, bulunduğunuz yerden alıp istediğiniz adrese taşıyoruz: yetkili servis, sanayi sitesi, eviniz ya da otopark.",
    bolumler: [
      ["Hangi durumda çekici çağırmalısınız?", { liste: [
        "Motor hiç çalışmıyor ya da çalışıp hemen stop ediyorsa",
        "Gösterge panelinde kırmızı uyarı lambası (yağ basıncı, hararet) yanıyorsa",
        "Kaza sonrası far, tekerlek ya da süspansiyon hasar gördüyse",
        "Fren, direksiyon veya viteste bir sorun hissediyorsanız",
      ] }],
      ["Fiyat nasıl belirlenir?", [
        "Ücret; mesafeye, aracınızın tipine ve aracın yola çıkarılması için kurtarma gerekip gerekmediğine göre değişir. Telefonda bulunduğunuz yeri ve aracın gideceği adresi söylediğinizde, <b>fiyatı yola çıkmadan net olarak söyleriz.</b>",
      ]],
      ["Nereye götürüyoruz?", [
        "Adresi siz belirlersiniz: Kars merkezdeki servisler ve sanayi, eviniz, otopark ya da il dışında bir servis. İl dışına taşımalar için <a href=\"/hizmetler/sehirlerarasi-arac-tasima/\">şehirlerarası araç taşıma</a> sayfasına bakabilirsiniz.",
      ]],
    ],
    sss: [
      ["Kars'ta çekici ne kadar sürede gelir?", "Bulunduğunuz yere ve yol durumuna göre değişir. Aradığınızda konumunuza göre tahmini varış süresini söyleriz."],
      ["Aracımı hangi adrese götürebilirsiniz?", "Kars merkezdeki servis ve sanayi, eviniz, otopark ya da il dışındaki bir servis. Adresi siz belirlersiniz; fiyat mesafeye göre telefonda netleşir."],
    ],
  },
  {
    slug: "kaza-sarampol-kurtarma",
    ad: "Kaza ve Şarampol Kurtarma",
    ikon: "kurtarma",
    kisa: "Yoldan çıkan, şarampole düşen ya da kaza yapan aracı yola çıkarıp taşırız.",
    baslik: "Kars Oto Kurtarma: Kaza ve Şarampol | Öztekçe",
    aciklama: "Kars ve ilçelerinde kaza yapan, yoldan çıkan veya şarampole düşen araçları kurtarıp istediğiniz adrese taşıyoruz. 7/24: 0545 205 86 79",
    h1: "Kaza ve şarampol kurtarma",
    giris: "Kışın buzlanan virajlarda yoldan çıkmak Kars'ta sık yaşanan bir durum. Aracınız şarampole düştüyse ya da kaza sonrası yürüyemez hâldeyse, önce kendinizin ve yoldakilerin güvenliğini sağlayın, sonra bizi arayın.",
    bolumler: [
      ["Önce güvenlik", { liste: [
        "Yaralı varsa önce <b>112</b>'yi arayın.",
        "Dörtlü flaşörleri yakın; reflektörlü yeleğiniz varsa giyin.",
        "Reflektör üçgenini aracın yeterince gerisine koyun.",
        "Trafiğe açık yolda aracın içinde ya da önünde beklemeyin; bariyerin arkasına geçin.",
      ] }],
      ["Tutanak ve sigorta", [
        "Maddi hasarlı kazalarda taraflar anlaşırsa kaza tespit tutanağı doldurulabilir; anlaşmazlık ya da yaralanma varsa polis veya jandarmaya haber verin. Aracı kaldırmadan önce kaza yerinin ve araçların fotoğraflarını çekin.",
        "Kasko poliçenizde çekici teminatı olabilir; masrafın karşılanıp karşılanmayacağını sigortanızın asistans hattına sorun. Ayrıntılar için <a href=\"/rehber/kaza-sonrasi-cekici-ve-sigorta/\">kaza sonrası rehberimize</a> bakın.",
      ]],
    ],
    sss: [
      ["Kaza yerinden aracı hemen kaldırmalı mıyım?", "Yaralanmalı kazalarda ve taraflar anlaşamadığında yetkililer gelmeden aracın yeri değiştirilmemelidir. Maddi hasarlı kazada tutanak ve fotoğraflar tamamlandıktan sonra aracı kaldırırız."],
      ["Şarampole düşen aracı çıkarabiliyor musunuz?", "Evet. Aracın durduğu yere ve eğime bakarak en az hasarla yola çıkarıp istediğiniz adrese taşırız. Arayınca yerini tarif edin ya da konumunuzu WhatsApp'tan gönderin."],
    ],
  },
  {
    slug: "kar-camur-kurtarma",
    ad: "Kara ve Çamura Saplanan Araç",
    ikon: "kar",
    kisa: "Karda, buzda ya da çamurda mahsur kalan aracınızı zarar vermeden çıkarırız.",
    baslik: "Kars'ta Kara Saplanan Araç Kurtarma | Öztekçe",
    aciklama: "Karda, buzda veya çamurda mahsur kalan aracınızı Kars merkez, köy yolları ve ilçelerde çıkarıyoruz. Konumunuzu gönderin: 0545 205 86 79",
    h1: "Kara ve çamura saplanan araç kurtarma",
    giris: "Kasım'dan Mart'a kadar Kars'ta kar ve buz, özellikle köy yollarında ve yayla dönüşlerinde araçları mahsur bırakabilir. Tekerlekleri boşa döndürmeye devam etmek aracı daha da gömer — durun ve bizi arayın.",
    bolumler: [
      ["Beklerken yapmanız gerekenler", { liste: [
        "Egzoz borusunun karla kapanmadığından emin olun. Kapalıysa motoru çalıştırmayın: <b>karbonmonoksit zehirlenmesi</b> riski vardır.",
        "Isınmak için motoru çalıştıracaksanız kısa aralıklarla çalıştırın ve bir camı hafif aralık bırakın.",
        "Tipide araçtan uzaklaşmayın; görüş birkaç metreye inebilir.",
        "Konumunuzu WhatsApp'tan gönderin ve telefon şarjınızı idareli kullanın.",
      ] }],
      ["Neden tekerleği döndürmeye devam etmemelisiniz?", [
        "Boşa dönen tekerlek altındaki karı eritip buza çevirir ve aracı daha da gömer; debriyaj ve şanzıman da zorlanır. Birkaç denemede çıkamadıysanız zorlamayın. Ayrıntılı öneriler <a href=\"/rehber/kara-saplanan-arac-ne-yapmali/\">kara saplanan araç rehberimizde</a>.",
      ]],
    ],
    sss: [
      ["Köy yollarına geliyor musunuz?", "Kars merkez ve ilçelere bağlı köy yollarına, yol çekicinin geçişine uygunsa geliyoruz. Kapalı ya da henüz açılmamış yollarda önce yol durumunu birlikte değerlendiririz."],
      ["Çamura saplanan traktör ya da iş makinesi çıkarıyor musunuz?", "Aracın tipini ve durumunu telefonda anlatın; yapılabilecek işi ve fiyatı yola çıkmadan söyleyelim."],
    ],
  },
  {
    slug: "aku-takviye",
    ad: "Akü Takviye",
    ikon: "aku",
    kisa: "Soğukta biten aküyü yerinde takviyeyle çalıştırırız; çalışmazsa aracı servise taşırız.",
    baslik: "Kars Akü Takviye Yol Yardım 7/24 | Öztekçe",
    aciklama: "Kars'ın soğuğunda aküsü biten aracınızı yerinde takviye ile çalıştırıyoruz; çalışmazsa servise taşıyoruz. 7/24 ulaşın: 0545 205 86 79",
    h1: "Akü takviye",
    giris: "Kars'ta kış gecelerinde sıcaklık −20 °C'nin altına inebilir; bu soğukta zayıf bir akü sabah marşa yetmeyebilir. Çoğu durumda aracı yerinde takviye ile çalıştırmak mümkündür.",
    bolumler: [
      ["Sorun akü mü?", { liste: [
        "Marş yavaş dönüyor ya da yalnızca tık sesi geliyorsa büyük ihtimalle akü zayıftır.",
        "Gösterge ışıkları hiç yanmıyorsa akü tamamen boşalmış ya da kutup başı gevşemiş olabilir.",
        "Marş normal dönüyor ama motor çalışmıyorsa sorun yakıt ya da ateşlemede olabilir; takviye işe yaramaz, çekici gerekir.",
      ] }],
      ["Takviyeden sonra", [
        "Takviyeyle çalışan aracı en az 20–30 dakika sürün ki akü şarj olsun. Akü birkaç gün içinde yine biterse değişim zamanı gelmiş demektir. Soğuğun aküye etkisini <a href=\"/rehber/soguk-havada-aku-neden-biter/\">bu rehberde</a> anlattık.",
      ]],
    ],
    sss: [
      ["Donmuş aküye takviye yapılır mı?", "Hayır. Kasası şişmiş ya da donmuş aküye takviye yapılmaz; patlama riski vardır. Bu durumda aracı servise taşımak gerekir."],
      ["Otel ya da site otoparkına geliyor musunuz?", "Evet. Aracın bulunduğu otoparkı ve kat bilgisini söyleyin; giriş yüksekliği çekiciye uygun değilse takviyeyi yerinde yapar, gerekirse aracı dışarı almanın yolunu birlikte buluruz."],
    ],
  },
  {
    slug: "lastik-yol-yardimi",
    ad: "Lastik Yol Yardımı",
    ikon: "lastik",
    kisa: "Patlayan lastikte stepne değişimine yardım eder, gerekirse aracı lastikçiye taşırız.",
    baslik: "Kars Lastik Yol Yardımı 7/24 | Öztekçe Oto Kurtarma",
    aciklama: "Kars'ta ve ilçe yollarında lastiği patlayan aracınıza yardıma geliyoruz: stepne değişimi ya da lastikçiye taşıma. 7/24: 0545 205 86 79",
    h1: "Lastik yol yardımı",
    giris: "Dar bankette ve buzlu yol kenarında lastik değiştirmek tehlikeli olabilir. Stepnenizi güvenli şekilde takıyor; stepne yoksa ya da o da hasarlıysa aracı en yakın lastikçiye ya da istediğiniz adrese götürüyoruz.",
    bolumler: [
      ["Lastik patladığında", { liste: [
        "Aracı mümkünse yolun tamamen dışına alın; ani fren yapmadan yavaşlayın.",
        "Dörtlüleri yakın, reflektör üçgenini koyun.",
        "Patlak lastikle yola devam etmeyin; jant ve fren parçaları zarar görebilir.",
      ] }],
      ["Kış lastiği ve zincir", [
        "Kars'ta kış boyunca yazlık lastikle yola çıkmak kayma ve yoldan çıkma riskini ciddi şekilde artırır. Kış yolculuğuna hazırlık için <a href=\"/rehber/kisin-kars-a-aracla-gelirken/\">kış yolculuğu rehberimize</a> göz atın.",
      ]],
    ],
    sss: [
      ["Stepnem yoksa ne olur?", "Aracınızı çekiciye yükleyip en yakın açık lastikçiye ya da istediğiniz adrese taşırız."],
      ["Bijon anahtarım yok ya da bijon sıkışmış, yardım eder misiniz?", "Arayınca durumu anlatın; yerinde çözülebiliyorsa çözer, çözülemiyorsa aracı lastikçiye taşırız."],
    ],
  },
  {
    slug: "sehirlerarasi-arac-tasima",
    ad: "Şehirlerarası Araç Taşıma",
    ikon: "rota",
    kisa: "Aracınızı Erzurum, Iğdır, Ardahan ve diğer illerdeki servislere taşırız.",
    baslik: "Kars'tan Şehirlerarası Araç Taşıma | Öztekçe",
    aciklama: "Aracınızı Kars'tan Erzurum, Iğdır, Ardahan ve diğer illerdeki servise ya da adresinize taşıyoruz. Fiyat yola çıkmadan belli: 0545 205 86 79",
    h1: "Şehirlerarası araç taşıma",
    giris: "Aracınızın yetkili servisi ya da aradığınız parça Kars'ta olmayabilir. Aracınızı Erzurum, Iğdır, Ardahan veya istediğiniz başka bir ile taşıyoruz; il dışında yolda kalan aracınızı da Kars'a getiriyoruz.",
    bolumler: [
      ["Nasıl planlıyoruz?", { liste: [
        "Aracın bulunduğu adresi, gideceği adresi ve aracın tipini söyleyin.",
        "Mesafeye göre fiyatı ve yola çıkış saatini telefonda netleştirelim.",
        "Teslim adresinde aracı kimin teslim alacağını önceden konuşalım.",
      ] }],
      ["Hangi durumlarda tercih edilir?", [
        "Garanti kapsamındaki aracın yetkili servise götürülmesi, uzun süre çalışmayacak aracın başka bir ile nakli ya da yolculuk sırasında arızalanan aracın memlekete getirilmesi en sık karşılaştığımız durumlar.",
      ]],
    ],
    sss: [
      ["Başka ilden Kars'a araç getiriyor musunuz?", "Evet. Yolda kalan ya da serviste bekleyen aracınızı il dışından Kars'a da getiriyoruz; mesafe ve fiyat telefonda belirlenir."],
      ["Aracın içinde eşya bırakabilir miyim?", "Değerli eşyaları ve belgeleri yanınıza almanızı öneririz. Diğer eşyalar için teslimden önce konuşalım."],
    ],
  },
];

// ---------------------------------------------------------------- BÖLGELER (ilçeler)
export const BOLGELER = [
  {
    slug: "sarikamis-cekici", ad: "Sarıkamış", de: "Sarıkamış'ta", a: "Sarıkamış'a", dan: "Sarıkamış'tan",
    konum: [40.3314, 42.5919], yon: "güneybatısında",
    mesafe: ["Kars merkez → Sarıkamış Kayak Merkezi", "~57 km", "~50 dk"],
    baslik: "Sarıkamış Çekici ve Oto Kurtarma 7/24 | Öztekçe",
    aciklama: "Sarıkamış, Kayak Merkezi ve Kars–Erzurum yolunda çekici, akü takviye ve kara saplanan araç kurtarma. 7/24 ulaşın: 0545 205 86 79",
    ozel: [
      "Sarıkamış, kış aylarında Kayak Merkezi ve Kars–Erzurum yolu nedeniyle ilin en hareketli bölgesidir. Sarıçam ormanları arasından geçen yolda kar, tipi ve buzlanma sık görülür.",
      "Kayak için gelip otel otoparkında aküsü biten, dönüş yolunda yoldan çıkan ya da kara saplanan araçlara yardıma geliyoruz. Kiralık araçla geldiyseniz önce kiralama firmanızı aramayı unutmayın.",
    ],
    yollar: ["kars-erzurum-yolu-yol-yardim"],
    sss: [
      ["Sarıkamış Kayak Merkezi'ne çekici geliyor mu?", "Evet. Otel otoparkında ya da kayak merkezi yolunda kalan araçlara geliyoruz. Kars merkezden yol yaklaşık 57 km; yol durumuna göre tahmini varış süresini telefonda söyleriz."],
      ["Sarıkamış'tan aracımı Kars'taki servise götürebilir misiniz?", "Evet. Aracınızı Kars merkezdeki servise ya da istediğiniz başka bir adrese taşırız; fiyatı yola çıkmadan söyleriz."],
    ],
  },
  {
    slug: "selim-cekici", ad: "Selim", de: "Selim'de", a: "Selim'e", dan: "Selim'den",
    konum: [40.4636, 42.7839], yon: "güneybatısında",
    mesafe: ["Kars merkez → Selim", "~33 km", "~33 dk"],
    baslik: "Selim Çekici ve Yol Yardım 7/24 | Öztekçe Oto Kurtarma",
    aciklama: "Selim ilçesi ve Kars–Erzurum yolunda arızalanan, kaza yapan veya kara saplanan araçlara çekici ve yol yardımı. 7/24: 0545 205 86 79",
    ozel: [
      "Selim, Kars–Erzurum yolu üzerinde, Kars merkezin güneybatısındaki ilk ilçedir. Erzurum yönünden gelip Kars'a yaklaşırken yolda kalanların en sık aradığı bölgelerden biridir.",
      "İlçe merkezinde ve köy yollarında akü takviye, kara saplanan araç ve araç çekme için geliyoruz; aracınızı Kars'taki servise ya da istediğiniz adrese taşıyoruz.",
    ],
    yollar: ["kars-erzurum-yolu-yol-yardim"],
    sss: [
      ["Kars'tan Selim'e çekici ne kadar sürede gelir?", "Kars merkezden Selim'e yol yaklaşık 33 km ve normal şartlarda 30–35 dakika sürer. Kışın yol durumuna göre uzayabilir; tahmini süreyi telefonda söyleriz."],
      ["Selim'in köylerine geliyor musunuz?", "Yol çekicinin geçişine uygunsa geliyoruz. Köyün adını ve aracın yerini tarif edin ya da konumunuzu WhatsApp'tan gönderin."],
    ],
  },
  {
    slug: "digor-cekici", ad: "Digor", de: "Digor'da", a: "Digor'a", dan: "Digor'dan",
    konum: [40.3747, 43.4125], yon: "güneydoğusunda",
    mesafe: ["Kars merkez → Digor", "~43 km", "~38 dk"],
    baslik: "Digor Çekici ve Oto Kurtarma 7/24 | Öztekçe",
    aciklama: "Digor ilçesi ve Kars–Iğdır yolunda çekici, akü takviye, lastik yardımı ve kaza kurtarma. Fiyat yola çıkmadan belli: 0545 205 86 79",
    ozel: [
      "Digor, Kars merkezin güneydoğusunda, Iğdır yönüne giden yol üzerindedir. Kars–Iğdır arasında yolculuk yapanlar için yolda kalınan en olası bölgelerden biridir.",
      "İlçe merkezinde ve çevre köylerde arızalanan araçları Kars'taki servise, Iğdır'a ya da istediğiniz adrese taşıyoruz.",
    ],
    yollar: ["kars-igdir-yolu-yol-yardim"],
    sss: [
      ["Kars'tan Digor'a çekici ne kadar sürede gelir?", "Kars merkezden Digor'a yol yaklaşık 43 km ve normal şartlarda 40 dakika civarı sürer. Kışın bu süre uzayabilir."],
      ["Digor'dan aracımı Iğdır'a götürebilir misiniz?", "Evet. Iğdır'daki servise ya da istediğiniz adrese taşırız; fiyatı mesafeye göre yola çıkmadan söyleriz."],
    ],
  },
  {
    slug: "kagizman-cekici", ad: "Kağızman", de: "Kağızman'da", a: "Kağızman'a", dan: "Kağızman'dan",
    konum: [40.1453, 43.1311], yon: "güneyinde",
    mesafe: ["Kars merkez → Kağızman", "~72 km", "~1 sa 10 dk"],
    baslik: "Kağızman Çekici ve Yol Yardım 7/24 | Öztekçe",
    aciklama: "Kağızman ve Aras vadisi yollarında arızalanan veya kaza yapan araçlara çekici, oto kurtarma ve akü takviye. 7/24: 0545 205 86 79",
    ozel: [
      "Kağızman, Kars'ın en güneyindeki ilçelerden biridir ve Aras vadisinde yer alır. Merkezle arasındaki yolda yükselti farkı nedeniyle kış şartları kısa mesafede değişebilir.",
      "Uzak bir ilçe olduğu için aradığınızda aracın durumunu ve gideceği adresi netleştiriyor, fiyatı ve tahmini varış süresini yola çıkmadan söylüyoruz.",
    ],
    yollar: ["kars-igdir-yolu-yol-yardim"],
    sss: [
      ["Kars'tan Kağızman'a çekici ne kadar sürede gelir?", "Kars merkezden Kağızman'a yol yaklaşık 72 km ve normal şartlarda 1 saat 10 dakika civarı sürer. Kışın yol durumuna göre uzayabilir."],
      ["Kağızman'dan Kars'a araç taşıma ücreti nasıl belirlenir?", "Aracın tipi, bulunduğu yer ve kurtarma gerekip gerekmediğine göre belirlenir; telefonda yola çıkmadan net fiyat veririz."],
    ],
  },
  {
    slug: "arpacay-cekici", ad: "Arpaçay", de: "Arpaçay'da", a: "Arpaçay'a", dan: "Arpaçay'dan",
    konum: [40.8478, 43.3303], yon: "kuzeydoğusunda",
    mesafe: ["Kars merkez → Arpaçay", "~39 km", "~37 dk"],
    baslik: "Arpaçay Çekici ve Oto Kurtarma 7/24 | Öztekçe",
    aciklama: "Arpaçay ilçesi ve köy yollarında çekici, kara saplanan araç kurtarma ve akü takviye hizmeti. 7/24 ulaşın: 0545 205 86 79",
    ozel: [
      "Arpaçay, Kars merkezin kuzeydoğusundaki yayla ilçesidir. Kışın rüzgâr ve savrulan kar, açık araziden geçen yollarda görüşü aniden düşürebilir.",
      "İlçe merkezinde ve köy yollarında mahsur kalan, aküsü biten ya da arızalanan araçlara geliyor; aracınızı Kars'a veya istediğiniz adrese taşıyoruz.",
    ],
    yollar: [],
    sss: [
      ["Kars'tan Arpaçay'a çekici ne kadar sürede gelir?", "Kars merkezden Arpaçay'a yol yaklaşık 39 km ve normal şartlarda 35–40 dakika sürer. Kışın bu süre uzayabilir."],
      ["Tipide yolda kaldım, ne yapmalıyım?", "Araçtan uzaklaşmayın, egzozun karla kapanmadığından emin olun ve konumunuzu WhatsApp'tan gönderin. Can güvenliği riski varsa 112'yi arayın."],
    ],
  },
  {
    slug: "akyaka-cekici", ad: "Akyaka", de: "Akyaka'da", a: "Akyaka'ya", dan: "Akyaka'dan",
    konum: [40.7442, 43.6207], yon: "doğusunda",
    mesafe: ["Kars merkez → Akyaka", "~61 km", "~51 dk"],
    baslik: "Akyaka Çekici ve Yol Yardım 7/24 | Öztekçe",
    aciklama: "Akyaka ilçesi ve çevre köylerde çekici, akü takviye, lastik yardımı ve kara saplanan araç kurtarma. 7/24: 0545 205 86 79",
    ozel: [
      "Akyaka, Kars merkezin doğusunda, Ermenistan sınırına yakın bir ilçedir. Köyler arası mesafeler uzun olduğu için yolda kalındığında yardımın doğru yere hızlı ulaşması önemlidir.",
      "Konumunuzu WhatsApp'tan gönderirseniz bulunduğunuz yeri doğrudan haritada görür, yola buna göre çıkarız.",
    ],
    yollar: [],
    sss: [
      ["Kars'tan Akyaka'ya çekici ne kadar sürede gelir?", "Kars merkezden Akyaka'ya yol yaklaşık 61 km ve normal şartlarda 50 dakika civarı sürer. Kışın yol durumuna göre uzayabilir."],
      ["Akyaka'nın köylerine geliyor musunuz?", "Yol çekicinin geçişine uygunsa geliyoruz. Konumunuzu WhatsApp'tan göndermeniz yeri bulmamızı kolaylaştırır."],
    ],
  },
  {
    slug: "susuz-cekici", ad: "Susuz", de: "Susuz'da", a: "Susuz'a", dan: "Susuz'dan",
    konum: [40.7786, 43.1375], yon: "kuzeyinde",
    mesafe: ["Kars merkez → Susuz", "~25 km", "~24 dk"],
    baslik: "Susuz Çekici ve Oto Kurtarma 7/24 | Öztekçe",
    aciklama: "Susuz ilçesi ve Kars–Ardahan yönünde çekici, oto kurtarma ve akü takviye. Kars'a en yakın ilçelerden; 7/24 ulaşın: 0545 205 86 79",
    ozel: [
      "Susuz, Kars merkezin kuzeyinde, merkeze en yakın ilçelerden biridir. Kuzeye, Ardahan yönüne giden yolculuklarda kışın kar ve buzlanma sık görülür.",
      "İlçe merkezinde ve köy yollarında arızalanan, kara saplanan ya da aküsü biten araçlara geliyor; aracınızı Kars'taki servise taşıyoruz.",
    ],
    yollar: ["kars-ardahan-yolu-yol-yardim"],
    sss: [
      ["Kars'tan Susuz'a çekici ne kadar sürede gelir?", "Kars merkezden Susuz'a yol yaklaşık 25 km ve normal şartlarda 25 dakika civarı sürer. Kışın bu süre uzayabilir."],
      ["Susuz'dan aracımı Kars'a çekebilir misiniz?", "Evet. Kars merkezdeki servis, sanayi ya da evinize taşırız; fiyatı yola çıkmadan söyleriz."],
    ],
  },
];

// ---------------------------------------------------------------- KARAYOLLARI
export const YOLLAR = [
  {
    slug: "kars-erzurum-yolu-yol-yardim", ad: "Kars–Erzurum Yolu", kisa: "Selim ve Sarıkamış üzerinden",
    baslik: "Kars–Erzurum Yolu Çekici ve Yol Yardım | Öztekçe",
    aciklama: "Kars–Erzurum yolunda, Selim ve Sarıkamış kesiminde yolda kalan araçlara 7/24 çekici ve yol yardımı. Konumunuzu gönderin: 0545 205 86 79",
    h1: "Kars–Erzurum yolu çekici ve yol yardımı",
    giris: "Kars'tan batıya Selim ve Sarıkamış üzerinden Erzurum'a uzanan yol, bölgenin en yoğun karayoludur. Sarıkamış ormanları arasındaki kesimde kışın kar, tipi ve buzlanma sık görülür.",
    ilceler: ["selim-cekici", "sarikamis-cekici"],
    paragraflar: [
      "Bu yol üzerinde Kars il sınırları içinde yolda kalan araçlara geliyoruz. İl sınırının ötesinde, Erzurum tarafında kaldıysanız da arayın; mesafeye göre fiyatı telefonda konuşalım.",
      "Kış aylarında yola çıkmadan önce Karayolları Genel Müdürlüğü'nün yol durumu bilgisini kontrol edin; yoğun kar yağışında yol geçici olarak ulaşıma kapanabilir.",
    ],
  },
  {
    slug: "kars-igdir-yolu-yol-yardim", ad: "Kars–Iğdır Yolu", kisa: "Digor üzerinden",
    baslik: "Kars–Iğdır Yolu Çekici ve Yol Yardım | Öztekçe",
    aciklama: "Kars–Iğdır yolunda, Digor kesiminde arızalanan veya kaza yapan araçlara 7/24 çekici ve oto kurtarma. Hemen arayın: 0545 205 86 79",
    h1: "Kars–Iğdır yolu çekici ve yol yardımı",
    giris: "Kars'ın güneydoğusundan Digor üzerinden Iğdır'a uzanan yol, iki il arasında sık kullanılan bir güzergâhtır. Kışın yüksek kesimlerde kar ve buzlanma, sürüşü zorlaştırabilir.",
    ilceler: ["digor-cekici", "kagizman-cekici"],
    paragraflar: [
      "Bu yol üzerinde Kars il sınırları içinde yolda kalan araçlara geliyor, aracınızı Kars'a, Iğdır'a ya da istediğiniz adrese taşıyoruz.",
      "Aracınız arızalandığında emniyet şeridine ya da yolun tamamen dışına çekin, dörtlüleri yakın ve reflektör üçgenini koyun. Konumunuzu WhatsApp'tan göndermeniz sizi bulmamızı hızlandırır.",
    ],
  },
  {
    slug: "kars-ardahan-yolu-yol-yardim", ad: "Kars–Ardahan Yolu", kisa: "Kuzey yönü",
    baslik: "Kars–Ardahan Yolu Çekici ve Yol Yardım | Öztekçe",
    aciklama: "Kars–Ardahan yolunda kar, tipi veya arıza nedeniyle yolda kalan araçlara 7/24 çekici ve kurtarma. Konumunuzu gönderin: 0545 205 86 79",
    h1: "Kars–Ardahan yolu çekici ve yol yardımı",
    giris: "Kars'tan kuzeye Ardahan'a uzanan yol, kışın açık arazide savrulan kar ve tipi nedeniyle görüşün aniden düştüğü bir güzergâhtır.",
    ilceler: ["susuz-cekici", "arpacay-cekici"],
    paragraflar: [
      "Bu yol üzerinde Kars il sınırları içinde yolda kalan araçlara geliyoruz. Ardahan tarafında kaldıysanız da arayın; mesafeye göre fiyatı telefonda konuşalım.",
      "Tipide araçtan uzaklaşmayın ve egzozun karla kapanmadığından emin olun. Can güvenliği riski varsa önce 112'yi arayın.",
    ],
  },
];

// ---------------------------------------------------------------- REHBER
export const REHBER = [
  {
    slug: "kara-saplanan-arac-ne-yapmali",
    baslik: "Kara Saplanan Araç: Ne Yapmalı, Ne Yapmamalı? | Öztekçe",
    aciklama: "Karda mahsur kaldığınızda güvenle beklemek ve aracı zorlamadan çıkarmak için yapılması ve kaçınılması gerekenler. Kars kışına göre hazırlandı.",
    h1: "Kara saplanan araç: ne yapmalı, ne yapmamalı?",
    kisaCevap: "Tekerleği boşa döndürmeyi bırakın, egzozun karla kapanmadığından emin olun ve araçtan uzaklaşmayın. Tekerleklerin önünü açıp çekiş sağlayabilirsiniz; birkaç denemede çıkamazsanız zorlamadan çekici çağırın.",
    bolumler: [
      ["Önce güvenlik", { liste: [
        "<b>Egzozu kontrol edin.</b> Karla kapanmış egzozla motoru çalıştırmak araç içinde karbonmonoksit birikmesine yol açar. Bu gaz renksiz ve kokusuzdur.",
        "Motoru ısınmak için çalıştıracaksanız kısa aralıklarla çalıştırın ve bir camı hafif aralık tutun.",
        "Görünür olun: dörtlüleri yakın; gece ve tipide araç içi lambayı zaman zaman açın.",
        "Tipide ya da gece araçtan uzaklaşmayın. Yürüyerek yardım aramak, araçta beklemekten çoğu zaman daha tehlikelidir.",
      ] }],
      ["Aracı kendiniz çıkarmayı denemek", { liste: [
        "Tekerleklerin önündeki ve altındaki karı küreyle ya da elinizle temizleyin.",
        "Çekiş için tekerlek önüne kum, çakıl, paspas ya da zincir koyun.",
        "Ön çekişli araçlarda direksiyonu düz tutun; ikinci viteste (otomatikte kış modu varsa onu seçerek) gaza çok hafif basın.",
        "Aracı ileri-geri hafifçe sallamak işe yarayabilir; ancak tekerleği hızlı döndürmek karı buza çevirir ve aracı daha da gömer.",
      ] }],
      ["Ne zaman çekici çağırmalı?", [
        "Birkaç denemede çıkamadıysanız, araç yan yatmışsa, eğimli bir yerdeyse ya da hendeğe kaymışsa zorlamayın. Debriyaj ve şanzıman zarar görebilir, araç kayarak daha kötü bir konuma düşebilir. Konumunuzu WhatsApp'tan gönderin; aracı zarar vermeden çıkaralım.",
      ]],
    ],
  },
  {
    slug: "soguk-havada-aku-neden-biter",
    baslik: "Soğuk Havada Akü Neden Biter? Takviye Nasıl Yapılır",
    aciklama: "Kars'ın −20 °C'yi bulan soğuğunda akü neden zayıflar, doğru takviye sırası nedir, hangi durumda takviye yapılmaz? Kısa ve uygulanabilir rehber.",
    h1: "Soğuk havada akü neden biter?",
    kisaCevap: "Soğukta akünün içindeki kimyasal tepkime yavaşlar ve verebileceği güç düşer; aynı anda koyulaşan motor yağı marş motorunun daha fazla güç çekmesine neden olur. Zaten yıpranmış bir akü bu yüzden ilk soğuk sabahta pes eder.",
    bolumler: [
      ["Aküyü zorlayan durumlar", { liste: [
        "3–4 yaşını geçmiş akü",
        "Hep kısa mesafe sürülen, aküsü tam şarj olamayan araç",
        "Günlerce çalıştırılmadan açıkta bekleyen araç",
        "Kontak kapalıyken açık unutulan far, iç lamba ya da şarj cihazı",
      ] }],
      ["Doğru takviye sırası", { sirali: [
        "İki aracın da kontağını kapatın; araçlar birbirine değmesin.",
        "Kırmızı kabloyu önce <b>boş</b> akünün artı (+) kutbuna, sonra <b>dolu</b> akünün artı (+) kutbuna takın.",
        "Siyah kabloyu dolu akünün eksi (−) kutbuna, diğer ucunu boş aküye değil, çalışmayan aracın motor bloğunda boyasız bir metal noktaya takın.",
        "Önce yardım eden aracı çalıştırın, birkaç dakika sonra sizinkini çalıştırın.",
        "Kabloları takma sırasının tersiyle sökün.",
      ] }],
      ["Takviye yapılmaması gereken durumlar", [
        "Akünün kasası şişmiş, çatlamış ya da akü donmuşsa takviye yapmayın; patlama riski vardır. Akünün etrafında asit sızıntısı ya da keskin koku varsa da aküye dokunmayın. Bu durumlarda aracı servise taşımak gerekir.",
        "Takviyeyle çalışan aracı en az 20–30 dakika sürün. Akü birkaç gün içinde yeniden biterse değiştirme zamanı gelmiştir.",
      ]],
    ],
  },
  {
    slug: "kisin-kars-a-aracla-gelirken",
    baslik: "Kışın Kars'a Araçla Gelirken Alınacak Önlemler | Öztekçe",
    aciklama: "Sarıkamış, Ani veya Kars'a kışın araçla gelecekler için kontrol listesi: lastik, zincir, yakıt, araçta bulunması gerekenler ve yol durumu.",
    h1: "Kışın Kars'a araçla gelirken alınacak önlemler",
    kisaCevap: "Kış lastiği takın, zincir ve çekme halatı bulundurun, depoyu yarının altına düşürmeyin, telefonunuz şarjlı olsun ve yola çıkmadan Karayolları'nın yol durumu bilgisine bakın. Karanlıkta uzun yola çıkmamaya çalışın.",
    bolumler: [
      ["Araçta bulunması gerekenler", { liste: [
        "Kar zinciri (takmayı yola çıkmadan bir kez deneyin)",
        "Çekme halatı, akü takviye kablosu, küçük kürek",
        "Battaniye, eldiven, bere; su ve atıştırmalık",
        "El feneri, reflektör üçgeni, reflektörlü yelek",
        "Araç şarj kablosu ya da dolu bir powerbank",
      ] }],
      ["Yola çıkmadan", { liste: [
        "Kış lastiğinin diş derinliğini ve hava basıncını kontrol edin.",
        "Antifriz ve cam suyunun donmaya dayanıklı olduğundan emin olun.",
        "Karayolları Genel Müdürlüğü'nün yol durumu bilgisine ve hava tahminine bakın; yoğun kar yağışında bazı yollar geçici olarak kapanabilir.",
        "Kısa kış günlerinde yolculuğu gündüz saatlerine planlayın.",
      ] }],
      ["Kiralık araçla geliyorsanız", [
        "Aracın kış lastikli olduğunu teslim alırken kontrol edin. Arıza ya da kaza durumunda önce kiralama firmasının yol yardım hattını arayın; sözleşmenize göre masraf firmaya ait olabilir. Firmaya ulaşamazsanız ya da onay verirlerse bizi arayabilirsiniz.",
      ]],
    ],
  },
  {
    slug: "kaza-sonrasi-cekici-ve-sigorta",
    baslik: "Kaza Sonrası Çekici, Tutanak ve Sigorta Rehberi",
    aciklama: "Maddi hasarlı kazada ilk adımlar, tutanak, fotoğraf, kasko çekici teminatı ve aracın çekilmesi. Kars'ta kaza sonrası ne yapılır, kısa rehber.",
    h1: "Kaza sonrası çekici, tutanak ve sigorta",
    kisaCevap: "Önce güvenliği sağlayın ve yaralı varsa 112'yi arayın. Maddi hasarlı kazada taraflar anlaşırsa kaza tespit tutanağı doldurulur, anlaşmazlıkta polis ya da jandarma çağrılır. Aracı kaldırmadan önce fotoğraf çekin; kaskonuzda çekici teminatı olup olmadığını sigortanıza sorun.",
    bolumler: [
      ["İlk dakikalar", { sirali: [
        "Dörtlüleri yakın, reflektör üçgenini koyun, yolun dışına geçin.",
        "Yaralı varsa 112'yi arayın; yaralıyı zorunlu olmadıkça hareket ettirmeyin.",
        "Araçların konumunu, hasarları ve plakaları farklı açılardan fotoğraflayın.",
      ] }],
      ["Tutanak", [
        "Yalnızca maddi hasar varsa ve taraflar anlaşıyorsa kaza tespit tutanağını birlikte doldurabilirsiniz. Taraflar anlaşamıyorsa, sürücülerden biri alkollüyse ya da ehliyetsizse polis veya jandarmaya haber verin.",
      ]],
      ["Sigorta ve çekici", [
        "Kasko poliçelerinin çoğunda çekici ve yol yardım teminatı bulunur; kapsamı ve limiti poliçeye göre değişir. Sigortanızın asistans hattını arayarak masrafın karşılanıp karşılanmayacağını öğrenin.",
        "Aracınız yürüyemez durumdaysa ve hemen kaldırılması gerekiyorsa bizi arayın; aracı istediğiniz servise ya da ekspertiz için belirtilen adrese taşırız.",
      ]],
    ],
  },
  {
    slug: "yolda-kalinca-konum-nasil-gonderilir",
    baslik: "Yolda Kalınca Konum Nasıl Gönderilir? | Öztekçe",
    aciklama: "Çekici çağırırken bulunduğunuz yeri doğru iletmenin en hızlı yolu: WhatsApp konum paylaşımı, Google Haritalar ve kilometre taşları.",
    h1: "Yolda kalınca konum nasıl gönderilir?",
    kisaCevap: "En hızlı yol bu sitedeki “Konumumu gönder” düğmesidir: telefonunuzun konumunu alır ve hazır bir WhatsApp mesajı açar. WhatsApp'ta ataç simgesinden “Konum”u seçerek de gönderebilirsiniz.",
    bolumler: [
      ["WhatsApp ile", { sirali: [
        "Sohbeti açın ve ataç (Android) ya da artı (iPhone) simgesine dokunun.",
        "“Konum”u seçin, ardından “Mevcut konumunu gönder”e dokunun.",
        "Konum hassasiyeti düşükse birkaç saniye bekleyip yeniden deneyin.",
      ] }],
      ["İnternet zayıfsa", { liste: [
        "Yol kenarındaki kilometre taşını ya da en yakın köy, tesis veya köprü adını söyleyin.",
        "Hangi yönden geldiğinizi ve hangi yöne gittiğinizi belirtin (örneğin “Sarıkamış'tan Kars'a gelirken”).",
        "Google Haritalar'da mavi noktaya uzun basınca çıkan koordinatları SMS ile gönderebilirsiniz.",
      ] }],
      ["Konumunuz nerede saklanır?", [
        "Sitemizdeki düğme konumunuzu yalnızca WhatsApp mesajına ekler; bu site konum ya da kişisel veri saklamaz. Mesajı göndermeden önce içeriğini görebilir, düzenleyebilirsiniz.",
      ]],
    ],
  },
];

// ---------------------------------------------------------------- ANA SAYFA SSS
export const SSS_GENEL = [
  ["Kars'ta çekici ne kadar sürede gelir?", "Bulunduğunuz yere ve yol durumuna göre değişir. Aradığınızda konumunuza göre tahmini varış süresini söyleriz. Konumunuzu WhatsApp'tan göndermeniz bu süreyi kısaltır."],
  ["Çekici ücreti nasıl belirlenir?", "Mesafe, aracın tipi ve kurtarma gerekip gerekmediğine göre belirlenir. Bulunduğunuz yeri ve aracın gideceği adresi söylediğinizde fiyatı yola çıkmadan net olarak söyleriz."],
  ["Gece ve bayramlarda çalışıyor musunuz?", "Evet, 7 gün 24 saat ulaşabilirsiniz: gece, hafta sonu ve bayramlar dahil."],
  ["Hangi bölgelere geliyorsunuz?", "Kars merkez ile Sarıkamış, Selim, Digor, Kağızman, Arpaçay, Akyaka ve Susuz ilçelerine; Kars–Erzurum, Kars–Iğdır ve Kars–Ardahan yollarına geliyoruz. İl dışına araç taşıma da yapıyoruz."],
  ["Konumumu nasıl gönderirim?", "Sitedeki “Konumumu gönder” düğmesine dokunun; konumunuz hazır bir WhatsApp mesajına eklenir. Ya da WhatsApp'ta ataç simgesinden “Konum”u seçin."],
  ["Kaskom çekici masrafını karşılar mı?", "Birçok kasko poliçesinde çekici teminatı bulunur, ancak kapsam poliçeye göre değişir. Sigortanızın asistans hattına sorarak öğrenebilirsiniz."],
];
