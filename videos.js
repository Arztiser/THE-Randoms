const apiKey = 'AIzaSyA7B_YMNe5T-rrVRuEbcZKcY9w50EWCeVk'; // Replace with your YouTube API key
    const queries = ["funny", "football", "memes", "sports", "cooking", "technology", "news", "baseball", "horror", "video games", "reviews", "random", "reaction", "cartoon", "space", "history", "science", "gaming", "humor", "animations", "basketball", "baseball", "chess", "sandbox", "facts", "south park", "family guy", "the simpsons", "american dad", "futurama", "hockey", "games", "religion", "math", "ai", "coding", "minecraft", "stardew valley", "terraria", "danganronpa", "ace attorney", "devlog", "reaction", "college football"];

    let lastRequestTime = 0;
    let videoCaches = {};

    function getRandomYouTubeVideo() {
      const currentTime = Date.now();

      if (currentTime - lastRequestTime < 5000) {
        alert('Nuh Uh, Not Getting Away With That! Just Wait A Couple Of Seconds.');
        return;
      }

      lastRequestTime = currentTime;

      const randomQuery = queries[Math.floor(Math.random() * queries.length)];

      if (!videoCaches[randomQuery] || videoCaches[randomQuery].length === 0) {
        fetchVideos(randomQuery);
      } else {
        displayRandomVideo(randomQuery);
      }
    }

    function fetchVideos(query) {
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${apiKey}&type=video`)
        .then(response => response.json())
        .then(data => {
          if (data.items && data.items.length > 0) {
            videoCaches[query] = data.items.map(item => item.id.videoId);
            displayRandomVideo(query);
          } else {
            document.getElementById('video-container').innerHTML = '<p>No videos found.</p>';
          }
        })
        .catch(error => {
          console.error('Error fetching YouTube data:', error);
          document.getElementById('video-container').innerHTML = '<p>Error loading video. Please try again later.</p>';
        });
    }

    function displayRandomVideo(query) {
      const randomIndex = Math.floor(Math.random() * videoCaches[query].length);
      const videoId = videoCaches[query][randomIndex];
      videoCaches[query].splice(randomIndex, 1);
      const videoUrl = `https://www.youtube.com/embed/${videoId}`;
      document.getElementById('video-container').innerHTML = `
        <iframe width="360" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `;
    }

    window.onload = getRandomYouTubeVideo;
    document.getElementById('generate-button').addEventListener('click', getRandomYouTubeVideo);
