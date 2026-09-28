# Proje Planı: Avenox Çoklu Site Vitrini

Bu belge, Avenox Web Stüdyosu için statik olarak dışa aktarılabilir, Next.js ve TypeScript tabanlı vitrin uygulamasının mimarisini, tasarım sistemlerini, içerik gereksinimlerini ve uygulama aşamalarını tanımlar.

## 1. Kabul Kriterleri (Acceptance Criteria)

- **Teknoloji Yığını:** Next.js (App Router tercih edilir veya Pages router statik dışa aktarım için), TypeScript, Tailwind CSS (veya benzeri CSS-in-JS/utility çözüm).
- **Dil:** Tüm kullanıcı arayüzü ve içerikler yüksek kaliteli, editoryal Türkçe olacaktır. Yapay zeka klişelerinden, sahte abartılardan, aşırı gradyanlardan ve tekrarlayan kart yapılarından kaçınılacaktır.
- **Site Sayısı:** En az 12 adet, birbirinden farklı, çok sayfalı (her biri en az 4 anlamlı rota içeren) demo web sitesi. Gelecekte 20 siteye kadar genişlemeyi destekleyen mimari.
- **Görsel Sistemler:** 6 farklı, köklü görsel sistem (sadece renk teması değil; tipografi, boşluklar, bileşen tarzları ve animasyonları da etkileyen materyal seviyesinde değişiklikler).
- **Tema Değiştirici:** Aktif siteyi, gezinme sırasında durumunu koruyan, göze batmayan bir tasarımla 6 sistem arasında geçiş yapabilen kalıcı bir seçici.
- **Zorunlu İbare:** Her sitenin görünür, ancak estetiği bozmayan ince bir yerinde `Demo site` ibaresi bulunmalıdır.
- **Katalog Büyüklükleri:** Katalog/ürün ağırlıklı siteler için belirtilen minimum veri sayıları (örn. 64 restoran menü öğesi, 72 emlak listelemesi) sağlanmalıdır. Veriler tekrara düşmemeli, isim, açıklama ve fiyatlandırma açısından çeşitli olmalıdır.
- **Derleme:** Proje sıfır veritabanı veya dış API bağımlılığı ile tamamen lokal, statik olarak derlenebilir (`export` edilebilir) olmalıdır. Etkileşimler lokal olarak simüle edilecektir.
- **Kalite & Test:** Rota kapsamı, katalog veri sayıları, tema seçici entegrasyonu, zorunlu ibare kontrolü ve tip doğruluğunu onaylayan otomatik test mekanizmaları.

## 2. Görsel Sistem Davranış Matrisi

Tasarım sistemleri sadece renkleri değil, tipografi, dizgi yoğunluğu, bileşen stilleri ve animasyon yapılarını da köklü şekilde değiştirir.

| Sistem | İlham/Karakter | Tipografi | Yoğunluk & Boşluk | Görsel Dil & Dokular | Etkileşim & Hareket |
|---|---|---|---|---|---|
| **1. Violet Signal / Hermes** | Kozmik Gece, Derinlik, Lüks | Sıkıştırılmış (condensed) ekran başlıkları, editoryal grid. | Geniş, güçlü grid. | Kozmik siyah, gece laciverti, derin erik, elektrik siyan, kısıtlı mor ve altın detaylar. Yarım ton (halftone)/gravür dokular. | Güçlü, belirgin durum (state) değişimleri. |
| **2. Raycast** | Kesinlik, Araç Kutusu, Akıcılık | Teknik, okunabilir. | Sıkı, komut paleti ritminde. | Koyu utiliteryan yüzeyler, net cam (glassmorphism) efektleri, sınırlı kroma. | Cilalı, pürüzsüz ve hızlı hareket. |
| **3. Resend** | Teknik Editoryal, Mükemmeliyet | Mükemmel tipografi hiyerarşisi. | Çok cömert, bol beyaz boşluk. | Kesin siyah-beyaz, kod ve ürün odaklı netlik, ince sınır çizgileri. | Zarif, sessiz, performansa odaklı geçişler. |
| **4. Linear** | Ürün Zarafeti, Sessiz Derinlik | Modern sans-serif, zarif. | Disiplinli, matematiksel boşluklar. | İnce derinlik, sadece işlevsel yerlerde sakin geçişli (gradient) zeminler. | Sessiz etkileşimler, akıcı vurgular. |
| **5. Original Print** | Sıcak Modernist, Asimetrik | Klasik ve karakteristik, büyük puntolar. | Asimetrik, editoryal, serbest (beige ağırlıklı olmayan). | Sıcak baskı tonları, mürekkep kırmızısı ve fildişi (ivory) detaylar. Güçlü, büyük fotoğraf kullanımı. | Sayfa çevirme hissi, yavaş belirme, basılı yayın hissiyatı. |
| **6. Premium Pro** | Galeri Sınıfı, Zamansız | Yüksek kontrastlı, zamansız tipografi. | Dengeli, odaklı, müze benzeri. | Sofistike, mat dokular, sektöre özel rafine sanat yönetimi. | Ağırlığı olan, yavaş ve rafine sinematik hareketler. |

