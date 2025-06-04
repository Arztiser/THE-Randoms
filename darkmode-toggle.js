document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('dark-mode-toggle');
  const darkModeClass = 'dark-mode';
  const body = document.body;

  // Create overlay for animation
  let overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = '#121212';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = 9999;
  overlay.style.clipPath = 'circle(0% at 0 0)';
  overlay.style.transition = 'clip-path 0.7s ease';
  document.body.appendChild(overlay);

  // Load saved mode on startup
  const savedMode = localStorage.getItem('darkModeEnabled') === 'true';
  if (savedMode) {
    body.classList.add(darkModeClass);
    toggleBtn.textContent = '🌙';
    overlay.style.clipPath = 'circle(150% at 0 0)'; // fully shown overlay for dark
  } else {
    overlay.style.clipPath = 'circle(0% at 0 0)';
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = body.classList.contains(darkModeClass);
    if (!isDark) {
      // Animate in overlay and then add dark mode class
      overlay.style.clipPath = 'circle(150% at 0 0)';
      setTimeout(() => {
        body.classList.add(darkModeClass);
        toggleBtn.textContent = '🌙';
        localStorage.setItem('darkModeEnabled', true);
      }, 700);
    } else {
      // Animate out overlay and then remove dark mode class
      overlay.style.clipPath = 'circle(0% at 0 0)';
      setTimeout(() => {
        body.classList.remove(darkModeClass);
        toggleBtn.textContent = '☀️';
        localStorage.setItem('darkModeEnabled', false);
      }, 700);
    }
  });
});
