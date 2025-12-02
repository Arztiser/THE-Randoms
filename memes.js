 window.addEventListener("DOMContentLoaded", () => {
  const memeImg = document.getElementById('meme-img');
  const generateBtn = document.getElementById('generate-meme');
  const container = document.querySelector('.meme-container');

  async function getRandomMeme() {
    try {
      const subreddits = ["memes", "dankmemes", "funny"];
      const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)];
      const url = `https://www.reddit.com/r/${randomSub}/hot.json?limit=100`;

      // Use CORS proxy
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();

      const memes = data.data.children.filter(post =>
        post.data.url &&
        (post.data.url.endsWith(".jpg") ||
         post.data.url.endsWith(".png") ||
         post.data.url.endsWith(".jpeg"))
      );

      if (!memes.length) throw new Error("No memes found");

      const randomMeme = memes[Math.floor(Math.random() * memes.length)].data;
      memeImg.src = randomMeme.url;
      memeImg.alt = randomMeme.title;

      // Reset styles in case of previous adjustments
      memeImg.style.maxHeight = '';
      memeImg.style.width = '';

      // Ensure the meme fits inside the container
      memeImg.onload = () => {
        const containerHeight = container.clientHeight * 0.9; // leave some padding
        if (memeImg.naturalHeight > containerHeight) {
          memeImg.style.maxHeight = containerHeight + "px";
          memeImg.style.width = "auto";
        } else {
          memeImg.style.width = "100%";
          memeImg.style.height = "auto";
        }
      }

    } catch (err) {
      console.error("Error fetching meme:", err);
      memeImg.src = "";
      memeImg.alt = "Failed to load meme. Try again!";
    }
  }

  // Generate meme on page load
  getRandomMeme();

  // Generate meme on button click
  generateBtn.addEventListener('click', getRandomMeme);
});
