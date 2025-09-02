// holiday-theme.js

function setHolidayTheme() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1–12
  const day = now.getDate();

  let holidayClass = '';
  let styles = '';
  let topnavBg = '';
  let topnavColor = '';

  if ((month === 12 && day >= 1) || (month === 1 && day <= 5)) {
    // Christmas
    holidayClass = 'holiday-christmas';
    topnavBg = '#E82B38';
    topnavColor = 'white';
    styles = `
      body.holiday-christmas { background-color: #00A53C; color: white; }
      body.holiday-christmas a { color: white; }
    `;
  } else if (month === 10 && day >= 25 && day <= 31) {
    // Halloween
    holidayClass = 'holiday-halloween';
    topnavBg = 'black';
    topnavColor = 'white';
    styles = `
      body.holiday-halloween { background-color: orange; color: black; }
      body.holiday-halloween a { color: black; }
    `;
  } else if (month === 4 && day >= 1 && day <= 10) {
    // Easter
    holidayClass = 'holiday-easter';
    topnavBg = '#6BE2F9';
    topnavColor = '#acfda2';
    styles = `
      body.holiday-easter { background-color: #fff8dc; color: #6b4c9a; }
      body.holiday-easter a { color: #9b59b6; }
    `;
  } else if (month === 3 && day === 17) {
    // St. Patrick's Day
    holidayClass = 'holiday-stpatricks';
    topnavBg = '#008551';
    topnavColor = '#FFD700';
    styles = `
      body.holiday-stpatricks { background-color: #009E60; color: #FFD700; }
      body.holiday-stpatricks a { color: #FFD700; }
    `;
  } else if (month === 7 && day === 4) {
    // 4th of July
    holidayClass = 'holiday-fourthofjuly';
    topnavBg = '#E82B38';
    topnavColor = 'white';
    styles = `
      body.holiday-fourthofjuly { background-color: #1F61C5; color: white; }
      body.holiday-fourthofjuly a { color: #bf0a30; }
    `;
  } else if (month === 2 && day === 14) {
    // Valentine's Day
    holidayClass = 'holiday-valentinesday';
    topnavBg = '#E82B38';
    topnavColor = 'white';
    styles = `
      body.holiday-valentinesday { background-color: #E3A8C6; color: white; }
      body.holiday-valentinesday a { color: #E54551; }
    `;
  }

  if (holidayClass) {
    document.body.classList.add(holidayClass);

    // Inject the CSS dynamically
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Update topnav
    const topnav = document.querySelector('.topnav');
    if (topnav) {
      topnav.style.backgroundColor = topnavBg;
      topnav.style.color = topnavColor;
      topnav.querySelectorAll('a').forEach(a => a.style.color = topnavColor);
    }

    // Update footer to match topnav
    const footer = document.querySelector('.site-footer');
    if (footer) {
      footer.style.backgroundColor = topnavBg;
      footer.style.color = topnavColor;
      footer.querySelectorAll('a').forEach(a => a.style.color = topnavColor);
    }
  }
}

document.addEventListener('DOMContentLoaded', setHolidayTheme);
