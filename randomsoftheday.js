const testingMode = false;

// ======================
// DATE UTILITIES
// ======================
function getDaySeed() {
  const now = new Date();
  const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor(localMidnight.getTime() / (1000*60*60*24));
}

function getLocalDateString() {
  const now = new Date();
  const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return localMidnight.toISOString().slice(0,10);
}

function renderCurrentDate() {
  const container = document.getElementById('current-date');
  if (!container) return;
  container.textContent = new Date().toLocaleDateString('en-US',{month:'long',day:'numeric'});
}

// ======================
// BIRTHDAY CHECK
// ======================
function isBirthday() {
  const today = new Date();
  return today.getMonth() === 2 && today.getDate() === 10; // March 10
}

// ======================
// GENERIC CACHE FETCH
// ======================
async function fetchCached(key, fetchFn, useCache=true) {
  const today = getLocalDateString();
  const cacheKey = `daily_${key}`;
  const cacheDateKey = `daily_${key}_date`;
  if (useCache) {
    const cachedData = localStorage.getItem(cacheKey);
    const cachedDate = localStorage.getItem(cacheDateKey);
    if (cachedData && cachedDate === today) return cachedData;
  }
  try {
    const freshData = await fetchFn();
    localStorage.setItem(cacheKey, freshData);
    localStorage.setItem(cacheDateKey, today);
    return freshData;
  } catch (err) {
    console.error(`Error fetching ${key}:`, err);
    return localStorage.getItem(cacheKey) || `Could not load ${key} today.`;
  }
}

// ======================
// LETTER & NUMBER
// ======================
function renderLetter() {
  const container = document.querySelector('#random-letter .random-content');
  if (!container) return;

  if (isBirthday()) {
    container.textContent = "M"; // March
    return;
  }

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const index = testingMode ? Math.floor(Math.random() * letters.length) : getDaySeed() % letters.length;
  container.textContent = letters[index];
}

function renderNumber() {
  const container = document.querySelector('#random-number .random-content');
  if (!container) return;

  if (isBirthday()) {
    container.textContent = "10";
    return;
  }

  const num = testingMode ? Math.floor(Math.random() * 1000000) + 1 : (getDaySeed() * 9301 + 49297) % 1000000 + 1;
  container.textContent = num.toLocaleString();
}

// ======================
// PASSWORD
// ======================
function renderPassword() {
  const container = document.querySelector('#random-password .random-content');
  if (!container) return;

  if (isBirthday()) {
    container.textContent = "B1RTHD4YR4ND0MN3SS";
    return;
  }

  const seed = getDaySeed();
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";
  const all = upper + lower + numbers + symbols;
  let password = "";
  password += upper[seed % upper.length];
  password += lower[(seed * 3) % lower.length];
  password += numbers[(seed * 7) % numbers.length];
  password += symbols[(seed * 11) % symbols.length];
  for (let i = 4; i < 12; i++) {
    password += all[(seed * (i + 1) * 17) % all.length];
  }
  password = password.split('').sort(() => (seed % 3) - 1).join('');
  container.textContent = password;
}

// ======================
// WORD
// ======================
async function renderWord() {
  const container = document.querySelector('#random-word .random-content');
  if (!container) return;

  if (isBirthday()) {
    container.textContent = "Celebration";
    return;
  }

  const today = getLocalDateString();
  const cacheKey = 'daily_word';
  const cacheDateKey = 'daily_word_date';
  const cachedWord = localStorage.getItem(cacheKey);
  const cachedDate = localStorage.getItem(cacheDateKey);
  if (cachedWord && cachedDate === today) {
    container.textContent = cachedWord;
    return;
  }

  try {
    const res = await fetch('https://random-word-api.vercel.app/api?words=1');
    const data = await res.json();
    const chosenWord = data[0];
    localStorage.setItem(cacheKey, chosenWord);
    localStorage.setItem(cacheDateKey, today);
    container.textContent = chosenWord;
  } catch {
    const fallbackWords = ["random","fun","color","code","web","page","day","fact","letter","test"];
    const chosenWord = fallbackWords[getDaySeed() % fallbackWords.length];
    container.textContent = chosenWord;
    localStorage.setItem(cacheKey, chosenWord);
    localStorage.setItem(cacheDateKey, today);
  }
}

