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
  const str = getUserId() + dayKey;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/* ======================
   BIRTHDAY
====================== */
function isBirthday() {
  const d = new Date();
  return d.getMonth() === 2 && d.getDate() === 10;
}

/* ======================
   GENERIC DAILY CACHE
====================== */
async function fetchDaily(key, fetchFn) {
  const today = getLocalDayKey();
  const storedValue = localStorage.getItem(`daily_${key}`);
  const storedDate = localStorage.getItem(`daily_${key}_date`);

  if (storedValue && storedDate === today) {
    return storedValue;
  }

  const fresh = await fetchFn();
  localStorage.setItem(`daily_${key}`, fresh);
  localStorage.setItem(`daily_${key}_date`, today);
  return fresh;
}

/* ======================
   STATIC RANDOMS
====================== */
function renderLetter() {
  const el = document.querySelector('#random-letter .random-content');
  if (!el) return;

  if (isBirthday()) {
    el.textContent = 'M';
    return;
  }

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const seed = getUserDaySeed();
  el.textContent = letters[seed % letters.length];
}

function renderNumber() {
  const el = document.querySelector('#random-number .random-content');
  if (!el) return;

  if (isBirthday()) {
    el.textContent = '10';
    return;
  }

  const seed = getUserDaySeed();
  const num = (seed * 9301 + 49297) % 1000000 + 1;
  el.textContent = num.toLocaleString();
}

function renderPassword() {
  const el = document.querySelector('#random-password .random-content');
  if (!el) return;

  if (isBirthday()) {
    el.textContent = 'B1RTHD4YR4ND0MN3SS';
    return;
  }

  const seed = getUserDaySeed();
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let pw = "";
  for (let i = 0; i < 12; i++) {
    pw += chars[(seed * (i + 3) * 17) % chars.length];
  }

  el.textContent = pw;
}

/* ======================
   WORD
====================== */
async function renderWord() {
  const el = document.querySelector('#random-word .random-content');
  if (!el) return;

  if (isBirthday()) {
    el.textContent = "Celebration";
    return;
  }

  const word = await fetchDaily("word", async () => {
    try {
      const res = await fetch('https://random-word-api.vercel.app/api?words=1');
      const data = await res.json();
      return data[0];
    } catch {
      const fallback = ["random","fun","code","site","day"];
      return fallback[getUserDaySeed() % fallback.length];
    }
  });

  el.textContent = word;
}

/* ======================
   API CONTENT
====================== */
async function renderJoke() {
  const el = document.querySelector('#random-joke .random-content');
  if (!el) return;

  const joke = await fetchDaily("joke", async () => {
    if (isBirthday()) return "Why did Randuino throw a party? Because it's Arztiser’s birthday!";
    const r = await fetch('https://official-joke-api.appspot.com/jokes/random');
    const d = await r.json();
    return `${d.setup} ${d.punchline}`;
  });

  el.textContent = joke;
}

async function renderAdvice() {
  const el = document.querySelector('#random-advice .random-content');
  if (!el) return;

  const advice = await fetchDaily("advice", async () => {
    if (isBirthday()) return "Celebrate today. You earned it.";
    const r = await fetch('https://api.adviceslip.com/advice');
    const d = await r.json();
    return d.slip.advice;
  });

  el.textContent = advice;
}

async function renderFact() {
  const el = document.querySelector('#random-fact .random-content');
  if (!el) return;

  const fact = await fetchDaily("fact", async () => {
    if (isBirthday()) return "Today is Arztiser’s birthday.";
    const r = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const d = await r.json();
    return d.text;
  });

  el.textContent = fact;
}

async function renderMeme() {
  const el = document.querySelector('#random-meme .random-content');
  if (!el) return;

  const url = await fetchDaily("meme", async () => {
    if (isBirthday()) return "/img/default-meme.jpg";
    return "/img/default-meme.jpg";
  });

  el.innerHTML = `<img src="${url}" style="max-width:100%; border-radius:8px;">`;
}

/* ======================
   VAULT (YESTERDAY ONLY)
====================== */
function archiveIfNewDay() {
  const today = getLocalDayKey();
  const lastArchive = localStorage.getItem("last_archive_day");

  if (lastArchive === today) return;

  const yesterday = getYesterdayKey();
  const keys = ["word","joke","advice","fact","meme"];

  keys.forEach(key => {
    const val = localStorage.getItem(`daily_${key}`);
    if (val) {
      localStorage.setItem(`vault_${yesterday}_${key}`, val);
    }
  });

  localStorage.setItem("last_archive_day", today);
}

function loadVaultPage() {
  const yesterday = getYesterdayKey();
  const keys = ["word","joke","advice","fact","meme"];

  keys.forEach(key => {
    const el = document.querySelector(`#vault-${key} .vault-content`);
    if (!el) return;

    const stored = localStorage.getItem(`vault_${yesterday}_${key}`);
    if (!stored) return;

    if (key === "meme") {
      el.innerHTML = `<img src="${stored}" style="max-width:100%; border-radius:8px;">`;
    } else {
      el.textContent = stored;
    }
  });
}

/* ======================
   INIT
====================== */
document.addEventListener('DOMContentLoaded', async () => {
  archiveIfNewDay();
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
  loadVaultPage();
});
