// Statik site üreticisi: site.config.json + src/icerik.mjs → dist/
// Kullanım: node build.mjs   ·   Kontrol: node tools/kontrol.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { HIZMETLER, BOLGELER, YOLLAR, REHBER, SSS_GENEL, KARS_MERKEZ } from "./src/icerik.mjs";

const c = JSON.parse(readFileSync("site.config.json", "utf8"));
const OUT = "dist";
const BUGUN = new Date().toISOString().slice(0, 10);
const CSS = readFileSync("src/font.css", "utf8") + readFileSync("src/style.css", "utf8");
const JS = readFileSync("src/main.js", "utf8");

const surum = {};
const v = (yol) => (surum[yol] ??= `${yol}?v=${createHash("md5").update(readFileSync("public" + yol)).digest("hex").slice(0, 8)}`);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const duz = (s) => String(s).replace(/<[^>]+>/g, "");
const url = (yol) => c.alanAdi + yol;
const WA_METIN = "Merhaba, çekici / yol yardımı için yazıyorum.";
const waLink = (metin = WA_METIN) => `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(metin)}`;
const saatMetni = c.yirmiDortSaat ? "7/24 açık" : "Çalışma saatleri için arayın";

const hizmetYol = (h) => `/hizmetler/${h.slug}/`;
const bolgeYol = (b) => `/bolgeler/${b.slug}/`;
const rehberYol = (r) => `/rehber/${r.slug}/`;
const bulBolge = (slug) => BOLGELER.find((b) => b.slug === slug) || YOLLAR.find((y) => y.slug === slug);

// ---------------------------------------------------------------- ikonlar
const IK = {
  tel: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  cekici: '<path d="M11 16V9h5l4 4.5V16"/><path d="M1.5 16h21"/><path d="M11 12.5H3.5L6.5 5"/><path d="M6.5 5v3.2"/><path d="M5.3 9.5a1.2 1.2 0 1 0 2.4 0"/><circle cx="6.5" cy="18.5" r="2"/><circle cx="16.5" cy="18.5" r="2"/>',
  kurtarma: '<path d="M12 2v8"/><path d="M8.5 2h7"/><path d="M12 10a4.5 4.5 0 1 1-4.5 4.5"/><path d="M7.5 14.5 6 13"/><path d="M3 22h18"/>',
  kar: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7"/><path d="m9 3.5 3 2 3-2M9 20.5l3-2 3 2M4.3 10.6l3.4-.3-1.4-3.2M19.7 13.4l-3.4.3 1.4 3.2M4.3 13.4l3.4.3-1.4 3.2M19.7 10.6l-3.4-.3 1.4-3.2"/>',
  aku: '<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M7 7V5h3v2M14 7V5h3v2M6.5 13h3.5M14 13h3.5M15.75 11.25v3.5"/>',
  lastik: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21"/>',
  rota: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  konum: '<circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="7.5"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"/>',
  saat: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  fiyat: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  dag: '<path d="m2 20 7-12 4.5 7 2.5-3.5L22 20z"/><path d="m7.2 11 1.8 1.5 1.6-1.4"/>',
  kalkan: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  uyari: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  kitap: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  yol: '<path d="M5 21 9.5 3M19 21 14.5 3M12 4.5v2M12 10.5v3M12 17.5v3"/>',
  ok: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tik: '<path d="M20 6 9 17l-5-5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  kapat: '<path d="M18 6 6 18M6 6l12 12"/>',
  gonder: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
};
const ikon = (ad, cls = "") => `<svg class="ik${cls ? " " + cls : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IK[ad]}</svg>`;
const WA_SVG = '<svg class="ik" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.46-.72-1.7-.8-.22-.08-.39-.12-.55.13-.17.24-.63.8-.78.96-.14.17-.29.19-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43l-.75-1.8c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.7 2.7 0 0 0-.85 2.02 4.7 4.7 0 0 0 1 2.5 10.8 10.8 0 0 0 4.14 3.66c1.54.66 2.14.72 2.9.6.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.15-1.18-.07-.1-.23-.16-.48-.28z"/></svg>';

// Logo işareti: çekici kancası. favicon.svg ile aynı çizim.
const LOGO_ISARET = `<svg class="logo-isaret" viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="12" fill="#f5a524"/><circle cx="30" cy="11.5" r="4" fill="none" stroke="#0a1120" stroke-width="3.4"/><path d="M30 15.5V31a8 8 0 0 1-16 0v-5" fill="none" stroke="#0a1120" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/><path d="m14 26 3.6 2.6" stroke="#0a1120" stroke-width="3.4" stroke-linecap="round"/></svg>`;
const logo = () => `<a class="logo" href="/">${LOGO_ISARET}<span class="logo-yazi"><b>ÖZTEKÇE</b><small>OTO KURTARMA · KARS</small></span></a>`;

// ---------------------------------------------------------------- gece sahnesi (ana sayfa)
function rastgele(tohum) { let s = tohum; return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646; }

