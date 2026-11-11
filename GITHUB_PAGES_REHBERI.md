# ÇAKIR Bilinçli Tüketici Marketi - GitHub Pages Yayınlama Rehberi

Bu proje, **hiçbir sunucuya, arka plan servisine veya API anahtarına ihtiyaç duymadan**, %100 tarayıcı tarafında (client-side) çalışacak şekilde optimize edilmiştir. Tamamen ücretsiz olarak **GitHub Pages** üzerinde yayınlayabilirsiniz.

---

## 🚀 1. Adım: GitHub'da Repository (Depo) Oluşturma

1. [GitHub](https://github.com) hesabınıza giriş yapın.
2. Sağ üstteki **+** simgesine tıklayıp **"New repository"** seçin.
3. Depo adını yazın (Örnek: `cakir-market` veya `bilincli-tuketici-marketi`).
4. **"Public"** (Herkese Açık) seçeneğini işaretleyin.
5. **"Create repository"** butonuna basın.

---

## 💻 2. Adım: Proje Dosyalarını GitHub'a Yükleme

Bilgisayarınızda terminal açarak proje klasöründe şu komutları çalıştırın:

```bash
# Git başlatma
git init
git add .
git commit -m "ÇAKIR Bilinçli Tüketici Marketi ilk sürüm"

# Ana dalı main yapma
git branch -M main

# Kendi GitHub repository adresinizi ekleyin (kullanıcı adınızı ve repo adınızı yazın)
git remote add origin https://github.com/<KULLANICI_ADINIZ>/<REPO_ADINIZ>.git

# Dosyaları GitHub'a gönderme
git push -u origin main
```

*(Not: Git kullanmıyorsanız GitHub web sitesindeki "uploading an existing file" seçeneğiyle de dosyaları yükleyebilirsiniz.)*

---

## ⚙️ 3. Adım: GitHub Pages'i Aktif Etme (Tek Tıkla)

Projenize otomatik yayınlama iş akışı (`.github/workflows/deploy.yml`) zaten eklenmiştir!

1. GitHub'da repository sayfanıza gidin.
2. Üst menüden **Settings** (Ayarlar) sekmesine tıklayın.
3. Sol menüden **Pages** sekmesini seçin.
4. **"Build and deployment"** başlığı altındaki **Source** açılır menüsünden:
   👉 **"GitHub Actions"** seçeneğini seçin.
5. Başka hiçbir ayar yapmanıza gerek yoktur!

---

## 🎉 4. Adım: Sitenizin Canlıya Geçişi

- Dosyalarınızı gönderdikten 1-2 dakika sonra GitHub Actions sitenizi otomatik olarak derler ve yayına alır.
- Sitenizin adresi şu şekilde olacaktır:
  👉 **`https://<KULLANICI_ADINIZ>.github.io/<REPO_ADINIZ>/`**
- Öğrencileriniz, velileriniz ve öğretmenleriniz bu adrese telefon, tablet veya akıllı tahtadan girerek doğrudan oynayabilir.

---

## ⚡ Alternatif: Vercel veya Netlify ile Yayınlama (İsteğe Bağlı)
Eğer GitHub Pages yerine Vercel veya Netlify tercih etmek isterseniz:
1. [Vercel.com](https://vercel.com) veya [Netlify.com](https://netlify.com)'a ücretsiz üye olun.
2. GitHub deponuzu bağlayıp "Import" butonuna basın.
3. Hiçbir ayara dokunmadan "Deploy" deyin. 30 saniye içinde özel bağlantınız hazır olur.

---

## 🔒 Güvenlik ve Gizlilik Notu
- Uygulama hiçbir gizli API anahtarı barındırmaz.
- Öğrenci isimleri veya oyun verileri sunuculara gitmez; sadece öğrencinin kendi cihazındaki tarayıcının `localStorage` alanında güvenle tutulur.
- Çevrimdışı ve ücretsiz eğitim için tam uyumludur.
