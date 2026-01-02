const testingMode = false;

// ===== DATE + SEED =====
function getGlobalDayId() {
  return new Date().toISOString().slice(0, 10);
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

// ===== CACHE UTILITY =====
function fetchCached(key, generateFn) {
  const today = getGlobalDayId();
  const cached = localStorage.getItem(`daily_${key}`);
  const cachedDate = localStorage.getItem(`daily_${key}_date`);

  if (cached && cachedDate === today) return cached;

  const value = generateFn();
  localStorage.setItem(`daily_${key}`, value);
  localStorage.setItem(`daily_${key}_date`, today);
  return value;
}

// ===== BIRTHDAY CHECK =====
function isBirthday() {
  const today = new Date();
  return today.getUTCMonth() === 2 && today.getUTCDate() === 10; // March 10
}

// ===== SEED PICK =====
function pickFromArray(arr, seedOffset = 0) {
  const seed = getDaySeed() + seedOffset;
  return arr[seed % arr.length];
}

// ===== RENDER FUNCTIONS =====
function renderLetter() {
  const c = document.querySelector('#random-letter .random-content');
  if (!c) return;

  const letter = isBirthday()
    ? "M"
    : fetchCached('letter', () => pickFromArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')));
  c.textContent = letter;
}

function renderNumber() {
  const c = document.querySelector('#random-number .random-content');
  if (!c) return;

  const num = isBirthday()
    ? "10"
    : fetchCached('number', () => ((getDaySeed() * 9301 + 49297) % 1000000 + 1).toLocaleString());
  c.textContent = num;
}

function renderPassword() {
  const c = document.querySelector('#random-password .random-content');
  if (!c) return;

  const pw = isBirthday()
    ? "B1RTHD4YR4ND0MN3SS"
    : fetchCached('password', () => {
        const seed = getDaySeed();
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";
        const all = upper + lower + numbers + symbols;
        let p = "";
        p += upper[seed % upper.length];
        p += lower[(seed * 3) % lower.length];
        p += numbers[(seed * 7) % numbers.length];
        p += symbols[(seed * 11) % symbols.length];
        for (let i = 4; i < 12; i++) p += all[(seed * (i + 1) * 17) % all.length];
        return p;
      });
  c.textContent = pw;
}

function renderWord() {
  const c = document.querySelector('#random-word .random-content');
  if (!c) return;

  const word = isBirthday()
    ? "Celebration"
    : fetchCached('word', () => {
        try {
          // fallback deterministic word if API fails
          const fallback = ["random","future","signal","pattern","system","chaos","order","logic","web","code"];
          return pickFromArray(fallback);
        } catch { return "random"; }
      });
  c.textContent = word;
}

function renderJoke() {
  const c = document.querySelector('#random-joke .random-content');
  if (!c) return;

  const joke = isBirthday()
    ? "Why did Randuino throw a party on THE Randoms? Because it was Arztiser's birthday!"
    : fetchCached('joke', () => "Here's a seeded joke for the day.");
  c.textContent = joke;
}

function renderAdvice() {
  const c = document.querySelector('#random-advice .random-content');
  if (!c) return;

  const advice = isBirthday()
    ? "Be proud of how far you have gone, even if there is more to come."
    : fetchCached('advice', () => "Seeded advice of the day.");
  c.textContent = advice;
}

function renderFact() {
  const c = document.querySelector('#random-fact .random-content');
  if (!c) return;

  const fact = isBirthday()
    ? "Arztiser's birthday is today."
    : fetchCached('fact', () => "Seeded fact of the day.");
  c.textContent = fact;
}

function renderMeme() {
  const c = document.querySelector('#random-meme .random-content');
  if (!c) return;

  const meme = isBirthday()
    ? "Today's meme got a free vacation!"
    : fetchCached('meme', () => "Seeded meme URL for the day.");
  c.textContent = meme;
}

// ===== REFRESH ALL =====
function refreshAll() {
  renderLetter();
  renderNumber();
  renderPassword();
  renderWord();
  renderJoke();
  renderAdvice();
  renderFact();
  renderMeme();
}

// ===== LOCAL MIDNIGHT REFRESH =====
function scheduleLocalMidnightRefresh() {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0, 0, 0, 0
  );
  setTimeout(() => location.reload(), nextMidnight - now);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  refreshAll();
  scheduleLocalMidnightRefresh();
});
