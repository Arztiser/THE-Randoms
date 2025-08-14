(() => {
  'use strict';

  /* ---------------- CONFIG ---------------- */
  // Set to true if you only want the toggle on the homepage:
  const HOME_ONLY = true;

  function isHomepage() {
    // normalize trailing slash
    const p = location.pathname.replace(/\/+$/, '');
    return p === '' || p === '/' || p.endsWith('/test.html') || p.endsWith('/test');
  }

  /* --------- Material Icons injection ------- */
  function ensureMaterialIcons() {
    return new Promise((resolve) => {
      // Preconnects help reliability/speed (safe to add multiple times, we guard below)
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

      if (!document.querySelector('link[href*="Material+Icons"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        link.onload = () => resolve();
        link.onerror = () => {
          console.warn('Failed to load Material Icons stylesheet.');
          resolve(); // resolve anyway so UI isn’t blocked
        };
        document.head.appendChild(link);
      } else {
        resolve();
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

      /* Make sure color transitions feel nice (optional) */
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

      /* Clickable bottom section in dark (keeps your red accent but tuned a bit) */
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

  /* ----------------- Apply mode ----------------- */
  let toggleBtn, iconSpan;

  function applyMode(mode) {
    const isDark = mode === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    updateThemeColor(isDark);

    if (toggleBtn && iconSpan) {
      toggleBtn.setAttribute('aria-pressed', String(isDark));
      iconSpan.textContent = isDark ? 'dark_mode' : 'wb_sunny';
      const title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
      toggleBtn.title = title;
      toggleBtn.setAttribute('aria-label', title);
    }
  }

  /* ------------- Insert toggle (kept) ------------- */
  function insertToggle() {
    if (HOME_ONLY && !isHomepage()) return;

    const topnav = document.querySelector('.topnav');
    if (!topnav) return;

    // Avoid duplicates
    if (topnav.querySelector('.darkmode-toggle')) return;

    const menuIcon = topnav.querySelector('.menu-icon');

    toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'darkmode-toggle';
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
    toggleBtn.title = 'Toggle dark mode';

    iconSpan = document.createElement('span');
    iconSpan.className = 'material-icons';
    iconSpan.textContent = 'wb_sunny'; // will be flipped by applyMode/initTheme
    toggleBtn.appendChild(iconSpan);

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
    await ensureMaterialIcons();   // make sure ligatures work
    injectCSS();                   // your full CSS block
    insertToggle();                // add toggle (home-only or everywhere)
    initTheme();                   // apply stored/system mode
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
