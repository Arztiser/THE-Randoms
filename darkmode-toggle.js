(function () {
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --bg-color: #fff;
      --text-color: #000;
    }
    [data-theme="dark"] {
      --bg-color: #111;
      --text-color: #fff;
    }
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
      transition: background-color 0.4s ease, color 0.4s ease;
    }
    .dark-toggle {
      cursor: pointer;
      background: none;
      border: none;
      margin-right: 10px;
      padding: 0;
    }
    .dark-toggle svg {
      width: 28px;
      height: 28px;
      transition: transform 0.3s ease;
    }
  `;
  document.head.appendChild(style);

  const button = document.createElement('button');
  button.className = 'dark-toggle';
  button.title = 'Toggle dark mode';

  const sunIcon = `
    <svg viewBox="0 0 24 24" fill="orange" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`;

  const moonIcon = `
    <svg viewBox="0 0 24 24" fill="yellow" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 0111.21 3a7 7 0 1010 9.79z"/>
    </svg>`;

  const setIcon = (isDark) => {
    button.innerHTML = isDark ? moonIcon : sunIcon;
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    setIcon(!isDark);
  };

  button.addEventListener('click', toggleTheme);
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.dataset.theme = savedTheme;
    setIcon(savedTheme === 'dark');
    const nav = document.querySelector('.topnav');
    if (nav) nav.appendChild(button);
  });
})();
