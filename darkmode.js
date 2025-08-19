(() => {
  // Inject CSS for dark mode and transitions
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      transition: background-color 0.4s ease, color 0.4s ease;
    }
    body.dark-mode {
      background-color: #111 !important;
      color: #f2f2f2 !important;
    }
    body.dark-mode .topnav {
      background-color: #222 !important;
    }
    body.dark-mode .topnav h1,
    body.dark-mode .accordion-toggle,
    body.dark-mode .accordion-content a {
      color: #f2f2f2 !important;
    }
    #topnav-icons img {
      transition: transform 0.2s ease, filter 0.2s ease;
      vertical-align: middle;
      cursor: pointer;
      width: 28px;
      height: 28px;
      margin-left: 10px;
    }
    #topnav-icons {
      display: flex;
      align-items: center;
      margin-left: auto;
    }
  `;
  document.head.appendChild(style);

  // Inject the container in topnav if it doesn't exist
  let topnavIcons = document.getElementById('topnav-icons');
  if (!topnavIcons) {
    topnavIcons = document.createElement('div');
    topnavIcons.id = 'topnav-icons';
    const topnav = document.querySelector('.topnav');
    topnav.appendChild(topnavIcons);
  }

  // Create toggle icon
  const darkToggle = document.createElement('img');
  darkToggle.alt = 'Dark Mode';
  topnavIcons.appendChild(darkToggle);

  // Load saved mode
  const savedMode = localStorage.getItem('dark-mode');
  if (savedMode === 'dark') document.body.classList.add('dark-mode');

  // White Google-style SVG icons
  const sunIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><circle fill="%23FFFFFF" cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="4" stroke="%23FFFFFF" stroke-width="2"/><line x1="12" y1="20" x2="12" y2="23" stroke="%23FFFFFF" stroke-width="2"/><line x1="4.22" y1="4.22" x2="6.36" y2="6.36" stroke="%23FFFFFF" stroke-width="2"/><line x1="17.64" y1="17.64" x2="19.78" y2="19.78" stroke="%23FFFFFF" stroke-width="2"/><line x1="1" y1="12" x2="4" y2="12" stroke="%23FFFFFF" stroke-width="2"/><line x1="20" y1="12" x2="23" y2="12" stroke="%23FFFFFF" stroke-width="2"/><line x1="4.22" y1="19.78" x2="6.36" y2="17.64" stroke="%23FFFFFF" stroke-width="2"/><line x1="17.64" y1="6.36" x2="19.78" y2="4.22" stroke="%23FFFFFF" stroke-width="2"/></svg>';
  const moonIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path fill="%23FFFFFF" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"/></svg>';

  const updateIcon = () => {
    darkToggle.src = document.body.classList.contains('dark-mode') ? moonIcon : sunIcon;
  };

  const toggleMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    updateIcon();
  };

  darkToggle.addEventListener('click', toggleMode);

  // Hover effect
  darkToggle.addEventListener('mouseenter', () => darkToggle.style.transform = 'scale(1.2)');
  darkToggle.addEventListener('mouseleave', () => darkToggle.style.transform = 'scale(1)');

  // Initialize
  updateIcon();
})();
