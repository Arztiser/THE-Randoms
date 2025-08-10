// Utility: get seed based on current UTC day
function getDaySeed() {
  const now = new Date();
  const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor(utcMidnight / (1000 * 60 * 60 * 24));
}

// Render letter of the day
function renderLetter() {
  const container = document.querySelector('#random-letter .random-content');
  if (!container) return;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const index = getDaySeed() % letters.length;
  container.textContent = letters[index];
}

// Render number of the day (1 to 1,000,000)
function renderNumber() {
  const container = document.querySelector('#random-number .random-content');
  if (!container) return;
  const seed = getDaySeed();
  const num = (seed * 9301 + 49297) % 1000000 + 1;
  container.textContent = num.toLocaleString();
}

// Fetch joke
function fetchJoke() {
  fetch('https://official-joke-api.appspot.com/jokes/random')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('#random-joke .random-content');
      container.textContent = data.setup + ' — ' + data.punchline;
    })
    .catch(() => {
      document.querySelector('#random-joke .random-content').textContent = 'Failed to load joke.';
    });
}

// Fetch advice
function fetchAdvice() {
  fetch('https://api.adviceslip.com/advice')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('#random-advice .random-content');
      container.textContent = data.slip.advice;
    })
    .catch(() => {
      document.querySelector('#random-advice .random-content').textContent = 'Failed to load advice.';
    });
}

// Fetch fact (example API — replace if you have your own)
function fetchFact() {
  fetch('https://uselessfacts.jsph.pl/random.json?language=en')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('#random-fact .random-content');
      container.textContent = data.text;
    })
    .catch(() => {
      document.querySelector('#random-fact .random-content').textContent = 'Failed to load fact.';
    });
}

// Fetch quote (example API — replace if you have your own)
function fetchQuote() {
  fetch('https://api.quotable.io/random')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('#random-quote .random-content');
      container.textContent = `"${data.content}" — ${data.author}`;
    })
    .catch(() => {
      document.querySelector('#random-quote .random-content').textContent = 'Failed to load quote.';
    });
}

// Fetch word (example API — replace if you have your own)
function fetchWord() {
  fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('#random-word .random-content');
      container.textContent = data[0];
    })
    .catch(() => {
      document.querySelector('#random-word .random-content').textContent = 'Failed to load word.';
    });
}

// Initialize all fetches + renders
function initRandomsOfTheDay() {
  fetchJoke();
  fetchAdvice();
  fetchFact();
  fetchQuote();
  fetchWord();
  renderLetter();
  renderNumber();
}

// Run init after DOM is ready (defer script already ensures DOM ready, but safe here)
initRandomsOfTheDay();
