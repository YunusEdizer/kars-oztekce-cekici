# Öztekçe Oto Kurtarma — Kars çekici sitesi

Canlı: https://kars-oztekce-cekici.vercel.app (Vercel, scope `yunus-emre-s-projects3`)

## Yapı
- `site.config.json` — telefon, WhatsApp, alan adı, 7/24 bayrağı, Search Console / GA4 kimlikleri
- `src/icerik.mjs` — 6 hizmet, 7 ilçe, 3 karayolu, 5 kış rehberi, SSS (doğrulanmamış bilgi yazılmaz)
- `build.mjs` — statik üretici → `dist/` (gece sahnesi ve ilçe haritası SVG'leri burada)
- `src/style.css`, `src/main.js` — sayfaya gömülür (konum → WhatsApp, talep formu, menü)

## Komutlar
```
node build.mjs && node tools/kontrol.mjs     # derle + SEO kontrolü
node tools/serve.mjs                          # http://localhost:4175
npx vercel deploy --prod --scope yunus-emre-s-projects3
```

## Görseller
`public/favicon.svg` kaynaktır; PNG/ICO ve `og.png` headless Edge ile üretildi (`tools/ikon*.html`, `tools/og.html`).

## Bekleyenler
- Alan adı (alınınca `alanAdi` güncellenir, Vercel'e eklenir)
- Google İşletme Profili (Haritalar'da Öztekçe kaydı yok — 27.09.2026)
- Gerçek araç fotoğrafları, Search Console doğrulaması, GA4
