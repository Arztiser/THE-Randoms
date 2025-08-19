// rainbow-flash.js
(() => {
  const logo = document.querySelector('.logo');
  const content = document.querySelector('.content');
  const COOLDOWN = 60 * 60 * 1000; // 1 hour in ms
  const DURATION = 5000; // 5 seconds of rainbow

  let lastTriggered = 0;

  logo.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastTriggered < COOLDOWN) return;
    lastTriggered = now;

    // Apply rainbow gradient
    content.style.background = 'none';
    content.style.color = 'transparent';
    content.style.backgroundImage = 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)';
    content.style.backgroundClip = 'text';
    content.style.webkitBackgroundClip = 'text';
    content.style.transition = `background-image ${DURATION}ms ease, color ${DURATION}ms ease`;

    // Fade out after DURATION
    setTimeout(() => {
      content.style.color = '#000'; // or whatever your default text color is
      content.style.backgroundImage = 'none';
    }, DURATION);
  });
})();
