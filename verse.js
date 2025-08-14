document.addEventListener('DOMContentLoaded', () => {
  const verseContainer = document.getElementById('verse-container');

  async function fetchVerse() {
    verseContainer.textContent = 'Loading...';
    try {
      const response = await fetch('https://bible-api.com/data/web/random');
      if (!response.ok) throw new Error('Failed to fetch verse');
      const data = await response.json();

      // Use the first verse in the verses array
      const verse = data.verses[0];

      const formatted = `${verse.book_name} ${verse.chapter}:${verse.verse} - ${verse.text}`;
      verseContainer.textContent = formatted;
    } catch (error) {
      console.error('Error fetching verse:', error);
      verseContainer.textContent = 'Failed to load verse.';
    }
  }

  fetchVerse();
});