function sahneSvg() {
  const r = rastgele(7);
  let yildiz = "";
  for (let i = 0; i < 70; i++) {
    const x = (r() * 1200).toFixed(0), y = (r() * 230 + 10).toFixed(0), rr = (r() * 1.1 + 0.4).toFixed(2), o = (r() * 0.5 + 0.25).toFixed(2);
    yildiz += `<circle cx="${x}" cy="${y}" r="${rr}" opacity="${o}"/>`;
  }
  const agac = (x, y, h) => {
    const w = h * 0.34, n = (v) => +v.toFixed(1);
    return `<path d="M${x} ${y - h}L${n(x - w * 0.62)} ${n(y - h * 0.45)}H${n(x - w * 0.3)}L${n(x - w)} ${y}H${n(x + w)}L${n(x + w * 0.3)} ${n(y - h * 0.45)}H${n(x + w * 0.62)}Z"/>`;
  };
  let agaclar = "";
  const tepe = (x) => 322 - 20 * Math.sin(x / 170 + 0.6) - 11 * Math.cos(x / 83);
  for (let x = 8; x < 1200; x += 22 + r() * 34) {
    if (x > 380 && x < 880 && r() < 0.7) continue;
    agaclar += agac(Math.round(x), Math.round(tepe(x) + 16), Math.round(22 + r() * 26));
  }
  let cizgi = "";
  for (let x = -20; x < 1200; x += 92) cizgi += `<rect x="${x}" y="436" width="50" height="5" rx="2.5"/>`;

  return `<svg class="sahne" viewBox="0 0 1200 460" preserveAspectRatio="xMidYMax slice" role="img" aria-label="Karlı Kars dağları önünde, tepe lambası yanan çekici gece yolda">
<defs>
  <linearGradient id="gDag1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22324f"/><stop offset="1" stop-color="#152238"/></linearGradient>
  <linearGradient id="gDag2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d2c4a"/><stop offset="1" stop-color="#111c32"/></linearGradient>
  <linearGradient id="gKabin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc04a"/><stop offset="1" stop-color="#e08a0b"/></linearGradient>
  <linearGradient id="gAraba" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8c4d6"/><stop offset="1" stop-color="#6d7c94"/></linearGradient>
  <linearGradient id="gCam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a4f74"/><stop offset=".55" stop-color="#101a2e"/><stop offset="1" stop-color="#0a1120"/></linearGradient>
  <linearGradient id="gFar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff4cf" stop-opacity=".55"/><stop offset="1" stop-color="#fff4cf" stop-opacity="0"/></linearGradient>
  <radialGradient id="gTepe"><stop offset="0" stop-color="#ffb52e" stop-opacity=".75"/><stop offset=".35" stop-color="#ff9d00" stop-opacity=".25"/><stop offset="1" stop-color="#ff9d00" stop-opacity="0"/></radialGradient>
  <radialGradient id="gAy"><stop offset=".5" stop-color="#e9eef7" stop-opacity=".22"/><stop offset="1" stop-color="#e9eef7" stop-opacity="0"/></radialGradient>
  <pattern id="pSerit" width="16" height="10" patternUnits="userSpaceOnUse" patternTransform="skewX(-35)"><rect width="16" height="10" fill="#1b2638"/><rect width="8" height="10" fill="#f5a524"/></pattern>
</defs>
<g fill="#fff">${yildiz}</g>
<circle cx="1010" cy="150" r="70" fill="url(#gAy)"/><circle cx="1010" cy="150" r="24" fill="#e9eef7"/><circle cx="1019" cy="144" r="21" fill="#0d1830" opacity=".35"/>
<path fill="url(#gDag1)" d="M0 300 70 250 125 272 200 205 262 246 330 190 392 236 470 176 548 238 612 200 700 250 760 214 840 262 915 196 990 244 1060 210 1130 250 1200 226V380H0Z"/>
<g fill="#e6edf7" opacity=".85"><path d="m200 205-20 18 9-2 9 8 8-9 13 3z"/><path d="m330 190-22 19 10-2 10 9 9-10 14 4z"/><path d="m470 176-25 21 11-2 11 9 10-10 16 4z"/><path d="m612 200-18 15 8-1 8 7 7-8 12 3z"/><path d="m915 196-23 20 10-2 10 9 9-10 15 4z"/><path d="m1060 210-18 15 8-1 8 7 7-8 11 3z"/></g>
<path fill="url(#gDag2)" d="M0 ${tepe(0).toFixed(0)}${Array.from({ length: 25 }, (_, i) => `L${i * 50 + 50} ${tepe(i * 50 + 50).toFixed(0)}`).join("")}V390H0Z"/>
<path fill="none" stroke="#6f86ad" stroke-opacity=".35" stroke-width="2" d="M0 ${tepe(0).toFixed(0)}${Array.from({ length: 25 }, (_, i) => `L${i * 50 + 50} ${tepe(i * 50 + 50).toFixed(0)}`).join("")}"/>
<g fill="#0a1424">${agaclar}</g>
<path fill="#d6e0ee" d="M0 378Q300 364 600 372T1200 370V392H0Z"/>
<path fill="#aebbd0" d="M0 386Q300 380 600 384T1200 383V392H0Z" opacity=".6"/>
<rect y="390" width="1200" height="70" fill="#0c1322"/>
<g fill="#f5c451" opacity=".5">${cizgi}</g>
<path fill="url(#gFar)" d="M846 350 1200 292V430L846 364Z"/>
<g transform="translate(246 34)">
  <ellipse cx="354" cy="388" rx="270" ry="9" fill="#000" opacity=".45"/>
  <rect x="112" y="334" width="486" height="14" rx="3" fill="#0b1120"/>
  <path d="M96 336 116 311H440V336Z" fill="#2c3b57"/>
  <path d="M116 311H440" stroke="#4a5f86" stroke-width="2"/>
  <rect x="120" y="319" width="316" height="9" fill="url(#pSerit)"/>
  <rect x="432" y="268" width="14" height="46" rx="2" fill="#2c3b57"/><rect x="429" y="262" width="20" height="8" rx="2" fill="#3b4d70"/>
  <path d="M148 305 432 268" stroke="#f5a524" stroke-width="1.6" opacity=".55"/>
  <path d="M140 300V282Q142 270 158 268L200 264 236 238Q244 232 258 232H322Q336 232 346 240L378 264 400 268Q414 271 414 284V300Z" fill="url(#gAraba)"/>
  <path d="M246 242H318Q326 242 332 247L352 264H224Z" fill="#162033"/><path d="M286 242V264" stroke="#8a98ae" stroke-width="3"/>
  <path d="M250 233Q290 222 332 233Z" fill="#f4f7fb"/>
  <rect x="396" y="274" width="14" height="6" rx="2" fill="#ffe7a8"/><rect x="142" y="276" width="9" height="6" rx="2" fill="#e5484d"/>
  <circle cx="178" cy="300" r="15" fill="#0a0e17"/><circle cx="178" cy="300" r="6.5" fill="#94a3b8"/>
  <circle cx="370" cy="300" r="15" fill="#0a0e17"/><circle cx="370" cy="300" r="6.5" fill="#94a3b8"/>
  <path d="M178 315 170 334M370 315 378 334" stroke="#f5a524" stroke-width="2.4"/>
  <rect x="440" y="232" width="6" height="42" rx="2" fill="#475569"/>
  <circle class="tepe-isik" cx="492" cy="246" r="90" fill="url(#gTepe)"/>
  <path d="M448 348V262Q448 250 460 250H520Q532 250 539 259L572 300 590 305Q602 308 602 322V348Z" fill="url(#gKabin)"/>
  <path d="M456 250Q490 243 526 250Z" fill="#f4f7fb"/>
  <path d="M462 262H516Q524 262 529 268L558 302H462Z" fill="url(#gCam)"/>
  <path d="M470 266 486 266 470 290Z" fill="#fff" opacity=".12"/>
  <path d="M506 306V346" stroke="#b86d00" stroke-width="2"/><rect x="488" y="312" width="12" height="3" rx="1.5" fill="#8a5200"/>
  <text x="456" y="336" font-family="Plus Jakarta Sans,Arial,sans-serif" font-weight="800" font-size="11.5" letter-spacing=".5" fill="#1a1204">ÖZTEKÇE</text>
  <rect x="466" y="241" width="52" height="10" rx="4" fill="#ff9f1a"/><rect x="470" y="243" width="20" height="5" rx="2" fill="#ffd27a"/>
  <rect x="592" y="314" width="12" height="9" rx="2.5" fill="#fff6d6"/>
  <rect x="596" y="332" width="12" height="16" rx="2" fill="#1c2638"/>
  <circle cx="300" cy="341" r="2.4" fill="#ffb52e"/><circle cx="380" cy="341" r="2.4" fill="#ffb52e"/><circle cx="220" cy="341" r="2.4" fill="#ffb52e"/>
  <path d="M140 362a30 30 0 0 1 60 0M198 362a30 30 0 0 1 60 0M510 362a30 30 0 0 1 60 0" fill="#0b1120"/>
  <g><circle cx="170" cy="362" r="24" fill="#0a0e17"/><circle cx="170" cy="362" r="11" fill="#5b6a82"/><circle cx="170" cy="362" r="4.5" fill="#cbd5e1"/></g>
  <g><circle cx="228" cy="362" r="24" fill="#0a0e17"/><circle cx="228" cy="362" r="11" fill="#5b6a82"/><circle cx="228" cy="362" r="4.5" fill="#cbd5e1"/></g>
  <g><circle cx="540" cy="362" r="24" fill="#0a0e17"/><circle cx="540" cy="362" r="11" fill="#5b6a82"/><circle cx="540" cy="362" r="4.5" fill="#cbd5e1"/></g>
</g>
</svg>`;
}

