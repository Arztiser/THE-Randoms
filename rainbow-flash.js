(() => {
  const logo = document.querySelector('.logo');
  const CLICK_THRESHOLD = 10; // clicks needed
  const COOLDOWN = 60 * 60 * 1000; // 1 hour
  const DURATION = 5000; // 5 seconds

  let clickCount = 0;
  let lastTriggered = 0;

  logo.addEventListener('click', () => {
    clickCount++;
    const now = Date.now();
    if (clickCount < CLICK_THRESHOLD) return;
    if (now - lastTriggered < COOLDOWN) return;

    clickCount = 0;
    lastTriggered = now;

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
      // Smooth gradient movement (slower)
      logo.style.backgroundPosition = `${progress * 200}% 0`;
      if (elapsed < DURATION) {
        requestAnimationFrame(animate);
      } else {
        logo.style.color = ''; // reset to original color
        logo.style.background = 'none';
      }
    };

    requestAnimationFrame(animate);
  });
})();
