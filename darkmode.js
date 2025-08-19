(() => {
  const body = document.body;

  // Inject dark mode CSS
  const style = document.createElement("style");
  style.innerHTML = `
    body.dark-mode {
      background: #121212 !important;
      color: #f5f5f5 !important;
    }
    body.dark-mode a {
      color: #4dabf7 !important;
    }
    body.dark-mode img.icon {
      filter: invert(1) brightness(1.2) !important;
    }

    #darkModeToggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1000;
    }
    #darkModeToggle svg {
      width: 28px;
      height: 28px;
      fill: currentColor;
    }
  `;
  document.head.appendChild(style);

  // Sun & Moon icons (SVG)
  const moonSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2a9.99 9.99 0 0 0-9.95 9.05A7 7 0 0 0 12 22a9.99 9.99 0 0 0 9.95-9.05A7 7 0 0 0 12 2z"/>
    </svg>`;
  const sunSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M6.76 4.84l-1.8-1.79L3.17 4.83l1.79 1.79 1.8-1.78zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.66 2.04l1.79-1.79-1.41-1.41-1.79 1.79 1.41 1.41zM20 11v2h3v-2h-3zm-9 9h2v-3h-2v3zm4.24-2.84l1.8 1.79 1.41-1.41-1.79-1.79-1.42 1.41zM6.76 19.16l-1.8 1.79 1.41 1.41 1.8-1.79-1.41-1.41zM12 6a6 6 0 1 1 0 12A6 6 0 0 1 12 6z"/>
    </svg>`;

  // Create button
  const toggle = document.createElement("button");
  toggle.id = "darkModeToggle";
  document.body.appendChild(toggle);

  // Apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggle.innerHTML = sunSVG;
  } else {
    toggle.innerHTML = moonSVG;
  }

  // Toggle theme
  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      toggle.innerHTML = sunSVG;
      localStorage.setItem("theme", "dark");
    } else {
      toggle.innerHTML = moonSVG;
      localStorage.setItem("theme", "light");
    }
  });
})();
