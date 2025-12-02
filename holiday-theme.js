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
  footer.site-footer {
    position: relative;
    width: 100%;
    background-color: var(--theme-bg-color, #333);
    color: var(--theme-topnav-color, #f2f2f2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    font-size: 20px;
    box-sizing: border-box;
    z-index: 1000;
    margin-top: auto;
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

    // Apply holiday theme + mascot (REPLACEMENT - paste this over your current setHolidayTheme)
function setHolidayTheme() {
  const footer = ensureFooter();
  const mascotImg = footer.querySelector('#footer-mascot');

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  let holidayClass = '';
  let mascotFile = 'Mascot.png';

  // Theme color variables (defaults)
  let bgColor = '#fff';
  let textColor = '#000';
  let linkColor = '#000';
  let navBg = '#333';
  let navText = '#f2f2f2';
  let menuBg = '#333';
  let menuText = '#f2f2f2';
  let hoverBg = 'rgba(255,255,255,0.1)';
  let hoverText = '#fff';
  let mainBg = '#E82B38';
  let mainText = '#fff';
  let footerBg = '#333';
  let footerText = '#f2f2f2';

  if ((month === 12 && day >= 25) || (month === 12 && day <= 31)) {
    holidayClass = 'holiday-christmas';
    mascotFile = 'christmasmascot.png';
    bgColor = '#00A53C'; textColor = '#fff'; linkColor = '#fff';
    navBg = '#E82B38'; navText = '#fff';
    menuBg = '#00A53C'; menuText = '#fff';
    hoverBg = 'rgba(255,255,255,0.2)';
    mainBg = '#E82B38'; mainText = '#fff';
    footerBg = '#E82B38'; footerText = '#fff';
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
    // Add class to body for specificity if needed
    document.body.classList.add(holidayClass);

    // Inject CSS rules for themed elements (colors only - not layout)
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      body.${holidayClass} { color: ${textColor}; }
      body.${holidayClass} a { color: ${linkColor}; }
      body.${holidayClass} .topnav { background-color: ${navBg}; color: ${navText}; }
      body.${holidayClass} .topnav a.logo { color: ${navText}; }
      body.${holidayClass} .topnav .menu-icon { color: ${navText}; }
      body.${holidayClass} .topnav-right { background-color: ${menuBg}; color: ${menuText}; }
      body.${holidayClass} .accordion-toggle { background-color: ${menuBg}; color: ${menuText}; }
      body.${holidayClass} .accordion-toggle:hover,
      body.${holidayClass} .accordion-content a:hover { background-color: ${hoverBg}; color: ${hoverText}; }
      body.${holidayClass} .accordion-content a { background-color: ${menuBg}; color: ${menuText}; }
      body.${holidayClass} .clickable-section { background-color: ${mainBg}; color: ${mainText}; }
      body.${holidayClass} .clickable-section:hover { background-color: ${hoverBg}; color: ${hoverText}; }
      body.${holidayClass} .site-footer { background-color: ${footerBg}; color: ${footerText}; }
      body.${holidayClass} .site-footer a { color: ${footerText}; }
    `;
    document.head.appendChild(styleSheet);

    // Set root + body background explicitly (ensures html/background doesn't remain white)
    try {
      document.documentElement.style.backgroundColor = bgColor;
      document.body.style.backgroundColor = bgColor;
      document.body.style.color = textColor;
    } catch (e) {
      // ignore in environments where style setting fails
      console.warn('Could not set inline background color:', e);
    }

    // Update CSS variables used elsewhere so other components react
    document.body.style.setProperty('--theme-bg-color', navBg);
    document.body.style.setProperty('--theme-topnav-color', navText);
    document.body.style.setProperty('--theme-accent-color', mainBg);

    // Ensure footer uses fixed positioning to match quizzes stylesheet and prevent layout gaps
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.left = '0';
    footer.style.width = '100%';
    footer.style.height = '60px';
    footer.style.zIndex = '1000';
    footer.style.backgroundColor = footerBg;
    footer.style.color = footerText;

    // Prevent footer from covering quiz content: add bottom padding to main.content
    const mainContent = document.querySelector('main.content');
    if (mainContent) {
      // keep any existing padding, ensure at least 80px bottom padding
      const computed = window.getComputedStyle(mainContent);
      const existingPB = parseFloat(computed.paddingBottom) || 0;
      if (existingPB < 80) {
        mainContent.style.paddingBottom = (existingPB + 80) + 'px';
      }
    }

    // Swap mascot if available
    if (mascotImg) {
      mascotImg.src = `img/${mascotFile}`;
    }
  }
      }
document.addEventListener('DOMContentLoaded', setHolidayTheme);