// ---------------------------------------------------------------- şematik hizmet bölgesi haritası
const proj = ([lat, lng]) => [+((lng - 42.4) * 0.76 * 600 + 20).toFixed(1), +((40.98 - lat) * 600 + 20).toFixed(1)];
const ETIKET = { // [dx, dy, anchor]
  "sarikamis-cekici": [0, 30, "middle"], "selim-cekici": [-14, 5, "end"], "digor-cekici": [14, 5, "start"],
  "kagizman-cekici": [14, 5, "start"], "arpacay-cekici": [14, 5, "start"], "akyaka-cekici": [14, 5, "start"], "susuz-cekici": [-14, 5, "end"],
};
function haritaSvg(vurgu) {
  const [kx, ky] = proj(KARS_MERKEZ);
  const [ax, ay] = proj([40.5075, 43.5728]);
  const yon = (x1, y1, x2, y2, ad, lx, ly, anc) => `<path d="M${x1} ${y1}L${x2} ${y2}" class="h-yon" marker-end="url(#okUcu)"/><text x="${lx}" y="${ly}" text-anchor="${anc}" class="h-yon-ad">${ad}</text>`;
  const [sx, sy] = proj(BOLGELER[0].konum), [dx, dy] = proj(BOLGELER[2].konum), [ux, uy] = proj(BOLGELER[6].konum);
  return `<svg class="harita" viewBox="0 0 720 560" role="img" aria-label="Kars merkez ve ilçelerin şematik haritası, karayolu mesafeleriyle">
<defs>
  <radialGradient id="hParilti"><stop offset="0" stop-color="#f5a524" stop-opacity=".22"/><stop offset="1" stop-color="#f5a524" stop-opacity="0"/></radialGradient>
  <pattern id="hNokta" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#2a3a58"/></pattern>
  <marker id="okUcu" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#6b7fa3"/></marker>
</defs>
<rect width="720" height="560" fill="url(#hNokta)"/>
<circle cx="${kx}" cy="${ky}" r="260" fill="url(#hParilti)"/>
${yon(sx, sy, 34, 452, "Erzurum", 30, 478, "start")}
${yon(dx, dy, 628, 520, "Iğdır", 640, 544, "middle")}
${yon(ux, uy, 262, 44, "Ardahan", 262, 30, "middle")}
${BOLGELER.map((b) => { const [x, y] = proj(b.konum); return `<path d="M${kx} ${ky}L${x} ${y}" class="h-kol${b.slug === vurgu ? " aktif" : ""}"/>`; }).join("")}
<path d="M${kx} ${ky}L${ax} ${ay}" class="h-kol ince"/>
<g class="h-ani"><path d="M${ax} ${ay - 7}l7 7-7 7-7-7z"/><text x="${ax + 13}" y="${ay + 5}">Ani Ören Yeri</text><text x="${ax + 13}" y="${ay + 22}" class="h-km">~46 km</text></g>
${BOLGELER.map((b) => {
    const [x, y] = proj(b.konum), [ex, ey, anc] = ETIKET[b.slug];
    return `<a href="${bolgeYol(b)}" class="h-ilce${b.slug === vurgu ? " aktif" : ""}"><circle cx="${x}" cy="${y}" r="7"/><text x="${x + ex}" y="${y + ey}" text-anchor="${anc}">${b.ad}</text><text x="${x + ex}" y="${y + ey + 17}" text-anchor="${anc}" class="h-km">${b.mesafe[1]}</text></a>`;
  }).join("")}
<g class="h-merkez"><circle cx="${kx}" cy="${ky}" r="26" class="h-dalga"/><circle cx="${kx}" cy="${ky}" r="12"/><text x="${kx + 20}" y="${ky + 34}">KARS MERKEZ</text></g>
</svg>`;
}

// ---------------------------------------------------------------- ortak parçalar
const NAV = [["/hizmetler/", "Hizmetler"], ["/bolgeler/", "Bölgeler"], ["/rehber/", "Kış Rehberi"], ["/iletisim/", "İletişim"]];

const ustKisim = (aktif) => `
<a class="atla" href="#icerik">İçeriğe geç</a>
<header class="ust" id="ust">
  <div class="kap ust-ic">
    ${logo()}
    <nav class="nav" id="nav" aria-label="Ana menü">
      <ul>${NAV.map(([h, a]) => `<li><a href="${h}"${aktif === h ? ' aria-current="page"' : ""}>${a}</a></li>`).join("")}</ul>
      <div class="nav-mobil">
        <a class="btn btn-ara btn-blok" href="tel:${c.telefon}" data-track="call">${ikon("tel")}${c.telefonGorunen}</a>
        <a class="btn btn-wa btn-blok" href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp">${WA_SVG}WhatsApp'tan yazın</a>
      </div>
    </nav>
    <div class="ust-sag">
      <span class="acik-rozet"><i></i>${saatMetni}</span>
      <a class="btn btn-ara btn-kucuk ust-tel" href="tel:${c.telefon}" data-track="call">${ikon("tel")}<span>${c.telefonGorunen}</span></a>
      <button class="menu-dugme" id="menuDugme" aria-label="Menüyü aç" aria-expanded="false" aria-controls="nav">${ikon("menu", "ac")}${ikon("kapat", "kapa")}</button>
    </div>
  </div>
</header>`;

