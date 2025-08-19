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

  // White SVG icons with fixed sun rays
  const sunIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="30" width="30"><circle fill="%23FFFFFF" cx="15" cy="15" r="6"/><line x1="15" y1="0" x2="15" y2="5" stroke="%23FFFFFF" stroke-width="2"/><line x1="15" y1="25" x2="15" y2="30" stroke="%23FFFFFF" stroke-width="2"/><line x1="0" y1="15" x2="5" y2="15" stroke="%23FFFFFF" stroke-width="2"/><line x1="25" y1="15" x2="30" y2="15" stroke="%23FFFFFF" stroke-width="2"/><line x1="4" y1="4" x2="8" y2="8" stroke="%23FFFFFF" stroke-width="2"/><line x1="22" y1="4" x2="26" y2="8" stroke="%23FFFFFF" stroke-width="2"/><line x1="4" y1="26" x2="8" y2="22" stroke="%23FFFFFF" stroke-width="2"/><line x1="22" y1="26" x2="26" y2="22" stroke="%23FFFFFF" stroke-width="2"/></svg>';
  const moonIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="30" width="30"><path fill="%23FFFFFF" d="M15 2a13 13 0 1013 13A13 13 0 0015 2zm0 24a11 11 0 1111-11 11 11 0 01-11 11z"/></svg>';

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
