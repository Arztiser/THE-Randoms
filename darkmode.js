// Inject dark mode CSS styles dynamically
const darkModeStyles = `
  body.dark-mode {
    background-color: #121212 !important;
    color: #eee !important;
  }
  body.dark-mode .topnav {
    background-color: #222 !important;
    color: #ddd !important;
  }
  body.dark-mode .menu-icon {
    color: #ddd !important;
  }
  body.dark-mode .topnav-right {
    background-color: #222 !important;
    color: #ddd !important;
  }
  body.dark-mode .accordion-toggle,
  body.dark-mode .accordion-content a,
  body.dark-mode .clickable-section {
    color: #ddd !important;
  }
  body.dark-mode .clickable-section {
    background-color: #b33 !important;
    border-top: 1px solid #900 !important;
  }
  body.dark-mode .clickable-section:hover,
  body.dark-mode .clickable-section:focus {
    background-color: #d44 !important;
  }
  /* Add any other dark mode overrides you need */
`;

// Create and append style tag with above styles
const styleTag = document.createElement('style');
styleTag.textContent = darkModeStyles;
document.head.appendChild(styleTag);

// Create toggle button container
const toggleContainer = document.createElement('span');
toggleContainer.id = 'darkmode-toggle';
toggleContainer.setAttribute('role', 'button');
toggleContainer.setAttribute('tabindex', '0');
toggleContainer.setAttribute('aria-label', 'Toggle dark mode');
toggleContainer.style.cursor = 'pointer';
toggleContainer.style.fontSize = '28px';
toggleContainer.style.color = 'inherit';
toggleContainer.style.userSelect = 'none';
toggleContainer.style.marginRight = '10px';
toggleContainer.style.display = 'flex';
toggleContainer.style.alignItems = 'center';

// SVG icons for sun and moon (Google-style simple)
const sunIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
    <path stroke="currentColor" stroke-width="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M17.36 17.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M17.36 6.64l1.42-1.42"/>
  </svg>
`;
const moonIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
  </svg>
`;

// Current mode tracking
let isDark = false;

// Function to update icon
function updateIcon() {
  toggleContainer.innerHTML = isDark ? moonIcon : sunIcon;
}

// Function to toggle dark mode
function toggleDarkMode() {
  isDark = !isDark;
  document.body.classList.toggle('dark-mode', isDark);
  updateIcon();
  localStorage.setItem('darkmode-enabled', isDark ? 'true' : 'false');
}

// Initialize dark mode based on saved preference
function initDarkMode() {
  const saved = localStorage.getItem('darkmode-enabled');
  isDark = saved === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
  updateIcon();
}

// Insert toggle button before the hamburger menu
function insertToggle() {
  const topnav = document.querySelector('.topnav');
  const menuIcon = topnav.querySelector('.menu-icon');
  if (menuIcon) {
    topnav.insertBefore(toggleContainer, menuIcon);
  }
}

// Setup event listeners
toggleContainer.addEventListener('click', toggleDarkMode);
toggleContainer.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleDarkMode();
  }
});

// Run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  insertToggle();
  initDarkMode();
});