const altCubuk = () => `
<div class="alt-cubuk" aria-label="Hızlı iletişim">
  <a href="tel:${c.telefon}" class="ac-ara" data-track="call">${ikon("tel")}<span>Hemen Ara</span></a>
  <a href="${waLink()}" class="ac-wa" target="_blank" rel="noopener" data-track="whatsapp">${WA_SVG}<span>WhatsApp</span></a>
  <button type="button" class="ac-konum" data-konum>${ikon("konum")}<span>Konum Gönder</span></button>
</div>`;

const altBilgi = () => `
<footer class="alt">
  <div class="kap alt-ust">
    <div class="alt-marka">
      ${logo()}
      <p>Kars merkez, 7 ilçe ve Erzurum, Iğdır, Ardahan yollarında çekici, oto kurtarma ve yol yardımı.</p>
      <a class="alt-tel" href="tel:${c.telefon}" data-track="call">${ikon("tel")}${c.telefonGorunen}</a>
      <ul class="alt-bilgi">
        <li>${ikon("saat")}${c.yirmiDortSaat ? "7 gün 24 saat, bayramlar dahil" : saatMetni}</li>
        <li>${ikon("pin")}Kars ve ilçeleri</li>
      </ul>
    </div>
    <div><h2>Hizmetler</h2><ul>${HIZMETLER.map((h) => `<li><a href="${hizmetYol(h)}">${h.ad}</a></li>`).join("")}</ul></div>
    <div><h2>Bölgeler</h2><ul>${BOLGELER.map((b) => `<li><a href="${bolgeYol(b)}">${b.ad} çekici</a></li>`).join("")}${YOLLAR.map((y) => `<li><a href="${bolgeYol(y)}">${y.ad}</a></li>`).join("")}</ul></div>
    <div><h2>Kış Rehberi</h2><ul>${REHBER.map((r) => `<li><a href="${rehberYol(r)}">${r.h1}</a></li>`).join("")}</ul></div>
  </div>
  <div class="kap alt-alt">
    <span>© ${new Date().getFullYear()} ${esc(c.marka)} · ${esc(c.sahip)}</span>
    <span>Acil sağlık durumlarında önce <b>112</b>'yi arayın.</span>
  </div>
</footer>`;

const kirinti = (yollar) => `<nav class="kirinti" aria-label="Sayfa yolu"><ol>${yollar.map(([h, a], i) => i === yollar.length - 1 ? `<li aria-current="page">${a}</li>` : `<li><a href="${h}">${a}</a></li>`).join("")}</ol></nav>`;
const kirintiSema = (yollar) => ({ "@type": "BreadcrumbList", itemListElement: yollar.map(([h, a], i) => ({ "@type": "ListItem", position: i + 1, name: duz(a), item: url(h) })) });

const ctaDugmeler = (cls = "") => `<div class="cta-dugmeler ${cls}">
  <a class="btn btn-ara btn-buyuk" href="tel:${c.telefon}" data-track="call">${ikon("tel")}<span><small>Hemen ara</small><b>${c.telefonGorunen}</b></span></a>
  <a class="btn btn-wa btn-buyuk" href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp">${WA_SVG}<span><small>Yazın</small><b>WhatsApp</b></span></a>
  <button type="button" class="btn btn-cizgi btn-buyuk" data-konum>${ikon("konum")}<span><small>Tek dokunuş</small><b>Konumumu gönder</b></span></button>
</div>`;

const ctaBant = (baslik = "Yolda mı kaldınız? Hemen arayın.") => `
<section class="cta-bant"><div class="kap cta-bant-ic">
  <div><p class="ust-baslik">${saatMetni} · Kars ve ilçeleri</p><h2>${baslik}</h2><p>Konumunuzu ve aracın gideceği adresi söyleyin; fiyatı ve tahmini varış süresini yola çıkmadan söyleyelim.</p></div>
  ${ctaDugmeler("sola")}
</div></section>`;

const yanKart = () => `
<aside class="yan"><div class="yan-kart">
  <span class="acik-rozet"><i></i>${saatMetni}</span>
  <p class="yan-baslik">Yolda mı kaldınız?</p>
  <a class="btn btn-ara btn-blok" href="tel:${c.telefon}" data-track="call">${ikon("tel")}${c.telefonGorunen}</a>
  <a class="btn btn-wa btn-blok" href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp">${WA_SVG}WhatsApp</a>
  <button type="button" class="btn btn-cizgi-koyu btn-blok" data-konum>${ikon("konum")}Konumumu gönder</button>
  <ul class="yan-liste"><li>${ikon("fiyat")}Fiyat yola çıkmadan belli</li><li>${ikon("pin")}Kars merkez + 7 ilçe</li><li>${ikon("dag")}Kış şartlarına hazır</li></ul>
</div></aside>`;

const blokHtml = (icerik) => {
  if (Array.isArray(icerik)) return icerik.map((p) => `<p>${p}</p>`).join("");
  if (icerik.liste) return `<ul class="tikli">${icerik.liste.map((x) => `<li>${ikon("tik")}<span>${x}</span></li>`).join("")}</ul>`;
  if (icerik.sirali) return `<ol class="sirali">${icerik.sirali.map((x) => `<li><span>${x}</span></li>`).join("")}</ol>`;
  return "";
};
const bolumlerHtml = (bolumler) => bolumler.map(([h, b]) => `<h2>${h}</h2>${blokHtml(b)}`).join("");

const sssHtml = (liste, baslik = "Sık sorulan sorular") => `<div class="sss"><h2>${baslik}</h2>${liste.map(([s, cv], i) => `<details${i === 0 ? " open" : ""}><summary>${s}${ikon("ok")}</summary><div><p>${cv}</p></div></details>`).join("")}</div>`;
const sssSema = (liste) => ({ "@type": "FAQPage", mainEntity: liste.map(([s, cv]) => ({ "@type": "Question", name: duz(s), acceptedAnswer: { "@type": "Answer", text: duz(cv) } })) });

const hizmetKart = (h) => `<a class="kart hizmet-kart" href="${hizmetYol(h)}"><span class="kart-ikon">${ikon(h.ikon)}</span><h3>${h.ad}</h3><p>${h.kisa}</p><span class="kart-ok">Ayrıntılar${ikon("ok")}</span></a>`;
const bolgeKart = (b) => `<a class="kart bolge-kart" href="${bolgeYol(b)}"><span class="bk-ad">${b.ad}</span><span class="bk-mesafe">${b.mesafe[1]} · ${b.mesafe[2]}</span>${ikon("ok")}</a>`;
const yolKart = (y) => `<a class="kart yol-kart" href="${bolgeYol(y)}"><span class="kart-ikon">${ikon("yol")}</span><span><b>${y.ad}</b><small>${y.kisa}</small></span>${ikon("ok")}</a>`;
const rehberKart = (r) => `<a class="kart rehber-kart" href="${rehberYol(r)}"><span class="rk-etiket">${ikon("kitap")}Kış rehberi</span><h3>${r.h1}</h3><p>${r.kisaCevap.split(". ")[0]}.</p><span class="kart-ok">Oku${ikon("ok")}</span></a>`;

