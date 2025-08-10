function initAdvice() {
  const adviceContainer = document.getElementById('advice-container');
  // Clear previous content if needed
  adviceContainer.innerHTML = '';
  
  fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(data => {
      const advice = document.createElement('p');
      advice.textContent = data.slip.advice;
      adviceContainer.appendChild(advice);
    })
    .catch(error => {
      console.error('Error fetching advice:', error);
    });
}

window.initAdvice = initAdvice;
