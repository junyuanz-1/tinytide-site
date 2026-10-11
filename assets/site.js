// Localizes the page. English is the HTML itself; other languages come from
// window.TINYTIDE_I18N (assets/i18n.js). The language is the saved choice, else
// the browser language, else English.
(function () {
  var LANGS = [
    ["en", "English"],
    ["zh-Hans", "简体中文"],
    ["zh-Hant", "繁體中文"],
    ["ja", "日本語"],
    ["ko", "한국어"],
    ["es", "Español"],
    ["pt-BR", "Português (Brasil)"],
    ["fr", "Français"],
    ["de", "Deutsch"]
  ];
  var dicts = window.TINYTIDE_I18N || {};

  function detect() {
    var saved = null;
    try { saved = localStorage.getItem("tinytide-lang"); } catch (e) {}
    if (saved && (saved === "en" || dicts[saved])) return saved;
    var prefs = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < prefs.length; i++) {
      var tag = String(prefs[i]).toLowerCase();
      if (tag.indexOf("zh") === 0) {
        return /hant|tw|hk|mo/.test(tag) ? "zh-Hant" : "zh-Hans";
      }
      if (tag.indexOf("pt") === 0) return "pt-BR";
      var base = tag.split("-")[0];
      if (base === "en") return "en";
      if (dicts[base]) return base;
    }
    return "en";
  }

  function apply(lang) {
    var dict = lang === "en" ? null : dicts[lang];
    document.documentElement.setAttribute("lang", lang);
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      var key = el.getAttribute("data-i18n");
      var value = dict && dict[key] !== undefined ? dict[key] : el.dataset.en;
      el.innerHTML = value;
      if (el.classList.contains("translation-note")) el.hidden = !value;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var lang = detect();
    apply(lang);
    var select = document.querySelector(".lang-select");
    if (!select) return;
    LANGS.forEach(function (pair) {
      if (pair[0] !== "en" && !dicts[pair[0]]) return;
      var option = document.createElement("option");
      option.value = pair[0];
      option.textContent = pair[1];
      select.appendChild(option);
    });
    select.value = lang;
    select.addEventListener("change", function () {
      apply(select.value);
      try { localStorage.setItem("tinytide-lang", select.value); } catch (e) {}
    });
  });
})();
