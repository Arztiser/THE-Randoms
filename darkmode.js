(() => {
  // Only run on index.html for the toggle injection
  const isHomepage = location.pathname.endsWith('/') || location.pathname.endsWith('index.html');

  // Create dark mode toggle
  const darkToggle = document.createElement('img');
  darkToggle.id = 'dark-mode-toggle';
  darkToggle.alt = 'Dark mode toggle';
  darkToggle.style.cursor = 'pointer';
  darkToggle.style.width = '28px';
  darkToggle.style.height = '28px';
  darkToggle.style.marginRight = '12px';
  darkToggle.style.verticalAlign = 'middle';
  darkToggle.style.transition = 'opacity 0.3s';

  // Append to topnav only on homepage
  if (isHomepage) {
    const topnav = document.querySelector('.topnav');
    topnav.insertBefore(darkToggle, topnav.querySelector('.menu-icon'));
  }

  // Apply dark mode function
  const applyDarkMode = (on) => {
    const body = document.body;
    if (on) {
      body.classList.add('dark-mode');
      body.style.backgroundColor = '#222';
      body.style.color = '#f2f2f2';
      document.querySelectorAll('.topnav, .topnav-right, .accordion-toggle, .accordion-content a, .clickable-section')
        .forEach(el => el.style.color = '#f2f2f2');
      if (darkToggle) darkToggle.src = 'https://fonts.gstatic.com/s/i/materialicons/nightlight_round/v12/24px.svg';
    } else {
      body.classList.remove('dark-mode');
      body.style.backgroundColor = '#fff';
      body.style.color = '#000';
      document.querySelectorAll('.topnav, .topnav-right, .accordion-toggle, .accordion-content a, .clickable-section')
        .forEach(el => el.style.color = el.classList.contains('clickable-section') ? 'white' : '#333');
      if (darkToggle) darkToggle.src = 'https://fonts.gstatic.com/s/i/materialicons/sunny/v13/24px.svg';
    }
  };

  // Load preference from localStorage
  const darkPref = localStorage.getItem('dark-mode') === 'true';
  applyDarkMode(darkPref);

  // Toggle dark mode on click
  darkToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    applyDarkMode(!isDark);
    localStorage.setItem('dark-mode', !isDark);
  });
})();
