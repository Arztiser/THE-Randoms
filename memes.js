// memes.js
const memeImg = document.getElementById("meme-img");
const generateBtn = document.getElementById("generate-meme");
const memeContainer = document.querySelector(".meme-container");

async function getRandomMeme() {
  try {
    const subreddits = ["memes", "dankmemes", "funny"];
    const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)];
    const url = `https://www.reddit.com/r/${randomSub}/hot.json?limit=100`;

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

    const img = new Image();
    img.src = imgURL;
    img.onload = () => {
      let displayWidth = img.naturalWidth;
      let displayHeight = img.naturalHeight;

      const isMobile = window.innerWidth <= 768;
      let maxWidth = isMobile ? window.innerWidth - 20 : window.innerWidth * 0.9; // 20px padding on mobile
      let maxHeight = window.innerHeight * 0.7;

      // Scale proportionally to fit max width and max height
      const widthRatio = displayWidth / maxWidth;
      const heightRatio = displayHeight / maxHeight;
      const maxRatio = Math.max(widthRatio, heightRatio, 1);

      displayWidth = displayWidth / maxRatio;
      displayHeight = displayHeight / maxRatio;

      memeImg.src = imgURL;
      memeImg.alt = randomMeme.title;
      memeImg.style.width = `${displayWidth}px`;
      memeImg.style.height = `${displayHeight}px`;

      // Container wraps exactly around the image + button
      memeContainer.style.width = `${displayWidth + 32}px`; // 16px padding each side
      memeContainer.style.height = "auto";

      generateBtn.style.width = `${displayWidth}px`;
    };
  } catch (err) {
    console.error("Error fetching meme:", err);
    memeImg.src = "";
    memeImg.alt = "Failed to load meme. Try again!";
    memeContainer.style.width = "auto";
    memeContainer.style.height = "auto";
    generateBtn.style.width = "100%";
  }
}

generateBtn.addEventListener("click", getRandomMeme);
getRandomMeme();

window.addEventListener("resize", () => {
  if (memeImg.src) getRandomMeme();
});
