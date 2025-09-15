const day = new Date().getDay();
const MODE_BY_DAY = ['letters','emojis','numbers','symbols','letters','emojis','numbers'];
const mode = MODE_BY_DAY[day] || 'letters';

/* Key sets */
const KEYSETS = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  numbers: "0123456789".split(""),
  symbols: ["!","@","#","$","%","^","&","*","(",")","-","_","+","=","{","}","[","]","<",">","/","|","~","`"],
  emojis: ["😀","😎","🥳","🤖","👻","🐶","🐱","🐭","🦊","🐰","🍎","🍌","🍇","🍓","🍒","⚽","🏀","🏈","⚾","🎾","🚗","🚕","🚙","🚌","🚓"]
};

/* Utility: split into array of graphemes (handles surrogate pairs) */
const splitChars = s => Array.from(s);

/* Create daily puzzle: for letters we might want a dictionary word, but per request we'll pick deterministic "random" 5-chars based on day seed */
function getDaySeed(){
  const now = new Date();
  const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor(localMidnight.getTime()/(1000*60*60*24));
}
function deterministicPick(arr, seedOffset){
  const seed = getDaySeed() + (seedOffset||0);
  return arr[seed % arr.length];
}
function makePuzzleForMode(m){
  const pool = KEYSETS[m];
  // create deterministic 5-char string (allows repeats)
  let out = '';
  for(let i=0;i<5;i++){
    out += deterministicPick(pool, i);
  }
  return out;
}

/* Game state */
let answer = makePuzzleForMode(mode);             // string of 5 characters (graphemes)
let answerChars = splitChars(answer);
let rows = 6;
let currentRow = 0;
let currentGuess = ''; // keep as string of graphemes appended from keyboard clicks
let gameOver = false;

/* DOM references */
const boardEl = document.getElementById('board');
const keyboardEl = document.getElementById('keyboard');
const answerDisplay = document.getElementById('answer-display');

/* Build board (6 rows x 5 cells) */
function buildBoard(){
  boardEl.innerHTML = '';
  for(let r=0;r<rows;r++){
    const row = document.createElement('div');
    row.className = 'row';
    for(let c=0;c<5;c++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.setAttribute('data-row', r);
      cell.setAttribute('data-col', c);
      row.appendChild(cell);
    }
    boardEl.appendChild(row);
  }
}

/* Build keyboard for current mode */
function buildKeyboard(){
  keyboardEl.innerHTML = '';
  const keys = KEYSETS[mode];
  // We will display keys in provided order
  keys.forEach(k=>{
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = k;
    key.addEventListener('click', ()=> onKeyPress(k));
    keyboardEl.appendChild(key);
  });
  // Enter & Backspace (larger)
  const enter = document.createElement('div');
  enter.className = 'key enter';
  enter.textContent = 'Enter';
  enter.addEventListener('click', submitGuess);
  keyboardEl.appendChild(enter);

  const back = document.createElement('div');
  back.className = 'key backspace';
  back.textContent = '⌫';
  back.addEventListener('click', onBackspace);
  keyboardEl.appendChild(back);
}

/* Update board UI while typing */
function renderCurrentGuess(){
  const row = boardEl.children[currentRow];
  const chars = splitChars(currentGuess);
  for(let i=0;i<5;i++){
    const cell = row.children[i];
    cell.textContent = chars[i] || '';
    cell.classList.remove('correct','present','wrong');
  }
}

/* Key press from screen keyboard */
function onKeyPress(k){
  if(gameOver) return;
  // only allow input when less than 5 graphemes
  const chars = splitChars(currentGuess);
  if(chars.length >= 5) return;
  currentGuess = currentGuess + k;
  renderCurrentGuess();
}

/* backspace */
function onBackspace(){
  if(gameOver) return;
  const arr = splitChars(currentGuess);
  arr.pop();
  currentGuess = arr.join('');
  renderCurrentGuess();
}

/* Evaluate guess using Wordle-like two-pass algorithm with counts (handles duplicates correctly) */
function submitGuess(){
  if(gameOver) return;
  const guessChars = splitChars(currentGuess);
  if(guessChars.length !== 5){
    // could show a small toast; for now, ignore
    return;
  }

  // Build counts of answer characters for second-pass
  const counts = {};
  answerChars.forEach(ch => counts[ch] = (counts[ch]||0)+1);

  // Prepare result array
  const result = Array(5).fill('wrong');

  // First pass: correct positions
  for(let i=0;i<5;i++){
    if(guessChars[i] === answerChars[i]){
      result[i] = 'correct';
      counts[guessChars[i]]--;
    }
  }
  // Second pass: present if remaining
  for(let i=0;i<5;i++){
    if(result[i] === 'correct') continue;
    const g = guessChars[i];
    if(counts[g] > 0){
      result[i] = 'present';
      counts[g]--;
    } else {
      result[i] = 'wrong';
    }
  }

  // Update UI for the row
  const row = boardEl.children[currentRow];
  for(let i=0;i<5;i++){
    const cell = row.children[i];
    cell.textContent = guessChars[i];
    cell.classList.add(result[i]);
  }

  // Update keyboard states: keep best-state priority (correct > present > wrong)
  guessChars.forEach((ch, idx) => {
    const keyEls = Array.from(keyboardEl.querySelectorAll('.key')).filter(k=>k.textContent === ch);
    keyEls.forEach(el => {
      // compute existing state priority
      const prev = el.classList.contains('key-correct') ? 3 : el.classList.contains('key-present') ? 2 : el.classList.contains('key-wrong') ? 1 : 0;
      const newState = result[idx] === 'correct' ? 3 : result[idx] === 'present' ? 2 : 1;
      if(newState > prev){
        el.classList.remove('key-correct','key-present','key-wrong');
        el.classList.add(newState === 3 ? 'key-correct' : newState === 2 ? 'key-present' : 'key-wrong');
      }
    });
  });

  // Win or lose
  if(guessChars.join('') === answerChars.join('')){
    answerDisplay.textContent = 'Correct! Answer: ' + answerChars.join('');
    gameOver = true;
    return;
  }

  currentRow++;
  currentGuess = '';
  if(currentRow >= rows){
    answerDisplay.textContent = 'Game over — answer: ' + answerChars.join('');
    gameOver = true;
    return;
  }
}

/* allow physical keyboard for letters/numbers/symbols (emojis still use on-screen) */
document.addEventListener('keydown', (e)=>{
  if(gameOver) return;
  if(mode === 'emojis') return; // only on-screen for emojis
  // handle Enter and Backspace
  if(e.key === 'Enter'){ submitGuess(); return; }
  if(e.key === 'Backspace'){ onBackspace(); return; }
  // normalize key for letters
  let key = e.key;
  if(key.length === 1){
    // In letters mode accept letters only; in numbers/symbols accept accordingly
    if(mode === 'letters'){
      if(/[a-zA-Z]/.test(key)){ onKeyPress(key.toUpperCase()); }
    } else if(mode === 'numbers'){
      if(/[0-9]/.test(key)){ onKeyPress(key); }
    } else if(mode === 'symbols'){
      // accept common symbol keys (e.key already contains them)
      const allowed = KEYSETS.symbols;
      if(allowed.includes(key)) onKeyPress(key);
    }
  }
});

/* Initialize display */
function init(){
  // rebuild answer to be deterministic every day
  // (if you want to persist across reloads use localStorage)
  buildBoard();
  buildKeyboard();
  renderCurrentGuess();
  answerDisplay.textContent = ''; // hide until end
  // Optional: for debugging, you can console.log the answer:
  // console.log('DEBUG answer:', answerChars.join(''));
}
init();
