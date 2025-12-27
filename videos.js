// Your API key (optional if running only cached)
const apiKey = 'AIzaSyA7B_YMNe5T-rrVRuEbcZKcY9w50EWCeVk';

// List of categories
const categories = [
  "funny","football","memes","sports","cooking","technology","news",
  "baseball","horror","video games","reviews","reaction","space",
  "history","science","gaming","animations","basketball","chess",
  "facts","south park","family guy","futurama","minecraft",
  "stardew valley","terraria","devlog","college football"
];

// Object to store cached videos per category
let videoCaches = {};
let lastRequestTime = 0;

// Shuffle helper function
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate a random video
function getRandomVideo() {
  const now = Date.now();
  if (now - lastRequestTime < 5000) {
    alert("Please Wait A Few Seconds Before Viewing The Next Motion Picture");
    return;
  }
  lastRequestTime = now;

  // Shuffle categories and pick one
  const shuffledCategories = shuffleArray([...categories]);
  for (let i = 0; i < shuffledCategories.length; i++) {
    const cat = shuffledCategories[i];
    // If cache exists, pick from it
    if (videoCaches[cat] && videoCaches[cat].length > 0) {
      displayRandomVideo(cat);
      return;
    }
  }

  // If no cache yet, pick first category and fetch
  fetchVideos(shuffledCategories[0]);
}

// Fetch videos from YouTube API
function fetchVideos(category) {
  if (!apiKey) {
    // If no API key, cannot fetch
    document.getElementById('video-container').innerHTML = `<p>API key missing. Using cache only.</p>`;
    return;
  }

  const url = `https://www.googleapis.com/youtube/v3/search?` +
              `part=snippet&type=video&maxResults=50&safeSearch=moderate` +
              `&q=${encodeURIComponent(category)}&key=${apiKey}` +
              `&origin=${location.origin || 'http://localhost'}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        document.getElementById('video-container').innerHTML = '<p>No videos found.</p>';
        return;
      }
      // Cache video IDs, remove any falsy
      videoCaches[category] = shuffleArray(
        data.items.map(v => v.id.videoId).filter(Boolean)
      );
      displayRandomVideo(category);
    })
    .catch(err => {
      console.error(err);
      document.getElementById('video-container').innerHTML = '<p>Error loading videos. Using cached ones if available.</p>';
    });
}

// Display a video from a category
function displayRandomVideo(category) {
  const videos = videoCaches[category];
  if (!videos || videos.length === 0) {
    document.getElementById('video-container').innerHTML = '<p>No cached videos.</p>';
    return;
  }

  const index = Math.floor(Math.random() * videos.length);
  const videoId = videos.splice(index, 1)[0]; // Remove from cache so no repeats

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;

  document.getElementById('video-container').innerHTML = `
    <div class="video-wrapper">
      <iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  `;
}

// Initialize
window.addEventListener('load', () => {
  getRandomVideo();
  const button = document.getElementById('generate-button');
  if (button) button.addEventListener('click', getRandomVideo);
});
