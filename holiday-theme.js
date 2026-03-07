// ==========================================
// 1. Pre-Paint Theme Fix (NO FLASH)
// ==========================================
(function () {
  try {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.style.backgroundColor = "#121212";
    } else {
      document.documentElement.style.backgroundColor = "#ffffff";
    }
  } catch (e) {}
})();

// ==========================================
// 2. Footer Creation & Sticky Layout Logic
// ==========================================
function ensureFooter() {
  let footer = document.querySelector(".site-footer");
  
  // Create Footer if it doesn't exist
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

  // Wrap content (Sticky Footer Pattern)
  let wrapper = document.querySelector(".randoms-wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "randoms-wrapper";

    // Move all body children into wrapper EXCEPT footer and scripts
    const children = Array.from(document.body.children);
    children.forEach(el => {
      if (el !== footer && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
        wrapper.appendChild(el);
      }
    });
    document.body.insertBefore(wrapper, footer);
  }

  // Global Layout Styles (Fixes scrolling issues)
  if (!document.getElementById("randoms-footer-style")) {
    const style = document.createElement("style");
    style.id = "randoms-footer-style";
    style.textContent = `
      * { box-sizing: border-box; } /* Prevents padding from causing overflow */

      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow-x: hidden; /* Stops horizontal scroll */
        font-family: 'Jersey 10', sans-serif;
      }

      body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .randoms-wrapper {
        flex: 1 0 auto; /* Pushes footer to bottom */
        width: 100%;
      }

      .site-footer {
        flex-shrink: 0; /* Ensures footer doesn't squash */
        width: 100%;
        background: var(--theme-footer-bg, #333);
        color: var(--theme-footer-text, #f2f2f2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        font-size: 20px;
        z-index: 10;
      }

      .footer-left p { margin: 0; }
      #footer-mascot {
        height: 50px;
        display: block;
        transition: transform 0.2s ease;
      }
      #footer-mascot:hover { transform: scale(1.1) rotate(-5deg); }
    `;
    document.head.appendChild(style);
  }
  return footer;
}

