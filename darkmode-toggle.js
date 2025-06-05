// Inject topnav icons and dark mode toggle
window.addEventListener("DOMContentLoaded", () => {
  const topnav = document.querySelector(".topnav .menu-container");
  if (!topnav) return;

  // Create dark mode toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "darkmode-toggle";
  toggleBtn.className = "darkmode-toggle-btn sun";
  toggleBtn.setAttribute("aria-label", "Toggle dark mode");
  toggleBtn.style.marginLeft = "8px";
  toggleBtn.innerHTML = getSunIcon(); // Start with sun

  // Insert it before the hamburger icon (assumed last child)
  topnav.insertBefore(toggleBtn, topnav.lastElementChild);

  // Set initial mode
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const useDark = savedTheme === "dark" || (!savedTheme && prefersDark);
  document.body.classList.toggle("dark-mode", useDark);
  setToggleIcon(useDark);

  // Toggle event
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setToggleIcon(isDark);
  });

  function setToggleIcon(isDark) {
    toggleBtn.className = "darkmode-toggle-btn " + (isDark ? "moon" : "sun");
    toggleBtn.innerHTML = isDark ? getMoonIcon() : getSunIcon();
  }

  function getSunIcon() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24">
        <circle cx="12" cy="12" r="5" fill="#FFA500" stroke="#FF8C00"/>
        <line x1="12" y1="1" x2="12" y2="3" stroke="#FF8C00"/>
        <line x1="12" y1="21" x2="12" y2="23" stroke="#FF8C00"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#FF8C00"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#FF8C00"/>
        <line x1="1" y1="12" x2="3" y2="12" stroke="#FF8C00"/>
        <line x1="21" y1="12" x2="23" y2="12" stroke="#FF8C00"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#FF8C00"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#FF8C00"/>
      </svg>`;
  }

  function getMoonIcon() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M21 12.79A9 9 0 0112.21 3a7 7 0 000 14 9 9 0 008.79-4.21z" fill="#FFD700"/>
      </svg>`;
  }
});
