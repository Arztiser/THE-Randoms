document.addEventListener('DOMContentLoaded', () => {
    fetch('https://random-word-api.vercel.app/api?words=1')
        .then(response => response.json())
        .then(data => {
            const wordContainer = document.getElementById('word-container');
            const word = document.createElement('p');
            const rawWord = data[0];
            const capitalizedWord = rawWord.charAt(0).toUpperCase() + rawWord.slice(1);
            word.textContent = capitalizedWord;
            wordContainer.appendChild(word);
        })
        .catch(error => {
            console.error('Error fetching word:', error);
        });
});
