<script>
(() => {
  // Wait until DOM is ready
  function ready(fn) {
    if (document.readyState !== 'loading') return fn();
    document.addEventListener('DOMContentLoaded', fn);
  }

  ready(() => {
    const topnav = document.querySelector('.topnav');
    if (!topnav) {
      console.warn('No .topnav found!');
      return;
    }

    // --- Create toggle button ---
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '🌞';
    toggleBtn.style.fontSize = '24px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.marginLeft = '10px';
    toggleBtn.setAttribute('aria-label', 'Toggle dark mode');

    topnav.appendChild(toggleBtn);

    // --- Apply stored or default theme ---
    const stored = localStorage.getItem('theme');
    let isDark = stored === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    toggleBtn.textContent = isDark ? '🌙' : '🌞';

    // --- Button click handler ---
    toggleBtn.addEventListener('click', () => {
      isDark = !isDark;
      document.body.classList.toggle('dark-mode', isDark);
      toggleBtn.textContent = isDark ? '🌙' : '🌞';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      // Update mobile address bar color
      let meta = document.querySelector('meta[name="theme-color"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
      }
      meta.content = isDark ? '#222222' : '#E82B38';
    });

    // --- Inject minimal dark mode CSS ---
    const style = document.createElement('style');
    style.textContent = `
      body.dark-mode { background-color: #121212; color: #eee; }
      body.dark-mode .topnav { background-color: #222; color: #ddd; }
    `;
    document.head.appendChild(style);
  });
})();
</script>
