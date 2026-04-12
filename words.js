document.addEventListener('DOMContentLoaded', () => {
    const wordContainer = document.getElementById('word-container');

    // Using the more stable Heroku-hosted API
    fetch('https://random-word-api.herokuapp.com/word?number=1')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const rawWord = data[0];
            renderWord(rawWord);
        })
        .catch(error => {
            console.error('Error fetching word:', error);
            // Fallback word so the page isn't blank if the API is down
            renderWord('phenomenal'); 
        });

    function renderWord(str) {
        // Clear container in case there's old text or a loader
        wordContainer.innerHTML = ''; 

        const wordElement = document.createElement('p');
        
        // Capitalize the first letter
        const capitalizedWord = str.charAt(0).toUpperCase() + str.slice(1);
        
        wordElement.textContent = capitalizedWord;
        wordContainer.appendChild(wordElement);
    }
});
