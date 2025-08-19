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
      margin-right: 10px;
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

  // Use Google Material Icons SVGs
  const sunIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path fill="%23FFC107" d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.8-1.79-1.41-1.41-1.79 1.79 1.4 1.41zm0 10.48l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zm-10.48 0l-1.79 1.8 1.41 1.41 1.79-1.8-1.41-1.41zM12 6a6 6 0 100 12 6 6 0 000-12zm0-4h-1v3h1V2zm0 19h-1v3h1v-3zm10-10h-3v1h3v-1zm-19 0H0v1h3v-1z"/></svg>';
  const moonIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path fill="%23FFC107" d="M9.37 5.51a7 7 0 109.12 9.12 9 9 0 01-9.12-9.12z"/></svg>';

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
