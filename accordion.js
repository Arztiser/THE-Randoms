window.addEventListener('load', () => {
  const topnavRight = document.querySelector('.topnav-right');
  const menuIcon = document.querySelector('.menu-icon');
  const body = document.body;

  // Toggle menu
  if (topnavRight && menuIcon) {
    const toggleMenu = () => {
      topnavRight.classList.toggle('active');
      body.classList.toggle('menu-open');
    };
    menuIcon.addEventListener('click', toggleMenu);
    menuIcon.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // Accordion toggle
  const toggles = document.querySelectorAll('.accordion-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.accordion-section');
      const isOpen = section.classList.contains('open');

      // Close other sections
      document.querySelectorAll('.accordion-section').forEach(s => {
        if (s !== section) {
          s.classList.remove('open');
          const tBtn = s.querySelector('.accordion-toggle');
          if (tBtn) tBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isOpen) {
        section.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        section.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Clickable section
  document.querySelectorAll('.clickable-section').forEach(cs => {
    cs.addEventListener('click', () => {
      window.location.href = 'randomsoftheday.html';
    });
    cs.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cs.click();
      }
    });
  });

  // Footer year
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
