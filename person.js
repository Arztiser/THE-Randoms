document.addEventListener('DOMContentLoaded', () => {
  fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
      const person = data.results[0];

      // Extract person details
      const fullName = `${person.name.first} ${person.name.last}`;
      const address = `${person.location.street.number} ${person.location.street.name}`;
      const city = person.location.city;
      const state = person.location.state;
      const country = person.location.country;
      const postcode = person.location.postcode;
      const email = person.email;
      const phone = person.phone;
      const dob = new Date(person.dob.date).toLocaleDateString();

      // Generate random favorites
      const animals = ["Dog", "Cat", "Armadillo", "Capybara", "Giraffe", "Elephant", "Fish", "Tiger", "Lion", "Bird", "Chicken", "Pig", "Goat", "Sheep", "Ram", "Wolf", "Snake", "Donkey", "Cow", "Rabbit", "Horse"];
      const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Magenta", "Pink", "White", "Black", "Brown", "Gray", "Silver", "Gold", "Maroon", "Teal", "Cyan", "Violet", "Bronze"];
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const foods = ["Pizza", "Burger", "Sushi", "Pasta", "Salad", "Ice Cream", "Chocolate", "Steak", "Tacos", "Fried Chicken", "Caviar", "Sub Sandwich", "Fish", "Chips", "Cereal", "Porkchop", "Crab", "Lobster"];
      const hobbies = ["Reading", "Hiking", "Gaming", "Cooking", "Traveling", "Fishing", "Drawing", "Photography", "Swimming", "Cycling", "Writing", "Painting", "Archery", "Woodworking", "Baking", "Gardening"];
      const holidays = ["Christmas", "Easter", "Halloween", "New Years", "Thanksgiving"];
      const music = ["Pop", "Rock", "Rock & Roll", "Metal", "Country", "Classical", "Hip-Hop", "Rap", "R & B", "Gospel", "Indie", "Electronic", "Alternative", "Disco"];
      const seasons = ["Summer", "Autumn", "Winter", "Spring"];

      const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

      const favoriteAnimal = getRandomItem(animals);
      const favoriteColor = getRandomItem(colors);
      const favoriteDay = getRandomItem(days);
      const favoriteFood = getRandomItem(foods);
      const favoriteHobby = getRandomItem(hobbies);
      const favoriteHoliday = getRandomItem(holidays);
      const favoriteMusic = getRandomItem(music);
      const favoriteSeason = getRandomItem(seasons);

      // Person details in rows of three
      const personDetailsGrid = document.querySelector('#person-container .details-grid');
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

      // Favorites in rows of three
      const favoritesDetailsGrid = document.querySelector('#favorites-container .details-grid');
      favoritesDetailsGrid.innerHTML = `
        <div class="row">
          <p><strong>Animal:</strong> ${favoriteAnimal}</p>
          <p><strong>Color:</strong> ${favoriteColor}</p>
          <p><strong>Day:</strong> ${favoriteDay}</p>
        </div>
        <div class="row">
          <p><strong>Food:</strong> ${favoriteFood}</p>
          <p><strong>Hobby:</strong> ${favoriteHobby}</p>
          <p><strong>Holiday:</strong> ${favoriteHoliday}</p>
        </div>
        <div class="row">
          <p><strong>Music:</strong> ${favoriteMusic}</p>
          <p><strong>Season:</strong> ${favoriteSeason}</p>
        </div>
      `;
    })
    .catch(error => {
      console.error('Error fetching person data:', error);
    });
});