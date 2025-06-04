(() => {
  // Only run on homepage
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;

  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="orange" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5"/>
      <g stroke="orange" stroke-width="2">
        <line x1="12" y1="1" x2="12" y2="4"/>
        <line x1="12" y1="20" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="4" y2="12"/>
        <line x1="20" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
      </g>
    </svg>
  `;

  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="yellow" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 0112.21 3 7 7 0 0021 12.79z"/>
    </svg>
  `;

  const toggleBtn = document.createElement('button');
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
  toggleBtn.style.background = 'none';
  toggleBtn.style.border = 'none';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.padding = '0';
  toggleBtn.style.marginRight = '8px';
  toggleBtn.style.display = 'flex';
  toggleBtn.style.alignItems = 'center';
  toggleBtn.style.justifyContent = 'center';
  toggleBtn.style.width = '28px';
  toggleBtn.style.height = '28px';

  // Append sun icon initially
  toggleBtn.innerHTML = sunIcon;

  // Add toggle button inside #icon-container
  const iconContainer = document.getElementById('icon-container');
  if (!iconContainer) return;
  iconContainer.appendChild(toggleBtn);

  // Load saved mode or default to light
  let darkMode = localStorage.getItem('darkMode') === 'enabled';

  function applyMode() {
    if (darkMode) {
      document.documentElement.style.backgroundColor = '#121212';
      document.documentElement.style.color = 'white';
      toggleBtn.innerHTML = moonIcon;
    } else {
      document.documentElement.style.backgroundColor = '';
      document.documentElement.style.color = '';
      toggleBtn.innerHTML = sunIcon;
    }
  }

  applyMode();

  toggleBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
    applyMode();
  });
})();
