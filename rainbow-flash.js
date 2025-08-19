// rainbow-flash.js
(() => {
  const logo = document.querySelector('.logo');
  const CLICK_THRESHOLD = 10;
  const EFFECT_DURATION = 5000; // 5 seconds
  const COOLDOWN = 60 * 60 * 1000; // 1 hour
  let clickCount = 0;

  const rainbowColors = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00',
    '#0000FF', '#4B0082', '#8B00FF'
  ];

  function animateRainbow(element) {
    let start = null;
    const text = element.textContent;
    const gradientSteps = rainbowColors.length;
    
    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percent = (elapsed / EFFECT_DURATION) % 1; // cycle across duration

      let gradientStr = 'linear-gradient(to right, ';
      for (let i = 0; i < gradientSteps; i++) {
        const colorIndex = (i + Math.floor(percent * gradientSteps)) % gradientSteps;
        gradientStr += rainbowColors[colorIndex] + (i < gradientSteps - 1 ? ', ' : '');
      }
      gradientStr += ')';

      element.style.background = gradientStr;
      element.style.webkitBackgroundClip = 'text';
      element.style.webkitTextFillColor = 'transparent';
      element.style.display = 'inline-block';

      if (elapsed < EFFECT_DURATION) {
        requestAnimationFrame(step);
      } else {
        element.style.background = '';
        element.style.webkitBackgroundClip = '';
        element.style.webkitTextFillColor = '';
      }
    }

    requestAnimationFrame(step);
  }

  logo.addEventListener('click', () => {
    const lastTime = localStorage.getItem('rainbowLast') || 0;
    const now = Date.now();

    if (now - lastTime < COOLDOWN) return; // still on cooldown

    clickCount++;
    if (clickCount >= CLICK_THRESHOLD) {
      localStorage.setItem('rainbowLast', now);
      clickCount = 0;
      animateRainbow(logo);
    }
  });
})();
