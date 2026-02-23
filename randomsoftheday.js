const testingMode = false;

/* ======================
   DATE + DAY HELPERS
====================== */
function getLocalDayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/* ======================
   USER + DAY SEED
====================== */
function getUserId() {
  let id = localStorage.getItem('user_id');
  if (!id) {
    id = Math.random().toString(36).slice(2, 12);
    localStorage.setItem('user_id', id);
  }
  return id;
}

function getUserDaySeed() {
  const userId = getUserId();
  const dayKey = getLocalDayKey();
  const str = userId + dayKey;

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/* ======================
   DATE RENDER
====================== */
function renderCurrentDate() {
  const el = document.getElementById('current-date');
  if (!el) return;

  el.textContent = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });
}

/* ======================
   BIRTHDAY CHECK
====================== */
function isBirthday() {
  const d = new Date();
  return d.getMonth() === 2 && d.getDate() === 10; // March 10
}

/* ======================
   LETTER
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

/* ======================
   NUMBER
====================== */
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
  const nums = "0123456789";
  const syms = "!@#$%^&*()-_=+[]{};:,.<>?";
  const all = upper + lower + nums + syms;

  let pw = "";
  pw += upper[seed % upper.length];
  pw += lower[(seed * 3) % lower.length];
  pw += nums[(seed * 7) % nums.length];
  pw += syms[(seed * 11) % syms.length];

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

  const today = getLocalDayKey();
  const cachedWord = localStorage.getItem('daily_word');
  const cachedDate = localStorage.getItem('daily_word_date');

  if (cachedWord && cachedDate === today) {
    c.textContent = cachedWord;
    return;
  }

  if (isBirthday()) {
    c.textContent = 'Celebration';
    return;
  }

  async function tryFetch(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API failed");
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data.word || data;
  }

  try {
    // API 1 (Primary)
    const word = await tryFetch(
      'https://random-word-api.vercel.app/api?words=1'
    );

    localStorage.setItem('daily_word', word);
    localStorage.setItem('daily_word_date', today);
    c.textContent = word;
  } catch {
    try {
      // API 2 (Backup)
      const word = await tryFetch(
        'https://random-word-api.herokuapp.com/word'
      );

      localStorage.setItem('daily_word', word);
      localStorage.setItem('daily_word_date', today);
      c.textContent = word;
    } catch {
      // Final Local Fallback (Seeded)
      const fallback = ["random","fun","code","site","day"];
      const word = fallback[getUserDaySeed() % fallback.length];

      localStorage.setItem('daily_word', word);
      localStorage.setItem('daily_word_date', today);
      c.textContent = word;
    }
  }
}

/* ======================
   DAILY CACHE FETCH
====================== */
async function fetchCached(key, fetchFn) {
  const today = getLocalDayKey();
  const val = localStorage.getItem(`daily_${key}`);
  const date = localStorage.getItem(`daily_${key}_date`);

  if (val && date === today) return val;

  const fresh = await fetchFn();
  localStorage.setItem(`daily_${key}`, fresh);
  localStorage.setItem(`daily_${key}_date`, today);
  return fresh;
}

/* ======================
   JOKE / ADVICE / FACT / MEME
====================== */
async function fetchJoke() {
  if (isBirthday()) return "Why did Randuino throw a party? Because it's Arztiser’s birthday!";
  const r = await fetch('https://official-joke-api.appspot.com/jokes/random');
  const d = await r.json();
  return `${d.setup} ${d.punchline}`;
}

async function renderJoke() {
  const c = document.querySelector('#random-joke .random-content');
  if (!c) return;
  c.textContent = await fetchCached('joke', fetchJoke);
}

async function fetchAdvice() {
  if (isBirthday()) return "Celebrate today. You earned it.";
  const r = await fetch('https://api.adviceslip.com/advice');
  const d = await r.json();
  return d.slip.advice;
}

async function renderAdvice() {
  const c = document.querySelector('#random-advice .random-content');
  if (!c) return;
  c.textContent = await fetchCached('advice', fetchAdvice);
}

async function fetchFact() {
  if (isBirthday()) return "Today is Arztiser’s birthday.";
  const r = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
  const d = await r.json();
  return d.text;
}

async function renderFact() {
  const c = document.querySelector('#random-fact .random-content');
  if (!c) return;
  c.textContent = await fetchCached('fact', fetchFact);
}

async function fetchMeme() {
  if (isBirthday()) return "Today's meme took the day off.";

  const seed = getUserDaySeed();

  // ---------- PRIMARY: Reddit ----------
  try {
    const subs = ['memes','dankmemes','funny'];
    const sub = subs[seed % subs.length];

    const url = `https://www.reddit.com/r/${sub}/hot.json?limit=50`;
    const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error("Reddit failed");

    const json = await res.json();
    const imgs = json.data.children
      .map(p => p.data.url)
      .filter(url => url.match(/\.(jpg|png)$/));

    if (!imgs.length) throw new Error("No images found");

    return imgs[seed % imgs.length];

  } catch {

    // ---------- BACKUP: meme-api ----------
    try {
      const res = await fetch('https://meme-api.com/gimme');
      if (!res.ok) throw new Error("Meme API failed");

      const data = await res.json();

      // Only return image
      if (data.url && data.url.match(/\.(jpg|png|jpeg)$/)) {
        return data.url;
      }

      throw new Error("Invalid image");

    } catch {

      // ---------- FINAL LOCAL FALLBACK ----------
      return "/img/default-meme.jpg";
    }
  }
}

/* ======================
   VAULT ARCHIVE
====================== */
function archiveTodayToVault() {
  const today = getLocalDayKey();
  const keys = ["word", "joke", "advice", "fact", "meme", "password", "letter", "number"];

  const vault = JSON.parse(localStorage.getItem('vault')) || {};
  vault[today] = {};
  keys.forEach(key => {
    const val = localStorage.getItem(`daily_${key}`);
    if (val) vault[today][key] = val;
  });

  localStorage.setItem('vault', JSON.stringify(vault));
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
  await Promise.all([
    renderJoke(),
    renderAdvice(),
    renderFact(),
    renderMeme()
  ]);

  // Archive today’s randoms to vault
  archiveTodayToVault();
}

/* ======================
   MIDNIGHT AUTO REFRESH
====================== */
function scheduleMidnightRefresh() {
  function scheduleNext() {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0, 0
    );

    setTimeout(async () => {
      await refreshAll();
      scheduleNext();
    }, nextMidnight - now);
  }
  scheduleNext();
}

/* ======================
   DAY CHANGE SAFETY NET
====================== */
let lastDayKey = getLocalDayKey();
setInterval(async () => {
  const current = getLocalDayKey();
  if (current !== lastDayKey) {
    lastDayKey = current;
    await refreshAll();
  }
}, 60 * 1000);

/* ======================
   INIT
====================== */
document.addEventListener('DOMContentLoaded', async () => {
  await refreshAll();
  scheduleMidnightRefresh();
});
