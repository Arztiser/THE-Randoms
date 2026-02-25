const testingMode = false;

/* ======================
   DATE HELPERS
====================== */
function getLocalDayKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function getYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalDayKey(d);
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

function getUserDaySeed(dayKey = getLocalDayKey()) {
  const userId = getUserId();
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
  return d.getMonth() === 2 && d.getDate() === 10;
}

/* ======================
   LETTER / NUMBER / PASSWORD
====================== */
function renderLetter() {
  const c = document.querySelector('#random-letter .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = 'M';
    localStorage.setItem("daily_letter", "M");
    return;
  }

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const seed = getUserDaySeed();
  const val = letters[seed % letters.length];

  c.textContent = val;
  localStorage.setItem("daily_letter", val);
}

function renderNumber() {
  const c = document.querySelector('#random-number .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = '10';
    localStorage.setItem("daily_number", "10");
    return;
  }

  const seed = getUserDaySeed();
  const num = (seed * 9301 + 49297) % 1000000 + 1;
  const val = num.toLocaleString();

  c.textContent = val;
  localStorage.setItem("daily_number", val);
}

function renderPassword() {
  const c = document.querySelector('#random-password .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = 'B1RTHD4YR4ND0MN3SS';
    localStorage.setItem("daily_password", 'B1RTHD4YR4ND0MN3SS');
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
  localStorage.setItem("daily_password", pw);
}

/* ======================
   WORD
====================== */
async function renderWord() {
  const c = document.querySelector('#random-word .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = 'Celebration';
    localStorage.setItem("daily_word", "Celebration");
    return;
  }

  async function tryFetch(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data.word || data;
  }

  try {
    const word = await tryFetch('https://random-word-api.vercel.app/api?words=1');
    c.textContent = word;
    localStorage.setItem("daily_word", word);
  } catch {
    const fallback = ["random","fun","code","site","day"];
    const word = fallback[getUserDaySeed() % fallback.length];
    c.textContent = word;
    localStorage.setItem("daily_word", word);
  }
}

/* ======================
   CACHED FETCH
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

async function fetchAdvice() {
  if (isBirthday()) return "Celebrate today. You earned it.";
  const r = await fetch('https://api.adviceslip.com/advice');
  const d = await r.json();
  return d.slip.advice;
}

async function fetchFact() {
  if (isBirthday()) return "Today is Arztiser’s birthday.";
  const r = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
  const d = await r.json();
  return d.text;
}

async function fetchMeme() {
  if (isBirthday()) return "/img/default-meme.jpg";

  const seed = getUserDaySeed();

  try {
    const subs = ['memes','dankmemes','funny'];
    const sub = subs[seed % subs.length];
    const url = `https://www.reddit.com/r/${sub}/hot.json?limit=50`;
    const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error();

    const json = await res.json();
    const imgs = json.data.children
      .map(p => p.data.url)
      .filter(url => url.match(/\.(jpg|png|jpeg)$/));

    if (!imgs.length) throw new Error();

    return imgs[seed % imgs.length];
  } catch {
    return "/img/default-meme.jpg";
  }
}

async function renderJoke() {
  const c = document.querySelector('#random-joke .random-content');
  if (!c) return;
  const val = await fetchCached('joke', fetchJoke);
  c.textContent = val;
}

async function renderAdvice() {
  const c = document.querySelector('#random-advice .random-content');
  if (!c) return;
  const val = await fetchCached('advice', fetchAdvice);
  c.textContent = val;
}

async function renderFact() {
  const c = document.querySelector('#random-fact .random-content');
  if (!c) return;
  const val = await fetchCached('fact', fetchFact);
  c.textContent = val;
}

async function renderMeme() {
  const c = document.querySelector('#random-meme .random-content');
  if (!c) return;

  const url = await fetchCached('meme', fetchMeme);
  c.innerHTML = `<img src="${url}" style="max-width:100%; border-radius:8px;">`;
}

/* ======================
   ARCHIVE TODAY
====================== */
function archiveToday() {
  const today = getLocalDayKey();
  const keys = ["word","joke","advice","fact","meme","letter","number","password"];

  keys.forEach(key => {
    const val = localStorage.getItem(`daily_${key}`);
    if (val) {
      localStorage.setItem(`vault_${today}_${key}`, val);
    }
  });
}

/* ======================
   VAULT PAGE LOADER (YESTERDAY RANDOM FETCH)
====================== */
async function loadVaultPage() {
  const yesterdayKey = getYesterdayKey();
  const keys = ["word","joke","advice","fact","meme","letter","number","password"];

  for (let key of keys) {
    const el = document.querySelector(`#vault-${key} .vault-content`);
    if (!el) continue;

    let stored = localStorage.getItem(`vault_${yesterdayKey}_${key}`);

    if (!stored) {
      // Generate real random for joke/advice/fact/meme
      if (key === "joke") stored = await fetchJoke();
      else if (key === "advice") stored = await fetchAdvice();
      else if (key === "fact") stored = await fetchFact();
      else if (key === "meme") stored = await fetchMeme();
      else if (key === "letter") stored = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
      else if (key === "number") stored = Math.floor(Math.random() * 1000000).toLocaleString();
      else if (key === "password") stored = Math.random().toString(36).slice(2, 12);
      else if (key === "word") {
        const fallback = ["random","fun","code","site","day"];
        stored = fallback[Math.floor(Math.random() * fallback.length)];
      }

      localStorage.setItem(`vault_${yesterdayKey}_${key}`, stored);
    }

    if (key === "meme") el.innerHTML = `<img src="${stored}" style="max-width:100%; border-radius:8px;">`;
    else el.textContent = stored;
  }
}

// ---------- SIMULATE TOMORROW FOR TESTING ----------
const originalGetLocalDayKey = getLocalDayKey;
getLocalDayKey = function(date = new Date()) {
  // Add 1 day to the current date
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return originalGetLocalDayKey(d);
};

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
  archiveToday();
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
      0,0,0,0
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
  await loadVaultPage(); // <- now async to fetch randoms if needed
  scheduleMidnightRefresh();
});
