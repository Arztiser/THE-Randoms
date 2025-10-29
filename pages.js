// List all pages you want to randomly redirect to
    const pages = [
      "jokes.html",
      "memes.html",
      "quizzes.html",
      "advice.html",
      "facts.html",
      "people.html",
      "quotes.html",
      "songs.html",
      "videos.html",
      "letters.html",
      "numbers.html",
      "words.html",
      "wouldyourather.html"
    ];

    // Pick a random page
    const randomPage = pages[Math.floor(Math.random() * pages.length)];

    // Redirect after 1.5 seconds
    setTimeout(() => {
      window.location.href = randomPage;
    }, 1500);