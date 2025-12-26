// memes.js
const memeImg = document.getElementById("meme-img");
const generateBtn = document.getElementById("generate-meme");
const memeContainer = document.querySelector(".meme-container");

// Array of meme URLs (replace these with your actual meme URLs)
const memes = [
  "img/meme1.jpg",
  "img/meme2.jpg",
  "img/meme3.jpg",
  "img/meme4.jpg",
  "img/meme5.jpg"
];

function generateMeme() {
  const randomIndex = Math.floor(Math.random() * memes.length);
  const memeURL = memes[randomIndex];

  // Create a new image to check its natural size first
  const img = new Image();
  img.src = memeURL;

  img.onload = () => {
    // Reset container height to auto before resizing
    memeContainer.style.height = "auto";

    // If image is bigger than viewport, scale down
    const maxHeight = window.innerHeight * 0.7; // 70% of viewport height
    const maxWidth = window.innerWidth * 0.9; // 90% of viewport width

    let displayWidth = img.naturalWidth;
    let displayHeight = img.naturalHeight;

    // Scale down if needed to fit viewport
    const heightRatio = displayHeight / maxHeight;
    const widthRatio = displayWidth / maxWidth;
    const maxRatio = Math.max(heightRatio, widthRatio, 1);

    displayWidth = displayWidth / maxRatio;
    displayHeight = displayHeight / maxRatio;

    // Apply sizes to container and image
    memeImg.src = memeURL;
    memeImg.style.width = `${displayWidth}px`;
    memeImg.style.height = `${displayHeight}px`;

    memeContainer.style.width = `${displayWidth + 32}px`; // + padding
    memeContainer.style.height = `${displayHeight + 64}px`; // + padding + button spacing
  };
}

// Generate a meme on button click
generateBtn.addEventListener("click", generateMeme);

// Generate initial meme
generateMeme();
