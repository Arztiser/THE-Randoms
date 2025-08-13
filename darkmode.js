/* darkmode-toggle.js — single-file dark mode (CSS + logic + icons) */
(() => {
  'use strict';

  // --- Inject Material Icons (so we can use 'wb_sunny' / 'dark_mode') ---
  function ensureMaterialIcons() {
    if (!document.querySelector('link[href*="Material+Icons"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
      document.head.appendChild(link);
    }
  }

  // --- Inject CSS for dark mode + toggle button ---
  function injectCSS() {
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
    style.textContent = css;
    document.head.appendChild(style);
  }

  // --- Theme persistence helpers ---
  const KEYS = ['theme', 'darkmode-enabled', 'darkMode']; // support old keys too

  function getStoredTheme() {
    for (const k of KEYS) {
      const v = localStorage.getItem(k);
      if (v === 'dark') return 'dark';
      if (v === 'light') return 'light';
      if (v === 'true') return 'dark';
      if (v === 'false') return 'light';
    }
    return null;
  }

  function storeTheme(mode) {
    // Use one canonical key but also update legacy for compatibility
    localStorage.setItem('theme', mode);
    localStorage.setItem('darkmode-enabled', mode === 'dark' ? 'true' : 'false');
    localStorage.setItem('darkMode', mode === 'dark' ? 'enabled' : 'disabled');
  }

  // --- Update browser UI color (PWA / mobile address bar) ---
  function updateThemeColor(isDark) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    // Use topnav background for dark; keep your brand accent for light
    meta.setAttribute('content', isDark ? '#222222' : '#E82B38');
  }

  // --- Apply mode to document ---
  function applyMode(mode) {
    const isDark = mode === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    updateThemeColor(isDark);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', String(isDark));
      icon.textContent = isDark ? 'dark_mode' : 'wb_sunny';
      toggleBtn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
      toggleBtn.setAttribute('aria-label', toggleBtn.title);
    }
  }

  // --- Create and insert the toggle (before the hamburger) ---
  let toggleBtn, icon;

  function insertToggle() {
    const topnav = document.querySelector('.topnav');
    if (!topnav) return;

    const menuIcon = topnav.querySelector('.menu-icon');

    toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'darkmode-toggle';
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
    toggleBtn.title = 'Toggle dark mode';

    icon = document.createElement('span');
    icon.className = 'material-icons';
    icon.textContent = 'wb_sunny'; // default until we compute actual mode
    toggleBtn.appendChild(icon);

    if (menuIcon && menuIcon.parentElement === topnav) {
      // Place directly in front of the hamburger on the right
      topnav.insertBefore(toggleBtn, menuIcon);
    } else {
      // Fallback: append to the right end
      topnav.appendChild(toggleBtn);
    }

    // Events
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

  // --- Initialize respecting stored pref or system pref ---
  function initTheme() {
    const stored = getStoredTheme();
    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const mode = stored || (prefersDark ? 'dark' : 'light');
    applyMode(mode);

    // If user hasn't chosen and system preference changes later, follow it
    if (!stored && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', (e) => {
        applyMode(e.matches ? 'dark' : 'light');
      });
    }
  }

  // --- Boot ---
  function boot() {
    ensureMaterialIcons();
    injectCSS();
    insertToggle();
    initTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
