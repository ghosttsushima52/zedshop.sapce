# Avenox Vitrin: Cloudflare Pages

Bu proje Next.js statik dışa aktarım kullanır. `npm run build` komutu `out/` dizinini üretir.

## Otomatik yayın

1. Projeyi bir GitHub veya GitLab deposuna bağlayın ve `main` dalına gönderin.
2. Cloudflare panelinde **Workers & Pages > Create application > Pages > Import an existing Git repository** yolunu açın.
3. Depoyu seçin. Framework: **Next.js (Static HTML Export)**. Build command: `npm run build`. Output directory: `out`. Production branch: `main`.
4. İlk yayın sonrası oluşan `*.pages.dev` adresinde ana vitrin, alt sayfalar, görseller ve tema seçiciyi doğrulayın.
5. Pages projesinde **Custom domains > Set up a domain** bölümünden alan adını ekleyin. Alan adı Cloudflare üzerinde yönetiliyorsa ilgili DNS kaydını Cloudflare oluşturabilir.

`main` dalına gönderilen yeni commitler otomatik olarak yeniden derlenip yayınlanır. Yalnızca bu bilgisayardaki dosyaları düzenlemek canlı siteyi güncellemez; değişikliklerin depoya gönderilmesi gerekir.

## Mevcut DNS durumu

28 Eylül 2026 ekran görüntüsünde `zedshop.space` kök alanı `2.57.91.91` A kaydına, `www.zedshop.space` ise `zedshop` adlı Cloudflare Tunnel kaydına gidiyor. Bu kayıtların hangi mevcut hizmete ait olduğu netleştirilmeden değiştirilmemesi gerekir. Test için ayrı bir alt alan adı (örneğin `vitrin.zedshop.space`) Pages projesine bağlanabilir; kök alan adı ve `www` daha sonra taşınabilir.

DNS kaydını elle Pages adresine çevirmek yeterli değildir. Önce Pages projesinin **Custom domains** bölümünde alan adını ilişkilendirin.

## Yerel kontroller

```sh
npm install
npm run typecheck
npm run validate:content
npm run build
```

Cloudflare belgeleri:

- https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/configuration/git-integration/
