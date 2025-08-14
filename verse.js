// bible.js
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('verse-container');
  if (!container) return;

  container.textContent = 'Loading verse...';

  try {
    // Use AllOrigins proxy to bypass CORS
    const response = await fetch(
      'https://api.allorigins.win/raw?url=https://bible-api.com/data/web/random'
    );
    const data = await response.json();

    if (!data.verses || data.verses.length === 0) {
      container.textContent = 'No verse found.';
      return;
    }

    const verse = data.verses[0];
    // Format: BookName Chapter:Verse - Text
    container.textContent = `${verse.book_name} ${verse.chapter}:${verse.verse} - ${verse.text}`;
  } catch (err) {
    console.error('Error fetching verse:', err);
    container.textContent = 'Failed to load verse.';
  }
});
