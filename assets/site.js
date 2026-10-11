// Picks English or Simplified Chinese from the saved choice or the browser language,
// and wires up the language toggle button.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("lullo-lang"); } catch (e) {}
  var browser = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
  var lang = saved || (/^zh/i.test(browser) ? "zh" : "en");

  function apply(next) {
    lang = next;
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "zh" ? "zh-Hans" : "en");
    var title = document.querySelector("meta[name='title-" + lang + "']");
    if (title) document.title = title.getAttribute("content");
  }

  apply(lang);

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".lang-toggle");
    if (!button) return;
    button.addEventListener("click", function () {
      apply(lang === "zh" ? "en" : "zh");
      try { localStorage.setItem("lullo-lang", lang); } catch (e) {}
    });
  });
})();
