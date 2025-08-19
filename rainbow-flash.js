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

    // Apply rainbow style
    logo.style.background = 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)';
    logo.style.webkitBackgroundClip = 'text';
    logo.style.webkitTextFillColor = 'transparent';
    logo.style.fontWeight = '900'; // optional: make it bolder for brightness
    logo.style.transition = 'background 0.3s ease-in-out';

    // Animate a rainbow shift
    let step = 0;
    const interval = setInterval(() => {
      step += 20;
      logo.style.background = `linear-gradient(${step}deg, red, orange, yellow, green, blue, indigo, violet)`;
    }, 50);

    // Stop animation after 1 second
    setTimeout(() => {
      clearInterval(interval);
      logo.style.background = '';
      logo.style.webkitBackgroundClip = '';
      logo.style.webkitTextFillColor = '';
      logo.style.fontWeight = '';
    }, 1000);
  }
});
