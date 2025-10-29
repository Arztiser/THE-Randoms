let previousSongs = [];

const songs = [
  'audio/Crazy Hazy Dream.mp3',
  'audio/Name Song.mp3',
  'audio/Arbitrary Awareness.mp3',
  'audio/Eternal Enthusiasm.mp3',
  'audio/Amusing Adventure.mp3',
  'audio/Definite Delight.mp3',
  'audio/Fabulous Fun.mp3',
  'audio/Magical Memory.mp3',
  'audio/Funky Fusion.mp3',
  'audio/Gleaming Groove.mp3',
  'audio/Retro Recollection.mp3',
  'audio/Twinkling Twilight.mp3',
  'audio/Swift Stamina.mp3',
  'audio/Velocious Vibe.mp3'
].map(name => name.replace(/ /g, '%20'));

function getSongTitle(path) {
  const filename = decodeURIComponent(path.split('/').pop());
  const title = filename.replace('.mp3', '');
  return title === 'Name Song' ? 'Unknown Track' : title;
}

function getRandomSong() {
  if (previousSongs.length >= songs.length) previousSongs = [];

  const availableSongs = songs.filter(song => !previousSongs.includes(song));
  const randomIndex = Math.floor(Math.random() * availableSongs.length);
  const randomSong = availableSongs[randomIndex];
  previousSongs.push(randomSong);

  const audioPlayer = document.getElementById('audio-player');
  const songTitle = document.getElementById('song-title');

  audioPlayer.src = randomSong; // relative path inside extension
  songTitle.textContent = getSongTitle(randomSong);

  audioPlayer.onerror = function () {
    console.error(`Failed to load audio: ${randomSong}. Retrying...`);
    getRandomSong();
  };

  // Resume audio context if suspended (needed for some Chrome extension contexts)
  if (audioCtx.state === 'suspended') audioCtx.resume();

  audioPlayer.load();
  audioPlayer.play().catch(err => {
  });
}

// Canvas visualizer setup
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const audio = document.getElementById('audio-player');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 64;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
  requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = canvas.width / bufferLength;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i];
    const hue = i * 10 + barHeight;
    ctx.fillStyle = `hsl(${hue}, 80%, 50%)`;
    ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
  }
}

// Start visualizer when audio plays
audio.onplay = () => draw();

// Generate first song on page load
window.onload = getRandomSong;

// Generate new random song on button click
document.getElementById('generate-button').addEventListener('click', getRandomSong);