// ---------------------------------------------------------------- talep formu (WhatsApp mesajı oluşturur, veri saklamaz)
const talepFormu = () => `
<form class="talep" id="talep" novalidate>
  <fieldset><legend>Ne oldu?</legend><div class="secimler">
    ${["Arıza, çalışmıyor", "Kaza", "Kara/çamura saplandı", "Akü bitti", "Lastik patladı", "Araç taşıma"].map((s, i) => `<label><input type="radio" name="sorun" value="${s}"${i === 0 ? " checked" : ""}><span>${s}</span></label>`).join("")}
  </div></fieldset>
  <fieldset><legend>Araç tipi</legend><div class="secimler">
    ${["Otomobil", "SUV / 4x4", "Hafif ticari", "Motosiklet", "Diğer"].map((s, i) => `<label><input type="radio" name="arac" value="${s}"${i === 0 ? " checked" : ""}><span>${s}</span></label>`).join("")}
  </div></fieldset>
  <label class="not-alan"><span>Not <small>(isteğe bağlı: gideceği adres, plaka, yol tarifi)</small></span><textarea name="not" rows="2" maxlength="400" placeholder="Örn. Sarıkamış'tan Kars sanayiye götürülecek"></textarea></label>
  <div class="talep-konum">
    <button type="button" class="btn btn-cizgi-koyu" id="konumEkle">${ikon("konum")}<span>Konumumu ekle</span></button>
    <span class="konum-durum" id="konumDurum" aria-live="polite">Konum eklenmedi</span>
  </div>
  <button type="submit" class="btn btn-wa btn-blok btn-gonder">${WA_SVG}WhatsApp'ta gönder</button>
  <p class="form-not">${ikon("kalkan")}Bu form yalnızca WhatsApp mesajınızı hazırlar; bilgileriniz ve konumunuz bu sitede saklanmaz.</p>
</form>`;

// ---------------------------------------------------------------- sayfa kabuğu
const ISLETME_ID = url("/#isletme");
const isletmeSema = () => ({
  "@type": ["AutomotiveBusiness", "EmergencyService"],
  "@id": ISLETME_ID,
  name: c.marka,
  alternateName: ["Öztekçe Çekici", "Kars Öztekçe Oto Kurtarma"],
  url: url("/"),
  telephone: c.telefon,
  image: url(v("/og.png")),
  logo: url(v("/icon-512.png")),
  founder: { "@type": "Person", name: c.sahip },
  address: { "@type": "PostalAddress", addressLocality: "Kars", addressRegion: "Kars", addressCountry: "TR" },
  areaServed: [{ "@type": "City", name: "Kars" }, ...BOLGELER.map((b) => ({ "@type": "AdministrativeArea", name: `${b.ad}, Kars` }))],
  ...(c.yirmiDortSaat ? { openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" }] } : {}),
  makesOffer: HIZMETLER.map((h) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: h.ad, url: url(hizmetYol(h)) } })),
  ...(c.googleHaritaLinki ? { hasMap: c.googleHaritaLinki, sameAs: [c.googleHaritaLinki] } : {}),
});

const sayfalar = [];
function sayfa({ yol, baslik, aciklama, govde, sema = [], aktif, noindex = false, tur = "WebPage" }) {
  const graf = [
    { "@type": "WebSite", "@id": url("/#site"), url: url("/"), name: c.marka, inLanguage: "tr-TR", publisher: { "@id": ISLETME_ID } },
    isletmeSema(),
    { "@type": tur, "@id": url(yol) + "#sayfa", url: url(yol), name: baslik, description: aciklama, inLanguage: "tr-TR", isPartOf: { "@id": url("/#site") }, about: { "@id": ISLETME_ID } },
    ...sema,
  ];
  const ld = JSON.stringify({ "@context": "https://schema.org", "@graph": graf }).replace(/</g, "\\u003c");
  const html = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(baslik)}</title>
<meta name="description" content="${esc(aciklama)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url(yol)}">`}
<meta name="theme-color" content="#0a1120">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="${esc(c.marka)}">
<meta property="og:title" content="${esc(baslik)}">
<meta property="og:description" content="${esc(aciklama)}">
<meta property="og:url" content="${url(yol)}">
<meta property="og:image" content="${url(v("/og.png"))}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
${c.googleDogrulama ? `<meta name="google-site-verification" content="${esc(c.googleDogrulama)}">` : ""}
<link rel="icon" href="${v("/favicon.ico")}" sizes="48x48">
<link rel="icon" href="${v("/favicon.svg")}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${v("/apple-touch-icon.png")}">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/font/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/font/plus-jakarta-sans-latin-ext.woff2" as="font" type="font/woff2" crossorigin>
<style>${CSS}</style>
<script type="application/ld+json">${ld}</script>
</head>
<body>
${ustKisim(aktif)}
<main id="icerik">
${govde}
</main>
${altBilgi()}
${altCubuk()}
<div class="bildirim" id="bildirim" role="status" aria-live="polite" hidden></div>
<script>window.OZ={wa:"${c.whatsapp}"};${JS}</script>
</body>
</html>`;
  const dosya = yol === "/404.html" ? join(OUT, "404.html") : join(OUT, yol, "index.html");
  mkdirSync(dirname(dosya), { recursive: true });
  writeFileSync(dosya, html);
  if (!noindex) sayfalar.push(yol);
}

