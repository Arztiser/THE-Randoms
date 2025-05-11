document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('quote-container');
  if (!container) return;

  fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://api.quotable.io/random'))
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      const parsed = JSON.parse(data.contents); // extract actual API response
      const quote = document.createElement('p');
      quote.textContent = `"${parsed.content}" — ${parsed.author}`;
      container.appendChild(quote);
    })
    .catch(error => {
      console.error('Failed to fetch quote via proxy:', error);
    });
});