const testingMode = false;

/* ======================
   DATE + UTILS
====================== */
function getLocalDayId() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
}

function isBirthday() {
  const today = new Date();
  return today.getMonth() === 2 && today.getDate() === 10; // March 10
}

function renderCurrentDate() {
  const c = document.getElementById('current-date');
  if (!c) return;
  const today = new Date();
  c.textContent = today.toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
}

/* ======================
   SYNC LOCALSTORAGE HELPER
====================== */
function getDailyValue(key, generator) {
  const today = getLocalDayId();
  const valueKey = `daily_${key}`;
  const dateKey = `daily_${key}_date`;

  const cached = localStorage.getItem(valueKey);
  const cachedDate = localStorage.getItem(dateKey);

  if (cached && cachedDate === today) return cached;

  const value = generator();
  localStorage.setItem(valueKey, value);
  localStorage.setItem(dateKey, today);
  return value;
}

/* ======================
   ASYNC LOCALSTORAGE HELPER
====================== */
async function getDailyAsyncValue(key, generator) {
  const today = getLocalDayId();
  const valueKey = `daily_${key}`;
  const dateKey = `daily_${key}_date`;

  const cached = localStorage.getItem(valueKey);
  const cachedDate = localStorage.getItem(dateKey);

  if (cached && cachedDate === today) return cached;

  const value = await generator();
  localStorage.setItem(valueKey, value);
  localStorage.setItem(dateKey, today);
  return value;
}

/* ======================
   LETTER & NUMBER
====================== */
function renderLetter() {
  const c = document.querySelector('#random-letter .random-content');
  if (!c) return;

  const letter = isBirthday()
    ? "M"
    : getDailyValue('letter', () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random()*26)));

  c.textContent = letter;
}

function renderNumber() {
  const c = document.querySelector('#random-number .random-content');
  if (!c) return;

  const number = isBirthday()
    ? "10"
    : getDailyValue('number', () => (Math.floor(Math.random()*1000000)+1).toLocaleString());

  c.textContent = number;
}

/* ======================
   PASSWORD
====================== */
function renderPassword() {
  const c = document.querySelector('#random-password .random-content');
  if (!c) return;

  if (isBirthday()) { 
    c.textContent = "B1RTHD4YR4ND0MN3SS"; 
    return; 
  }

  const pw = getDailyValue('password', () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";
    const all = upper + lower + numbers + symbols;

    let p = "";
    p += upper.charAt(Math.floor(Math.random() * upper.length));
    p += lower.charAt(Math.floor(Math.random() * lower.length));
    p += numbers.charAt(Math.floor(Math.random() * numbers.length));
    p += symbols.charAt(Math.floor(Math.random() * symbols.length));
    for (let i = 4; i < 12; i++) p += all.charAt(Math.floor(Math.random() * all.length));

    return p;
  });

  c.textContent = pw;
}

/* ======================
   WORD
====================== */
async function renderWord() {
  const c = document.querySelector('#random-word .random-content');
  if (!c) return;

  if (isBirthday()) { c.textContent = "Celebration"; return; }

  const word = await getDailyAsyncValue('word', async () => {
    try {
      const res = await fetch('https://random-word-api.vercel.app/api?words=1');
      const data = await res.json();
      return data[0];
    } catch {
      return "random";
    }
  });

  c.textContent = word;
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

  const joke = await getDailyAsyncValue('joke', async () => {
    try {
      const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
      const data = await res.json();
      return `${data.setup} ${data.punchline}`;
    } catch {
      return "Today's joke failed.";
    }
  });

  c.textContent = joke;
}

async function renderAdvice() {
  const c = document.querySelector('#random-advice .random-content');
  if (!c) return;

  if (isBirthday()) { 
    c.textContent = "Be proud of how far you have gone, even if there is more to come."; 
    return; 
  }

  const advice = await getDailyAsyncValue('advice', async () => {
    try {
      const res = await fetch('https://api.adviceslip.com/advice');
      const data = await res.json();
      return data.slip.advice;
    } catch {
      return "Advice unavailable today.";
    }
  });

  c.textContent = advice;
}

async function renderFact() {
  const c = document.querySelector('#random-fact .random-content');
  if (!c) return;

  if (isBirthday()) { 
    c.textContent = "Arztiser's birthday is today."; 
    return; 
  }

  const fact = await getDailyAsyncValue('fact', async () => {
    try {
      const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await res.json();
      return data.text;
    } catch {
      return "Fact unavailable today.";
    }
  });

  c.textContent = fact;
}

/* ======================
   MEME
====================== */
async function renderMeme() {
  const c = document.querySelector('#random-meme .random-content');
  if (!c) return;

  if (isBirthday()) { 
    c.textContent = "Today's meme got a free vacation!"; 
    return; 
  }

  const meme = await getDailyAsyncValue('meme', async () => {
    try {
      const subs = ['memes','dankmemes','funny'];
      const sub = subs[Math.floor(Math.random()*subs.length)];
      const res = await fetch(`https://corsproxy.io/?https://www.reddit.com/r/${sub}/hot.json?limit=50`);
      const data = await res.json();
      const imgs = data.data.children.filter(p => p.data.url.match(/\.(jpg|png)$/));
      if (!imgs.length) return null;
      const img = imgs[Math.floor(Math.random()*imgs.length)].data.url;
      return img;
    } catch {
      return null;
    }
  });

  if (meme) c.innerHTML = `<img src="${meme}" style="max-width:100%;border-radius:8px;">`;
  else c.textContent = "Meme unavailable today.";
}

/* ======================
   REFRESH ALL
====================== */
async function refreshAll() {
  renderCurrentDate();
  renderLetter();
  renderNumber();
  renderPassword();
  await Promise.all([renderWord(), renderJoke(), renderAdvice(), renderFact(), renderMeme()]);
}

/* ======================
   LOCAL MIDNIGHT RELOAD
====================== */
function scheduleLocalMidnightReload() {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,0,0,0
  );
  setTimeout(() => location.reload(), nextMidnight - now);
}

/* ======================
   INIT
====================== */
document.addEventListener('DOMContentLoaded', () => {
  refreshAll();
  scheduleLocalMidnightReload();
});
