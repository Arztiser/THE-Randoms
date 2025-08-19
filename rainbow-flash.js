// rainbow-flash.js

(() => {
  const logo = document.querySelector('.logo');
  if (!logo) return;

  let clickCount = 0;
  let lastTrigger = 0;

  // Create rainbow overlay
  const rainbow = document.createElement('div');
  rainbow.id = 'rainbow-flash';
  Object.assign(rainbow.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    opacity: '0',
    zIndex: '9999',
    background: 'repeating-linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
    backgroundSize: '100% 100%',
    transition: 'opacity 0.2s ease'
  });
  document.body.appendChild(rainbow);

  logo.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastTrigger < 60000) return; // 1-minute cooldown

    clickCount++;

    if (clickCount >= 10) {
      clickCount = 0;
      lastTrigger = now;

      rainbow.style.opacity = '1';
      setTimeout(() => {
        rainbow.style.opacity = '0';
      }, 1000);
    }
  });
})();
