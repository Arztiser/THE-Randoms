document.addEventListener('DOMContentLoaded', () => {
  const personDetailsGrid = document.querySelector('#person-container .details-grid');
  const favoritesDetailsGrid = document.querySelector('#favorites-container .details-grid');

  personDetailsGrid.innerHTML = "<p>Loading person data...</p>";
  favoritesDetailsGrid.innerHTML = "<p>Loading favorites...</p>";

  function fetchWithTimeout(url, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Request timed out')), timeout);
      fetch(url)
        .then(response => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch(error => {
          clearTimeout(timer);
          reject(error);
        });
    });
  }

  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function displayPerson(person) {
    const fullName = `${person.name.first} ${person.name.last}`;
    const address = `${person.location.street.number} ${person.location.street.name}`;
    const city = person.location.city;
    const state = person.location.state;
    const country = person.location.country;
    const postcode = person.location.postcode;
    const email = person.email;
    const phone = person.phone;
    const dob = new Date(person.dob.date).toLocaleDateString();

    const animals = ["Dog", "Cat", "Armadillo", "Capybara", "Giraffe", "Elephant", "Tiger", "Bear", "Owl", "Penguin", "Dolphin", "Eagle", "Wolf", "Zebra", "Hippo", "Cheetah", "Kangaroo", "Otter", "Fox", "Koala", "Meerkat", "Sloth", "Panda", "Moose", "Camel", "Raccoon", "Hedgehog", "Tortoise", "Lemur", "Narwhal", "Octopus", "Alligator", "Cobra", "Komodo Dragon", "Horse", "Parrot", "Bat", "Chinchilla", "Shark", "Rabbit", "Goat", "Snake", "Whale", "Seal", "Porpoise", "Koala", "Lynx", "Bison", "Wolverine", "Pigeon", "Crab", "Pangolin", "Penguin", "Mole", "Coyote", "Jaguar", "Buffalo", "Albatross", "Kangaroo", "Skunk", "Vulture", "Raven", "Cougar", "Puma", "Pufferfish", "Gibbon", "Chihuahua", "Coyote", "Hawk", "Turkey", "Otterhound", "Shih Tzu", "Bulldog", "Collie", "Poodle", "Yorkshire Terrier", "Cocker Spaniel", "Chihuahua", "Maine Coon", "Great Dane", "Beagle", "Rottweiler", "Basset Hound", "Doberman", "Pomeranian", "Husky", "Saint Bernard", "Mastiff", "Pitbull", "Dachshund", "Schnauzer", "Labrador", "Bernese Mountain Dog", "German Shepherd", "Cocker Spaniel", "Boxer", "Pekingese"];
    const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "White", "Black", "Gray", "Silver", "Gold", "Turquoise", "Magenta", "Beige", "Teal", "Lavender", "Crimson", "Indigo", "Coral", "Peach", "Mint", "Cyan", "Olive", "Chartreuse", "Navy", "Fuchsia", "Aqua", "Ivory", "Mahogany", "Lime", "Teal", "Periwinkle", "Turquoise", "Rose", "Maroon", "Beige", "Ivory", "Seafoam", "Scarlet", "Lilac", "Blush", "Honey", "Copper", "Emerald", "Plum", "Auburn", "Ruby", "Sapphire", "Jade", "Canary", "Azure", "Topaz", "Amber", "Onyx", "Steel", "Cobalt", "Bronze", "Cerulean", "Salmon", "Lime Green", "Gold", "Tangerine", "Charcoal", "Sunset", "Pine", "Peridot", "Moss", "Violet", "Turquoise Blue", "Sand", "Sienna", "Cinnamon", "Celeste", "Midnight Blue", "Slate", "Sunflower", "Buttercup", "Crimson Red", "Kelly Green", "Mulberry", "Opal", "Rose Gold", "Cherry", "Tangerine", "Aubergine", "Clementine", "Vermilion", "Platinum", "Mauve", "Celadon", "Rust", "Peach", "Mustard", "Honeydew", "Lavender", "Cobalt Blue", "Wisteria", "Amethyst", "Marigold", "Blush Pink"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const foods = ["Pizza", "Burger", "Sushi", "Pasta", "Salad", "Ice Cream", "Tacos", "Steak", "Chocolate", "Lasagna", "Pancakes", "Waffles", "Fried Chicken", "Curry", "Doughnuts", "Nachos", "BBQ Ribs", "Pho", "Dim Sum", "Ramen", "Biryani", "Tiramisu", "Falafel", "Mac & Cheese", "Gyoza", "Shepherd’s Pie", "Chow Mein", "Spaghetti", "Egg Rolls", "Moussaka", "Cheeseburger", "Hot Dog", "Sandwich", "Frittata", "Shawarma", "Crêpes", "Bagel", "Fish and Chips", "Chili", "Grilled Cheese", "Popcorn", "Meatballs", "Kebabs", "Caesar Salad", "Clam Chowder", "Samosas", "Hummus", "Baguette", "Cheese", "Fondue", "Tortilla", "Enchiladas", "Paella", "Ceviche", "Fajitas", "Beef Wellington", "Churros", "Cinnamon Rolls", "Banoffee Pie", "Croissant", "Baklava", "Bruschetta", "Pâté", "Quiche", "Goulash", "Frittata", "Croque Monsieur", "Crepes Suzette", "Gumbo", "Rice Pudding", "Taco Salad", "Chicken Wings", "Fried Rice", "Biryani", "Cheese Fries", "Lobster", "Crab Cakes", "Bangers and Mash", "Macaron", "Trifle", "Lamb Chops", "Eggplant Parmesan", "Pumpkin Pie", "Apple Pie", "Donuts", "Cinnamon Rolls"];
    const hobbies = ["Reading", "Hiking", "Gaming", "Cooking", "Traveling", "Photography", "Swimming", "Cycling", "Painting", "Archery", "Woodworking", "Baking", "Boxing", "Programming", "Dancing", "Gardening", "Singing", "Yoga", "Skateboarding", "Martial Arts", "Fishing", "Astronomy", "Calligraphy", "Bird Watching", "Leatherworking", "Metalworking", "Carpentry", "Scuba Diving", "Rock Climbing", "Traveling", "Writing", "Blogging", "Running", "Surfing", "Watching Movies", "Collecting", "Drawing", "Knitting", "Camping", "Skiing", "Snowboarding", "Diving", "Rowing", "Judo", "Pottery", "Golf", "Tennis", "Soccer", "Volleyball", "Football", "Basketball", "Cricket", "Cycling", "Badminton", "Curling", "Paddleboarding", "Billiards", "Salsa Dancing", "Rap", "Meditation", "Candle Making", "Birdwatching", "Astrology", "Video Editing", "Woodturning", "Calligraphy", "Watching Anime", "Billiards", "Fencing", "Ice Skating", "Zip-lining", "Photography", "Vlogging", "Baking", "Model Building", "Puzzles", "Antiquing", "Genealogy", "Listening to Podcasts", "Stargazing", "Origami", "Sculpting", "Laser Cutting", "Hula Hooping", "Rock Collecting", "Fashion Designing", "Knitting"];
    const holidays = ["Christmas", "Easter", "Halloween", "New Year's", "Thanksgiving", "Valentine's Day", "Hanukkah", "Diwali", "St. Patrick's Day", "Chinese New Year", "Ramadan", "Kwanzaa", "Oktoberfest", "Cinco de Mayo", "Carnival", "Mardi Gras", "Holi", "Veterans Day", "Labor Day", "Mother's Day", "Father's Day", "Independence Day", "Passover", "Thanksgiving", "Memorial Day", "Boxing Day", "May Day", "April Fools' Day", "Good Friday", "Summer Solstice", "Autumn Equinox", "Winter Solstice", "Spring Equinox", "Election Day", "Groundhog Day", "Bastille Day", "Martin Luther King Jr. Day", "Labor Day", "National Day", "Victoria Day", "Emancipation Day", "Mother's Day", "Father's Day", "Christmas Eve", "Hanami", "Lunar New Year", "Tết", "Midsummer", "Thanksgiving Day", "Lunar Eclipse", "Harvest Festival", "Day of the Dead", "Remembrance Day", "Samhain", "Boxing Day", "Saint Nicholas Day", "All Saints' Day", "Bastille Day", "Pancake Day", "International Women's Day", "Eid al-Fitr", "Walpurgis Night", "International Labour Day", "Hari Raya", "Día de los Muertos"];
    const music = ["Pop", "Rock", "Metal", "Country", "Classical", "Hip-Hop", "Jazz", "Electronic", "Indie", "Folk", "Reggae", "R&B", "Blues", "Disco", "Techno", "Opera", "Funk", "Ska", "Swing", "Trap", "Lo-fi", "House", "Dubstep", "Ambient", "Grunge", "K-Pop", "J-Pop", "Ska", "House", "Reggaeton", "Punk", "Synthwave", "Goth", "New Wave", "Gospel", "Glam Rock", "Soul", "Electronica", "Tech House", "Ambient", "Drum and Bass", "Trance", "EDM", "Post-Punk", "Alternative Rock", "Industrial", "Hard Rock", "Garage Rock", "Pop Rock", "Blues Rock", "Experimental", "Metalcore", "Death Metal", "Post-Rock", "Indie Rock", "Synthpop", "Rap", "Trap Music", "Electropop", "Folk Music", "Dancehall", "Hardcore Punk", "Dub", "Afrobeats", "Soul Jazz", "Techno", "House", "Progressive Rock", "Minimal", "Salsa", "Mariachi", "Bossa Nova", "Country Rock", "Acoustic", "Hawaiian", "Classical Music", "Chamber Music", "Folk Rock", "Lo-Fi Hip-Hop", "Reggae Dub", "Chiptune", "Trap Beats", "Celtic", "Baroque", "Punk Rock", "Indie Folk", "New Age", "Jazz Fusion", "Bluegrass", "Electro-Swing", "Experimental Hip-Hop", "Drill", "Soulful House", "Gothic Rock", "Tropical House"];
    const seasons = ["Summer", "Autumn", "Winter", "Spring", "Rainy", "Windy", "Foggy", "Dry", "Mild", "Chilly", "Cold", "Warm", "Freezing", "Blazing", "Tropical", "Snowy", "Stormy", "Clear", "Scorching", "Breezy", "Pleasant", "Temperate", "Mild", "Sunset", "Dawn", "Overcast", "Hurricane", "Monsoon", "Thunderstorm", "Blizzard", "Calm", "Harsh", "Blustery", "Dewy", "Hot", "Torrential", "Lightning", "Severe", "Mild", "Pleasing", "Cloudy", "Humid", "Fresh", "Sweaty", "Muggy", "Moist", "Chilly", "Stifling", "Breezy", "Dry Heat", "Searing", "Gloomy", "Sweltering", "Rainy", "Autumn Leaves", "Hot Summers", "Crisp", "Hazy", "Freezing Cold", "Windchill", "Foggy", "Springtime", "Monsoon", "Mild Breeze", "Snowflakes", "Cooler"];

    personDetailsGrid.innerHTML = `
      <div class="row">
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>City:</strong> ${city}</p>
      </div>
      <div class="row">
        <p><strong>State:</strong> ${state}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Postcode:</strong> ${postcode}</p>
      </div>
      <div class="row">
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
      </div>
    `;

    favoritesDetailsGrid.innerHTML = `
      <div class="row">
        <p><strong>Animal:</strong> ${getRandomItem(animals)}</p>
        <p><strong>Color:</strong> ${getRandomItem(colors)}</p>
        <p><strong>Day:</strong> ${getRandomItem(days)}</p>
      </div>
      <div class="row">
        <p><strong>Food:</strong> ${getRandomItem(foods)}</p>
        <p><strong>Hobby:</strong> ${getRandomItem(hobbies)}</p>
        <p><strong>Holiday:</strong> ${getRandomItem(holidays)}</p>
      </div>
      <div class="row">
        <p><strong>Music:</strong> ${getRandomItem(music)}</p>
        <p><strong>Season:</strong> ${getRandomItem(seasons)}</p>
      </div>
    `;
  }

  function fetchPersonWithRetry(retries = 3) {
    fetchWithTimeout('https://randomuser.me/api/', 5000)
      .then(response => {
        if (!response.ok) {
          throw new Error(HTTP error! Status: ${response.status});
        }
        return response.json();
      })
      .then(data => {
        if (!data.results || data.results.length === 0) {
          throw new Error("No user data received.");
        }
        displayPerson(data.results[0]);
      })
      .catch(error => {
        console.error('Error fetching person data:', error);
        if (retries > 0) {
          console.log(Retrying... (${retries} attempts left));
          setTimeout(() => fetchPersonWithRetry(retries - 1), 2000);
        } else {
          personDetailsGrid.innerHTML = "<p>Failed to load person data.</p>";
          favoritesDetailsGrid.innerHTML = "<p>Failed to load favorites.</p>";
        }
      });
  }

  fetchPersonWithRetry();
  });