document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            const adviceContainer = document.getElementById('advice-container');
            const advice = document.createElement('p');
            advice.textContent = data.slip.advice;
            adviceContainer.appendChild(advice);
        })
        .catch(error => {
            console.error('Error fetching advice:', error);
        });
});