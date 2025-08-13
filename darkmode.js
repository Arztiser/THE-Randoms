// Inject CSS styles dynamically for dark mode & toggle button
const css = `
  :root {
    --bg-color: #fff;
    --text-color: #000;
  }
  body.dark-mode {
    --bg-color: #121212;
    --text-color: #eee;
  }
  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
    font-family: 'Jersey 10', sans-serif;
  }
  #darkmode-toggle {
    font-family: 'Jersey 10', sans-serif;
    font-size: 30px; /* matches hamburger */
    color: var(--theme-topnav-color, #f2f2f2);
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 10px; /* space between toggle and hamburger */
    display: flex;
    align-items: center;
    transition: color 0.3s ease;
    user-select: none;
  }
  #darkmode-toggle:focus {
    outline: 2px solid var(--theme-accent-color, #E82B38);
    outline-offset: 2px;
  }
  .material-icons {
    user-select: none;
  }
`;
const styleEl = document.createElement('style');
styleEl.textContent = css;
document.head.appendChild(styleEl);

// Load Google Material Icons font if not already loaded
if (!document.querySelector('link[href*="fonts.googleapis.com/icon?family=Material+Icons"]')) {
  const linkEl = document.createElement('link');
  linkEl.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  linkEl.rel = 'stylesheet';
  document.head.appendChild(linkEl);
}

// Create or get the dark mode toggle button
let toggleBtn = document.getElementById('darkmode-toggle');
if (!toggleBtn) {
  toggleBtn = document.createElement('button');
  toggleBtn.id = 'darkmode-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
  toggleBtn.type = 'button';

  const icon = document.createElement('span');
  icon.className = 'material-icons';
  icon.id = 'darkmode-icon';
  toggleBtn.appendChild(icon);

  // Insert toggle button just before the hamburger menu
  const menuIcon = document.querySelector('.menu-icon');
  if (menuIcon && menuIcon.parentNode) {
    menuIcon.parentNode.insertBefore(toggleBtn, menuIcon);
  } else {
    // fallback: append to body
    document.body.appendChild(toggleBtn);
  }
}

const iconEl = document.getElementById('darkmode-icon');

// Load saved preference
const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'enabled') {
  document.body.classList.add('dark-mode');
  iconEl.textContent = 'dark_mode';
} else {
  iconEl.textContent = 'wb_sunny';
}

// Toggle dark mode on button click
toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  iconEl.textContent = isDark ? 'dark_mode' : 'wb_sunny';
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
});
