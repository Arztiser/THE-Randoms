// Helper to dynamically load other JS files
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => resolve(src);
    script.onerror = () => reject(new Error(`Failed to load script ${src}`));
    document.head.appendChild(script);
  });
}

// List your API JS files here exactly as you have them
const apiScripts = [
  'jokes-api.js',     // your joke fetch + render logic
  'advice-api.js',    // your advice fetch + render logic
  'facts-api.js',     // your fact fetch + render logic
  'quotes-api.js',    // your quote fetch + render logic
  'words-api.js'      // your word fetch + render logic
  // Letters and Numbers are handled directly in this file below
];

// Load all scripts asynchronously
Promise.all(apiScripts.map(loadScript))
  .then(() => {
    console.log('All API scripts loaded successfully.');
    // If your API scripts have init functions, call them here.
    if (typeof initJokes === 'function') initJokes();
    if (typeof initAdvice === 'function') initAdvice();
    if (typeof initFacts === 'function') initFacts();
    if (typeof initQuotes === 'function') initQuotes();
    if (typeof initWords === 'function') initWords();

    // Letters & Numbers handled here
    renderLetter();
    renderNumber();
  })
  .catch(err => console.error(err));


// Letters: A-Z random letter of the day (same for everyone)
function renderLetter() {
  const container = document.querySelector('#random-letter .random-content');
  if (!container) return;

  // Calculate seed based on day (midnight UTC)
  const daySeed = getDaySeed();

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const index = daySeed % letters.length;
  container.textContent = letters[index];
}

// Numbers: 1 to 1,000,000 (random number of the day)
function renderNumber() {
  const container = document.querySelector('#random-number .random-content');
  if (!container) return;

  const daySeed = getDaySeed();

  // Simple pseudo-random number based on day seed
  // Scale to 1 to 1,000,000 inclusive
  const num = (daySeed * 9301 + 49297) % 1000000 + 1;

  container.textContent = num.toLocaleString();
}

// Returns a simple "seed" based on current UTC date, same for everyone on same day
function getDaySeed() {
  const now = new Date();
  // UTC midnight timestamp
  const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  // Just use days since epoch
  return Math.floor(utcMidnight / (1000 * 60 * 60 * 24));
}
