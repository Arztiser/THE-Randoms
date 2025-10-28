document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  let holidayClass = "";
  let mascotFile = "Mascot.png";
  let styles = "";

  // 🎄 CHRISTMAS
  if (month === 12 && day >= 18 && day <= 26) {
    holidayClass = "holiday-christmas";
    mascotFile = "christmasmascot.png";
    styles = `
      body.holiday-christmas {
        background-color: #E82B38;
        color: white;
      }
      body.holiday-christmas .topnav,
      body.holiday-christmas .site-footer {
        background-color: #b22731;
        color: white !important;
      }
      body.holiday-christmas .accordion-toggle,
      body.holiday-christmas .clickable-section {
        background-color: #E82B38 !important;
        color: white !important;
      }
      body.holiday-christmas .accordion-toggle:hover,
      body.holiday-christmas .clickable-section:hover {
        background-color: #ff4f60 !important;
      }
      body.holiday-christmas .accordion-content {
        background-color: #b22731 !important;
        color: white !important;
      }
      body.holiday-christmas .site-footer *,
      body.holiday-christmas .footer-left p {
        color: white !important;
      }
    `;
  }

  // 🎃 HALLOWEEN
  else if (month === 10 && day >= 25 && day <= 31) {
    holidayClass = "holiday-halloween";
    mascotFile = "halloweenmascot.png";
    styles = `
      body.holiday-halloween {
        background-color: orange;
        color: black;
      }
      body.holiday-halloween a {
        color: black;
      }
      body.holiday-halloween .topnav,
      body.holiday-halloween .site-footer {
        background-color: black;
        color: white !important;
      }
      body.holiday-halloween .site-footer *,
      body.holiday-halloween .footer-left p {
        color: white !important;
      }
      body.holiday-halloween .accordion-toggle {
        background-color: orange !important;
        color: black !important;
        border: 2px solid black;
      }
      body.holiday-halloween .accordion-toggle:hover {
        background-color: #ffb347 !important;
      }
      body.holiday-halloween .accordion-content {
        background-color: #222 !important;
        color: white !important;
      }
      body.holiday-halloween .accordion-content a {
        color: white !important;
      }
      body.holiday-halloween .accordion-content a:hover {
        background-color: #444 !important;
      }
      body.holiday-halloween .clickable-section {
        background-color: orange !important;
        color: black !important;
      }
      body.holiday-halloween .clickable-section:hover {
        background-color: #ffb347 !important;
      }
    `;
  }

  // ☘️ ST. PATRICK’S DAY
  else if (month === 3 && day >= 14 && day <= 18) {
    holidayClass = "holiday-stpatricks";
    mascotFile = "stpatmascot.png";
    styles = `
      body.holiday-stpatricks {
        background-color: #0b6623;
        color: #fff;
      }
      body.holiday-stpatricks .topnav,
      body.holiday-stpatricks .site-footer {
        background-color: #065c1a;
        color: #fff !important;
      }
      body.holiday-stpatricks .accordion-toggle,
      body.holiday-stpatricks .clickable-section {
        background-color: #0b6623 !important;
        color: #fff !important;
      }
      body.holiday-stpatricks .accordion-toggle:hover,
      body.holiday-stpatricks .clickable-section:hover {
        background-color: #1ca135 !important;
      }
      body.holiday-stpatricks .accordion-content {
        background-color: #065c1a !important;
        color: #fff !important;
      }
      body.holiday-stpatricks .accordion-content a {
        color: #fff !important;
      }
      body.holiday-stpatricks .accordion-content a:hover {
        background-color: #107d2a !important;
      }
      body.holiday-stpatricks .site-footer *,
      body.holiday-stpatricks .footer-left p {
        color: #fff !important;
      }
    `;
  }

  // 🐰 EASTER
  else if ((month === 3 && day >= 20) || (month === 4 && day <= 5)) {
    holidayClass = "holiday-easter";
    mascotFile = "eastermascot.png";
    styles = `
      body.holiday-easter {
        background-color: #fff8f2;
        color: #333;
      }
      body.holiday-easter a {
        color: #ff80ab;
      }
      body.holiday-easter .topnav,
      body.holiday-easter .site-footer {
        background: linear-gradient(90deg, #ffd1dc, #c3f0ca, #aee4ff);
        color: #333 !important;
      }
      body.holiday-easter .topnav h1 a.logo,
      body.holiday-easter .menu-icon {
        color: #333 !important;
      }
      body.holiday-easter .accordion-toggle {
        background-color: #ffebef !important;
        color: #333 !important;
        border: 2px solid #ffc0cb;
      }
      body.holiday-easter .accordion-toggle:hover {
        background-color: #ffe0f0 !important;
      }
      body.holiday-easter .accordion-content {
        background-color: #fffaf8 !important;
        color: #333 !important;
      }
      body.holiday-easter .accordion-content a {
        color: #333 !important;
      }
      body.holiday-easter .accordion-content a:hover {
        background-color: #ffedf5 !important;
      }
      body.holiday-easter .clickable-section {
        background-color: #ffd1dc !important;
        color: #333 !important;
        border-bottom: 1px solid #ffb6c1;
      }
      body.holiday-easter .clickable-section:hover {
        background-color: #ffb6c1 !important;
      }
      body.holiday-easter .site-footer *,
      body.holiday-easter .footer-left p {
        color: #333 !important;
      }
    `;
  }

  // 🇺🇸 FOURTH OF JULY
  else if (month === 7 && day >= 2 && day <= 5) {
    holidayClass = "holiday-july4";
    mascotFile = "july4mascot.png";
    styles = `
      body.holiday-july4 {
        background-color: #002868;
        color: white;
      }
      body.holiday-july4 .topnav,
      body.holiday-july4 .site-footer {
        background-color: #bf0a30;
        color: white !important;
      }
      body.holiday-july4 .accordion-toggle,
      body.holiday-july4 .clickable-section {
        background-color: #bf0a30 !important;
        color: white !important;
      }
      body.holiday-july4 .accordion-toggle:hover,
      body.holiday-july4 .clickable-section:hover {
        background-color: #ff405c !important;
      }
      body.holiday-july4 .accordion-content {
        background-color: #002868 !important;
        color: white !important;
      }
      body.holiday-july4 .accordion-content a {
        color: white !important;
      }
      body.holiday-july4 .accordion-content a:hover {
        background-color: #174aa2 !important;
      }
      body.holiday-july4 .site-footer *,
      body.holiday-july4 .footer-left p {
        color: white !important;
      }
    `;
  }

  // 💘 VALENTINE'S DAY
  else if (month === 2 && day >= 12 && day <= 15) {
    holidayClass = "holiday-valentines";
    mascotFile = "valmascot.png";
    styles = `
      body.holiday-valentines {
        background-color: #ffb6c1;
        color: #fff;
      }
      body.holiday-valentines .topnav,
      body.holiday-valentines .site-footer {
        background-color: #ff4d6d;
        color: white !important;
      }
      body.holiday-valentines .accordion-toggle,
      body.holiday-valentines .clickable-section {
        background-color: #ffb6c1 !important;
        color: white !important;
      }
      body.holiday-valentines .accordion-toggle:hover,
      body.holiday-valentines .clickable-section:hover {
        background-color: #ff7a8a !important;
      }
      body.holiday-valentines .accordion-content {
        background-color: #ff4d6d !important;
        color: white !important;
      }
      body.holiday-valentines .accordion-content a {
        color: white !important;
      }
      body.holiday-valentines .accordion-content a:hover {
        background-color: #ff7a8a !important;
      }
      body.holiday-valentines .site-footer *,
      body.holiday-valentines .footer-left p {
        color: white !important;
      }
    `;
  }

  // ✅ Apply Holiday
  if (holidayClass) {
    document.body.classList.add(holidayClass);
    const styleTag = document.createElement("style");
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    const mascot = document.getElementById("footer-mascot");
    if (mascot) mascot.src = "img/" + mascotFile;
  }
});
