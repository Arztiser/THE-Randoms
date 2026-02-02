// =======================
// Footer Creation
// =======================
function ensureFooter() {
  let footer = document.querySelector(".site-footer");

  if (!footer) {
    footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="footer-left">
        <p>&copy; <span id="year"></span> THE Randoms</p>
      </div>
      <div class="footer-right">
        <a href="randuino.html" title="Randuino">
          <img id="footer-mascot" src="img/Mascot.png" alt="Randuino">
        </a>
      </div>
    `;
    document.body.appendChild(footer);
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  // Base footer styles (only once)
  if (!document.getElementById("base-footer-style")) {
    const style = document.createElement("style");
    style.id = "base-footer-style";
    style.textContent = `
      html, body {
        margin: 0;
        min-height: 100%;
      }

      body {
        display: flex;
        flex-direction: column;
        font-family: 'Jersey 10', sans-serif;
      }

      main, .container, .page-content {
        flex: 1 0 auto;
      }

      .site-footer {
        margin-top: auto;
        min-height: 60px;
        background: var(--theme-footer-bg, #333);
        color: var(--theme-footer-text, #f2f2f2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 20px;
        font-size: 20px;
      }

      #footer-mascot {
        height: 50px;
        cursor: pointer;
        transition: transform 0.2s ease;
      }

      #footer-mascot:hover {
        transform: scale(1.1) rotate(-5deg);
      }
    `;
    document.head.appendChild(style);
  }

  return footer;
}

// =======================
// Holiday Theme Engine
// =======================
function applyHolidayTheme() {
  const footer = ensureFooter();
  const mascot = footer.querySelector("#footer-mascot");

  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();

  let theme = {
    class: "",
    mascot: "Mascot.png",
    bgColor: "#fff",
    textColor: "#000",
    linkColor: "#000",
    navBg: "#333",
    navText: "#f2f2f2",
    menuBg: "#333",
    menuText: "#f2f2f2",
    hoverBg: "rgba(255,255,255,0.1)",
    hoverText: "#fff",
    mainBg: "#E82B38",
    mainText: "#fff",
    footerBg: "#333",
    footerText: "#f2f2f2"
  };

  // =======================
  // Holiday Overrides
  // =======================
  if ((m === 12 && d >= 25) || (m === 12 && d <= 31)) { // Christmas
    theme.class = "holiday-christmas";
    theme.mascot = "christmasmascot.png";
    theme.bgColor = "#00A53C";
    theme.textColor = "#ffffff";
    theme.linkColor = "#ffffff";
    theme.navBg = "#E82B38";
    theme.navText = "#ffffff";
    theme.menuBg = "#00A53C";
    theme.menuText = "#ffffff";
    theme.hoverBg = "rgba(255,255,255,0.2)";
    theme.mainBg = "#E82B38";
    theme.mainText = "#ffffff";
    theme.footerBg = "#E82B38";
    theme.footerText = "#ffffff";

  } else if (m === 10 && d >= 25 && d <= 31) { // Halloween
    theme.class = "holiday-halloween";
    theme.mascot = "halloweenmascot.png";
    theme.bgColor = "orange";
    theme.textColor = "black";
    theme.linkColor = "black";
    theme.navBg = "black";
    theme.navText = "white";
    theme.menuBg = "black";
    theme.menuText = "white";
    theme.hoverBg = "orange";
    theme.mainBg = "orange";
    theme.mainText = "black";
    theme.footerBg = "black";
    theme.footerText = "white";

  } else if (m === 3 && d === 17) { // St. Patrick's
    theme.class = "holiday-stpatricks";
    theme.mascot = "stpatricksmascot.png";
    theme.bgColor = "#009E60";
    theme.textColor = "#FFD700";
    theme.linkColor = "#FFD700";
    theme.navBg = "#008551";
    theme.navText = "#FFD700";
    theme.menuBg = "#009E60";
    theme.menuText = "#FFD700";
    theme.hoverBg = "#00A53C";
    theme.mainBg = "#008551";
    theme.mainText = "#FFD700";
    theme.footerBg = "#008551";
    theme.footerText = "#FFD700";

  } else if (m === 7 && d === 4) { // Fourth of July
    theme.class = "holiday-fourthofjuly";
    theme.mascot = "fourthofjulymascot.png";
    theme.bgColor = "#1F61C5";
    theme.textColor = "white";
    theme.linkColor = "#bf0a30";
    theme.navBg = "#E82B38";
    theme.navText = "#fff";
    theme.menuBg = "#1F61C5";
    theme.menuText = "#fff";
    theme.hoverBg = "#bf0a30";
    theme.mainBg = "#E82B38";
    theme.mainText = "#fff";
    theme.footerBg = "#E82B38";
    theme.footerText = "#fff";

  } else if (m === 2 && d === 14) { // Valentine's
    theme.class = "holiday-valentinesday";
    theme.mascot = "valentinesmascot.png";
    theme.bgColor = "#E3A8C6";
    theme.textColor = "white";
    theme.linkColor = "#E54551";
    theme.navBg = "#E82B38";
    theme.navText = "#fff";
    theme.menuBg = "#E3A8C6";
    theme.menuText = "#fff";
    theme.hoverBg = "#E54551";
    theme.mainBg = "#E82B38";
    theme.mainText = "#fff";
    theme.footerBg = "#E82B38";
    theme.footerText = "#fff";

  } else if (m === 3 && d === 10) { // Birthday
    theme.class = "holiday-birthday";
    theme.mascot = "birthdaymascot.png";
    theme.mainBg = "#F3E5AB";
    theme.mainText = "#F5E5D5";
    theme.navBg = "#ADCFE9";
    theme.navText = "#fff";
    theme.footerBg = "#ADCFE9";
    theme.footerText = "#fff";
    theme.menuBg = "#ADCFE9";
    theme.menuText = "#fff";
    theme.hoverBg = "#8CC4E0";
    theme.linkColor = "#E54551";

  } else if (m === 4 && d >= 1 && d <= 7) { // Easter
    theme.class = "holiday-easter";
    theme.mascot = "eastermascot.png";
    theme.bgColor = "#FFF0F5";
    theme.textColor = "#6A0DAD";
    theme.linkColor = "#6A0DAD";
    theme.navBg = "#FFD700";
    theme.navText = "#6A0DAD";
    theme.menuBg = "#FFF0F5";
    theme.menuText = "#6A0DAD";
    theme.hoverBg = "#FFC0CB";
    theme.mainBg = "#FFD700";
    theme.mainText = "#6A0DAD";
    theme.footerBg = "#FFD700";
    theme.footerText = "#6A0DAD";
  }

  // Apply theme
  if (theme.class) {
    document.body.classList.add(theme.class);

    const styleSheet = document.getElementById("holiday-style") || document.createElement("style");
    styleSheet.id = "holiday-style";
    styleSheet.textContent = `
      body.${theme.class} { color: ${theme.textColor}; }
      body.${theme.class} a { color: ${theme.linkColor}; }
      body.${theme.class} .topnav { background-color: ${theme.navBg}; color: ${theme.navText}; }
      body.${theme.class} .topnav a.logo { color: ${theme.navText}; }
      body.${theme.class} .topnav .menu-icon { color: ${theme.navText}; }
      body.${theme.class} .topnav-right { background-color: ${theme.menuBg}; color: ${theme.menuText}; }
      body.${theme.class} .accordion-toggle { background-color: ${theme.menuBg}; color: ${theme.menuText}; }
      body.${theme.class} .accordion-toggle:hover,
      body.${theme.class} .accordion-content a:hover { background-color: ${theme.hoverBg}; color: ${theme.hoverText}; }
      body.${theme.class} .accordion-content a { background-color: ${theme.menuBg}; color: ${theme.menuText}; }
      body.${theme.class} .clickable-section { background-color: ${theme.mainBg}; color: ${theme.mainText}; }
      body.${theme.class} .site-footer { background-color: ${theme.footerBg}; color: ${theme.footerText}; }
      body.${theme.class} .site-footer a { color: ${theme.footerText}; }
    `;
    if (!document.head.contains(styleSheet)) document.head.appendChild(styleSheet);

    if (mascot) mascot.src = `img/${theme.mascot}`;
  }
}

// =======================
// Dark Mode (System-Based)
// =======================
function initDarkMode() {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  let style = document.getElementById("dark-mode-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "dark-mode-style";
    document.head.appendChild(style);
  }

  // Entire dark mode CSS as ONE string
  style.textContent = `
    html.dark-mode body {
      background: #121212 !important;
      color: #e5e5e5 !important;
    }
    html.dark-mode a { color: #ffffff !important; }

    html.dark-mode .topnav,
    html.dark-mode .site-footer { background: #e82b38 !important; color: #fff !important; }
    html.dark-mode .topnav a,
    html.dark-mode .site-footer a { color: #fff !important; }

    /* Accordion Fix */
    html.dark-mode .accordion-toggle {
      background-color: #121212 !important;
      color: #fff !important;
    }
    html.dark-mode .accordion-toggle:hover {
      background-color: #333333 !important;
    }
    html.dark-mode .accordion-content {
      background-color: #1a1a1a !important;
    }
    html.dark-mode .accordion-content a {
      color: #ffffff !important;
      background-color: transparent !important;
    }
    html.dark-mode .accordion-content a:hover {
      background-color: #333333 !important;
      color: #fff !important;
    }
  `;

  function apply(e) {
    document.documentElement.classList.toggle("dark-mode", e.matches);
  }

  apply(query);
  query.addEventListener("change", apply);
}

// =======================
// Daily Home Splash
// =======================
function showDailySplash() {
  if (!location.pathname.endsWith("/") && !location.pathname.endsWith("index.html")) return;

  const today = new Date().toLocaleDateString();
  if (localStorage.getItem("lastSplashDate") === today) return;
  localStorage.setItem("lastSplashDate", today);

  const splash = document.createElement("div");
  splash.style.cssText = `
    position: fixed; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg,#E82B38,#731919);
    z-index: 9999; transition: opacity 3s ease;
  `;

  const logo = document.createElement("img");
  logo.src = "img/pofp.png";
  logo.style.width = "150px";
  logo.style.borderRadius = "50%";

  splash.appendChild(logo);
  document.body.appendChild(splash);

  setTimeout(() => splash.style.opacity = "0", 500);
  setTimeout(() => splash.remove(), 3500);
}

// =======================
// INIT
// =======================
document.addEventListener("DOMContentLoaded", () => {
  ensureFooter();
  applyHolidayTheme();
  initDarkMode();
  showDailySplash();
});
