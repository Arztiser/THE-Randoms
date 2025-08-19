let clickCount = 0;
let lastFlash = 0;

const logo = document.getElementById('homepage-logo');

logo.addEventListener('click', () => {
  const now = Date.now();
  if (now - lastFlash < 60000) return; // 1-minute cooldown
  clickCount++;

  if (clickCount >= 10) {
    clickCount = 0;
    lastFlash = now;

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'repeating-linear-gradient(90deg, red, orange 10%, yellow 20%, green 30%, blue 40%, indigo 50%, violet 60%)';
    overlay.style.zIndex = '9999';
    document.body.appendChild(overlay);

    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 1000); // flash for 1 second
  }
});