// ---------------------------------------------------------------- ANA SAYFA
function anaSayfa() {
  const govde = `
<section class="kahraman">
  <div class="kar" aria-hidden="true"></div>
  <div class="kap kahraman-ic">
    <span class="rozet-cam"><i></i>${saatMetni} · Gece, bayram, tipi demeden</span>
    <h1>Kars'ta çekici ve <span class="vurgu">oto kurtarma</span></h1>
    <p class="giris">Kars merkez, 7 ilçe ve Erzurum, Iğdır, Ardahan yollarında yolda kalan aracınıza geliyoruz. Konumunuzu gönderin, fiyatı yola çıkmadan söyleyelim.</p>
    ${ctaDugmeler()}
    <ul class="guven">
      <li>${ikon("fiyat")}Fiyat yola çıkmadan belli</li>
      <li>${ikon("pin")}Kars merkez + 7 ilçe</li>
      <li>${ikon("dag")}Kış şartlarına hazır</li>
    </ul>
  </div>
  ${sahneSvg()}
</section>

<section class="adimlar-bolum"><div class="kap">
  <ol class="adimlar">
    <li><span class="adim-no">1</span>${ikon("uyari")}<div><h2>Güvenliğe geçin</h2><p>Dörtlüleri yakın, reflektör üçgenini koyun, yolun dışında bekleyin. Yaralı varsa önce 112.</p></div></li>
    <li><span class="adim-no">2</span>${ikon("konum")}<div><h2>Konumunuzu gönderin</h2><p>“Konumumu gönder” düğmesi yerinizi tek dokunuşla WhatsApp mesajına ekler.</p></div></li>
    <li><span class="adim-no">3</span>${ikon("cekici")}<div><h2>Fiyatı öğrenin, yola çıkalım</h2><p>Fiyatı ve tahmini varış süresini telefonda söyleriz; onaylarsanız hemen yola çıkarız.</p></div></li>
  </ol>
</div></section>

<section class="bolum" id="hizmetler"><div class="kap">
  <div class="bolum-bas"><p class="ust-baslik">Hizmetler</p><h2>Yolda kaldığınız her durum için</h2><p>Arızadan kazaya, bitmiş aküden kara saplanan araca kadar; aracınızı yerinde çalıştırıyor ya da istediğiniz adrese taşıyoruz.</p></div>
  <div class="izgara-3">${HIZMETLER.map(hizmetKart).join("")}</div>
</div></section>

<section class="bolum koyu talep-bolum" id="talep-olustur"><div class="kap talep-duzen">
  <div class="talep-metin">
    <p class="ust-baslik">WhatsApp ile çağırın</p>
    <h2>20 saniyede çekici çağırın</h2>
    <p>Konuşmakta zorlanıyorsanız, internetiniz zayıfsa ya da dil bilmiyorsanız: birkaç seçim yapın, konumunuzu ekleyin, mesaj hazır.</p>
    <ul class="tikli acik">
      <li>${ikon("tik")}<span>Konumunuz haritada nokta olarak gelir; tarif etmekle uğraşmazsınız.</span></li>
      <li>${ikon("tik")}<span>Mesajı göndermeden önce görür, düzenleyebilirsiniz.</span></li>
      <li>${ikon("tik")}<span>Acele varsa beklemeyin, doğrudan arayın: <a href="tel:${c.telefon}" data-track="call">${c.telefonGorunen}</a></span></li>
    </ul>
  </div>
  ${talepFormu()}
</div></section>

<section class="bolum" id="bolgeler"><div class="kap">
  <div class="bolum-bas"><p class="ust-baslik">Hizmet bölgesi</p><h2>Kars merkez, 7 ilçe ve ana yollar</h2><p>Kars merkezden ilçelere karayolu mesafeleri. İl dışına araç taşıma için de arayabilirsiniz.</p></div>
  <div class="bolge-duzen">
    <figure class="harita-kart">${haritaSvg()}<figcaption>Şematik harita · mesafeler Kars merkezden karayoluyla yaklaşıktır.</figcaption></figure>
    <div class="bolge-liste">
      ${BOLGELER.map(bolgeKart).join("")}
      <p class="liste-ara">Karayolları</p>
      ${YOLLAR.map(yolKart).join("")}
    </div>
  </div>
</div></section>

<section class="bolum acik-zemin"><div class="kap">
  <div class="bolum-bas"><p class="ust-baslik">Neden ${esc(c.markaKisa)}?</p><h2>Kars'ın yolunu ve kışını bilen çekici</h2></div>
  <div class="ozellikler">
    <div class="ozellik">${ikon("fiyat")}<h3>Fiyat yola çıkmadan belli</h3><p>Konumunuzu ve aracın gideceği adresi söyleyin; ücreti baştan net söyleriz. Yolda sürpriz yok.</p></div>
    <div class="ozellik">${ikon("dag")}<h3>Kış şartlarına hazır</h3><p>−20 °C'de biten akü, tipide kapanan yol, buzlu köy yolu: Kars kışı bizim için olağan iş.</p></div>
    <div class="ozellik">${ikon("konum")}<h3>Konumla doğrudan bulma</h3><p>Yerinizi tek dokunuşla gönderin; köy yolunda da, otoyolda da haritadaki noktaya geliriz.</p></div>
    <div class="ozellik">${ikon("saat")}<h3>Gece gündüz tek numara</h3><p>7/24 aynı numaradan ulaşın: gece yarısı, hafta sonu ve bayramlarda da.</p></div>
  </div>
</div></section>

<section class="bolum" id="rehber"><div class="kap">
  <div class="bolum-bas satir"><div><p class="ust-baslik">Kış rehberi</p><h2>Yolda kalmadan önce bilmeniz gerekenler</h2></div><a class="metin-link" href="/rehber/">Tüm rehberler${ikon("ok")}</a></div>
  <div class="izgara-3">${REHBER.slice(0, 3).map(rehberKart).join("")}</div>
</div></section>

<section class="bolum acik-zemin"><div class="kap dar">${sssHtml(SSS_GENEL)}</div></section>
${ctaBant()}`;
  sayfa({
    yol: "/", aktif: "/",
    baslik: "Kars Çekici ve Oto Kurtarma 7/24 | Öztekçe",
    aciklama: "Kars merkez ve ilçelerde 7/24 çekici, oto kurtarma, akü takviye ve yol yardımı. Konumunuzu gönderin, fiyat yola çıkmadan belli: 0545 205 86 79",
    govde, sema: [sssSema(SSS_GENEL)],
  });
}

