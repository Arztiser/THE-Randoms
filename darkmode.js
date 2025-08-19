(() => {
  // Load Google Material Symbols font
  if (!document.getElementById('material-symbols-font')) {
    const link = document.createElement('link');
    link.id = 'material-symbols-font';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  // Inject CSS
  const style = document.createElement('style');
  style.innerHTML = `
    body { transition: background-color 0.4s ease, color 0.4s ease; }
    body.dark-mode { background-color: #111 !important; color: #f2f2f2 !important; }
    body.dark-mode .topnav { background-color: #222 !important; }
    body.dark-mode .topnav h1,
    body.dark-mode .accordion-toggle,
    body.dark-mode .accordion-content a { color: #f2f2f2 !important; }

    .topnav { display: flex; justify-content: space-between; align-items: center; padding: 0 16px; }
    .topnav-left { display: flex; align-items: center; gap: 12px; }
    #topnav-icons { display: flex; align-items: center; gap: 16px; }

    .dark-toggle {
      font-family: 'Material Symbols Outlined';
      font-size: 26px;
      color: #fff;
      cursor: pointer;
      user-select: none;
    }
  `;
  document.head.appendChild(style);

  // Restructure topnav
  const topnav = document.querySelector('.topnav');
  let left = topnav.querySelector('.topnav-left');
  if (!left) {
    left = document.createElement('div');
    left.className = 'topnav-left';

    const menu = topnav.querySelector('.menu-icon');
    const logo = topnav.querySelector('.logo').parentElement; // h1 wrapping logo

    left.appendChild(menu);
    left.appendChild(logo);
    topnav.insertBefore(left, topnav.firstChild);
  }

  // Add right container
  let right = document.getElementById('topnav-icons');
  if (!right) {
    right = document.createElement('div');
    right.id = 'topnav-icons';
    topnav.appendChild(right);
  }

  // Create dark mode toggle
  let darkToggle = right.querySelector('.dark-toggle');
  if (!darkToggle) {
    darkToggle = document.createElement('span');
    darkToggle.className = 'dark-toggle';
    right.appendChild(darkToggle);
  }

  // Load saved mode
  if (localStorage.getItem('dark-mode') === 'dark') document.body.classList.add('dark-mode');

  const updateIcon = () => {
    darkToggle.textContent = document.body.classList.contains('dark-mode') ? 'dark_mode' : 'wb_sunny';
  };

  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    updateIcon();
  });

  updateIcon();
})();
