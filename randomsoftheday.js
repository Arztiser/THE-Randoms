const testingMode = false;

/* ======================
   DATE + UTILS
====================== */
function renderCurrentDate() {
  const c = document.getElementById('current-date');
  if (!c) return;
  const today = new Date();
  c.textContent = today.toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
}

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
  c.textContent = isBirthday() ? "M" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random()*26));
}

function renderNumber() {
  const c = document.querySelector('#random-number .random-content');
  if (!c) return;
  c.textContent = isBirthday() ? "10" : (Math.floor(Math.random()*1000000)+1).toLocaleString();
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

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";
  const all = upper + lower + numbers + symbols;

  let pw = "";
  pw += upper.charAt(Math.floor(Math.random() * upper.length));
  pw += lower.charAt(Math.floor(Math.random() * lower.length));
  pw += numbers.charAt(Math.floor(Math.random() * numbers.length));
  pw += symbols.charAt(Math.floor(Math.random() * symbols.length));
  for (let i = 4; i < 12; i++) pw += all.charAt(Math.floor(Math.random() * all.length));

  c.textContent = pw;
}

/* ======================
   WORD
====================== */
async function renderWord() {
  const c = document.querySelector('#random-word .random-content');
  if (!c) return;
  if (isBirthday()) { c.textContent = "Celebration"; return; }

  try {
    const res = await fetch('https://random-word-api.vercel.app/api?words=1');
    const data = await res.json();
    c.textContent = data[0];
  } catch {
    c.textContent = "random";
  }
}

/* ======================
   JOKE / ADVICE / FACT
====================== */
async function renderJoke() {
  const c = document.querySelector('#random-joke .random-content');
  if (!c) return;
  if (isBirthday()) { c.textContent = "Why did Randuino throw a party on THE Randoms? Because it was Arztiser's birthday!"; return; }

  try {
    const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
    const data = await res.json();
    c.textContent = `${data.setup} ${data.punchline}`;
  } catch {
    c.textContent = "Today's joke failed.";
  }
}

async function renderAdvice() {
  const c = document.querySelector('#random-advice .random-content');
  if (!c) return;
  if (isBirthday()) { c.textContent = "Be proud of how far you have gone, even if there is more to come."; return; }

  try {
    const res = await fetch('https://api.adviceslip.com/advice');
    const data = await res.json();
    c.textContent = data.slip.advice;
  } catch {
    c.textContent = "Advice unavailable today.";
  }
}

async function renderFact() {
  const c = document.querySelector('#random-fact .random-content');
  if (!c) return;
  if (isBirthday()) { c.textContent = "Arztiser's birthday is today."; return; }

  try {
    const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await res.json();
    c.textContent = data.text;
  } catch {
    c.textContent = "Fact unavailable today.";
  }
}

/* ======================
   MEME
====================== */
async function renderMeme() {
  const c = document.querySelector('#random-meme .random-content');
  if (!c) return;
  if (isBirthday()) { c.textContent = "Today's meme got a free vacation!"; return; }

  try {
    const subs = ['memes','dankmemes','funny'];
    const sub = subs[Math.floor(Math.random()*subs.length)];
    const res = await fetch(`https://corsproxy.io/?https://www.reddit.com/r/${sub}/hot.json?limit=50`);
    const data = await res.json();
    const imgs = data.data.children.filter(p => p.data.url.match(/\.(jpg|png)$/));
    const img = imgs[Math.floor(Math.random()*imgs.length)].data.url;
    c.innerHTML = `<img src="${img}" style="max-width:100%;border-radius:8px;">`;
  } catch {
    c.textContent = "Meme unavailable today.";
  }
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
