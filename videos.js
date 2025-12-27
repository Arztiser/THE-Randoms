const apiKey = 'AIzaSyA7B_YMNe5T-rrVRuEbcZKcY9w50EWCeVk';

const categories = [
  "funny","football","memes","sports","cooking","technology","news",
  "baseball","horror","video games","reviews","reaction","space",
  "history","science","gaming","animations","basketball","chess",
  "facts","south park","family guy","futurama","minecraft",
  "stardew valley","terraria","devlog","college football"
];

let videoCaches = {};
let lastRequestTime = 0;

// Shuffle helper
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Display a random video from a given category
function displayRandomVideoFromCategory(category) {
  const videos = videoCaches[category];
  if (!videos || videos.length === 0) return;

  const index = Math.floor(Math.random() * videos.length);
  const videoId = videos.splice(index, 1)[0];

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;

  document.getElementById('video-container').innerHTML = `
    <div class="video-wrapper">
      <iframe src="${embedUrl}" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
  `;
}

// Fetch videos from YouTube for a category
function fetchVideos(category, callback) {
  const url = `https://www.googleapis.com/youtube/v3/search?` +
              `part=snippet&type=video&maxResults=50&safeSearch=moderate` +
              `&q=${encodeURIComponent(category)}&key=${apiKey}` +
              `&origin=${location.origin || 'http://localhost'}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        alert('No videos found for category: ' + category);
        return;
      }
      videoCaches[category] = shuffleArray(data.items.map(v => v.id.videoId).filter(Boolean));
      callback();
    })
    .catch(err => {
      console.error(err);
      alert('Error fetching videos: ' + err.message);
    });
}

// Main function to get a random video
function getRandomVideo() {
  const now = Date.now();
  if (now - lastRequestTime < 3000) {
    alert('Please wait a few seconds before generating another video.');
    return;
  }
  lastRequestTime = now;

  const shuffledCategories = shuffleArray([...categories]);

  for (let i = 0; i < shuffledCategories.length; i++) {
    const cat = shuffledCategories[i];
    if (videoCaches[cat] && videoCaches[cat].length > 0) {
      displayRandomVideoFromCategory(cat);
      return;
    }
  }

  // If no cached videos, fetch the first category
  fetchVideos(shuffledCategories[0], () => {
    displayRandomVideoFromCategory(shuffledCategories[0]);
  });
}

// Init
window.addEventListener('load', () => {
  getRandomVideo();
  const button = document.getElementById('generate-button');
  if (button) button.addEventListener('click', getRandomVideo);
});
