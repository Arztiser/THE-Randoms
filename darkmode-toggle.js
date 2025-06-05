document.addEventListener("DOMContentLoaded", () => {
  const topnav = document.querySelector(".topnav");

  if (!topnav || document.getElementById("themeToggle")) return;

  // Create icon container
  const iconGroup = document.createElement("div");
  iconGroup.className = "icon-group";
  iconGroup.style.display = "flex";
  iconGroup.style.alignItems = "center";
  iconGroup.style.gap = "10px";
  iconGroup.style.marginLeft = "auto";

  // Theme toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "themeToggle";
  toggleBtn.setAttribute("aria-label", "Toggle dark mode");
  toggleBtn.style.background = "none";
  toggleBtn.style.border = "none";
  toggleBtn.style.cursor = "pointer";
  toggleBtn.style.padding = "0";
  toggleBtn.style.display = "flex";
  toggleBtn.style.alignItems = "center";

  // SVG: Sun icon
  const sun = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  sun.setAttribute("viewBox", "0 0 24 24");
  sun.setAttribute("width", "24");
  sun.setAttribute("height", "24");
  sun.setAttribute("fill", "orange");
  sun.innerHTML = `
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
  `;

  // SVG: Moon icon
  const moon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  moon.setAttribute("viewBox", "0 0 24 24");
  moon.setAttribute("width", "24");
  moon.setAttribute("height", "24");
  moon.setAttribute("fill", "yellow");
  moon.style.display = "none";
  moon.innerHTML = `
    <path d="M21 12.79A9 9 0 0111.21 3a7 7 0 100 14A9 9 0 0121 12.79z"/>
  `;

  toggleBtn.appendChild(sun);
  toggleBtn.appendChild(moon);
  iconGroup.appendChild(toggleBtn);

  // Insert right before the hamburger menu
  const menuIcon = document.querySelector(".menu-icon");
  topnav.insertBefore(iconGroup, menuIcon);

  // Load theme from localStorage
  const dark = localStorage.getItem("theme") === "dark";
  if (dark) {
    document.body.classList.add("dark-mode");
    sun.style.display = "none";
    moon.style.display = "block";
  }

  // Toggle click
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    sun.style.display = isDark ? "none" : "block";
    moon.style.display = isDark ? "block" : "none";
  });
});
