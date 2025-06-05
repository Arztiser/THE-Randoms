(function () {
  const mode = localStorage.getItem("darkmode");
  if (mode === "dark") document.documentElement.classList.add("dark");

  if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    const menuIcon = document.querySelector(".menu-icon");
    if (!menuIcon) return;

    const toggle = document.createElement("button");
    toggle.id = "darkmode-toggle";
    toggle.style.border = "none";
    toggle.style.background = "none";
    toggle.style.cursor = "pointer";
    toggle.style.marginRight = "8px";
    toggle.innerHTML = getSun();

    menuIcon.parentNode.insertBefore(toggle, menuIcon);

    toggle.onclick = () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("darkmode", isDark ? "dark" : "light");
      toggle.innerHTML = isDark ? getMoon() : getSun();
    };

    // Set correct icon on load
    if (mode === "dark") toggle.innerHTML = getMoon();
  }

  function getSun() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFA500" viewBox="0 0 24 24">
      <path d="M12 4V2M12 22v-2M4.22 4.22l1.42 1.42M18.36 18.36l-1.42-1.42M2 12H4M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l-1.42 1.42M12 6a6 6 0 1 1 0 12a6 6 0 0 1 0-12z"/>
    </svg>`;
  }

  function getMoon() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFFF00" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3c.2 0 .39.01.58.03a1 1 0 0 1 .61 1.69a7 7 0 1 0 8.37 8.37a1 1 0 0 1 1.69.61c.02.19.03.38.03.58z"/>
    </svg>`;
  }
})();
