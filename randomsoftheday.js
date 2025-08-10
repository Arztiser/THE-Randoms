// --- Helper: UTC day string ---
function getTodayUTC() {
  return new Date().toISOString().slice(0,10); // YYYY-MM-DD in UTC
}

// --- Helper: get day seed number (days since epoch UTC) ---
function getDaySeed() {
  const now = new Date();
  const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor(utcMidnight / (1000 * 60 * 60 * 24));
}

// --- Cache helper ---
function getCachedData(key) {
  const cached = localStorage.getItem(key);
  const cachedDate = localStorage.getItem(key + 'Date');
  const today = getTodayUTC();
  if (cached && cachedDate === today) {
    return JSON.parse(cached);
  }
  return null;
}
function setCachedData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(key + 'Date', getTodayUTC());
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

async function fetchQuotes() {
  const cached = getCachedData('dailyQuotes');
  if (cached) return cached;

  try {
    const response = await fetch(QUOTES_API_URL, {
      headers: { 'X-Api-Key': QUOTES_API_KEY }
    });
    if (!response.ok) throw new Error('Failed to fetch quotes');
    const quotes = await response.json();
    setCachedData('dailyQuotes', quotes);
    return quotes;
  } catch(err) {
    console.error('Error fetching quotes:', err);
    return [];
  }
}

async function renderQuote() {
  const container = document.querySelector('#random-quote .random-content');
  if (!container) return;

  const quotes = await fetchQuotes();
  if (quotes.length === 0) {
    container.textContent = 'Could not load quote today.';
    return;
  }

  const daySeed = getDaySeed();
  const index = daySeed % quotes.length;
  const q = quotes[index];
  container.textContent = `"${q.quote}" — ${q.author}`;
}

// --- Fetch & Cache Jokes ---
const JOKES_API_URL = 'https://official-joke-api.appspot.com/jokes/ten'; // fetch 10 jokes once daily

async function fetchJokes() {
  const cached = getCachedData('dailyJokes');
  if (cached) return cached;

  try {
    const response = await fetch(JOKES_API_URL);
    if (!response.ok) throw new Error('Failed to fetch jokes');
    const jokes = await response.json();
    setCachedData('dailyJokes', jokes);
    return jokes;
  } catch(err) {
    console.error('Error fetching jokes:', err);
    return [];
  }
}

async function renderJoke() {
  const container = document.querySelector('#random-joke .random-content');
  if (!container) return;

  const jokes = await fetchJokes();
  if (jokes.length === 0) {
    container.textContent = 'Could not load joke today.';
    return;
  }

  const daySeed = getDaySeed();
  const index = daySeed % jokes.length;
  const joke = jokes[index];
  container.textContent = `${joke.setup} ${joke.punchline}`;
}

// --- Fetch & Cache Advice ---
const ADVICE_API_URL = 'https://api.adviceslip.com/advice';

async function fetchAdvice() {
  const cached = getCachedData('dailyAdvice');
  if (cached) return cached;

  try {
    const response = await fetch(ADVICE_API_URL);
    if (!response.ok) throw new Error('Failed to fetch advice');
    const data = await response.json();
    setCachedData('dailyAdvice', data.slip.advice);
    return data.slip.advice;
  } catch(err) {
    console.error('Error fetching advice:', err);
    return null;
  }
}

async function renderAdvice() {
  const container = document.querySelector('#random-advice .random-content');
  if (!container) return;

  const advice = await fetchAdvice();
  container.textContent = advice ?? 'Could not load advice today.';
}

// --- Fetch & Cache Facts ---
const FACTS_API_URL = 'https://uselessfacts.jsph.pl/random.json?language=en';

async function fetchFacts() {
  const cached = getCachedData('dailyFacts');
  if (cached) return cached;

  try {
    const response = await fetch(FACTS_API_URL);
    if (!response.ok) throw new Error('Failed to fetch fact');
    const data = await response.json();
    setCachedData('dailyFacts', data.text);
    return data.text;
  } catch(err) {
    console.error('Error fetching fact:', err);
    return null;
  }
}

async function renderFact() {
  const container = document.querySelector('#random-fact .random-content');
  if (!container) return;

  const fact = await fetchFacts();
  container.textContent = fact ?? 'Could not load fact today.';
}

// --- Fetch & Cache Words ---
const WORDS_API_URL = 'https://random-word-api.herokuapp.com/word?number=10';

async function fetchWords() {
  const cached = getCachedData('dailyWords');
  if (cached) return cached;

  try {
    const response = await fetch(WORDS_API_URL);
    if (!response.ok) throw new Error('Failed to fetch words');
    const data = await response.json();
    setCachedData('dailyWords', data);
    return data;
  } catch(err) {
    console.error('Error fetching words:', err);
    return [];
  }
}

async function renderWord() {
  const container = document.querySelector('#random-word .random-content');
  if (!container) return;

  const words = await fetchWords();
  if (words.length === 0) {
    container.textContent = 'Could not load word today.';
    return;
  }

  const daySeed = getDaySeed();
  const index = daySeed % words.length;
  container.textContent = words[index];
}

// --- Main render function ---
async function renderAll() {
  renderLetter();
  renderNumber();

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
