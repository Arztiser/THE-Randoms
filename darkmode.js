(() => {
  // Load Google Material Symbols font if not already loaded
  if (!document.getElementById('material-symbols-font')) {
    const link = document.createElement('link');
    link.id = 'material-symbols-font';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  // Inject CSS for dark mode and icon styling
  const style = document.createElement('style');
  style.innerHTML = `
  body { transition: background-color 0.4s ease, color 0.4s ease; }
  body.dark-mode { background-color: #111 !important; color: #f2f2f2 !important; }
  body.dark-mode .topnav { background-color: #222 !important; }
  body.dark-mode .topnav h1,
  body.dark-mode .accordion-toggle,
  body.dark-mode .accordion-content a { color: #f2f2f2 !important; }

  .topnav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #topnav-icons {
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 6px;
  }

  .dark-toggle {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 26px;
    color: #ffffff;
    cursor: pointer;
    margin: 0;
    padding: 0;
    line-height: 1;
    user-select: none;
    -webkit-user-drag: none;
    transition: none;
  }

  /* Mobile-specific spacing */
  @media (max-width: 768px) {
    #topnav-icons {
      gap: 28px; /* move the sun icon further from hamburger */
    }
  }

  /* Desktop / horizontal mode spacing */
  @media (min-width: 769px) {
    #topnav-icons {
      gap: 12px; /* closer on desktop */
    }
  }
`;
  document.head.appendChild(style);

  // Add icon container if missing
  let topnavIcons = document.getElementById('topnav-icons');
  if (!topnavIcons) {
    topnavIcons = document.createElement('div');
    topnavIcons.id = 'topnav-icons';
    document.querySelector('.topnav').appendChild(topnavIcons);
  }

  // Create toggle element if missing
  let darkToggle = document.querySelector('.dark-toggle');
  if (!darkToggle) {
    darkToggle = document.createElement('span');
    darkToggle.className = 'dark-toggle';
    topnavIcons.appendChild(darkToggle);
  }

  // Load saved mode
  if (localStorage.getItem('dark-mode') === 'dark') document.body.classList.add('dark-mode');

  // Update icon based on mode
  const updateIcon = () => {
    darkToggle.textContent = document.body.classList.contains('dark-mode') ? 'dark_mode' : 'wb_sunny';
  };

  // Toggle dark mode
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    updateIcon();
  });

  // Initialize
  updateIcon();
})();
