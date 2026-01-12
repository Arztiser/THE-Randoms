// Ensure footer exists
function ensureFooter() {
  let footer = document.querySelector('.site-footer');

  if (!footer) {
    footer = document.createElement('footer');
    footer.className = 'site-footer';
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

    // Base footer + layout CSS
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        height: 100%;
        margin: 0;
      }

      body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        font-family: 'Jersey 10', sans-serif;
      }

      main.content, .container, .page-content {
        flex: 1 0 auto;
        box-sizing: border-box;
      }

      footer.site-footer {
        position: relative;
        margin-top: auto;
        width: 100%;
        min-height: 60px;
        background-color: var(--theme-bg-color, #333);
        color: var(--theme-topnav-color, #f2f2f2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 20px;
        font-size: 20px;
        z-index: 1000;
        overflow: visible;
      }

      #footer-mascot {
        height: 50px;
        max-height: 100%;
        object-fit: contain;
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

// Apply holiday theme + mascot
function setHolidayTheme() {
  const footer = ensureFooter();
  const mascotImg = footer.querySelector('#footer-mascot');

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  let holidayClass = '';
  let mascotFile = 'Mascot.png';

  // Theme defaults
  let bgColor = '#fff', textColor = '#000', linkColor = '#000';
  let navBg = '#333', navText = '#f2f2f2';
  let menuBg = '#333', menuText = '#f2f2f2';
  let hoverBg = 'rgba(255,255,255,0.1)', hoverText = '#fff';
  let mainBg = '#E82B38', mainText = '#fff';
  let footerBg = '#333', footerText = '#f2f2f2';

  // Holiday checks
  if ((month === 12 && day >= 25) || (month === 12 && day <= 31)) {
    holidayClass = 'holiday-christmas';
    mascotFile = 'christmasmascot.png';
    bgColor = '#00A53C'; textColor = '#ffffff'; linkColor = '#ffffff';
    navBg = '#E82B38'; navText = '#ffffff';
    menuBg = '#00A53C'; menuText = '#ffffff';
    hoverBg = 'rgba(255,255,255,0.2)';
    mainBg = '#E82B38'; mainText = '#ffffff';
    footerBg = '#E82B38'; footerText = '#ffffff';

  } else if (month === 10 && day >= 25 && day <= 31) {
    holidayClass = 'holiday-halloween';
    mascotFile = 'halloweenmascot.png';
    bgColor = 'orange'; textColor = 'black'; linkColor = 'black';
    navBg = 'black'; navText = 'white';
    menuBg = 'black'; menuText = 'white';
    hoverBg = 'orange';
    mainBg = 'orange'; mainText = 'black';
    footerBg = 'black'; footerText = 'white';

  } else if (month === 3 && day === 17) {
    holidayClass = 'holiday-stpatricks';
    mascotFile = 'stpatricksmascot.png';
    bgColor = '#009E60'; textColor = '#FFD700'; linkColor = '#FFD700';
    navBg = '#008551'; navText = '#FFD700';
    menuBg = '#009E60'; menuText = '#FFD700';
    hoverBg = '#00A53C';
    mainBg = '#008551'; mainText = '#FFD700';
    footerBg = '#008551'; footerText = '#FFD700';

  } else if (month === 7 && day === 4) {
    holidayClass = 'holiday-fourthofjuly';
    mascotFile = 'fourthofjulymascot.png';
    bgColor = '#1F61C5'; textColor = 'white'; linkColor = '#bf0a30';
    navBg = '#E82B38'; navText = '#fff';
    menuBg = '#1F61C5'; menuText = '#fff';
    hoverBg = '#bf0a30';
    mainBg = '#E82B38'; mainText = '#fff';
    footerBg = '#E82B38'; footerText = '#fff';

  } else if (month === 2 && day === 14) {
    holidayClass = 'holiday-valentinesday';
    mascotFile = 'valentinesmascot.png';
    bgColor = '#E3A8C6'; textColor = 'white'; linkColor = '#E54551';
    navBg = '#E82B38'; navText = '#fff';
    menuBg = '#E3A8C6'; menuText = '#fff';
    hoverBg = '#E54551';
    mainBg = '#E82B38'; mainText = '#fff';
    footerBg = '#E82B38'; footerText = '#fff';

  } else if (month === 3 && day === 10) {
    holidayClass = 'holiday-birthday';
    mascotFile = 'birthdaymascot.png';
    mainBg = '#F3E5AB';
    mainText = '#F5E5D5';
    navBg = '#ADCFE9';
    navText = '#fff';
    footerBg = '#ADCFE9';
    footerText = '#fff';
    menuBg = '#ADCFE9';
    menuText = '#fff';
    hoverBg = '#8CC4E0';
    linkColor = '#E54551';
    hoverLink = '#FF6F61';
   
  } else if (month === 4 && day >= 1 && day <= 7) {
    holidayClass = 'holiday-easter';
    mascotFile = 'eastermascot.png';
    bgColor = '#FFF0F5'; textColor = '#6A0DAD'; linkColor = '#6A0DAD';
    navBg = '#FFD700'; navText = '#6A0DAD';
    menuBg = '#FFF0F5'; menuText = '#6A0DAD';
    hoverBg = '#FFC0CB';
    mainBg = '#FFD700'; mainText = '#6A0DAD';
    footerBg = '#FFD700'; footerText = '#6A0DAD';
  }

  if (holidayClass) {
    document.body.classList.add(holidayClass);

    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
      body.${holidayClass} { color: ${textColor}; }
      body.${holidayClass} a { color: ${linkColor}; }
      body.${holidayClass} .topnav { background-color: ${navBg}; color: ${navText}; }
      body.${holidayClass} .topnav a.logo { color: ${navText}; }
      body.${holidayClass} .topnav .menu-icon { color: ${navText}; }
      body.${holidayClass} .topnav-right { background-color: ${menuBg}; color: ${menuText}; }
      body.${holidayClass} .accordion-toggle { background-color: ${menuBg}; color: ${menuText}; }
      body.${holidayClass} .accordion-toggle:hover,
      body.${holidayClass} .accordion-content a:hover {
        background-color: ${hoverBg};
        color: ${hoverText};
      }
      body.${holidayClass} .accordion-content a {
        background-color: ${menuBg};
        color: ${menuText};
      }
      body.${holidayClass} .clickable-section {
        background-color: ${mainBg};
        color: ${mainText};
      }
      body.${holidayClass} .site-footer {
        background-color: ${footerBg};
        color: ${footerText};
      }
      body.${holidayClass} .site-footer a {
        color: ${footerText};
      }
    `;
    document.head.appendChild(styleSheet);

    document.documentElement.style.backgroundColor = bgColor;
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;

    document.body.style.setProperty('--theme-bg-color', navBg);
    document.body.style.setProperty('--theme-topnav-color', navText);
    document.body.style.setProperty('--theme-accent-color', mainBg);

    if (mascotImg) {
      mascotImg.src = `img/${mascotFile}`;
    }
  }
}

document.addEventListener('DOMContentLoaded', setHolidayTheme);

// Daily home page splash screen
(function() {
  if (!window.location.pathname.endsWith("/") && !window.location.pathname.endsWith("index.html")) return;

  const today = new Date().toISOString().split("T")[0];
  const lastSplash = localStorage.getItem("lastSplashDate");
  if (lastSplash === today) return; // Already seen today

  localStorage.setItem("lastSplashDate", today);

  // Create splash element
  const splash = document.createElement("div");
  splash.id = "daily-splash";
  splash.style.position = "fixed";
  splash.style.inset = "0";
  splash.style.background = "linear-gradient(135deg, #E82B38, #FF5E57)";
  splash.style.display = "flex";
  splash.style.alignItems = "center";
  splash.style.justifyContent = "center";
  splash.style.zIndex = "9999";
  splash.style.opacity = "1";
  splash.style.transition = "opacity 0.5s ease";

  // Add circular logo
  const logo = document.createElement("img");
  logo.src = "img/pofp-circle.png"; // Replace with your circle logo
  logo.alt = "THE Randoms Logo";
  logo.style.width = "150px";
  logo.style.borderRadius = "50%";
  splash.appendChild(logo);

  document.body.appendChild(splash);

  // Start fade after 500ms
  setTimeout(() => {
    splash.style.opacity = "0";
  }, 500);

  // Remove splash after 5900ms
  setTimeout(() => {
    splash.remove();
  }, 5900);
})();