// ==========================================
// 3. Holiday Theme Engine
// ==========================================
function applyHolidayTheme() {
  const footer = ensureFooter();
  const mascot = footer.querySelector("#footer-mascot");
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();

  let theme = {
    class: "", mascot: "Mascot.png", bgColor: "#fff", textColor: "#000",
    linkColor: "#000", navBg: "#333", navText: "#f2f2f2", menuBg: "#333",
    menuText: "#f2f2f2", hoverBg: "rgba(255,255,255,0.1)", hoverText: "#fff",
    mainBg: "#E82B38", mainText: "#fff", footerBg: "#333", footerText: "#f2f2f2"
  };

  // Holiday Logic
  if ((m === 12 && d >= 25) || (m === 12 && d <= 31)) { // Christmas
    theme = {...theme, class: "holiday-christmas", mascot: "christmasmascot.png", bgColor: "#00A53C", textColor: "#fff", linkColor: "#fff", navBg: "#E82B38", navText: "#fff", menuBg: "#00A53C", menuText: "#fff", hoverBg: "rgba(255,255,255,0.2)", mainBg: "#E82B38", mainText: "#fff", footerBg: "#E82B38", footerText: "#fff"};
  } else if (m === 10 && d >= 25 && d <= 31) { // Halloween
    theme = {...theme, class: "holiday-halloween", mascot: "halloweenmascot.png", bgColor: "orange", textColor: "black", linkColor: "black", navBg: "black", navText: "white", menuBg: "black", menuText: "white", hoverBg: "orange", mainBg: "orange", mainText: "black", footerBg: "black", footerText: "white"};
  } else if (m === 3 && d === 17) { // St. Patricks
    theme = {...theme, class: "holiday-stpatricks", mascot: "stpatricksmascot.png", bgColor: "#009E60", textColor: "#FFD700", linkColor: "#FFD700", navBg: "#008551", navText: "#FFD700", menuBg: "#009E60", menuText: "#FFD700", hoverBg: "#00A53C", mainBg: "#008551", mainText: "#FFD700", footerBg: "#008551", footerText: "#FFD700"};
  } else if (m === 7 && d === 4) { // 4th of July
    theme = {...theme, class: "holiday-fourthofjuly", mascot: "fourthofjulymascot.png", bgColor: "#1F61C5", textColor: "white", linkColor: "#bf0a30", navBg: "#E82B38", navText: "#fff", menuBg: "#1F61C5", menuText: "#fff", hoverBg: "#bf0a30", mainBg: "#E82B38", mainText: "#fff", footerBg: "#E82B38", footerText: "#fff"};
  } else if (m === 2 && d === 14) { // Valentines
    theme = {...theme, class: "holiday-valentinesday", mascot: "valentinesmascot.png", bgColor: "#E3A8C6", textColor: "white", linkColor: "#E54551", navBg: "#E82B38", navText: "#fff", menuBg: "#E3A8C6", menuText: "#fff", hoverBg: "#E54551", mainBg: "#E82B38", mainText: "#fff", footerBg: "#E82B38", footerText: "#fff"};
  } else if (m === 3 && d === 10) { // Birthday
    theme = {...theme, class: "holiday-birthday", mascot: "birthdaymascot.png", mainBg: "#F3E5AB", mainText: "#F5E5D5", navBg: "#ADCFE9", navText: "#fff", footerBg: "#ADCFE9", footerText: "#fff", menuBg: "#ADCFE9", menuText: "#fff", hoverBg: "#8CC4E0", linkColor: "#E54551"};
  } else if (m === 4 && d >= 1 && d <= 7) { // Easter
    theme = {...theme, class: "holiday-easter", mascot: "eastermascot.png", bgColor: "#FFF0F5", textColor: "#6A0DAD", linkColor: "#6A0DAD", navBg: "#FFD700", navText: "#6A0DAD", menuBg: "#FFF0F5", menuText: "#6A0DAD", hoverBg: "#FFC0CB", mainBg: "#FFD700", mainText: "#6A0DAD", footerBg: "#FFD700", footerText: "#6A0DAD"};
  }

  if (theme.class) {
    document.body.classList.add(theme.class);
    const styleSheet = document.getElementById("holiday-style") || document.createElement("style");
    styleSheet.id = "holiday-style";
    styleSheet.textContent = `
      body.${theme.class} { color: ${theme.textColor}; }
      body.${theme.class} a { color: ${theme.linkColor}; }
      body.${theme.class} .topnav { background-color: ${theme.navBg}; color: ${theme.navText}; }
      body.${theme.class} .topnav-right { background-color: ${theme.menuBg}; }
      body.${theme.class} .clickable-section { background-color: ${theme.mainBg}; color: ${theme.mainText}; }
      body.${theme.class} .site-footer { background-color: ${theme.footerBg}; color: ${theme.footerText}; }
    `;
    document.head.appendChild(styleSheet);
    if (mascot) mascot.src = `img/${theme.mascot}`;
  }
}

// ==========================================
// 4. Dark Mode & Daily Splash
// ==========================================
function initDarkMode() {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  let style = document.getElementById("dark-mode-style") || document.createElement("style");
  style.id = "dark-mode-style";
  document.head.appendChild(style);

  style.textContent = `
    html.dark-mode body { background: #121212 !important; color: #e5e5e5 !important; }
    html.dark-mode .topnav, html.dark-mode .site-footer { background: #e82b38 !important; color: #fff !important; }
    html.dark-mode .accordion-toggle { background-color: #121212 !important; color: #fff !important; }
    html.dark-mode .topnav-right, html.dark-mode .accordion-content { background-color: #121212 !important; }
  `;

  const apply = (e) => document.documentElement.classList.toggle("dark-mode", e.matches);
  apply(query);
  query.addEventListener("change", apply);
}

function showDailySplash() {
  if (!location.pathname.endsWith("/") && !location.pathname.endsWith("index.html")) return;
  const today = new Date().toLocaleDateString();
  if (localStorage.getItem("lastSplashDate") === today) return;
  localStorage.setItem("lastSplashDate", today);

  const splash = document.createElement("div");
  splash.style.cssText = `position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg,#E82B38,#731919); z-index: 9999; transition: opacity 2s ease;`;
  const logo = document.createElement("img");
  logo.src = "img/pofp.png";
  logo.style.width = "150px";
  logo.style.borderRadius = "50%";
  splash.appendChild(logo);
  document.body.appendChild(splash);

  setTimeout(() => splash.style.opacity = "0", 1000);
  setTimeout(() => splash.remove(), 3000);
}

// ==========================================
// 5. Initialize
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  ensureFooter();
  applyHolidayTheme();
  initDarkMode();
  showDailySplash();
});
