(function () {
  var WA = window.OZ.wa;
  var d = document;

  // ---- menü
  var ust = d.getElementById("ust"), dugme = d.getElementById("menuDugme");
  if (dugme) dugme.addEventListener("click", function () {
    var acik = ust.classList.toggle("menu-acik");
    dugme.setAttribute("aria-expanded", acik);
    dugme.setAttribute("aria-label", acik ? "Menüyü kapat" : "Menüyü aç");
  });

  // ---- kısa bildirim
  var bildirim = d.getElementById("bildirim"), zaman;
  function bildir(metin, sure) {
    bildirim.textContent = metin;
    bildirim.hidden = false;
    clearTimeout(zaman);
    zaman = setTimeout(function () { bildirim.hidden = true; }, sure || 5000);
  }

  function waAc(metin) {
    location.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(metin);
  }

  // ---- konum: yalnızca WhatsApp mesajına eklenir, hiçbir yere kaydedilmez
  function konumAl(tamam, hata) {
    if (!("geolocation" in navigator)) return hata("destek");
    navigator.geolocation.getCurrentPosition(
      function (p) { tamam(p.coords); },
      function (e) { hata(e.code === 1 ? "izin" : "zaman"); },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }
  function haritaLinki(k) {
    return "https://maps.google.com/?q=" + k.latitude.toFixed(6) + "," + k.longitude.toFixed(6);
  }
  var HATA = {
    izin: "Konum izni verilmedi. WhatsApp'ta ataç simgesi → Konum ile de gönderebilirsiniz.",
    zaman: "Konum alınamadı. WhatsApp'ta ataç simgesi → Konum ile gönderebilirsiniz.",
    destek: "Tarayıcınız konum desteklemiyor. WhatsApp'ta ataç simgesi → Konum ile gönderin."
  };

  d.querySelectorAll("[data-konum]").forEach(function (b) {
    b.addEventListener("click", function () {
      b.classList.add("yukleniyor");
      bildir("Konumunuz alınıyor…", 12000);
      konumAl(function (k) {
        b.classList.remove("yukleniyor");
        bildirim.hidden = true;
        waAc("Merhaba, çekici / yol yardımına ihtiyacım var.\nKonumum: " + haritaLinki(k) + "\n(Konum hassasiyeti ~" + Math.round(k.accuracy) + " m)");
      }, function (neden) {
        b.classList.remove("yukleniyor");
        bildir(HATA[neden], 7000);
        setTimeout(function () { waAc("Merhaba, çekici / yol yardımına ihtiyacım var. Konumumu şimdi paylaşıyorum."); }, 1800);
      });
    });
  });

  // ---- talep formu
  var form = d.getElementById("talep");
  if (form) {
    var konum = null, ekle = d.getElementById("konumEkle"), durum = d.getElementById("konumDurum");
    ekle.addEventListener("click", function () {
      ekle.classList.add("yukleniyor");
      durum.className = "konum-durum";
      durum.textContent = "Konum alınıyor…";
      konumAl(function (k) {
        konum = k;
        ekle.classList.remove("yukleniyor");
        durum.className = "konum-durum tamam";
        durum.textContent = "✓ Konum eklendi (~" + Math.round(k.accuracy) + " m)";
      }, function (neden) {
        ekle.classList.remove("yukleniyor");
        durum.className = "konum-durum hata";
        durum.textContent = neden === "izin" ? "İzin verilmedi — WhatsApp'tan paylaşabilirsiniz" : "Konum alınamadı — WhatsApp'tan paylaşabilirsiniz";
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(form), not = (f.get("not") || "").trim();
      var satirlar = [
        "Merhaba, çekici / yol yardımı istiyorum.",
        "Durum: " + f.get("sorun"),
        "Araç: " + f.get("arac"),
        konum ? "Konum: " + haritaLinki(konum) : "Konum: WhatsApp'tan paylaşacağım",
      ];
      if (not) satirlar.push("Not: " + not);
      waAc(satirlar.join("\n"));
    });
  }

  // ---- dönüşüm ölçümü (GA4 eklendiğinde çalışır)
  d.addEventListener("click", function (e) {
    var a = e.target.closest("[data-track]");
    if (a && window.gtag) window.gtag("event", a.dataset.track === "call" ? "telefon_tiklama" : "whatsapp_tiklama");
  });
})();
