(() => {
  const topnav = document.querySelector('.topnav');
  if (!topnav) return;
  const body = document.body;

  // Inject dark mode CSS
  const style = document.createElement('style');
  style.textContent = `
    body.dark-mode {
      background-color: #111;
      color: #f2f2f2;
    }
    body.dark-mode .topnav {
      background-color: #222;
    }
    body.dark-mode .topnav h1 a,
    body.dark-mode .accordion-toggle,
    body.dark-mode .accordion-content a {
      color: #f2f2f2 !important;
    }
    .dark-mode-toggle {
      cursor: pointer;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      user-select: none;
      margin-right: 8px;
      flex-shrink: 0;
      color: #f2f2f2;
    }
  `;
  document.head.appendChild(style);

  // SVG icons
  const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8zM1 11h3v2H1zm10-10h2v3h-2zm9.66 4.05l-1.41-1.41-1.8 1.79 1.41 1.41zM17.24 19.16l1.8 1.79 1.41-1.41-1.79-1.8zM20 11h3v2h-3zm-8 8h2v3h-2zm-6.36-2.05l-1.41 1.41 1.8 1.79 1.41-1.41z"/></svg>`;
  const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.43 2.3a9 9 0 0 0-1.01 17.88 7 7 0 0 1 7-7 7.01 7.01 0 0 1-5.99-10.88z"/></svg>`;

  // Create toggle element
  const toggle = document.createElement('div');
  toggle.className = 'dark-mode-toggle';
  toggle.innerHTML = sunSVG;

  // Insert before menu icon
  const menuIcon = topnav.querySelector('.menu-icon');
  topnav.insertBefore(toggle, menuIcon);

  // Load saved mode
  let darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    body.classList.add('dark-mode');
    toggle.innerHTML = moonSVG;
  }

  // Toggle click
  toggle.addEventListener('click', () => {
    darkMode = !darkMode;
    body.classList.toggle('dark-mode', darkMode);
    toggle.innerHTML = darkMode ? moonSVG : sunSVG;
    localStorage.setItem('darkMode', darkMode);
  });
})();
