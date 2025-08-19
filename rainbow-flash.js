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

    // Create a style element for rainbow animation if it doesn't exist
    if (!document.getElementById('rainbow-flash-style')) {
      const style = document.createElement('style');
      style.id = 'rainbow-flash-style';
      style.innerHTML = `
        @keyframes rainbowFlash {
          0% { color: #FF0000; }
          14% { color: #FF7F00; }
          28% { color: #FFFF00; }
          42% { color: #00FF00; }
          57% { color: #0000FF; }
          71% { color: #4B0082; }
          85% { color: #8F00FF; }
          100% { color: #FF0000; }
        }
        .rainbow-flash {
          animation: rainbowFlash 1s linear;
          font-weight: 900; /* extra bold for brightness */
        }
      `;
      document.head.appendChild(style);
    }

    // Add class to trigger animation
    logo.classList.add('rainbow-flash');

    // Remove class after 1 second
    setTimeout(() => {
      logo.classList.remove('rainbow-flash');
    }, 5000);
  }
});
