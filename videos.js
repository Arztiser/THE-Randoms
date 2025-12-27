const apiKey = 'AIzaSyA7B_YMNe5T-rrVRuEbcZKcY9w50EWCeVk';

const queries = [
  "funny","football","memes","sports","cooking","technology","news",
  "baseball","horror","video games","reviews","reaction","space",
  "history","science","gaming","animations","basketball","chess",
  "facts","south park","family guy","futurama","minecraft",
  "stardew valley","terraria","devlog","college football"
];

let lastRequestTime = 0;
let videoCaches = {};

function getRandomYouTubeVideo() {
  const now = Date.now();
  if (now - lastRequestTime < 5000) {
    alert("Just Wait A Few More Seconds Before The Next Motion Picture");
    return;
  }
  lastRequestTime = now;

  const query = queries[Math.floor(Math.random() * queries.length)];

  if (!videoCaches[query] || videoCaches[query].length === 0) {
    fetchVideos(query);
  } else {
    displayRandomVideo(query);
  }
}

function fetchVideos(query) {
  const embedUrl =
  `https://www.youtube.com/embed/${videoId}` +
  `?rel=0&modestbranding=1&playsinline=1` +
  `&enablejsapi=1&origin=${location.origin}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        document.getElementById('video-container').innerHTML =
          '<p>No videos found.</p>';
        return;
      }
      videoCaches[query] = data.items.map(v => v.id.videoId);
      displayRandomVideo(query);
    })
    .catch(err => {
      console.error(err);
      document.getElementById('video-container').innerHTML =
        '<p>Error loading video.</p>';
    });
}

function displayRandomVideo(query) {
  const index = Math.floor(Math.random() * videoCaches[query].length);
  const videoId = videoCaches[query].splice(index, 1)[0];

  const embedUrl =
    `https://www.youtube.com/embed/${videoId}` +
    `?rel=0&modestbranding=1&playsinline=1` +
    `&enablejsapi=1&origin=${location.origin}`;

  document.getElementById('video-container').innerHTML = `
    <div class="video-wrapper">
      <iframe
        src="${embedUrl}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
  `;
}

window.onload = getRandomYouTubeVideo;
document.getElementById('generate-button')
  .addEventListener('click', getRandomYouTubeVideo);