## 3. Rota Haritası ve Veri Kapsamı (İlk 12 Demo Site)

Tek bir dinamik Next.js mimarisi kullanılacaktır. Her sitenin gezinme menüsü çalışır durumda, sektöre uygun içerik barındıran en az 4 sayfası olmalıdır.

1. **Yörünge Araştırma Dergisi (Orbital Research Journal & Forum):** Makaleler, Yazarlar, Üye Forumu, Dergi Arşivi.
2. **Çağdaş Anadolu Kıyı Restoranı (Contemporary Anatolian Coastal Restaurant):** Anasayfa, Menü, Şefin Hikayesi, Rezervasyon. *(Tam 64 farklı, detaylı menü öğesi).*
3. **Mimari Odaklı Emlak Pazaryeri (Architecture-led Real Estate):** Anasayfa, Vitrin, Arama/Filtre, Mülk Detayı. *(Tam 72 detaylı mülk listelemesi).*
4. **Butik Doğa Oteli ve İnziva (Boutique Landscape Hotel & Retreat):** Odalar/Villalar, Deneyimler, Spa, Konum/Ulaşım. *(30+ giriş önerilir).*
5. **Bağımsız Parfüm Atölyesi (Independent Perfume Atelier):** Koleksiyon, Parfüm Detayı, İçerik & Felsefe, Mağazalar. *(Tam 48 koku, koku profilleriyle).*
6. **Gitar Mağazası (Guitar Store):** Akustik/Elektro Kategorileri, Model Detayı, Çalışan Filtreleme, Hakkımızda. *(Filtrelenebilir 64 farklı gitar modeli).*
7. **Hukuk Bürosu ve Kurumsal Danışmanlık (Law Firm & Corporate Advisory):** Uzmanlık Alanları, Ekip, Yayınlar, İletişim.
8. **B2B SaaS Ürünü:** Ürün (Özellikler), Çözümler, Fiyatlandırma, Güncellemeler (Changelog) / Dokümantasyon benzeri sayfalar.
9. **Özel Diş Kliniği (Private Dental Clinic):** Tedaviler, Hekimler, Teknoloji, Hasta Rehberi.
10. **Fitness Kulübü ve Koçluk Stüdyosu (Fitness Club & Coaching):** Programlar, Eğitmenler, Tesisler, Üyelik.
11. **Nadir Kitap ve Baskı Galerisi (Rare Book & Print Gallery):** Koleksiyon, Eser Detayı, Sergi Takvimi, Satınalma. *(Tam 54 detaylı katalog öğesi).*
12. **Özel Keşif ve Seyahat Stüdyosu (Bespoke Expedition Travel):** Rotalar, Rota Detayı, Rehberler, Hazırlık. *(Tam 36 özel seyahat rotası).*

*Sistem, ekleme yapıldığında (örneğin 20 siteye kadar) kod tekrarı gerektirmeden çalışacak mimaride tasarlanacaktır. Sektörleri ve stilleri seçmek için bir ana Vitrin (Showcase Home) sayfası olacaktır.*

## 4. Bileşen Mimarisi ve Dosya Yapısı

Gelecekteki yapay zeka ajanlarının (agents) çakışmadan çalışabilmesi için kesin sınırlandırılmış dosya mimarisi:

```text
/
├── core/
│   ├── theme/           # [Core/Theme Agent] Temel renk, tipografi tokenleri, 6 temanın CSS/Tailwind konfigürasyonu
│   ├── layout/          # [Core/Theme Agent] Global layout bileşenleri (Navbar, Footer, Tema Seçici, 'Demo site' uyarı bileşeni)
│   └── ui/              # [Core/Theme Agent] Buton, Input, Card gibi tema uyumlu temel UI elemanları
├── content/             # [Content Agents] Sektörlere göre ayrılmış statik/mock tip tanımlı (typed) veri modülleri
│   ├── journal.ts
│   ├── restaurant.ts    # 64 öğe
│   ├── real-estate.ts   # 72 öğe
│   └── ... (Diğer sektör verileri)
├── sectors/             # [Sector Agents] Endüstri gruplarına göre sayfa oluşturucu modüller (page renderers)
│   ├── ecommerce/       # Gitar, Parfüm, Kitap galerisi
│   ├── corporate/       # Hukuk, SaaS, Klinik
│   ├── hospitality/     # Restoran, Otel, Seyahat
│   └── editorial/       # Dergi, Fitness
├── app/                 # [Integration Agent] Next.js 13+ App Router
│   ├── page.tsx         # Ana Vitrin (Showcase Home)
│   ├── [sector]/        # Dinamik sektör rotaları
│   │   ├── page.tsx
│   │   └── [slug]/      # Dinamik detay sayfaları ve derin bağlantılar (deep links)
│   │       └── page.tsx
│   └── layout.tsx       # Kök layout (Tema sağlayıcı, kalıcı tasarım seçici)
├── public/              # Statik assetler
└── scripts/             # [QA Agent] Test ve doğrulama scriptleri
```

