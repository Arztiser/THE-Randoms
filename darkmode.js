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
      margin-left: 16px;
      user-select: none; /* prevent blue highlight */
      -webkit-user-drag: none; /* prevent dragging */
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

  // Keep existing sun and moon icons
  const sunIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23FFFFFF" height="32" width="32" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45-1.79l-1.79 1.79 1.42 1.42 1.79-1.8-1.42-1.41zM12 4a8 8 0 108 8 8.009 8.009 0 00-8-8zm0 14a8 8 0 108-8 8.009 8.009 0 00-8 8zm-7-7H2v2h3v-2zm17 0h-3v2h3v-2zm-8-8h-2v3h2V3zm0 16h-2v3h2v-3zm-7.36 4.36l1.79-1.79-1.42-1.42-1.79 1.79 1.42 1.42zm10.45-1.79l1.79 1.79 1.41-1.41-1.79-1.79-1.41 1.41z"/></svg>';
  const moonIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23FFFFFF" height="32" width="32" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';

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
