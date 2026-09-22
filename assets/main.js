(function () {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) window.scrollTo(0, 0);
  });

  /* Header scroll state */
  var hd = document.getElementById("hd");
  function onScroll() {
    if (window.scrollY > 12) hd.classList.add("scrolled");
    else hd.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile nav */
  var burger = document.getElementById("burger");
  var mnav = document.getElementById("mnav");
  var backdrop = document.getElementById("mnavBackdrop");
  function closeMnav() {
    mnav.classList.remove("open");
    mnav.inert = true;
    if (backdrop) backdrop.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
  function openMnav() {
    mnav.classList.add("open");
    mnav.inert = false;
    if (backdrop) backdrop.classList.add("open");
    burger.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
  }
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      if (mnav.classList.contains("open")) closeMnav();
      else openMnav();
    });
    mnav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMnav);
    });
    if (backdrop) backdrop.addEventListener("click", closeMnav);
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mnav.classList.contains("open")) closeMnav();
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Only one FAQ item open at a time */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      document.querySelectorAll(".faq-item").forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* Zone map: click a city to recenter/highlight it */
  var zoneList = document.getElementById("zoneList");
  var zoneMap = document.getElementById("zoneMap");
  if (zoneList && zoneMap) {
    zoneList.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-city]");
      if (!btn) return;
      zoneList.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var q = encodeURIComponent(btn.getAttribute("data-city"));
      var z = btn.getAttribute("data-zoom") || "13";
      zoneMap.src = "https://www.google.com/maps?q=" + q + "&z=" + z + "&output=embed";
    });
  }

  /* Footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