## 5. Dosya Sahiplik Sınırları ve Ajan Yürütme Sırası

Geliştirme sürecindeki ajan (agent) işbirliği aşağıdaki sıralama ve kesin yetki sınırları ile ilerleyecektir:

1. **Aşama 1: Core/Theme Agent (Temel ve Tema Ajanı)**
   - **Sorumluluk:** Paylaşılan tema tokenlerini (6 sistemi destekleyecek şekilde) ve global layout temellerini oluşturur.
   - **Kısıt:** İçerik veya spesifik sektör bileşenlerine dokunmaz.

2. **Aşama 2: Content Agents (İçerik Ajanları)**
   - **Sorumluluk:** `content/` dizinini doldurur. Belirtilen sayılarda, endüstrilere göre ayrılmış tip tanımlı (typed) verileri (TypeScript interfaceleri ile birlikte) üretir.
   - **Kısıt:** Görsel bileşen veya yönlendirme mantığı yazamaz.

3. **Aşama 3: Sector Agents (Sektör Ajanları)**
   - **Sorumluluk:** `sectors/` dizini altında, her bir temanın tokenlarını tüketerek endüstri gruplarına özel sayfa oluşturucu (renderer) modülleri oluşturur.
   - **Kısıt:** Merkez kayıt (registry/router) dosyalarını değiştiremez.

4. **Aşama 4: Integration Agent (Entegrasyon Ajanı)**
   - **Sorumluluk:** Sadece diğer ajanlar işini bitirdikten sonra, merkezi router/kayıt dosyalarını (`app/` dizini) düzenler, ana vitrin sayfasını oluşturur ve her şeyi birbirine bağlar.

5. **Aşama 5: QA Agent (Kalite Güvence Ajanı)**
   - **Sorumluluk:** Test ve doğrulama scriptlerini barındırır ve çalıştırır.

## 6. Varlık (Asset) Stratejisi

- **Görseller:** Sadece stabil, telifsiz yüksek kaliteli uzaktan kaynaklar kullanılacaktır veya lokal oluşturulmuş assetler eklenecektir.
- **Optimizasyon:** Zarif görsel yedekleri (graceful fallbacks) sağlanmalıdır.
- **Karakter:** Tekrarlayan fotoğraf kırpmalarından ve bariz, sahte duran stok fotoğraf kolajı hissinden kesinlikle kaçınılacaktır.

## 7. Test Stratejisi ve Kalite Hedefleri

- **Test Edilebilirlik (QA):** Rota kapsamını, katalog sayımlarını, temanın 6 adede sahip olduğunu, zorunlu ibare ('Demo site') varlığını ve tip/build doğruluğunu test eden otomatik betikler.
- **Erişilebilirlik:** Klavye ile tema değiştirme ve menü gezintisi; uygun renk kontrast oranları.
- **Performans/UX:** Azaltılmış hareket (reduced-motion) desteği, mobil ve masaüstü duyarlı tasarımlar. Gereksiz backend karmaşıklığı yerine pratik, hızlı çalışan statik vitrin mimarisi.

## 8. Tamamlanma Kontrol Listesi (Completion Checklist)

- [x] Next.js projesinin TypeScript ile `PLAN.md`'ye uygun olarak yapılandırılması.
- [x] Core: 6 farklı görsel sistemin token ve bileşen mimarisinin kurulması.
- [x] Core: Tüm siteler için kalıcı tema seçici (Theme Switcher) ve `Demo site` bandının (banner) yapılması.
- [x] İçerik: 12 sektör için TypeScript tip tanımlamalarının ve verilerin üretilmesi (Restoran: 64, Emlak: 72, Parfüm: 48, Gitar: 64, Kitap: 54, Seyahat: 36 hedeflerine uyarak).
- [x] Sektörler: Endüstri grupları için en az 4 rotalı sayfa render modüllerinin kodlanması.
- [x] Entegrasyon: Next.js App Router yapısında verilerin, rotaların ve bileşenlerin bağlanması, detaylı dinamik alt sayfa rotalarının ayarlanması.
- [x] Entegrasyon: Ana Showcase karşılama ekranının (sektör ve stil seçimi için) geliştirilmesi.
- [x] Test & QA: Otomatik kontrol (QA) scriptlerinin yazılması ve başarıyla çalıştırılması.
- [x] Test & QA: Projenin hatasız bir şekilde statik olarak derlenip (`next build` / `export`) dışa aktarılabilmesi.
- [x] Nihai İnceleme: Kullanıcı arayüzü dilinin editoryal kalitesinin, Türkçe yazımın ve belirtilen stil direktiflerine uygunluğunun kontrolü.
