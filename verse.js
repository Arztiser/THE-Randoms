document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('verse-container');
  container.textContent = 'Loading verse...';

  try {
    const res = await fetch('https://api.allorigins.win/raw?url=https://bible-api.com/data/web/random');
    const data = await res.json();
    const verse = data.verses[0];
    container.textContent = `${verse.book_name} ${verse.chapter}:${verse.verse} - ${verse.text}`;
  } catch {
    container.textContent = 'Failed to load verse.';
  }
});
