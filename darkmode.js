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
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    color: var(--text-color);
    transition: color 0.3s ease;
    z-index: 1000;
  }
  #darkmode-toggle:focus {
    outline: 2px solid #0078D4;
    outline-offset: 2px;
  }
`;
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

// Create toggle button dynamically
const toggleBtn = document.createElement('button');
toggleBtn.id = 'darkmode-toggle';
toggleBtn.setAttribute('aria-label', 'Toggle dark mode');

const icon = document.createElement('span');
icon.className = 'material-icons';
icon.id = 'darkmode-icon';
icon.textContent = 'wb_sunny'; // default icon

toggleBtn.appendChild(icon);
document.body.appendChild(toggleBtn);

// Load Google Material Icons if not already loaded
if (!document.querySelector('link[href*="fonts.googleapis.com/icon?family=Material+Icons"]')) {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

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
