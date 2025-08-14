(() => {
  'use strict';

  /* ---------------- CONFIG ---------------- */
  // Set to true if you only want the toggle on the homepage:
  const HOME_ONLY = false;

  function isHomepage() {
    const p = location.pathname.replace(/\/+$/, '');
    return p === '' || p === '/' || p.endsWith('/index.html') || p.endsWith('/index');
  }

  /* --------- Material Icons injection ------- */
  let materialIconsLoaded = false;

  function ensureMaterialIcons() {
    return new Promise((resolve) => {
      // Preconnects (helps speed/reliability)
      const ensurePreconnect = (href, cross = false) => {
        if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
          const pc = document.createElement('link');
          pc.rel = 'preconnect';
          pc.href = href;
          if (cross) pc.crossOrigin = 'anonymous';
          document.head.appendChild(pc);
        }
      };
      ensurePreconnect('https://fonts.googleapis.com');
      ensurePreconnect('https://fonts.gstatic.com', true);

      // Stylesheet
      let link = document.querySelector('link[href*="Material+Icons"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        link.onload = () => { materialIconsLoaded = true; resolve(); };
        link.onerror = () => { console.warn('Material Icons failed to load. Falling back to SVG.'); resolve(); };
        document.head.appendChild(link);
      } else {
        // If already present we still try to detect load using document.fonts
        const done = () => resolve();
        if (document.fonts?.check) {
          // Give the browser a tick to register
          setTimeout(() => {
            try {
              materialIconsLoaded = document.fonts.check('24px "Material Icons"');
            } catch {}
            done();
          }, 0);
        } else {
          done();
        }
      }
    });
  }

  /* ------------ CSS injection (yours) -------- */
  function injectCSS() {
    if (document.getElementById('darkmode-injected-css')) return;

    const css = `
      /* Toggle button look */
      .darkmode-toggle {
        cursor: pointer;
        font-size: 30px;
        line-height: 1;
        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        color: inherit;
        margin-right: 10px;
      }
      .darkmode-toggle:focus-visible {
        outline: 2px solid var(--theme-accent-color, #E82B38);
        outline-offset: 2px;
        border-radius: 6px;
      }
      .darkmode-toggle .material-icons {
        font-size: 30px;
      }
      /* SVG fallback sizing */
      .darkmode-icon svg {
        width: 30px;
        height: 30px;
        display: block;
      }

      /* Smooth transitions */
      html, body, .topnav, .topnav-right, .accordion-toggle, .accordion-content a, .clickable-section {
        transition: background-color .25s ease, color .25s ease, border-color .25s ease;
      }

      /* Dark mode variables + base */
      body.dark-mode {
        --theme-bg-color: #222;
        --theme-topnav-color: #ddd;
        background-color: #121212 !important;
        color: #eee !important;
      }

      /* Top bar + hamburger in dark */
      body.dark-mode .topnav {
        background-color: #222 !important;
        color: #ddd !important;
      }
      body.dark-mode .menu-icon {
        color: #ddd !important;
      }
      body.dark-mode .logo {
        color: #ddd !important;
      }

      /* Slide-out menu in dark */
      body.dark-mode .topnav-right {
        background-color: #222 !important;
        color: #ddd !important;
      }

      /* Accordion + links in dark */
      body.dark-mode .accordion-toggle {
        color: #ddd !important;
      }
      body.dark-mode .accordion-content {
        background-color: #222 !important;
      }
      body.dark-mode .accordion-content a {
        color: #ddd !important;
        border-top: 1px solid rgba(255,255,255,.15) !important;
      }

      /* Clickable bottom section in dark */
      body.dark-mode .clickable-section {
        background-color: #c52430 !important;
        border-top: 1px solid #932028 !important;
        color: #fff !important;
      }
      body.dark-mode .clickable-section:hover,
      body.dark-mode .clickable-section:focus {
        background-color: #b21f2b !important;
      }
    `;
    const style = document.createElement('style');
    style.id = 'darkmode-injected-css';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------- Persistence helpers (yours) ---------- */
  const KEYS = ['theme', 'darkmode-enabled', 'darkMode']; // support old keys too

  function getStoredTheme() {
    for (const k of KEYS) {
      const v = localStorage.getItem(k);
      if (v === 'dark') return 'dark';
      if (v === 'light') return 'light';
      if (v === 'true') return 'dark';
      if (v === 'false') return 'light';
      if (v === 'enabled') return 'dark';
      if (v === 'disabled') return 'light';
    }
    return null;
  }

  function storeTheme(mode) {
    localStorage.setItem('theme', mode);
    localStorage.setItem('darkmode-enabled', mode === 'dark' ? 'true' : 'false');
    localStorage.setItem('darkMode', mode === 'dark' ? 'enabled' : 'disabled');
  }

  /* --------- Meta theme-color updater (yours) -------- */
  function updateThemeColor(isDark) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', isDark ? '#222222' : '#E82B38');
  }

  /* ----------------- Icons (SVG fallback) ----------------- */
  function makeSunIconSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const rays = [
      ['12','1','12','3'], ['12','21','12','23'],
      ['1','12','3','12'], ['21','12','23','12'],
      ['4.2','4.2','5.6','5.6'], ['18.4','18.4','19.8','19.8'],
      ['4.2','19.8','5.6','18.4'], ['18.4','5.6','19.8','4.2']
    ];
    rays.forEach(([x1,y1,x2,y2]) => {
      const line = document.createElementNS(svg.namespaceURI, 'line');
      line.setAttribute('x1', x1); line.setAttribute('y1', y1);
      line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      line.setAttribute('stroke', 'currentColor');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('stroke-linecap', 'round');
      svg.appendChild(line);
    });
    const circle = document.createElementNS(svg.namespaceURI, 'circle');
    circle.setAttribute('cx','12'); circle.setAttribute('cy','12'); circle.setAttribute('r','5');
    circle.setAttribute('fill','none'); circle.setAttribute('stroke','currentColor'); circle.setAttribute('stroke-width','2');
    svg.appendChild(circle);
    return svg;
  }

  function makeMoonIconSVG() {
    // Crescent (MIT-style path similar to Feather)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
    path.setAttribute('fill', 'currentColor');
    svg.appendChild(path);
    return svg;
  }

  /* ----------------- Apply mode ----------------- */
  let toggleBtn, iconContainer, usingMaterial = false;

  function setIcon(isDark) {
    // Clear current icon
    iconContainer.replaceChildren();
    if (usingMaterial) {
      const span = document.createElement('span');
      span.className = 'material-icons';
      span.textContent = isDark ? 'dark_mode' : 'wb_sunny';
      iconContainer.appendChild(span);
    } else {
      iconContainer.appendChild(isDark ? makeMoonIconSVG() : makeSunIconSVG());
    }
  }

  function applyMode(mode) {
    const isDark = mode === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    updateThemeColor(isDark);

    if (toggleBtn && iconContainer) {
      toggleBtn.setAttribute('aria-pressed', String(isDark));
      setIcon(isDark);
      const title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
      toggleBtn.title = title;
      toggleBtn.setAttribute('aria-label', title);
    }
  }

  /* ------------- Insert toggle ------------- */
  function insertToggle(topnav) {
    if ((HOME_ONLY && !isHomepage()) || !topnav) return;
    if (topnav.querySelector('.darkmode-toggle')) return; // avoid duplicates

    const menuIcon = topnav.querySelector('.menu-icon');

    toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'darkmode-toggle';
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
    toggleBtn.title = 'Toggle dark mode';

    iconContainer = document.createElement('span');
    iconContainer.className = 'darkmode-icon';
    toggleBtn.appendChild(iconContainer);

    if (menuIcon && menuIcon.parentElement === topnav) {
      topnav.insertBefore(toggleBtn, menuIcon);
    } else {
      topnav.appendChild(toggleBtn);
    }

    toggleBtn.addEventListener('click', onToggle);
    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle();
      }
    });
  }

  function onToggle() {
    const isDark = !document.body.classList.contains('dark-mode');
    applyMode(isDark ? 'dark' : 'light');
    storeTheme(isDark ? 'dark' : 'light');
  }

  /* ---------- Wait for .topnav if loaded late ---------- */
  function findTopnavWithRetry(maxMs = 5000, interval = 100) {
    return new Promise((resolve) => {
      const start = performance.now();
      const tryFind = () => {
        const el = document.querySelector('.topnav');
        if (el) return resolve(el);
        if (performance.now() - start >= maxMs) return resolve(null);
        setTimeout(tryFind, interval);
      };
      tryFind();
    });
  }

  /* -------------- Init respecting prefs -------------- */
  function initTheme() {
    const stored = getStoredTheme();
    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const mode = stored || (prefersDark ? 'dark' : 'light');
    applyMode(mode);

    if (!stored && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', (e) => {
        applyMode(e.matches ? 'dark' : 'light');
      });
    }
  }

  /* -------------------- Boot -------------------- */
  async function boot() {
    await ensureMaterialIcons();     // try to load Material Icons
    usingMaterial = materialIconsLoaded; // decide renderer
    injectCSS();                     // your full CSS
    const topnav = await findTopnavWithRetry();
    insertToggle(topnav);            // add the toggle (every page by default)
    initTheme();                     // apply stored/system mode
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
