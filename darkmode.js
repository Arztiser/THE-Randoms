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
      width: 30px;
      height: 30px;
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

  // Google wb_sunny SVG (white) & simple moon SVG
  const sunIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23FFFFFF" height="30" width="30" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45-1.79l-1.79 1.79 1.42 1.42 1.79-1.8-1.42-1.41zm-4.21-.05h-2v3h2v-3zm7 7h-3v2h3v-2zm-14 0H3v2h3v-2zm12.36 7.36l1.79 1.79 1.41-1.41-1.79-1.79-1.41 1.41zm-10.45 1.79l1.79-1.79-1.42-1.42-1.79 1.79 1.42 1.42zm4.21.05h2v-3h-2v3zm-2-7a5 5 0 115-5 5 5 0 01-5 5z"/></svg>';
  const moonIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23FFFFFF" height="30" width="30" viewBox="0 0 24 24"><path d="M12 2a9.931 9.931 0 00-7.071 2.929 10 10 0 0014.142 14.142A9.931 9.931 0 0012 2z"/></svg>';

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
