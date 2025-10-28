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
        display: flex;
        flex-direction: column;
      }
      body > .container {
        flex: 1;
      }
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

// Apply holiday theme + mascot
function setHolidayTheme() {
  const footer = ensureFooter();
  const mascotImg = footer.querySelector('#footer-mascot');

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  let holidayClass = '';
  let styles = '';
  let mascotFile = 'Mascot.png'; // default mascot

  // 🎄 Christmas
  if ((month === 12 && day >= 25) || (month === 12 && day <= 31)) {
    holidayClass = 'holiday-christmas';
    mascotFile = 'christmasmascot.png';
    styles = `
      body.holiday-christmas { background-color: #00A53C; color: white; }
      body.holiday-christmas a { color: #ffffff; }
      body.holiday-christmas .topnav,
      body.holiday-christmas .site-footer,
      body.holiday-christmas .accordion-toggle,
      body.holiday-christmas .accordion-content a,
      body.holiday-christmas .clickable-section { background-color: #E82B38; color: white; }
      body.holiday-christmas .accordion-toggle:hover,
      body.holiday-christmas .accordion-content a:hover,
      body.holiday-christmas .clickable-section:hover { background-color: #ff4f60; color: white; }
    `;
  }
  // 🎃 Halloween
  else if (month === 10 && day >= 25 && day <= 31) {
    holidayClass = 'holiday-halloween';
    mascotFile = 'halloweenmascot.png';
    styles = `
      body.holiday-halloween { background-color: orange; color: black; }
      body.holiday-halloween a { color: black; }
      body.holiday-halloween .topnav,
      body.holiday-halloween .site-footer,
      body.holiday-halloween .accordion-toggle,
      body.holiday-halloween .accordion-content a,
      body.holiday-halloween .clickable-section { background-color: black; color: white; }
      body.holiday-halloween .accordion-toggle:hover,
      body.holiday-halloween .accordion-content a:hover,
      body.holiday-halloween .clickable-section:hover { background-color: orange; color: black; }
    `;
  }
  // ☘️ St. Patrick's Day
  else if (month === 3 && day === 17) {
    holidayClass = 'holiday-stpatricks';
    mascotFile = 'stpatricksmascot.png';
    styles = `
      body.holiday-stpatricks { background-color: #009E60; color: #FFD700; }
      body.holiday-stpatricks a { color: #FFD700; }
      body.holiday-stpatricks .topnav,
      body.holiday-stpatricks .site-footer,
      body.holiday-stpatricks .accordion-toggle,
      body.holiday-stpatricks .accordion-content a,
      body.holiday-stpatricks .clickable-section { background-color: #008551; color: #FFD700; }
      body.holiday-stpatricks .accordion-toggle:hover,
      body.holiday-stpatricks .accordion-content a:hover,
      body.holiday-stpatricks .clickable-section:hover { background-color: #00b272; color: #FFD700; }
    `;
  }
  // 🐰 Easter (Mar 20 – Apr 5)
  else if ((month === 3 && day >= 20) || (month === 4 && day <= 5)) {
    holidayClass = 'holiday-easter';
    mascotFile = 'eastermascot.png';
    styles = `
      body.holiday-easter { background-color: #fff8f2; color: #333; }
      body.holiday-easter a { color: #333; }
      body.holiday-easter .topnav,
      body.holiday-easter .site-footer,
      body.holiday-easter .accordion-toggle,
      body.holiday-easter .accordion-content a,
      body.holiday-easter .clickable-section { background-color: #ff80ab; color: #333; }
      body.holiday-easter .accordion-toggle:hover,
      body.holiday-easter .accordion-content a:hover,
      body.holiday-easter .clickable-section:hover { background-color: #ffb6c1; color: #333; }
    `;
  }
  // 🇺🇸 Fourth of July
  else if (month === 7 && day === 4) {
    holidayClass = 'holiday-fourthofjuly';
    mascotFile = 'fourthofjulymascot.png';
    styles = `
      body.holiday-fourthofjuly { background-color: #1F61C5; color: white; }
      body.holiday-fourthofjuly a { color: #bf0a30; }
      body.holiday-fourthofjuly .topnav,
      body.holiday-fourthofjuly .site-footer,
      body.holiday-fourthofjuly .accordion-toggle,
      body.holiday-fourthofjuly .accordion-content a,
      body.holiday-fourthofjuly .clickable-section { background-color: #E82B38; color: white; }
      body.holiday-fourthofjuly .accordion-toggle:hover,
      body.holiday-fourthofjuly .accordion-content a:hover,
      body.holiday-fourthofjuly .clickable-section:hover { background-color: #bf0a30; color: white; }
    `;
  }
  // 💘 Valentine's Day
  else if (month === 2 && day === 14) {
    holidayClass = 'holiday-valentinesday';
    mascotFile = 'valentinesmascot.png';
    styles = `
      body.holiday-valentinesday { background-color: #E3A8C6; color: white; }
      body.holiday-valentinesday a { color: #E54551; }
      body.holiday-valentinesday .topnav,
      body.holiday-valentinesday .site-footer,
      body.holiday-valentinesday .accordion-toggle,
      body.holiday-valentinesday .accordion-content a,
      body.holiday-valentinesday .clickable-section { background-color: #E82B38; color: white; }
      body.holiday-valentinesday .accordion-toggle:hover,
      body.holiday-valentinesday .accordion-content a:hover,
      body.holiday-valentinesday .clickable-section:hover { background-color: #ff7a8a; color: white; }
    `;
  }

  // Apply the holiday styles
  if (holidayClass) {
    document.body.classList.add(holidayClass);

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Swap mascot
    mascotImg.src = `img/${mascotFile}`;
  }
}

document.addEventListener('DOMContentLoaded', setHolidayTheme);
