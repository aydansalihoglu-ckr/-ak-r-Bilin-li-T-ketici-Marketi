import { MarketItem } from '../types/game';

export const MARKET_CATEGORIES: { id: string; name: string; icon: string }[] = [
  { id: 'all', name: 'Tüm Reyonlar', icon: '🏪' },
  { id: 'meyve_sebze', name: 'Meyve & Sebze', icon: '🍎' },
  { id: 'sut_kahvalti', name: 'Süt & Kahvaltılık', icon: '🧀' },
  { id: 'firin_ekmek', name: 'Fırın & Ekmek', icon: '🥖' },
  { id: 'kuru_gida', name: 'Kuru Gıda & İçecek', icon: '🌾' },
  { id: 'okul_temizlik', name: 'Okul & Temizlik', icon: '✏️' },
  { id: 'istek_atistirmalik', name: 'Atıştırmalık & Eğlence', icon: '🍬' },
];

export const MARKET_ITEMS: MarketItem[] = [
  // Meyve & Sebze
  {
    id: 'elma',
    name: 'Kırmızı Elma',
    category: 'meyve_sebze',
    price: 35,
    emoji: '🍎',
    unit: '1 kg paket',
    isNeedByDefault: true,
    description: 'Vitamin deposu, sağlıklı dişler ve enerji için taze elma.'
  },
  {
    id: 'muz',
    name: 'Taze Muz',
    category: 'meyve_sebze',
    price: 75,
    emoji: '🍌',
    unit: '1 kg hevenk',
    isNeedByDefault: true,
    description: 'Potasyum ve doğal enerji kaynağı lezzetli muz.'
  },
  {
    id: 'havuc',
    name: 'Kıtır Havuç',
    category: 'meyve_sebze',
    price: 25,
    emoji: '🥕',
    unit: '1 file (1 kg)',
    isNeedByDefault: true,
    description: 'Göz sağlığı için A vitamini deposu taze havuç.'
  },
  {
    id: 'domates',
    name: 'Salkım Domates',
    category: 'meyve_sebze',
    price: 40,
    emoji: '🍅',
    unit: '1 paket',
    isNeedByDefault: true,
    description: 'Kahvaltı ve yemeklerin vazgeçilmezi leziz domates.'
  },
  {
    id: 'portakal',
    name: 'Sıkmalık Portakal',
    category: 'meyve_sebze',
    price: 30,
    emoji: '🍊',
    unit: '1 file',
    isNeedByDefault: true,
    description: 'Kış aylarında hastalıklardan koruyan C vitamini.'
  },

  // Süt & Kahvaltılık
  {
    id: 'sut',
    name: 'Taze Günlük Süt',
    category: 'sut_kahvalti',
    price: 38,
    emoji: '🥛',
    unit: '1 litre kutu',
    isNeedByDefault: true,
    description: 'Güçlü kemikler ve dişler için kalsiyum dolu süt.'
  },
  {
    id: 'yumurta',
    name: 'Organik Yumurta',
    category: 'sut_kahvalti',
    price: 85,
    emoji: '🥚',
    unit: '15\'li kutu',
    isNeedByDefault: true,
    description: 'Büyüme ve zeka gelişimi için en kaliteli protein.'
  },
  {
    id: 'peynir',
    name: 'Beyaz Peynir',
    category: 'sut_kahvalti',
    price: 145,
    emoji: '🧀',
    unit: '1 paket (350g)',
    isNeedByDefault: true,
    description: 'Kahvaltı sofrasının olmazsa olmaz besini.'
  },
  {
    id: 'zeytin',
    name: 'Siyah Zeytin',
    category: 'sut_kahvalti',
    price: 75,
    emoji: '🫒',
    unit: '1 kavanoz (400g)',
    isNeedByDefault: true,
    description: 'Doğal zeytinyağı içeren sağlıklı kahvaltılık.'
  },
  {
    id: 'tereyagi',
    name: 'Köy Tereyağı',
    category: 'sut_kahvalti',
    price: 160,
    emoji: '🧈',
    unit: '1 paket (250g)',
    isNeedByDefault: true,
    description: 'Yemek ve keklere lezzet katan doğal yağ.'
  },

  // Fırın & Ekmek
  {
    id: 'ekmek',
    name: 'Tam Buğday Ekmeği',
    category: 'firin_ekmek',
    price: 15,
    emoji: '🍞',
    unit: '1 adet somun',
    isNeedByDefault: true,
    description: 'Lif zengini, uzun süre tok tutan temel besin.'
  },
  {
    id: 'sandvic_ekmegi',
    name: 'Sandviç Ekmeği',
    category: 'firin_ekmek',
    price: 40,
    emoji: '🥪',
    unit: '4\'lü paket',
    isNeedByDefault: true,
    description: 'Okul beslenmesi ve ara öğünler için pratik ekmek.'
  },
  {
    id: 'un',
    name: 'Buğday Unu',
    category: 'firin_ekmek',
    price: 45,
    emoji: '🌾',
    unit: '1 kg paket',
    isNeedByDefault: true,
    description: 'Kek, poğaça ve ekmek yapımı için temel malzeme.'
  },
  {
    id: 'simit',
    name: 'Susamlı Çıtır Simit',
    category: 'firin_ekmek',
    price: 15,
    emoji: '🥯',
    unit: '1 adet',
    isNeedByDefault: true,
    description: 'Geleneksel lezzet, çıtır susamlı sokak simidi.'
  },

  // Kuru Gıda & İçecek
  {
    id: 'su',
    name: 'Doğal Kaynak Suyu',
    category: 'kuru_gida',
    price: 15,
    emoji: '💧',
    unit: '1.5 litre',
    isNeedByDefault: true,
    description: 'Yaşamın temeli, vücudumuzun en birincil ihtiyacı.'
  },
  {
    id: 'ceviz',
    name: 'Kabuklu Ceviz',
    category: 'kuru_gida',
    price: 160,
    emoji: '🌰',
    unit: '1 paket (200g)',
    isNeedByDefault: true,
    description: 'Beyin gelişimi ve hafıza için Omega-3 deposu.'
  },
  {
    id: 'findik',
    name: 'Kavrulmuş Fındık',
    category: 'kuru_gida',
    price: 140,
    emoji: '🥜',
    unit: '1 paket (150g)',
    isNeedByDefault: true,
    description: 'Ders çalışırken ve spor yaparken sağlıklı atıştırmalık.'
  },
  {
    id: 'makarna',
    name: 'Burgu Makarna',
    category: 'kuru_gida',
    price: 25,
    emoji: '🍝',
    unit: '1 paket (500g)',
    isNeedByDefault: true,
    description: 'Doyurucu ve enerji veren pratik yemek.'
  },

  // Okul & Temizlik
  {
    id: 'resim_defteri',
    name: 'Büyük Resim Defteri',
    category: 'okul_temizlik',
    price: 65,
    emoji: '🎨',
    unit: '1 adet (25 yaprak)',
    isNeedByDefault: true,
    description: 'Görsel sanatlar dersi ve hayal gücünü çizmek için.'
  },
  {
    id: 'pastel_boya',
    name: '12 Renk Pastel Boya',
    category: 'okul_temizlik',
    price: 120,
    emoji: '🖍️',
    unit: '1 kutu',
    isNeedByDefault: true,
    description: 'Okul projeleri ve renkli çizimler için temel araç.'
  },
  {
    id: 'yapistirici_makas',
    name: 'Yapıştırıcı & Güvenli Makas',
    category: 'okul_temizlik',
    price: 85,
    emoji: '✂️',
    unit: '1 set',
    isNeedByDefault: true,
    description: 'Kesme ve yapıştırma etkinlikleri için okul kiti.'
  },
  {
    id: 'sabun',
    name: 'Doğal El Sabunu',
    category: 'okul_temizlik',
    price: 35,
    emoji: '🧼',
    unit: '1 adet kalıp',
    isNeedByDefault: true,
    description: 'Mikroplardan korunmak ve hijyen için el temizliği.'
  },
  {
    id: 'dis_fircasi',
    name: 'Çocuk Diş Fırçası & Macun',
    category: 'okul_temizlik',
    price: 75,
    emoji: '🪥',
    unit: '1 set',
    isNeedByDefault: true,
    description: 'Diş sağlığı ve parlak gülüşler için hijyen ihtiyacı.'
  },

  // İstekler & Atıştırmalık (Wants)
  {
    id: 'cikolata_gofret',
    name: 'Çikolatalı Gofret',
    category: 'istek_atistirmalik',
    price: 20,
    emoji: '🍫',
    unit: '1 adet',
    isNeedByDefault: false,
    description: 'İstek ürünü: Tadı güzel ama temel sağlık için şart değil.'
  },
  {
    id: 'lolipop',
    name: 'Meyveli Lolipop Şeker',
    category: 'istek_atistirmalik',
    price: 15,
    emoji: '🍭',
    unit: '1 adet',
    isNeedByDefault: false,
    description: 'İstek ürünü: Eğlenceli bir tatlı; bütçe el verirse alınabilir.'
  },
  {
    id: 'oyun_karti',
    name: 'Süper Kahraman Oyun Kartı',
    category: 'istek_atistirmalik',
    price: 60,
    emoji: '🃏',
    unit: '1 paket',
    isNeedByDefault: false,
    description: 'İstek ürünü: Koleksiyon ve oyun amaçlı, birincil ihtiyaç değil.'
  },
  {
    id: 'simli_cikartma',
    name: 'Simli Çıkartma Paketi',
    category: 'istek_atistirmalik',
    price: 35,
    emoji: '⭐',
    unit: '1 yaprak',
    isNeedByDefault: false,
    description: 'İstek ürünü: Defterleri süslemek için eğlenceli sticker.'
  },
  {
    id: 'balon_seti',
    name: 'Renkli Parti Balonları',
    category: 'istek_atistirmalik',
    price: 45,
    emoji: '🎈',
    unit: '5\'li paket',
    isNeedByDefault: false,
    description: 'İstek ürünü: Kutlama ve eğlence için süsleme balonu.'
  }
];
