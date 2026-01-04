const testingMode = false;

/* ======================
   USER + DAY SEED
====================== */

// Generate a persistent user ID
function getUserId() {
  let id = localStorage.getItem('user_id');
  if (!id) {
    id = Math.random().toString(36).slice(2,12); // 10-char random string
    localStorage.setItem('user_id', id);
  }
  return id;
}

// Generate a numeric seed for this user + local day
function getUserDaySeed() {
  const userId = getUserId();
  const now = new Date();
  const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayString = localMidnight.toISOString().slice(0,10);
  const str = userId + dayString;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// Render current date
function renderCurrentDate() {
  const container = document.getElementById('current-date');
  if (!container) return;
  const today = new Date();
  container.textContent = today.toLocaleDateString('en-US',{month:'long',day:'numeric'});
}

/* ======================
   CHECK BIRTHDAY
====================== */
function isBirthday() {
  const today = new Date();
  return today.getMonth() === 2 && today.getDate() === 10; // March 10
}

/* ======================
   LETTER & NUMBER
====================== */
function renderLetter() {
  const c = document.querySelector('#random-letter .random-content');
  if (!c) return;
  if (isBirthday()) {
    c.textContent = 'M';
    return;
  }
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const seed = getUserDaySeed();
  c.textContent = letters[seed % letters.length];
}

function renderNumber() {
  const c = document.querySelector('#random-number .random-content');
  if (!c) return;
  if (isBirthday()) {
    c.textContent = '10';
    return;
  }
  const seed = getUserDaySeed();
  const num = (seed * 9301 + 49297) % 1000000 + 1;
  c.textContent = num.toLocaleString();
}

/* ======================
   PASSWORD
====================== */
function renderPassword() {
  const c = document.querySelector('#random-password .random-content');
  if (!c) return;
  if (isBirthday()) {
    c.textContent = 'B1RTHD4YR4ND0MN3SS';
    return;
  }
  const seed = getUserDaySeed();
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";
  const all = upper + lower + numbers + symbols;

  let pw = "";
  pw += upper[seed % upper.length];
  pw += lower[(seed * 3) % lower.length];
  pw += numbers[(seed * 7) % numbers.length];
  pw += symbols[(seed * 11) % symbols.length];
  for (let i = 4; i < 12; i++) {
    pw += all[(seed * (i + 1) * 17) % all.length];
  }
  pw = pw.split('').sort(() => (seed % 3) - 1).join('');
  c.textContent = pw;
}

/* ======================
   WORD
====================== */
async function renderWord() {
  const c = document.querySelector('#random-word .random-content');
  if (!c) return;

  const today = new Date().toISOString().slice(0,10);
  const cacheKey = 'daily_word';
  const cacheDateKey = 'daily_word_date';
  const cachedWord = localStorage.getItem(cacheKey);
  const cachedDate = localStorage.getItem(cacheDateKey);

  if (cachedWord && cachedDate === today) {
    c.textContent = cachedWord;
    return;
  }

  if (isBirthday()) {
    c.textContent = 'Celebration';
    return;
  }

  try {
    const res = await fetch('https://random-word-api.vercel.app/api?words=1');
    const data = await res.json();
    const word = data[0];
    localStorage.setItem(cacheKey, word);
    localStorage.setItem(cacheDateKey, today);
    c.textContent = word;
  } catch {
    const fallback = ["random","fun","color","code","web","page","day","fact","letter","test"];
    const word = fallback[getUserDaySeed() % fallback.length];
    localStorage.setItem(cacheKey, word);
    localStorage.setItem(cacheDateKey, today);
    c.textContent = word;
  }
}

/* ======================
   JOKE / ADVICE / FACT / MEME
====================== */
async function fetchCached(key, fetchFn) {
  const today = new Date().toISOString().slice(0,10);
  const cacheKey = `daily_${key}`;
  const cacheDateKey = `daily_${key}_date`;

  const cachedData = localStorage.getItem(cacheKey);
  const cachedDate = localStorage.getItem(cacheDateKey);

  if (cachedData && cachedDate === today) return cachedData;

  const freshData = await fetchFn();
  localStorage.setItem(cacheKey, freshData);
  localStorage.setItem(cacheDateKey, today);
  return freshData;
}

// Jokes
async function fetchJoke() {
  if (isBirthday()) return "Why did Randuino throw a party on THE Randoms? Because it was Arztiser's birthday!";
  const r = await fetch('https://official-joke-api.appspot.com/jokes/random');
  const d = await r.json();
  return `${d.setup} ${d.punchline}`;
}
async function renderJoke() {
  const c = document.querySelector('#random-joke .random-content');
  if (!c) return;
  c.textContent = await fetchCached('joke', fetchJoke);
}

// Advice
async function fetchAdvice() {
  if (isBirthday()) return "Be proud of how far you have gone, even if there is more to come.";
  const r = await fetch('https://api.adviceslip.com/advice');
  const d = await r.json();
  return d.slip.advice;
}
async function renderAdvice() {
  const c = document.querySelector('#random-advice .random-content');
  if (!c) return;
  c.textContent = await fetchCached('advice', fetchAdvice);
}

// Fact
async function fetchFact() {
  if (isBirthday()) return "Arztiser's birthday is today.";
  const r = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
  const d = await r.json();
  return d.text;
}
async function renderFact() {
  const c = document.querySelector('#random-fact .random-content');
  if (!c) return;
  c.textContent = await fetchCached('fact', fetchFact);
}

// Meme
async function fetchMeme() {
  if (isBirthday()) return "Today's meme got a free vacation!";
  const subs = ['memes','dankmemes','funny'];
  const seed = getUserDaySeed();
  const sub = subs[seed % subs.length];
  const url = `https://www.reddit.com/r/${sub}/hot.json?limit=50`;
  const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
  const json = await res.json();
  const imgs = json.data.children.filter(p => p.data.url.match(/\.(jpg|png)$/));
  return imgs[seed % imgs.length].data.url;
}
async function renderMeme() {
  const c = document.querySelector('#random-meme .random-content');
  if (!c) return;
  const url = await fetchCached('meme', fetchMeme);
  if (url.startsWith('http')) c.innerHTML = `<img src="${url}" style="max-width:100%;border-radius:8px;">`;
  else c.textContent = url;
}

/* ======================
   REFRESH ALL
====================== */
async function refreshAll() {
  renderCurrentDate();
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
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  setTimeout(async () => {
    await refreshAll();
    setInterval(refreshAll, 24*60*60*1000);
  }, nextMidnight - now);
}

/* ======================
   INIT
====================== */
document.addEventListener('DOMContentLoaded', async () => {
  await refreshAll();
  scheduleMidnightRefresh();
});
