document.addEventListener('DOMContentLoaded', () => {
    fetch('https://zenquotes.io/api/random')
        .then(response => response.json())
        .then(data => {
            console.log('Quote data:', data); // Debug
            const quoteContainer = document.getElementById('quote-container');
            const quote = document.createElement('p');
            quote.textContent = `"${data[0].q}" — ${data[0].a}`;
            quoteContainer.appendChild(quote);
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
        });
});