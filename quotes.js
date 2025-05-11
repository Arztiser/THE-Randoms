document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('quote-container');
    if (!container) {
        console.error('No #quote-container found');
        return;
    }

    // Fetch a random quote from ZenQuotes API
    fetch('https://zenquotes.io/api/random')
        .then(response => response.json())
        .then(data => {
            const quote = document.createElement('q');
            quote.textContent = `"${data[0].q}" — ${data[0].a}`;
            container.appendChild(quote);
        })
        .catch(error => {
            console.error('Failed to fetch quote:', error);
        });
});