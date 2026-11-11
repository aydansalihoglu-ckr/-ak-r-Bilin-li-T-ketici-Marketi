import { Character } from '../types/game';
import charElif from '../assets/images/char_elif_1794420097393.jpg';
import charAli from '../assets/images/char_ali_1794420098121.jpg';
import charZeynep from '../assets/images/char_zeynep_1794420098813.jpg';
import charCan from '../assets/images/char_can_1794420098688.jpg';

export const CHARACTERS: Character[] = [
  {
    id: 'elif',
    name: 'Elif',
    age: 7,
    grade: '2. Sınıf',
    avatarUrl: charElif,
    tagline: 'Sağlıklı Kahvaltı Dedektifi',
    personality: 'Neşeli, düzenli ve araştırmacı. Güne zinde başlamak için besleyici yiyecekleri çok iyi tanıyor.',
    mission: {
      title: 'Haftalık Sağlıklı Kahvaltı Görevi',
      scenario: 'Elif, okuldaki "Sağlıklı Yaşam" ünitesi kapsamında ailesi için vitamin ve kalsiyum dolu bir kahvaltı hazırlayacak. 240 ₺ harçlığı var. Önce gerçek ihtiyaçlarını belirleyip listesini yapmalı, sonra markete gidip bütçesini aşmadan alışverişini tamamlamalı!',
      pypTheme: 'Kendimizi Düzenleme Biçimimiz · Bilinçli Tüketici',
      budget: 240,
      requiredItemIds: ['sut', 'yumurta', 'ekmek', 'elma'], // Süt (38) + Yumurta (85) + Ekmek (15) + Elma (35) = 173 ₺
      optionalItemIds: ['cikolata_gofret', 'simli_cikartma'] // Çikolata (20), Simli çıkartma (35)
    }
  },
  {
    id: 'ali',
    name: 'Ali',
    age: 7,
    grade: '2. Sınıf',
    avatarUrl: charAli,
    tagline: 'Meraklı Sanat & Proje Mimarı',
    personality: 'Gözlüklü, yaratıcı ve analitik. Arkadaşlarıyla ortak okul projesi hazırlamayı çok seviyor.',
    mission: {
      title: 'Okul Sanat & Proje Malzemeleri Görevi',
      scenario: 'Ali ve çalışma grubu, "Doğayı Koruyalım" konulu bir afiş ve el işi projesi yapacaklar. Ali\'ye grup bütçesi olarak 350 ₺ verildi. Proje için resim defteri, pastel boya ve yapıştırıcı-makas seti alması gerekiyor. Kalan parasını kumbaraya biriktirmek istiyor.',
      pypTheme: 'Kendimizi İfade Etme Yollarımız · Planlama ve Bütçe',
      budget: 350,
      requiredItemIds: ['resim_defteri', 'pastel_boya', 'yapistirici_makas'], // Resim defteri (65) + Pastel boya (120) + Yapıştırıcı-Makas (85) = 270 ₺
      optionalItemIds: ['simli_cikartma', 'balon_seti'] // Simli çıkartma (35), Balon (45)
    }
  },
  {
    id: 'zeynep',
    name: 'Zeynep',
    age: 7,
    grade: '2. Sınıf',
    avatarUrl: charZeynep,
    tagline: 'Kocaman Kalpli Küçük Aşçı',
    personality: 'Sevecen, paylaşımcı ve mutfakta ailesine yardım etmeye bayılan bir öğrenci.',
    mission: {
      title: 'Büyükanneye Havuçlu-Cevizli Kek Görevi',
      scenario: 'Hafta sonu büyükannesini ziyarete gidecek olan Zeynep, ona elleriyle sağlıklı bir havuçlu kek pişirmek istiyor. Cebinde 340 ₺ var. Kek için un, havuç, ceviz ve süt almalı. Fazla para harcamayıp bütçesini koruyabilecek mi?',
      pypTheme: 'Gezegeni Paylaşmak & Aile Bağları · Kaynakları Doğru Kullanma',
      budget: 340,
      requiredItemIds: ['un', 'havuc', 'ceviz', 'sut'], // Un (45) + Havuç (25) + Ceviz (160) + Süt (38) = 268 ₺
      optionalItemIds: ['lolipop', 'cikolata_gofret'] // Lolipop (15), Gofret (20)
    }
  },
  {
    id: 'can',
    name: 'Can',
    age: 8,
    grade: '2. Sınıf',
    avatarUrl: charCan,
    tagline: 'Enerjik Basketbolcu & Sporcu',
    personality: 'Hareketli, neşeli ve arkadaş canlısı. Spor yaparken su tüketimine ve sağlıklı atıştırmalıklara önem verir.',
    mission: {
      title: 'Spor Antrenmanı & Enerji Çantası Görevi',
      scenario: 'Can, cumartesi günkü basketbol maçı ve antrenman molası için enerji paketi hazırlıyor. 360 ₺ bütçesi var. Çantasına mutlaka su, muz, fındık ve sandviç ekmeği koymalı. Oyun kartı reyonu aklını çelebilecek mi, yoksa bütçesine sadık kalacak mı?',
      pypTheme: 'Kim Olduğumuz · Dengeli Beslenme & Sağlık',
      budget: 360,
      requiredItemIds: ['su', 'muz', 'findik', 'sandvic_ekmegi'], // Su (15) + Muz (75) + Fındık (140) + Sandviç Ekmeği (40) = 270 ₺
      optionalItemIds: ['oyun_karti', 'lolipop'] // Oyun kartı (60), Lolipop (15)
    }
  }
];
