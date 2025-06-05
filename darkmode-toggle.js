(function() {
  // Wait for DOM ready
  function onReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  onReady(() => {
    const topnav = document.querySelector('.topnav');
    if (!topnav) return; // safety check

    // Insert CSS variables and transition styles if not already present
    if (!document.getElementById('darkmode-toggle-styles')) {
      const style = document.createElement('style');
      style.id = 'darkmode-toggle-styles';
      style.textContent = `
        :root {
          --bg-light: #ffffff;
          --text-light: #000000;
          --bg-dark: #121212;
          --text-dark: #f5f5f5;
          --transition-duration: 0.5s;
        }
        body {
          background-color: var(--bg-light);
          color: var(--text-light);
          transition: background-color var(--transition-duration), color var(--transition-duration);
        }
        body.dark-mode {
          background-color: var(--bg-dark);
          color: var(--text-dark);
        }
        .darkmode-toggle-btn {
          cursor: pointer;
          width: 32px;
          height: 32px;
          margin-left: 8px;
          vertical-align: middle;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          transition: transform 0.3s ease;
        }
        .darkmode-toggle-btn svg {
          width: 24px;
          height: 24px;
          fill: none;
          stroke-width: 2;
          stroke-linejoin: round;
          stroke-linecap: round;
        }
        .darkmode-toggle-btn:hover {
          transform: rotate(15deg);
        }
      `;
      document.head.appendChild(style);
    }

    // SVG icons
    const sunSVG = `
      <svg viewBox="0 0 24 24" stroke="#FF8C00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5" fill="#FFA500"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    `;

    const moonSVG = `
      <svg viewBox="0 0 24 24" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#FFD700">
        <path d="M21 12.79A9 9 0 0112.21 3a7 7 0 000 14 9 9 0 018.79-4.21z"/>
      </svg>
    `;

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
    toggleBtn.className = 'darkmode-toggle-btn';
    toggleBtn.innerHTML = sunSVG; // start in light mode

    // Append toggle button right after the hamburger menu icon
    // Find the hamburger menu icon
    const menuIcon = topnav.querySelector('.menu-icon');
    if (!menuIcon) return;
    menuIcon.insertAdjacentElement('afterend', toggleBtn);

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      toggleBtn.innerHTML = moonSVG;
    } else {
      document.body.classList.remove('dark-mode');
      toggleBtn.innerHTML = sunSVG;
    }

    // Toggle function with smooth animation
    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      if (isDark) {
        toggleBtn.innerHTML = moonSVG;
        localStorage.setItem('theme', 'dark');
      } else {
        toggleBtn.innerHTML = sunSVG;
        localStorage.setItem('theme', 'light');
      }
    });
  });
})();
