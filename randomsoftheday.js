const testingMode = false;

// Get YYYY-MM-DD for today (UTC)
function getGlobalDayId() {
  return new Date().toISOString().slice(0, 10);
}

// Check birthday
function isBirthday() {
  const today = new Date();
  return today.getUTCMonth() === 2 && today.getUTCDate() === 10; // March 10
}

// Render current local date
function renderCurrentDate() {
  const c = document.getElementById('current-date');
  if (!c) return;
  const today = new Date();
  c.textContent = today.toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
}

// Fetch & cache API results
async function fetchDaily(key, fetchFn) {
  const today = getGlobalDayId();
  const cached = localStorage.getItem(`daily_${key}`);
  const cachedDate = localStorage.getItem(`daily_${key}_date`);
  if (cached && cachedDate === today) return cached;

  try {
    const value = await fetchFn();
    localStorage.setItem(`daily_${key}`, value);
    localStorage.setItem(`daily_${key}_date`, today);
    return value;
  } catch {
    return localStorage.getItem(`daily_${key}`) || `Could not load ${key} today.`;
  }
}

/* ======================
   LETTER, NUMBER, PASSWORD, WORD
====================== */
function renderLetter() {
  const c = document.querySelector('#random-letter .random-content');
  if (!c) return;
  c.textContent = isBirthday() ? "M" : "A"; // deterministic
}

function renderNumber() {
  const c = document.querySelector('#random-number .random-content');
  if (!c) return;
  c.textContent = isBirthday() ? "10" : "12345"; // deterministic placeholder
}

function renderPassword() {
  const c = document.querySelector('#random-password .random-content');
  if (!c) return;
  c.textContent = isBirthday() ? "B1RTHD4YR4ND0MN3SS" : "R4ND0MD4ILY";
}

async function renderWord() {
  const c = document.querySelector('#random-word .random-content');
  if (!c) return;

  if (isBirthday()) { c.textContent = "Celebration"; return; }

  const word = await fetchDaily('word', async () => {
    const res = await fetch('https://random-word-api.vercel.app/api?words=1');
    const data = await res.json();
    return data[0];
  });

  c.textContent = word;
}

/* ======================
   JOKE, ADVICE, FACT
====================== */
async function renderJoke() {
  const c = document.querySelector('#random-joke .random-content');
  if (!c) return;

  if (isBirthday()) { c.textContent = "Why did Randuino throw a party on THE Randoms? Because it was Arztiser's birthday!"; return; }

  const joke = await fetchDaily('joke', async () => {
    const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
    const data = await res.json();
    return `${data.setup} ${data.punchline}`;
  });

  c.textContent = joke;
}

async function renderAdvice() {
  const c = document.querySelector('#random-advice .random-content');
  if (!c) return;

  if (isBirthday()) { c.textContent = "Be proud of how far you have gone, even if there is more to come."; return; }

  const advice = await fetchDaily('advice', async () => {
    const res = await fetch('https://api.adviceslip.com/advice');
    const data = await res.json();
    return data.slip.advice;
  });

  c.textContent = advice;
}

async function renderFact() {
  const c = document.querySelector('#random-fact .random-content');
  if (!c) return;

  if (isBirthday()) { c.textContent = "Arztiser's birthday is today."; return; }

  const fact = await fetchDaily('fact', async () => {
    const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await res.json();
    return data.text;
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

  const url = await fetchDaily('meme', async () => {
    const subs = ['memes','dankmemes','funny'];
    const seed = getDaySeed();

    // Deterministic subreddit pick
    const sub = subs[seed % subs.length];

    // Fetch top 50 hot posts
    const res = await fetch(`https://corsproxy.io/?https://www.reddit.com/r/${sub}/hot.json?limit=50`);
    const data = await res.json();

    // Filter images
    const imgs = data.data.children.filter(p => p.data.url.match(/\.(jpg|png)$/));

    // Deterministic index into top 50
    const index = seed % imgs.length;

    return imgs[index].data.url;
  });

  c.innerHTML = url ? `<img src="${url}" style="max-width:100%;border-radius:8px;">` : "No meme today.";
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
  const msUntilMidnight = nextMidnight - now;
  setTimeout(() => location.reload(), msUntilMidnight);
}

/* ======================
   INIT
====================== */
document.addEventListener('DOMContentLoaded', () => {
  refreshAll();
  scheduleLocalMidnightReload();
});
