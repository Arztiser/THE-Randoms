const testingMode = false;

// Date utilities
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

// Generic cache fetch
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

// Letters & numbers (instant)
function renderLetter() {
  const container = document.querySelector('#random-letter .random-content');
  if (!container) return;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const index = testingMode ? Math.floor(Math.random() * letters.length) : getDaySeed() % letters.length;
  container.textContent = letters[index];
}

function renderNumber() {
  const container = document.querySelector('#random-number .random-content');
  if (!container) return;
  const num = testingMode ? Math.floor(Math.random() * 1000000) + 1 : (getDaySeed() * 9301 + 49297) % 1000000 + 1;
  container.textContent = num.toLocaleString();
}

// Word of the Day with API
async function renderWord() {
  const container = document.querySelector('#random-word .random-content');
  if (!container) return;

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
    // ✅ switched to Vercel endpoint
    const res = await fetch('https://random-word-api.vercel.app/api?words=1');
    if (!res.ok) throw new Error('Word fetch failed');
    const data = await res.json();
    const chosenWord = data[0];

    localStorage.setItem(cacheKey, chosenWord);
    localStorage.setItem(cacheDateKey, today);

    container.textContent = chosenWord;
  } catch (err) {
    console.error('Error fetching word:', err);
    const fallbackWords = [
      "random","fun","color","code","web","page","day","fact","letter","test"
    ];
    const chosenWord = fallbackWords[getDaySeed() % fallbackWords.length];
    container.textContent = chosenWord;
    localStorage.setItem(cacheKey, chosenWord);
    localStorage.setItem(cacheDateKey, today);
  }
}

// Jokes, advice, facts, memes
async function fetchJoke(){const res=await fetch('https://official-joke-api.appspot.com/jokes/random');if(!res.ok)throw new Error('Joke fetch failed');const data=await res.json();return `${data.setup} ${data.punchline}`;}
async function renderJoke(useCache=true){const container=document.querySelector('#random-joke .random-content');if(!container)return;container.textContent=await fetchCached('joke',fetchJoke,useCache);}

async function fetchAdvice(){const res=await fetch('https://api.adviceslip.com/advice');if(!res.ok)throw new Error('Advice fetch failed');const data=await res.json();return data.slip.advice;}
async function renderAdvice(useCache=true){const container=document.querySelector('#random-advice .random-content');if(!container)return;container.textContent=await fetchCached('advice',fetchAdvice,useCache);}

async function fetchFact(){const res=await fetch('https://uselessfacts.jsph.pl/random.json?language=en');if(!res.ok)throw new Error('Fact fetch failed');const data=await res.json();return data.text;}
async function renderFact(useCache=true){const container=document.querySelector('#random-fact .random-content');if(!container)return;container.textContent=await fetchCached('fact',fetchFact,useCache);}

async function fetchMeme(){
  const subs=['memes','dankmemes','funny'];
  const seed=getDaySeed();
  const selectedSub=subs[seed%subs.length];
  const url=`https://www.reddit.com/r/${selectedSub}/hot.json?limit=50`;
  const proxyUrl=`https://corsproxy.io/?${encodeURIComponent(url)}`;
  const res=await fetch(proxyUrl);
  if(!res.ok)throw new Error('Meme fetch failed');
  const json=await res.json();
  const memes=json.data.children.filter(post=>post.data.url && /\.(jpg|jpeg|png)$/i.test(post.data.url));
  if(memes.length===0)throw new Error('No memes found');
  return memes[seed%memes.length].data.url;
}

async function renderMeme(useCache=true){
  const container=document.querySelector('#random-meme .random-content');
  if(!container)return;
  try{
    const memeUrl=await fetchCached('meme',fetchMeme,useCache);
    container.innerHTML=`<img src="${memeUrl}" alt="Daily Meme" style="max-width:100%;border-radius:8px;margin-top:10px;" />`;
  }catch{return container.textContent='Failed to load meme.';}
}

// Render from cache only
function renderFromCacheOnly(){
  const keys=[{id:'random-joke',key:'joke'},{id:'random-advice',key:'advice'},{id:'random-fact',key:'fact'},{id:'random-word',key:'word'},{id:'random-meme',key:'meme'}];
  keys.forEach(({id,key})=>{
    const container=document.querySelector(`#${id} .random-content`);
    const cachedData=localStorage.getItem(`daily_${key}`);
    if(!container)return;
    if(key==='meme') container.innerHTML=cachedData?`<img src="${cachedData}" alt="Daily Meme" style="max-width:100%;border-radius:8px;margin-top:10px;" />`:'No cached meme available.';
    else container.textContent=cachedData||`No cached ${key} available.`;
  });
  renderLetter();
  renderNumber();
  renderWord();
}

// Refresh all
async function refreshAll(){
  renderLetter();
  renderNumber();
  await renderWord();
  const useCache=!testingMode;
  await Promise.all([renderJoke(useCache), renderAdvice(useCache), renderFact(useCache), renderMeme(useCache)]);
}

// Schedule midnight refresh
function scheduleMidnightRefresh(){
  const now=new Date();
  const nextMidnight=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,0,0);
  setTimeout(async()=>{
    renderCurrentDate();
    await refreshAll();
    setInterval(async()=>{renderCurrentDate();await refreshAll();},24*60*60*1000);
  },nextMidnight-now);
}

// DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
  renderCurrentDate();
  renderLetter();
  renderNumber();
  await renderWord();

  const today = getLocalDateString();
  const keys = ['joke','advice','fact','meme'];
  const hasFullCache = keys.every(key => {
    const cacheDate = localStorage.getItem(`daily_${key}_date`);
    const cacheData = localStorage.getItem(`daily_${key}`);
    return cacheData && cacheDate === today;
  });

  if (!hasFullCache) {
    await refreshAll();
  } else {
    renderFromCacheOnly();
  }

  scheduleMidnightRefresh();
});