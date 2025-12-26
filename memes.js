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
      // Determine available width
      const maxContainerWidth = Math.min(window.innerWidth - 20, 900); // 10px margin on each side
      const maxContainerHeight = window.innerHeight * 0.7;

      let displayWidth = img.naturalWidth;
      let displayHeight = img.naturalHeight;

      // Scale proportionally
      const widthRatio = displayWidth / maxContainerWidth;
      const heightRatio = displayHeight / maxContainerHeight;
      const maxRatio = Math.max(widthRatio, heightRatio, 1);

      displayWidth /= maxRatio;
      displayHeight /= maxRatio;

      // Apply image size
      memeImg.src = imgURL;
      memeImg.alt = randomMeme.title;
      memeImg.style.width = `${displayWidth}px`;
      memeImg.style.height = `${displayHeight}px`;

      // Container fits exactly around the image + padding
      const containerPadding = 32; // 16px each side
      memeContainer.style.width = `${displayWidth + containerPadding}px`;
      memeContainer.style.height = "auto"; // height wraps image + button

      // Button width matches image
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

// Generate meme on button click
generateBtn.addEventListener("click", getRandomMeme);

// Generate first meme
getRandomMeme();
