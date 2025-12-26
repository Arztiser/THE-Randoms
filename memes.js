// memes.js
const memeImg = document.getElementById("meme-img");
const generateBtn = document.getElementById("generate-meme");
const memeContainer = document.querySelector(".meme-container");

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
    const imgURL = randomMeme.url;

    // Load image to get natural dimensions
    const img = new Image();
    img.src = imgURL;
    img.onload = () => {
      let displayWidth = img.naturalWidth;
      let displayHeight = img.naturalHeight;

      const maxHeight = window.innerHeight * 0.7;
      const maxWidth = window.innerWidth * 0.9;

      const heightRatio = displayHeight / maxHeight;
      const widthRatio = displayWidth / maxWidth;
      const maxRatio = Math.max(heightRatio, widthRatio, 1);

      displayWidth = displayWidth / maxRatio;
      displayHeight = displayHeight / maxRatio;

      memeImg.src = imgURL;
      memeImg.alt = randomMeme.title;
      memeImg.style.width = `${displayWidth}px`;
      memeImg.style.height = `${displayHeight}px`;

      memeContainer.style.width = `${displayWidth + 32}px`; // + padding
      memeContainer.style.height = `${displayHeight + 64}px`; // + padding + button spacing
    };
  } catch (err) {
    console.error("Error fetching meme:", err);
    memeImg.src = "";
    memeImg.alt = "Failed to load meme. Try again!";
    memeContainer.style.width = "auto";
    memeContainer.style.height = "auto";
  }
}

// Generate meme on button click
generateBtn.addEventListener("click", getRandomMeme);

// Generate initial meme
getRandomMeme();
