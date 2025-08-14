// bible.js
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('verse-container');
  if (!container) return;

  container.textContent = 'Loading verse...';

  try {
    const response = await fetch('https://bible-api.com/data/web/random');
    const data = await response.json();

    // Check if the expected fields exist
    if (!data.text || !data.reference) {
      container.textContent = 'Failed to load verse.';
      return;
    }

    // Split reference into book, chapter, and verse
    // Example: "John 3:16"
    const refMatch = data.reference.match(/^(.+?) (\d+):(\d+)$/);
    if (!refMatch) {
      container.textContent = `Verse: ${data.text}`; // fallback
      return;
    }

    const [, book, chapter, verse] = refMatch;

    // Format: Book Chapter:Verse - Verse text
    container.textContent = `${book} ${chapter}:${verse} - ${data.text}`;
  } catch (err) {
    console.error('Error fetching verse:', err);
    container.textContent = 'Failed to load verse.';
  }
});
