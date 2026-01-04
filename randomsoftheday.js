const testingMode = false;

/* ======================
   DATE + SEED UTILITIES
====================== */

// Returns the local day seed (changes daily)
function getDaySeed() {
  const now = new Date();
  const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor(localMidnight.getTime() / (1000*60*60*24));
}

// Returns local date string for cache
function getLocalDateString() {
  const now = new Date();
  const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return localMidnight.toISOString().slice(0,10);
}

// Display the current date
function renderCurrentDate() {
  const container = document.getElementById('current-date');
  if (!container) return;
  const today = new Date();
  container.textContent = today.toLocaleDateString('en-US',{month:'long',day:'numeric'});
}

/* ======================
   GENERIC CACHED FETCH
====================== */

async function fetchCached(key, fetchFn) {
  const today = getLocalDateString();
  const cacheKey = `daily_${key}`;
  const cacheDateKey = `daily_${key}_date`;

  const cachedData = localStorage.getItem(cacheKey);
  const cachedDate = localStorage.getItem(cacheDateKey);

  if (cachedData && cachedDate === today) return cachedData;

  try {
    const freshData = await fetchFn();
    localStorage.setItem(cacheKey, freshData);
    localStorage.setItem(cacheDateKey, today);
    return freshData;
  } catch (err) {
    console.error(`Error fetching ${key}:`, err);
    return cachedData || `Could not load ${key} today.`;
  }
}

/* ======================
   BIRTHDAY CHECK
====================== */

function isBirthday() {
  const today = new Date();
  return today.getMonth() === 2 && today.getDate() === 10; // March 10
}

/* ======================
   LETTER & NUMBER
====================== */

function renderLetter() {
  const container = document.querySelector('#random-letter .random-content');
  if (!container) return;

  if (isBirthday()) {
    container.textContent = "M";
  } else {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const index = (getDaySeed() * 7) % letters.length; // different seed multiplier
    container.textContent = letters[index];
  }
}

function renderNumber() {
  const container = document.querySelector('#random-number .random-content');
  if (!container) return;

  if (isBirthday()) {
    container.textContent = "10";
  } else {
    const num = ((getDaySeed() * 13 + 7) % 1000000) + 1; // offset to avoid collision with password
    container.textContent = num.toLocaleString();
  }
}

/* ======================
   PASSWORD
====================== */

function renderPassword() {
  const container = document.querySelector('#random-password .random-content');
  if (!container) return;

  if (isBirthday()) {
    container.textContent = "B1RTHD4YR4ND0MN3SS";
    return;
  }

  const seed = getDaySeed();
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";
  const all = upper + lower + numbers + symbols;

  let password = "";
  password += upper[(seed * 3) % upper.length]; // different offsets
  password += lower[(seed * 5) % lower.length];
  password += numbers[(seed * 7) % numbers.length];
  password += symbols[(seed * 11) % symbols.length];

  for (let i = 4; i < 12; i++) {
    password += all[(seed * (i + 1) * 17) % all.length];
  }

  password = password.split('').sort(() => ((seed + 1) % 3) - 1).join('');
  container.textContent = password;
}

/* ======================
   WORD OF THE DAY
====================== */

async function fetchWord() {
  if (isBirthday()) return "Celebration";
  const res = await fetch('https://random-word-api.vercel.app/api?words=1');
  if (!res.ok) throw new Error('Word fetch failed');
  const data = await res.json();
  return data[0];
}

async function renderWord() {
  const container = document.querySelector('#random-word .random-content');
  if (!container) return;
  container.textContent = await fetchCached('word', fetchWord);
}

/* ======================
   JOKE / ADVICE / FACT / MEME
====================== */

async function fetchJoke() {
  if (isBirthday()) return "Why did Randuino throw a party on THE Randoms? Because it was Arztiser's birthday!";
  const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
  const data = await res.json();
  return `${data.setup} ${data.punchline}`;
}

async function fetchAdvice() {
  if (isBirthday()) return "Be proud of how far you have gone, even if there is more to come.";
  const res = await fetch('https://api.adviceslip.com/advice');
  const data = await res.json();
  return data.slip.advice;
}

async function fetchFact() {
  if (isBirthday()) return "Arztiser's birthday is today.";
  const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
  const data = await res.json();
  return data.text;
}

async function fetchMeme() {
  if (isBirthday()) return "Today's meme got a free vacation!";
  const subs = ['memes','dankmemes','funny'];
  const seed = getDaySeed();
  const sub = subs[seed % subs.length];
  const url = `https://www.reddit.com/r/${sub}/hot.json?limit=50`;
  const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
  const json = await res.json();
  const imgs = json.data.children.filter(p => p.data.url.match(/\.(jpg|png)$/));
  return imgs.length ? imgs[seed % imgs.length].data.url : '';
}

async function renderJoke() { document.querySelector('#random-joke .random-content').textContent = await fetchCached('joke', fetchJoke); }
async function renderAdvice() { document.querySelector('#random-advice .random-content').textContent = await fetchCached('advice', fetchAdvice); }
async function renderFact() { document.querySelector('#random-fact .random-content').textContent = await fetchCached('fact', fetchFact); }
async function renderMeme() { 
  const url = await fetchCached('meme', fetchMeme); 
  const container = document.querySelector('#random-meme .random-content');
  if (!container) return;
  if (isBirthday()) { container.textContent = url; } 
  else { container.innerHTML = `<img src="${url}" style="max-width:100%;border-radius:8px;">`; }
}

/* ======================
   REFRESH ALL
====================== */

async function refreshAll() {
  renderLetter();
  renderNumber();
  renderPassword();
  await renderWord();
  await Promise.all([renderJoke(), renderAdvice(), renderFact(), renderMeme()]);
}

/* ======================
   LOCAL MIDNIGHT REFRESH
====================== */

function scheduleMidnightRefresh() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  setTimeout(async () => {
    renderCurrentDate();
    await refreshAll();
    setInterval(refreshAll, 86400000); // refresh every 24h after
  }, nextMidnight - now);
}

/* ======================
   INIT
====================== */

document.addEventListener('DOMContentLoaded', async () => {
  renderCurrentDate();
  await refreshAll();
  scheduleMidnightRefresh();
});
