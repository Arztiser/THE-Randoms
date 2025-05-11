document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('quote-container');
    if (!container) {
        console.error('No #fact-container found');
        return;
    }

    fetch('https://api.api-ninjas.com/v1/quotes', {
        method: 'GET',
        headers: {
            'X-Api-Key': 'FR8mmO+e7SROk9kwWAV0pQ==oNvn980zs2urHjdC'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            const quote = document.createElement('p');
            quote.textContent = `"${data[0].quote}" — ${data[0].author}`;
            container.appendChild(quote);
        } else {
            console.error('No quote data received');
        }
    })
    .catch(error => {
        console.error('Error fetching quote:', error);
    });
});