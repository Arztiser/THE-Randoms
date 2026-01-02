const testingMode = false;

/* ======================
   DATE + SEED UTILITIES
====================== */

// Global day ID in UTC (YYYY-MM-DD)
function getGlobalDayId() {
  return new Date().toISOString().slice(0, 10);
}

// Convert string to numeric seed
function hashStringToSeed(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// Get daily seed
function getDaySeed() {
  return hashStringToSeed(getGlobalDayId());
}

// Render current local date
function renderCurrentDate() {
  const container = document.getElementById('current-date');
  if (!container) return;
  const today = new Date();
  container.textContent = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });
}

/* ======================
   SEEDED PICKER UTILITY
====================== */

function pickFromArray(arr, seedOffset = 0) {
  const seed = getDaySeed() + seedOffset;
  return arr[seed % arr.length];
}

/* ======================
   CHECK IF BIRTHDAY
====================== */

function isBirthday() {
  const today = new Date();
  return today.getUTCMonth() === 2 && today.getUTCDate() === 10; // March 10
}

/* ======================
   LETTER & NUMBER
====================== */

function renderLetter() {
  const c = document.querySelector('#random-letter .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = "M"; // For March
  } else {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    c.textContent = pickFromArray(letters.split(''));
  }
}

function renderNumber() {
  const c = document.querySelector('#random-number .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = "10"; // March 10
  } else {
    const num = (getDaySeed() * 9301 + 49297) % 1000000 + 1;
    c.textContent = num.toLocaleString();
  }
}

/* ======================
   PASSWORD OF THE DAY
====================== */

function renderPassword() {
  const c = document.querySelector('#random-password .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = "B1RTHD4YR4ND0MN3SS";
  } else {
    const seed = getDaySeed();
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

    c.textContent = pw;
  }
}

/* ======================
   WORD OF THE DAY
====================== */

async function renderWord() {
  const c = document.querySelector('#random-word .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = "Celebration";
    return;
  }

  try {
    const res = await fetch('https://random-word-api.vercel.app/api?words=100');
    const words = await res.json();
    c.textContent = pickFromArray(words);
  } catch {
    const fallback = [
      "random","future","signal","pattern","system",
      "chaos","order","logic","web","code"
    ];
    c.textContent = pickFromArray(fallback);
  }
}

/* ======================
   JOKE / ADVICE / FACT
====================== */

async function renderJoke() {
  const c = document.querySelector('#random-joke .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = "Why did Randuino throw a party on THE Randoms? Because it was Arztiser's birthday!";
    return;
  }

  try {
    const res = await fetch('https://official-joke-api.appspot.com/jokes/ten');
    const jokes = await res.json();
    const j = pickFromArray(jokes);
    c.textContent = `${j.setup} ${j.punchline}`;
  } catch {
    c.textContent = "Today’s joke failed its own punchline.";
  }
}

async function renderAdvice() {
  const c = document.querySelector('#random-advice .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = "Be proud of how far you have gone, even if there is more to come.";
    return;
  }

  try {
    const res = await fetch('https://api.adviceslip.com/advice/search/a');
    const data = await res.json();
    if (!data.slips) throw 0;
    c.textContent = pickFromArray(data.slips).advice;
  } catch {
    c.textContent = "Don’t refresh expecting different advice.";
  }
}

async function renderFact() {
  const c = document.querySelector('#random-fact .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = "Arztiser's birthday is today.";
    return;
  }

  try {
    const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await res.json();
    c.textContent = data.text;
  } catch {
    c.textContent = "This fact was too useless to load.";
  }
}

/* ======================
   MEME OF THE DAY
====================== */

async function renderMeme() {
  const c = document.querySelector('#random-meme .random-content');
  if (!c) return;

  if (isBirthday()) {
    c.textContent = "Today's meme got a free vacation!";
    return;
  }

  try {
    const subs = ['memes','dankmemes','funny'];
    const sub = pickFromArray(subs);
    const url = `https://www.reddit.com/r/${sub}/hot.json?limit=50`;
    const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
    const json = await res.json();

    const imgs = json.data.children.filter(p =>
      p.data.url.match(/\.(jpg|png)$/)
    );

    const img = pickFromArray(imgs).data.url;
    c.innerHTML = `<img src="${img}" style="max-width:100%;border-radius:8px;">`;
  } catch {
    c.textContent = "Meme machine broke today.";
  }
}

/* ======================
   REFRESH ALL
====================== */

async function refreshAll() {
  renderLetter();
  renderNumber();
  renderPassword();
  await Promise.all([
    renderWord(),
    renderJoke(),
    renderAdvice(),
    renderFact(),
    renderMeme()
  ]);
}

/* ======================
   LOCAL MIDNIGHT REFRESH
====================== */

function scheduleLocalMidnightRefresh() {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0, 0, 0, 0
  );

  setTimeout(() => {
    location.reload();
  }, nextMidnight - now);
}

/* ======================
   INIT
====================== */

document.addEventListener('DOMContentLoaded', async () => {
  renderCurrentDate();
  await refreshAll();
  scheduleLocalMidnightRefresh();
});