// ---------------------------------------------------------------- HİZMET SAYFALARI
function hizmetSayfalari() {
  const kir = [["/", "Ana sayfa"], ["/hizmetler/", "Hizmetler"]];
  sayfa({
    yol: "/hizmetler/", aktif: "/hizmetler/",
    baslik: "Çekici ve Yol Yardım Hizmetleri Kars | Öztekçe",
    aciklama: "Kars'ta araç çekme, kaza ve şarampol kurtarma, kara saplanan araç, akü takviye, lastik yardımı ve şehirlerarası araç taşıma. 7/24: 0545 205 86 79",
    sema: [kirintiSema(kir)],
    govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(kir)}<h1>Çekici ve yol yardım hizmetleri</h1><p class="giris">Aracınızı yerinde çalıştırabiliyorsak çalıştırıyor, çalışmıyorsa istediğiniz adrese taşıyoruz. Kars merkez ve tüm ilçelerde 7/24.</p>${ctaDugmeler("sola")}</div></section>
<section class="bolum"><div class="kap"><div class="izgara-3">${HIZMETLER.map(hizmetKart).join("")}</div></div></section>
${ctaBant()}`,
  });

  for (const h of HIZMETLER) {
    const k = [...kir, [hizmetYol(h), h.ad]];
    const digerleri = HIZMETLER.filter((x) => x !== h);
    sayfa({
      yol: hizmetYol(h), aktif: "/hizmetler/", baslik: h.baslik, aciklama: h.aciklama,
      sema: [kirintiSema(k), sssSema(h.sss), { "@type": "Service", "@id": url(hizmetYol(h)) + "#hizmet", name: h.ad, serviceType: h.ad, description: duz(h.giris), provider: { "@id": ISLETME_ID }, areaServed: { "@type": "City", name: "Kars" }, url: url(hizmetYol(h)) }],
      govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(k)}<span class="sayfa-ikon">${ikon(h.ikon)}</span><h1>${h.h1}</h1><p class="giris">${h.giris}</p>${ctaDugmeler("sola")}</div></section>
<div class="kap icerik-duzen">
  <article class="yazi">
    ${bolumlerHtml(h.bolumler)}
    <h2>Bu hizmeti verdiğimiz bölgeler</h2>
    <div class="cipler">${BOLGELER.map((b) => `<a href="${bolgeYol(b)}">${b.ad}</a>`).join("")}${YOLLAR.map((y) => `<a href="${bolgeYol(y)}">${y.ad}</a>`).join("")}</div>
    ${sssHtml(h.sss)}
  </article>
  ${yanKart()}
</div>
<section class="bolum acik-zemin"><div class="kap"><div class="bolum-bas"><h2>Diğer hizmetler</h2></div><div class="izgara-3">${digerleri.slice(0, 3).map(hizmetKart).join("")}</div></div></section>
${ctaBant()}`,
    });
  }
}

