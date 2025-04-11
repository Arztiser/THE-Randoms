document.addEventListener('DOMContentLoaded', () => {
    fetch('https://random-word-api.herokuapp.com/word')
        .then(response => response.json())
        .then(data => {
            const wordContainer = document.getElementById('word-container');
            const word = document.createElement('p');
            word.textContent = data.text;
            wordContainer.appendChild(word);
        })
        .catch(error => {
            console.error('Error fetching word:', error);
        });
});
