// holiday-theme.js
document.addEventListener('DOMContentLoaded', () => {

  // -------------------------
  // Ensure footer exists
  // -------------------------
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
      document.getElementById('year').textContent = new Date().getFullYear();
      
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

  const footer = ensureFooter();
  const mascotImg = footer.querySelector('#footer-mascot');

  // -------------------------
  // Determine holiday
  // -------------------------
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  let holidayClass = '';
  let mascotFile = 'Mascot.png';
  let themeVars = {
    '--theme-bg-color': '#333',
    '--theme-topnav-color': '#f2f2f2',
    '--theme-accent-color': '#E82B38'
  };

  // 🎄 Christmas
  if ((month === 12 && day >= 25) || (month === 12 && day <= 31)) {
    holidayClass = 'holiday-christmas';
    mascotFile = 'christmasmascot.png';
    themeVars = {
      '--theme-bg-color': '#E82B38',
      '--theme-topnav-color': '#fff',
      '--theme-accent-color': '#ff4f60'
    };
  }
  // 🎃 Halloween
  else if (month === 10 && day >= 25 && day <= 31) {
    holidayClass = 'holiday-halloween';
    mascotFile = 'halloweenmascot.png';
    themeVars = {
      '--theme-bg-color': 'black',
      '--theme-topnav-color': 'white',
      '--theme-accent-color': 'orange'
    };
  }
  // ☘️ St. Patrick's Day
  else if (month === 3 && day === 17) {
    holidayClass = 'holiday-stpatricks';
    mascotFile = 'stpatricksmascot.png';
    themeVars = {
      '--theme-bg-color': '#008551',
      '--theme-topnav-color': '#FFD700',
      '--theme-accent-color': '#00b272'
    };
  }
  // 🐰 Easter (Mar 20 – Apr 5)
  else if ((month === 3 && day >= 20) || (month === 4 && day <= 5)) {
    holidayClass = 'holiday-easter';
    mascotFile = 'eastermascot.png';
    themeVars = {
      '--theme-bg-color': '#fff8f2',
      '--theme-topnav-color': '#333',
      '--theme-accent-color': '#ff80ab'
    };
  }
  // 🇺🇸 Fourth of July
  else if (month === 7 && day === 4) {
    holidayClass = 'holiday-fourthofjuly';
    mascotFile = 'fourthofjulymascot.png';
    themeVars = {
      '--theme-bg-color': '#1F61C5',
      '--theme-topnav-color': 'white',
      '--theme-accent-color': '#E82B38'
    };
  }
  // 💘 Valentine's Day
  else if (month === 2 && day === 14) {
    holidayClass = 'holiday-valentinesday';
    mascotFile = 'valentinesmascot.png';
    themeVars = {
      '--theme-bg-color': '#E82B38',
      '--theme-topnav-color': 'white',
      '--theme-accent-color': '#ff7a8a'
    };
  }

  // -------------------------
  // Apply theme
  // -------------------------
  if (holidayClass) {
    // Add class to body
    document.body.classList.add(holidayClass);

    // Apply CSS variables globally
    Object.keys(themeVars).forEach(key => {
      document.body.style.setProperty(key, themeVars[key]);
    });

    // Update mascot
    if (mascotImg) mascotImg.src = `img/${mascotFile}`;
  }

});