// ---------------------------------------------------------------- BÖLGE ve YOL SAYFALARI
function bolgeSayfalari() {
  const kir = [["/", "Ana sayfa"], ["/bolgeler/", "Hizmet bölgeleri"]];
  sayfa({
    yol: "/bolgeler/", aktif: "/bolgeler/",
    baslik: "Hizmet Bölgeleri: Kars Merkez ve İlçeler | Öztekçe",
    aciklama: "Kars merkez, Sarıkamış, Selim, Digor, Kağızman, Arpaçay, Akyaka, Susuz ve Kars–Erzurum, Iğdır, Ardahan yollarında 7/24 çekici ve yol yardımı.",
    sema: [kirintiSema(kir)],
    govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(kir)}<h1>Hizmet bölgelerimiz</h1><p class="giris">Kars merkezden yola çıkıyor; ilçelere, köy yollarına ve il sınırı içindeki karayollarına geliyoruz. İl dışına araç taşıma da yapıyoruz.</p></div></section>
<section class="bolum"><div class="kap bolge-duzen">
  <figure class="harita-kart">${haritaSvg()}<figcaption>Şematik harita · mesafeler Kars merkezden karayoluyla yaklaşıktır.</figcaption></figure>
  <div class="bolge-liste">${BOLGELER.map(bolgeKart).join("")}<p class="liste-ara">Karayolları</p>${YOLLAR.map(yolKart).join("")}</div>
</div></section>
${ctaBant()}`,
  });

  for (const b of BOLGELER) {
    const k = [...kir, [bolgeYol(b), `${b.ad} çekici`]];
    const yollar = b.yollar.map(bulBolge);
    sayfa({
      yol: bolgeYol(b), aktif: "/bolgeler/", baslik: b.baslik, aciklama: b.aciklama,
      sema: [kirintiSema(k), sssSema(b.sss), { "@type": "Service", "@id": url(bolgeYol(b)) + "#hizmet", name: `${b.ad} çekici ve oto kurtarma`, serviceType: "Çekici ve yol yardımı", provider: { "@id": ISLETME_ID }, areaServed: { "@type": "AdministrativeArea", name: `${b.ad}, Kars` } }],
      govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(k)}<h1>${b.ad} çekici ve oto kurtarma</h1><p class="giris">${b.ozel[0]}</p>
  <div class="mesafe-kart">${ikon("rota")}<span><small>${b.mesafe[0]}</small><strong><b>${b.mesafe[1]}</b> · yaklaşık ${b.mesafe[2].replace("~", "")}</strong></span></div>
  ${ctaDugmeler("sola")}</div></section>
<div class="kap icerik-duzen">
  <article class="yazi">
    <p>${b.ozel[1]}</p>
    <h2>${b.de} verdiğimiz hizmetler</h2>
    <ul class="hizmet-satirlar">${HIZMETLER.map((h) => `<li><a href="${hizmetYol(h)}">${ikon(h.ikon)}<span><b>${h.ad}</b><small>${h.kisa}</small></span></a></li>`).join("")}</ul>
    ${yollar.length ? `<h2>Yakındaki karayolları</h2><div class="yol-satir">${yollar.map(yolKart).join("")}</div>` : ""}
    <figure class="harita-kart kucuk">${haritaSvg(b.slug)}<figcaption>${b.ad}, Kars merkezin ${b.yon}. Şematik harita.</figcaption></figure>
    ${sssHtml(b.sss)}
    <h2>Diğer ilçeler</h2>
    <div class="cipler">${BOLGELER.filter((x) => x !== b).map((x) => `<a href="${bolgeYol(x)}">${x.ad}</a>`).join("")}</div>
  </article>
  ${yanKart()}
</div>
${ctaBant(`${b.de} yolda mı kaldınız?`)}`,
    });
  }

  for (const y of YOLLAR) {
    const k = [...kir, [bolgeYol(y), y.ad]];
    const ilceler = y.ilceler.map(bulBolge);
    sayfa({
      yol: bolgeYol(y), aktif: "/bolgeler/", baslik: y.baslik, aciklama: y.aciklama,
      sema: [kirintiSema(k), { "@type": "Service", "@id": url(bolgeYol(y)) + "#hizmet", name: `${y.ad} çekici ve yol yardımı`, serviceType: "Çekici ve yol yardımı", provider: { "@id": ISLETME_ID }, areaServed: { "@type": "City", name: "Kars" } }],
      govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(k)}<span class="sayfa-ikon">${ikon("yol")}</span><h1>${y.h1}</h1><p class="giris">${y.giris}</p>${ctaDugmeler("sola")}</div></section>
<div class="kap icerik-duzen">
  <article class="yazi">
    ${y.paragraflar.map((p) => `<p>${p}</p>`).join("")}
    <h2>Bu yol üzerindeki ilçeler</h2>
    <div class="bolge-liste yatay">${ilceler.map(bolgeKart).join("")}</div>
    <h2>Yolda neler yapıyoruz?</h2>
    <ul class="hizmet-satirlar">${HIZMETLER.map((h) => `<li><a href="${hizmetYol(h)}">${ikon(h.ikon)}<span><b>${h.ad}</b><small>${h.kisa}</small></span></a></li>`).join("")}</ul>
    <div class="uyari-kutu">${ikon("uyari")}<p><b>Yolda kaldıysanız:</b> aracı yolun tamamen dışına alın, dörtlüleri yakın, reflektör üçgenini koyun ve trafiğe açık tarafta beklemeyin. Yaralı varsa önce 112'yi arayın.</p></div>
  </article>
  ${yanKart()}
</div>
${ctaBant(`${y.ad}nda yolda mı kaldınız?`)}`,
    });
  }
}

// ---------------------------------------------------------------- REHBER
function rehberSayfalari() {
  const kir = [["/", "Ana sayfa"], ["/rehber/", "Kış rehberi"]];
  sayfa({
    yol: "/rehber/", aktif: "/rehber/",
    baslik: "Kars Kış Sürüşü ve Yol Yardım Rehberi | Öztekçe",
    aciklama: "Kara saplanan araç, soğukta biten akü, kışın Kars'a araçla gelmek, kaza sonrası sigorta ve konum gönderme: yolda kalmadan önce okuyun.",
    sema: [kirintiSema(kir)],
    govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(kir)}<h1>Kış rehberi</h1><p class="giris">Kars'ta kış uzun ve sert geçer. Yolda kalmamak ve kaldığınızda doğru adımları atmak için kısa, uygulanabilir rehberler.</p></div></section>
<section class="bolum"><div class="kap"><div class="izgara-3">${REHBER.map(rehberKart).join("")}</div></div></section>
${ctaBant()}`,
  });

  for (const r of REHBER) {
    const k = [...kir, [rehberYol(r), r.h1]];
    sayfa({
      yol: rehberYol(r), aktif: "/rehber/", baslik: r.baslik, aciklama: r.aciklama, tur: "WebPage",
      sema: [kirintiSema(k), { "@type": "Article", "@id": url(rehberYol(r)) + "#yazi", headline: r.h1, description: r.aciklama, datePublished: "2026-09-27", dateModified: BUGUN, inLanguage: "tr-TR", author: { "@id": ISLETME_ID }, publisher: { "@id": ISLETME_ID }, image: url(v("/og.png")), mainEntityOfPage: url(rehberYol(r)) }],
      govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(k)}<span class="rk-etiket">${ikon("kitap")}Kış rehberi</span><h1>${r.h1}</h1></div></section>
<div class="kap icerik-duzen">
  <article class="yazi">
    <div class="kisa-cevap"><p class="ust-baslik">Kısa cevap</p><p>${r.kisaCevap}</p></div>
    ${bolumlerHtml(r.bolumler)}
    <div class="yazi-cta"><div><b>Yolda mı kaldınız?</b><span>Kars ve ilçelerinde 7/24 çekici ve yol yardımı.</span></div><a class="btn btn-ara" href="tel:${c.telefon}" data-track="call">${ikon("tel")}${c.telefonGorunen}</a></div>
    <p class="guncelleme">Son güncelleme: ${new Date(BUGUN).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</p>
  </article>
  ${yanKart()}
</div>
<section class="bolum acik-zemin"><div class="kap"><div class="bolum-bas"><h2>Diğer rehberler</h2></div><div class="izgara-3">${REHBER.filter((x) => x !== r).slice(0, 3).map(rehberKart).join("")}</div></div></section>`,
    });
  }
}

// ---------------------------------------------------------------- İLETİŞİM ve 404
function digerSayfalar() {
  const kir = [["/", "Ana sayfa"], ["/iletisim/", "İletişim"]];
  sayfa({
    yol: "/iletisim/", aktif: "/iletisim/",
    baslik: "İletişim: Kars Çekici 0545 205 86 79 | Öztekçe",
    aciklama: "Öztekçe Oto Kurtarma'ya 7/24 ulaşın: 0545 205 86 79. Telefon, WhatsApp ya da tek dokunuşla konum gönderme. Kars merkez ve tüm ilçeler.",
    sema: [kirintiSema(kir)], tur: "ContactPage",
    govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(kir)}<h1>İletişim</h1><p class="giris">Kars merkez ve ilçelerde yolda kaldıysanız arayın ya da WhatsApp'tan yazın. İşletme sahibi: <b>${esc(c.sahip)}</b>.</p></div></section>
<section class="bolum"><div class="kap iletisim-duzen">
  <div class="iletisim-kartlar">
    <a class="kart il-kart vurgulu" href="tel:${c.telefon}" data-track="call">${ikon("tel")}<span><small>Telefon · ${saatMetni}</small><b>${c.telefonGorunen}</b></span></a>
    <a class="kart il-kart" href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp">${WA_SVG}<span><small>WhatsApp</small><b>Mesaj gönder</b></span></a>
    <button type="button" class="kart il-kart" data-konum>${ikon("konum")}<span><small>Tek dokunuş</small><b>Konumumu gönder</b></span></button>
    <div class="kart il-kart duz">${ikon("pin")}<span><small>Hizmet bölgesi</small><b>Kars merkez ve 7 ilçe</b></span></div>
  </div>
  <div class="koyu-kart"><h2>WhatsApp talebi hazırlayın</h2>${talepFormu()}</div>
</div></section>`,
  });

  sayfa({
    yol: "/404.html", noindex: true,
    baslik: "Sayfa bulunamadı | Öztekçe Oto Kurtarma",
    aciklama: "Aradığınız sayfa bulunamadı. Yolda kaldıysanız 7/24 arayın: 0545 205 86 79",
    govde: `<section class="sayfa-bas bos"><div class="kap dar"><h1>Sayfa bulunamadı</h1><p class="giris">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Yolda kaldıysanız vakit kaybetmeyin:</p>${ctaDugmeler("sola")}<p><a class="metin-link" href="/">Ana sayfaya dön${ikon("ok")}</a></p></div></section>`,
  });
}

// ---------------------------------------------------------------- derleme
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync("public", OUT, { recursive: true });

anaSayfa();
hizmetSayfalari();
bolgeSayfalari();
rehberSayfalari();
digerSayfalar();

writeFileSync(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sayfalar.map((y) => `  <url><loc>${url(y)}</loc><lastmod>${BUGUN}</lastmod></url>`).join("\n")}
</urlset>
`);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${url("/sitemap.xml")}\n`);
writeFileSync(join(OUT, "site.webmanifest"), JSON.stringify({
  name: c.marka, short_name: c.markaKisa, lang: "tr", start_url: "/", display: "standalone",
  background_color: "#0a1120", theme_color: "#0a1120",
  icons: [{ src: "/favicon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }],
}));
console.log(`${sayfalar.length} sayfa + 404 → ${OUT}/`);
