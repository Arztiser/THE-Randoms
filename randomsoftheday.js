// --- Helper Functions ---
function getDaySeed() {
  const now = new Date();
  const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor(utcMidnight / (1000 * 60 * 60 * 24));
}

// --- Letters: A-Z daily letter ---
function renderLetter() {
  const container = document.querySelector('#random-letter .random-content');
  if (!container) return;

  const daySeed = getDaySeed();
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const index = daySeed % letters.length;
  container.textContent = letters[index];
}

// --- Numbers: 1 to 1,000,000 daily number ---
function renderNumber() {
  const container = document.querySelector('#random-number .random-content');
  if (!container) return;

  const daySeed = getDaySeed();
  const num = (daySeed * 9301 + 49297) % 1000000 + 1;
  container.textContent = num.toLocaleString();
}

// --- Fetch & Cache Quotes (API Ninjas) ---
const QUOTES_API_KEY = 'FR8mmO+e7SROk9kwWAV0pQ==oNvn980zs2urHjdC';
const QUOTES_API_URL = 'https://api.api-ninjas.com/v1/quotes?limit=10';

async function fetchAndCacheQuotes() {
  const cached = localStorage.getItem('dailyQuotes');
  const cachedDate = localStorage.getItem('dailyQuotesDate');
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  if (cached && cachedDate === today) {
    return JSON.parse(cached);
  }

  try {
    const response = await fetch(QUOTES_API_URL, {
      headers: { 'X-Api-Key': QUOTES_API_KEY }
    });
    if (!response.ok) throw new Error('Failed to fetch quotes');
    const quotes = await response.json();

    localStorage.setItem('dailyQuotes', JSON.stringify(quotes));
    localStorage.setItem('dailyQuotesDate', today);

    return quotes;
  } catch (err) {
    console.error('Error fetching quotes:', err);
    return [];
  }
}

async function renderQuote() {
  const container = document.querySelector('#random-quote .random-content');
  if (!container) return;

  const quotes = await fetchAndCacheQuotes();
  if (quotes.length === 0) {
    container.textContent = 'Could not load quote today.';
    return;
  }

  const daySeed = getDaySeed();
  const index = daySeed % quotes.length;
  const quoteObj = quotes[index];

  container.textContent = `"${quoteObj.quote}" — ${quoteObj.author}`;
}

// --- Fetch & Render Jokes ---
async function fetchJoke() {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
    if (!response.ok) throw new Error('Failed to fetch joke');
    const joke = await response.json();
    return `${joke.setup} ${joke.punchline}`;
  } catch (err) {
    console.error('Jokes API error:', err);
    return 'Could not load joke today.';
  }
}

async function renderJoke() {
  const container = document.querySelector('#random-joke .random-content');
  if (!container) return;
  const joke = await fetchJoke();
  container.textContent = joke;
}

// --- Fetch & Render Advice ---
async function fetchAdvice() {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok) throw new Error('Failed to fetch advice');
    const data = await response.json();
    return data.slip.advice;
  } catch (err) {
    console.error('Advice API error:', err);
    return 'Could not load advice today.';
  }
}

async function renderAdvice() {
  const container = document.querySelector('#random-advice .random-content');
  if (!container) return;
  const advice = await fetchAdvice();
  container.textContent = advice;
}

// --- Fetch & Render Facts ---
async function fetchFact() {
  try {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    if (!response.ok) throw new Error('Failed to fetch fact');
    const data = await response.json();
    return data.text;
  } catch (err) {
    console.error('Facts API error:', err);
    return 'Could not load fact today.';
  }
}

async function renderFact() {
  const container = document.querySelector('#random-fact .random-content');
  if (!container) return;
  const fact = await fetchFact();
  container.textContent = fact;
}

// --- Fetch & Render Words ---
async function fetchWord() {
  try {
    // Example API for a random word
    const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    if (!response.ok) throw new Error('Failed to fetch word');
    const data = await response.json();
    return data[0];
  } catch (err) {
    console.error('Words API error:', err);
    return 'Could not load word today.';
  }
}

async function renderWord() {
  const container = document.querySelector('#random-word .random-content');
  if (!container) return;
  const word = await fetchWord();
  container.textContent = word;
}

// --- Main function to render all ---
async function renderAll() {
  // Letters and Numbers sync to day seed, no fetch
  renderLetter();
  renderNumber();

  // Fetch and render APIs
  await Promise.all([
    renderJoke(),
    renderAdvice(),
    renderFact(),
    renderQuote(),
    renderWord()
  ]);
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
});
