document.addEventListener('DOMContentLoaded', () => {
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json())
        .then(data => {
            const factContainer = document.getElementById('fact-container');
            const fact = document.createElement('p');
            fact.textContent = data.text;
            factContainer.appendChild(fact);
        })
        .catch(error => {
            console.error('Error fetching fact:', error);
        });
});
