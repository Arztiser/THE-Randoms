(function () {
  // Wait for DOM ready
  function onReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  onReady(() => {
    // Only add toggle if on home page (adjust path if needed)
    const isHomePage = location.pathname === "/" || location.pathname.endsWith("index.html");
    if (!isHomePage) return;

    const topnav = document.querySelector(".topnav");
    if (!topnav) return;

    // Inject minimal CSS for icon styling
    if (!document.getElementById("darkmode-toggle-styles")) {
      const style = document.createElement("style");
      style.id = "darkmode-toggle-styles";
      style.textContent = `
        body {
          transition: background-color 0.5s ease, color 0.5s ease;
          background-color: #fff;
          color: #000;
        }
        body.dark-mode {
          background-color: #121212;
          color: #f5f5f5;
        }
        .darkmode-toggle-btn {
          cursor: pointer;
          width: 28px;
          height: 28px;
          margin-left: 4px;
          padding: 0;
          border: none;
          background: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          vertical-align: middle;
          user-select: none;
          transition: transform 0.3s ease;
        }
        .darkmode-toggle-btn:hover {
          transform: rotate(20deg);
        }
        .darkmode-toggle-btn svg {
          width: 24px;
          height: 24px;
          stroke-width: 2;
          stroke-linejoin: round;
          stroke-linecap: round;
          fill: none;
        }
        /* Sun icon fill and stroke */
        .darkmode-toggle-btn.sun svg circle {
          fill: #FFA500;
          stroke: #FF8C00;
        }
        .darkmode-toggle-btn.sun svg line {
          stroke: #FF8C00;
        }
        /* Moon icon fill and stroke */
        .darkmode-toggle-btn.moon svg path {
          fill: #FFD700;
          stroke: #FFD700;
        }
      `;
      document.head.appendChild(style);
    }

    // Sun SVG (orange sun with rays, no box)
    const sunSVG = `
      <svg viewBox="0 0 24 24" stroke="#FF8C00" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="5"/>
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

    // Moon SVG (banana crescent yellow, no box)
    const moonSVG = `
      <svg viewBox="0 0 24 24" stroke="#FFD700" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="M21 12.79A9 9 0 0112.21 3a7 7 0 000 14 9 9 0 008.79-4.21z"/>
      </svg>
    `;

    // Create button
    const toggleBtn = document.createElement("button");
    toggleBtn.setAttribute("aria-label", "Toggle dark mode");
    toggleBtn.className = "darkmode-toggle-btn";
    toggleBtn.innerHTML = sunSVG;
    toggleBtn.classList.add("sun");

    // Insert right after hamburger menu icon, tightly packed
    const menuIcon = topnav.querySelector(".menu-icon");
    if (!menuIcon) return;
    menuIcon.insertAdjacentElement("afterend", toggleBtn);

    // Apply saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      toggleBtn.innerHTML = moonSVG;
      toggleBtn.classList.remove("sun");
      toggleBtn.classList.add("moon");
    } else {
      document.body.classList.remove("dark-mode");
      toggleBtn.innerHTML = sunSVG;
      toggleBtn.classList.remove("moon");
      toggleBtn.classList.add("sun");
    }

    // Toggle theme on click with smooth animation
    toggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      if (isDark) {
        toggleBtn.innerHTML = moonSVG;
        toggleBtn.classList.remove("sun");
        toggleBtn.classList.add("moon");
        localStorage.setItem("theme", "dark");
      } else {
        toggleBtn.innerHTML = sunSVG;
        toggleBtn.classList.remove("moon");
        toggleBtn.classList.add("sun");
        localStorage.setItem("theme", "light");
      }
    });
  });
})();
