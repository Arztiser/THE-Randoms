(() => {
  const logo = document.querySelector('.logo');
  const CLICK_THRESHOLD = 10; // clicks needed
  const COOLDOWN = 5000; // 1 hour
  const DURATION = 5000; // 5 seconds

  let clickCount = 0;

  // Use localStorage to persist cooldown
  let lastTriggered = parseInt(localStorage.getItem('rainbowLast')) || 0;

  logo.addEventListener('click', () => {
    clickCount++;
    const now = Date.now();

    if (clickCount < CLICK_THRESHOLD) return;
    if (now - lastTriggered < COOLDOWN) return; // still on cooldown

    clickCount = 0;
    lastTriggered = now;
    localStorage.setItem('rainbowLast', lastTriggered);

    // Apply rainbow gradient to logo
    logo.style.background = 'linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet, red)';
    logo.style.backgroundSize = '600% 100%';
    logo.style.color = 'transparent';
    logo.style.backgroundClip = 'text';
    logo.style.webkitBackgroundClip = 'text';

    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = elapsed / DURATION;
      logo.style.backgroundPosition = `${progress * 200}% 0`; // slow smooth movement

      if (elapsed < DURATION) {
        requestAnimationFrame(animate);
      } else {
        // Reset logo to original style
        logo.style.color = '';
        logo.style.background = 'none';
        logo.style.backgroundClip = '';
        logo.style.webkitBackgroundClip = '';
      }
    };

    requestAnimationFrame(animate);
  });
})();
