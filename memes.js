// memes.js
const memeImg = document.getElementById("meme-img");
const generateBtn = document.getElementById("generate-meme");

async function getRandomMeme() {
  try {
    // Optional: Add a brief loading message to the alt text
    memeImg.alt = "Loading meme...";
    
    // The Meme API handles the Reddit scraping for you, bypassing CORS issues.
    // You can string multiple subreddits together with a '+'
    const url = "https://meme-api.com/gimme/memes+dankmemes+funny";

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    // The API returns the direct image URL and title at the top level of the JSON
    const imgURL = data.url;

    // Just set the image source; let CSS handle size
    memeImg.src = imgURL;
    memeImg.alt = data.title;

  } catch (err) {
    console.error("Error fetching meme:", err);
    // You can set a placeholder image here if you want
    memeImg.src = ""; 
    memeImg.alt = "Failed to load meme. Try again!";
  }
}

// Generate meme on button click
generateBtn.addEventListener("click", getRandomMeme);

// Generate initial meme
getRandomMeme();