// ======================
// JOKE / ADVICE / FACT / MEME
// ======================
async function fetchJoke(){const r=await fetch('https://official-joke-api.appspot.com/jokes/random');const d=await r.json();return `${d.setup} ${d.punchline}`;}
async function renderJoke(useCache=true){
  const c=document.querySelector('#random-joke .random-content');if(!c)return;
  if(isBirthday()){c.textContent="Why did Randuino throw a party on THE Randoms? Because it was Arztiser's birthday!";return;}
  c.textContent=await fetchCached('joke',fetchJoke,useCache);
}

async function fetchAdvice(){const r=await fetch('https://api.adviceslip.com/advice');const d=await r.json();return d.slip.advice;}
async function renderAdvice(useCache=true){
  const c=document.querySelector('#random-advice .random-content');if(!c)return;
  if(isBirthday()){c.textContent="Be proud of how far you have gone, even if there is more to come.";return;}
  c.textContent=await fetchCached('advice',fetchAdvice,useCache);
}

async function fetchFact(){const r=await fetch('https://uselessfacts.jsph.pl/random.json?language=en');const d=await r.json();return d.text;}
async function renderFact(useCache=true){
  const c=document.querySelector('#random-fact .random-content');if(!c)return;
  if(isBirthday()){c.textContent="Arztiser's birthday is today.";return;}
  c.textContent=await fetchCached('fact',fetchFact,useCache);
}

async function fetchMeme(){
  const subs=['memes','dankmemes','funny'];
  const seed=getDaySeed();
  const sub=subs[seed%subs.length];
  const url=`https://www.reddit.com/r/${sub}/hot.json?limit=50`;
  const res=await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
  const json=await res.json();
  const imgs=json.data.children.filter(p=>p.data.url.match(/\.(jpg|png)$/));
  return imgs[seed%imgs.length].data.url;
}
async function renderMeme(useCache=true){
  const c=document.querySelector('#random-meme .random-content');if(!c)return;
  if(isBirthday()){c.textContent="Today's meme got a free vacation!";return;}
  const url=await fetchCached('meme',fetchMeme,useCache);
  c.innerHTML=`<img src="${url}" style="max-width:100%;border-radius:8px;">`;
}

// ======================
// CACHE-ONLY RENDER
// ======================
function renderFromCacheOnly(){
  ['joke','advice','fact','word','meme'].forEach(key=>{
    const c=document.querySelector(`#random-${key} .random-content`);
    if(!c)return;
    const data=localStorage.getItem(`daily_${key}`);
    if(key==='meme') c.innerHTML=data?`<img src="${data}" style="max-width:100%">`:'No cached meme.';
    else c.textContent=data||'';
  });
  renderLetter();
  renderNumber();
  renderPassword();
}

// ======================
// REFRESH ALL
// ======================
async function refreshAll(){
  renderLetter();
  renderNumber();
  renderPassword();
  await renderWord();
  const useCache=!testingMode;
  await Promise.all([renderJoke(useCache),renderAdvice(useCache),renderFact(useCache),renderMeme(useCache)]);
}

// ======================
// MIDNIGHT REFRESH
// ======================
function scheduleMidnightRefresh(){
  const now=new Date();
  const next=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1);
  setTimeout(async()=>{
    renderCurrentDate();
    await refreshAll();
    setInterval(refreshAll,86400000);
  },next-now);
}

// ======================
// INIT
// ======================
document.addEventListener('DOMContentLoaded', async ()=>{
  renderCurrentDate();
  renderLetter();
  renderNumber();
  renderPassword();
  await renderWord();
  const today=getLocalDateString();
  const keys=['joke','advice','fact','meme'];
  const hasAll=keys.every(k=>localStorage.getItem(`daily_${k}`)&&localStorage.getItem(`daily_${k}_date`)===today);
  hasAll ? renderFromCacheOnly() : await refreshAll();
  scheduleMidnightRefresh();
});
