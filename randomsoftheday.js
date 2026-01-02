const testingMode = false;

/* ======================
   DATE + SEED
====================== */
function getGlobalDayId() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
}

function hashStringToSeed(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function getDaySeed() {
  return hashStringToSeed(getGlobalDayId());
}

function renderCurrentDate() {
  const c = document.getElementById('current-date');
  if (!c) return;
  const today = new Date();
  c.textContent = today.toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
}

/* ======================
   SEED PICK
====================== */
function pickFromArray(arr, seedOffset = 0) {
  const seed = getDaySeed() + seedOffset;
  return arr[seed % arr.length];
}

/* ======================
   LOCAL CACHE HELPER
====================== */
async function fetchCached(key, generatorFn) {
  const today = getGlobalDayId();
  const cached = localStorage.getItem(`daily_${key}`);
  const cachedDate = localStorage.getItem(`daily_${key}_date`);
  if (cached && cachedDate === today) return cached;

  const value = await generatorFn();
  localStorage.setItem(`daily_${key}`, value);
  localStorage.setItem(`daily_${key}_date`, today);
  return value;
}

/* ======================
   BIRTHDAY CHECK
====================== */
function isBirthday() {
  const today = new Date();
  return today.getUTCMonth() === 2 && today.getUTCDate() === 10; // March 10
}

/* ======================
   LETTER, NUMBER, PASSWORD
====================== */
function renderLetter() {
  const c = document.querySelector('#random-letter .random-content');
  if (!c) return;
  c.textContent = isBirthday() ? "M" : pickFromArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
}

function renderNumber() {
  const c = document.querySelector('#random-number .random-content');
  if (!c) return;
  c.textContent = isBirthday() ? "10" : ((getDaySeed() * 9301 + 49297) % 1000000 + 1).toLocaleString();
}

function renderPassword() {
  const c = document.querySelector('#random-password .random-content');
  if (!c) return;
  if (isBirthday()) { c.textContent = "B1RTHD4YR4ND0MN3SS"; return; }

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
  for (let i = 4; i < 12; i++) pw += all[(seed * (i + 1) * 17) % all.length];
  c.textContent = pw;
}

/* ======================
   WORD OF THE DAY
====================== */
async function renderWord() {
  const c = document.querySelector('#random-word .random-content');
  if (!c) return;

  const word = isBirthday()
    ? "Celebration"
    : await fetchCached('word', async () => {
        try {
          const res = await fetch('https://random-word-api.vercel.app/api?words=100');
          const words = await res.json();
          return pickFromArray(words);
        } catch {
          return pickFromArray(["random","future","signal","pattern","system","chaos","order","logic","web","code"]);
        }
      });

  c.textContent = word;
}

/* ======================
   JOKE, ADVICE, FACT
====================== */
async function renderJoke() {
  const c = document.querySelector('#random-joke .random-content');
  if (!c) return;

  const joke = isBirthday()
    ? "Why did Randuino throw a party on THE Randoms? Because it was Arztiser's birthday!"
    : await fetchCached('joke', async () => {
        try {
          const res = await fetch('https://official-joke-api.appspot.com/jokes/ten');
          const jokes = await res.json();
          return pickFromArray(jokes.map(j => `${j.setup} ${j.punchline}`));
        } catch { return "Today's joke is unavailable."; }
      });

  c.textContent = joke;
}

async function renderAdvice() {
  const c = document.querySelector('#random-advice .random-content');
  if (!c) return;

  const advice = isBirthday()
    ? "Be proud of how far you have gone, even if there is more to come."
    : await fetchCached('advice', async () => {
        try {
          const res = await fetch('https://api.adviceslip.com/advice/search/a');
          const data = await res.json();
          if (!data.slips) throw 0;
          return pickFromArray(data.slips.map(s => s.advice));
        } catch { return "Today's advice is unavailable."; }
      });

  c.textContent = advice;
}

async function renderFact() {
  const c = document.querySelector('#random-fact .random-content');
  if (!c) return;

  const fact = isBirthday()
    ? "Arztiser's birthday is today."
    : await fetchCached('fact', async () => {
        try {
          const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
          const data = await res.json();
          return data.text;
        } catch { return "Today's fact is unavailable."; }
      });

  c.textContent = fact;
}

/* ======================
   MEME OF THE DAY
====================== */
async function renderMeme() {
  const c = document.querySelector('#random-meme .random-content');
  if (!c) return;

  if (isBirthday()) { c.textContent = "Today's meme got a free vacation!"; return; }

  const url = await fetchCached('meme', async () => {
    try {
      const subs = ['memes','dankmemes','funny'];
      const sub = pickFromArray(subs);
      const res = await fetch(`https://corsproxy.io/?https://www.reddit.com/r/${sub}/hot.json?limit=50`);
      const json = await res.json();
      const imgs = json.data.children.filter(p => p.data.url.match(/\.(jpg|png)$/));
      return pickFromArray(imgs.map(p => p.data.url));
    } catch { return ''; }
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
   LOCAL MIDNIGHT REFRESH
====================== */
function scheduleLocalMidnightRefresh() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1,0,0,0,0);
  setTimeout(() => location.reload(), nextMidnight - now);
}

/* ======================
   INIT
====================== */
document.addEventListener('DOMContentLoaded', () => {
  refreshAll();
  scheduleLocalMidnightRefresh();
});
