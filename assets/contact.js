(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var WA_NUMBER = "33783392818";
  var EMAIL = "Cleanet45@gmail.com";

  /* TODO: replace with a real Web3Forms access key before going live.
     Get one free, no account needed: https://web3forms.com/ — enter the
     email that should receive the quote requests (Cleanet45@gmail.com),
     they email you a key instantly. Swap it in below. */
  var WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

  var totalEl = document.querySelector("#cf-total b");
  var noteEl = document.getElementById("cf-note");
  var noteDefault = noteEl ? noteEl.textContent : "";
  var noteTimer;

  var rentalToggle = document.getElementById("cf-rental-toggle");
  var rentalFieldset = document.getElementById("cf-rental-fieldset");

  function prestationInputs() {
    return Array.prototype.slice.call(form.querySelectorAll("#cf-prestation input"));
  }
  function rentalInputs() {
    return Array.prototype.slice.call(form.querySelectorAll("#cf-rental input"));
  }

  function updateHighlight(input) {
    var row = input.closest(".svc-radio, .svc-check");
    if (!row) return;
    Array.prototype.slice.call(row.parentElement.querySelectorAll(".svc-radio")).forEach(function (r) {
      r.classList.remove("is-checked");
    });
    row.classList.toggle("is-checked", input.checked);
  }

  function isRentalSelected() {
    var checked = form.querySelector("#cf-prestation input:checked");
    return !!(checked && checked === rentalToggle);
  }

  function computeTotal() {
    var checked = form.querySelector("#cf-prestation input:checked");
    var hasPrestation = !!(checked && checked.value);

    if (isRentalSelected()) {
      var rental = form.querySelector("#cf-rental input:checked");
      var price = rental ? parseInt(rental.dataset.price || "0", 10) : 0;
      if (totalEl) totalEl.textContent = price + "€";
      return { text: price + "€", hasPrestation: true };
    }

    if (totalEl) totalEl.textContent = hasPrestation ? "Sur devis" : "Sur devis";
    return { text: "Sur devis", hasPrestation: hasPrestation };
  }

  function syncRentalVisibility() {
    var show = isRentalSelected();
    rentalFieldset.style.display = show ? "" : "none";
  }

  /* Auto-drafted message */
  var messageEl = form.message;
  var lastAutoMessage = "";

  function autoMessageText() {
    var checked = form.querySelector("#cf-prestation input:checked");
    if (!checked || !checked.value) return "";

    if (isRentalSelected()) {
      var rental = form.querySelector("#cf-rental input:checked");
      var duree = rental ? rental.value : "Journée";
      var prix = rental ? rental.dataset.price : "30";
      return "Je souhaite louer la shampouineuse Kärcher SE 4001 pour la formule \"" + duree + "\" (" + prix + "€, produit inclus, caution 150€).";
    }

    return "Je souhaite un devis pour la prestation \"" + checked.value + "\".";
  }

  function refreshAutoMessage() {
    if (!messageEl) return;
    if (messageEl.value === "" || messageEl.value === lastAutoMessage) {
      lastAutoMessage = autoMessageText();
      messageEl.value = lastAutoMessage;
    }
  }

  prestationInputs().forEach(function (input) {
    updateHighlight(input);
    input.addEventListener("change", function () {
      updateHighlight(input);
      syncRentalVisibility();
      computeTotal();
      refreshAutoMessage();
    });
  });
  rentalInputs().forEach(function (input) {
    updateHighlight(input);
    input.addEventListener("change", function () {
      updateHighlight(input);
      computeTotal();
      refreshAutoMessage();
    });
  });
  syncRentalVisibility();
  computeTotal();
  refreshAutoMessage();

  function buildMessage() {
    var nom = (form.nom && form.nom.value || "").trim();
    var tel = (form.telephone && form.telephone.value || "").trim();
    var message = (form.message && form.message.value || "").trim();

    var lines = ["Bonjour,", ""];
    lines.push("Je souhaite une demande de devis CLEANET 45.");
    lines.push("");
    lines.push(message || "Je vous laisse me conseiller sur la prestation la plus adaptée.");
    lines.push("");
    if (nom) lines.push("Nom : " + nom);
    if (tel) lines.push("Téléphone : " + tel);
    lines.push("");
    lines.push(nom ? "Cordialement, " + nom : "Cordialement");

    return lines.join("\n");
  }

  function flashNote(text) {
    if (!noteEl) return;
    clearTimeout(noteTimer);
    noteEl.textContent = text;
    noteTimer = setTimeout(function () { noteEl.textContent = noteDefault; }, 6000);
  }

  function requireContactFields(report) {
    var nom = (form.nom && form.nom.value || "").trim();
    var tel = (form.telephone && form.telephone.value || "").trim();
    if (!nom || !tel) {
      report("Merci de renseigner votre nom et votre téléphone avant d'envoyer.");
      (nom ? form.telephone : form.nom).focus();
      return false;
    }
    return true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!requireContactFields(flashNote)) return;
    var text = buildMessage();
    var waLink = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);

    function openWa(copied) {
      window.open(waLink, "_blank", "noopener");
      flashNote(
        copied
          ? "WhatsApp s'ouvre avec votre message pré-rempli — il ne reste plus qu'à l'envoyer."
          : "WhatsApp s'ouvre dans un nouvel onglet avec votre message pré-rempli."
      );
    }
    openWa(true);
  });

  var mailBtn = document.getElementById("cf-mail");
  if (mailBtn) {
    mailBtn.addEventListener("click", function () {
      if (!requireContactFields(flashNote)) return;
      var text = buildMessage();
      var subject = "Demande de devis — CLEANET 45";
      window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
      flashNote("Votre logiciel de messagerie s'ouvre avec votre demande pré-remplie.");
    });
  }

  var siteBtn = document.getElementById("cf-site");
  var siteDivider = document.getElementById("cf-site-divider");
  var siteStatus = document.getElementById("cf-site-status");
  var web3formsReady = WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY";

  function setSiteStatus(text, kind) {
    if (!siteStatus) return;
    siteStatus.textContent = text;
    siteStatus.className = "field-status" + (kind ? " is-" + kind : "");
  }

  if (siteBtn && !web3formsReady) {
    siteBtn.style.display = "none";
    if (siteDivider) siteDivider.style.display = "none";
    if (siteStatus) siteStatus.style.display = "none";
  } else if (siteBtn) {
    var siteBtnLabel = siteBtn.innerHTML;

    siteBtn.addEventListener("click", function () {
      if (!requireContactFields(function (msg) { setSiteStatus(msg, "error"); })) return;

      var nom = (form.nom && form.nom.value || "").trim();
      var tel = (form.telephone && form.telephone.value || "").trim();

      siteBtn.disabled = true;
      siteBtn.innerHTML = "Envoi en cours…";
      setSiteStatus("", "pending");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Nouvelle demande de devis — CLEANET 45",
          from_name: nom,
          phone: tel,
          message: buildMessage()
        })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          siteBtn.disabled = false;
          siteBtn.innerHTML = siteBtnLabel;
          if (data && data.success) {
            setSiteStatus("Message envoyé ✓ — nous revenons vers vous rapidement.", "ok");
            form.reset();
            syncRentalVisibility();
            computeTotal();
            prestationInputs().forEach(updateHighlight);
            rentalInputs().forEach(updateHighlight);
            lastAutoMessage = "";
            refreshAutoMessage();
          } else {
            setSiteStatus("Échec de l'envoi — utilisez WhatsApp ou l'e-mail ci-dessus.", "error");
          }
        })
        .catch(function () {
          siteBtn.disabled = false;
          siteBtn.innerHTML = siteBtnLabel;
          setSiteStatus("Échec de l'envoi — utilisez WhatsApp ou l'e-mail ci-dessus.", "error");
        });
    });
  }
})();
