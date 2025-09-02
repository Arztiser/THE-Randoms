// holiday-theme.js

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
        <a href="randuino.html" title="Meet Randuino!">
          <img id="footer-mascot" src="img/Mascot.png" alt="Randuino">
        </a>
      </div>
    `;
    document.body.appendChild(footer);
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  // Footer styling to behave correctly on all screens
  footer.style.position = 'relative'; // not fixed
  footer.style.width = '100%';
  footer.style.bottom = '0';
  footer.style.flexShrink = '0'; // prevent shrinking
  return footer;
}

function setHolidayTheme() {
  // Flex layout for body to push footer to bottom
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
  document.body.style.minHeight = '100vh';

  const main = document.querySelector('main.content');
  if (main) {
    main.style.flex = '1';
    main.style.display = 'flex';
    main.style.flexDirection = 'column';
    main.style.alignItems = 'center';
  }

  const footer = ensureFooter();

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  let holidayClass = '';
  let styles = '';

  if ((month === 12 && day >= 1) || (month === 1 && day <= 5)) {
    holidayClass = 'holiday-christmas';
    styles = `
      body.holiday-christmas { background-color: #00A53C; color: white; }
      body.holiday-christmas a { color: #ffffff; }
      body.holiday-christmas .topnav,
      body.holiday-christmas .site-footer { background-color: #E82B38; }
      body.holiday-christmas .topnav a,
      body.holiday-christmas .site-footer { color: white; }
    `;
  } else if (month === 10 && day >= 25 && day <= 31) {
    holidayClass = 'holiday-halloween';
    styles = `
      body.holiday-halloween { background-color: orange; color: black; }
      body.holiday-halloween a { color: black; }
      body.holiday-halloween .topnav,
      body.holiday-halloween .site-footer { background-color: black; }
      body.holiday-halloween .topnav a,
      body.holiday-halloween .site-footer { color: white; }
    `;
  } else if (month === 4 && day >= 1 && day <= 10) {
    holidayClass = 'holiday-easter';
    styles = `
      body.holiday-easter { background-color: #fff8dc; color: #6b4c9a; }
      body.holiday-easter a { color: #9b59b6; }
      body.holiday-easter .topnav,
      body.holiday-easter .site-footer { background-color: #6BE2F9; }
      body.holiday-easter .topnav a,
      body.holiday-easter .site-footer { color: #acfda2; }
    `;
  } else if (month === 3 && day === 17) {
    holidayClass = 'holiday-stpatricks';
    styles = `
      body.holiday-stpatricks { background-color: #009E60; color: #FFD700; }
      body.holiday-stpatricks a { color: #FFD700; }
      body.holiday-stpatricks .topnav,
      body.holiday-stpatricks .site-footer { background-color: #008551; }
      body.holiday-stpatricks .topnav a,
      body.holiday-stpatricks .site-footer { color: #FFD700; }
    `;
  } else if (month === 7 && day === 4) {
    holidayClass = 'holiday-fourthofjuly';
    styles = `
      body.holiday-fourthofjuly { background-color: #1F61C5; color: white; }
      body.holiday-fourthofjuly a { color: #bf0a30; }
      body.holiday-fourthofjuly .topnav,
      body.holiday-fourthofjuly .site-footer { background-color: #E82B38; }
      body.holiday-fourthofjuly .topnav a,
      body.holiday-fourthofjuly .site-footer { color: white; }
    `;
  } else if (month === 2 && day === 14) {
    holidayClass = 'holiday-valentinesday';
    styles = `
      body.holiday-valentinesday { background-color: #E3A8C6; color: white; }
      body.holiday-valentinesday a { color: #E54551; }
      body.holiday-valentinesday .topnav,
      body.holiday-valentinesday .site-footer { background-color: #E82B38; }
      body.holiday-valentinesday .topnav a,
      body.holiday-valentinesday .site-footer { color: white; }
    `;
  }

  if (holidayClass) {
    document.body.classList.add(holidayClass);

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }
}

document.addEventListener('DOMContentLoaded', setHolidayTheme);
