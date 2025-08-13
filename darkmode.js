// Inject CSS styles dynamically
const css = `
  :root {
    --bg-color: #ffffff;
    --text-color: #222222;
  }
  body.dark-mode {
    --bg-color: #121212;
    --text-color: #eeeeee;
  }
  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
    font-family: Arial, sans-serif;
  }
  #darkmode-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    color: var(--text-color);
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
  }
  #darkmode-toggle:focus {
    outline: 2px solid #0078D4;
    outline-offset: 2px;
  }
`;
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

// Load Google Material Icons if not already loaded
if (!document.querySelector('link[href*="fonts.googleapis.com/icon?family=Material+Icons"]')) {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

// Find existing toggle button or create it once
let toggleBtn = document.getElementById('darkmode-toggle');
if (!toggleBtn) {
  toggleBtn = document.createElement('button');
  toggleBtn.id = 'darkmode-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');

  const icon = document.createElement('span');
  icon.className = 'material-icons';
  icon.id = 'darkmode-icon';
  toggleBtn.appendChild(icon);

  // Append the toggle button next to the hamburger menu if exists,
  // else append to body
  const hamburger = document.querySelector('#hamburger-menu');
  if (hamburger && hamburger.parentNode) {
    hamburger.parentNode.insertBefore(toggleBtn, hamburger);
  } else {
    document.body.appendChild(toggleBtn);
  }
}

const icon = document.getElementById('darkmode-icon');

// Load saved preference
const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'enabled') {
  document.body.classList.add('dark-mode');
  icon.textContent = 'dark_mode';
} else {
  icon.textContent = 'wb_sunny';
}

// Toggle dark mode on click
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const darkModeEnabled = document.body.classList.contains('dark-mode');
  icon.textContent = darkModeEnabled ? 'dark_mode' : 'wb_sunny';
  localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
});
