(() => {
  if (!document.querySelector('.topnav')) return; // Only run if topnav exists
  const body = document.body;
  const topnav = document.querySelector('.topnav');

  // Inject dark mode CSS
  const style = document.createElement('style');
  style.textContent = `
    body.dark-mode {
      background-color: #111;
      color: #f2f2f2;
    }
    body.dark-mode .topnav {
      background-color: #222;
      color: #f2f2f2;
    }
    body.dark-mode .topnav a,
    body.dark-mode .accordion-toggle,
    body.dark-mode .accordion-content a {
      color: #f2f2f2;
    }
  `;
  document.head.appendChild(style);

  // Create toggle container
  const toggle = document.createElement('div');
  toggle.style.cursor = 'pointer';
  toggle.style.fontSize = '24px';
  toggle.style.marginLeft = 'auto';
  toggle.style.display = 'flex';
  toggle.style.alignItems = 'center';
  toggle.style.justifyContent = 'center';
  toggle.style.width = '40px';
  toggle.style.height = '40px';
  toggle.style.userSelect = 'none';

  // SVG icons
  const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8zM1 11h3v2H1zm10-10h2v3h-2zm9.66 4.05l-1.41-1.41-1.8 1.79 1.41 1.41zM17.24 19.16l1.8 1.79 1.41-1.41-1.79-1.8zM20 11h3v2h-3zm-8 8h2v3h-2zm-6.36-2.05l-1.41 1.41 1.8 1.79 1.41-1.41z"/></svg>`;
  const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.43 2.3a9 9 0 0 0-1.01 17.88 7 7 0 0 1 7-7 7.01 7.01 0 0 1-5.99-10.88z"/></svg>`;

  toggle.innerHTML = sunSVG;
  topnav.insertBefore(toggle, topnav.querySelector('.menu-icon')); // Insert before menu icon

  // Load saved mode
  let darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    body.classList.add('dark-mode');
    toggle.innerHTML = moonSVG;
  }

  toggle.addEventListener('click', () => {
    darkMode = !darkMode;
    body.classList.toggle('dark-mode', darkMode);
    toggle.innerHTML = darkMode ? moonSVG : sunSVG;
    localStorage.setItem('darkMode', darkMode);
  });
})();
