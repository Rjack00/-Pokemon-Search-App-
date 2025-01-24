// Base URL for the Pokémon API
const urlQuery = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

// DOM elements for user input, buttons, and sections where Pokémon details will be displayed
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const detailsElements = document.querySelectorAll(".details");
const pokemonRendering = document.getElementById("pokemon-rendering");

// Function to fetch Pokémon data based on user input
const fetchData = async () => {
  // Clean user input by converting to lowercase and removing invalid characters
  const cleanSearchInput = searchInput.value.toLowerCase().replace(/[^a-z0-9]/g, '');

  try {
    // Fetch data for the Pokémon specified by user input
    const res = await fetch(`${urlQuery}/${cleanSearchInput}`);
    const data = await res.json();

    // Display the fetched Pokémon data
    showResults(data);
  } catch (error) {
    // Handle errors and notify the user if the Pokémon is not found
    console.error(`Error fetching Pokémon data: ${error}`);
    alert("Pokémon not found");
  }
};

// Function to fetch all Pokémon types from the API
const getTypes = async () => {
  console.log("getTypes function Running...");
  console.time('Time'); // Start a timer to measure function runtime

  const allTypes = new Set(); // Use a Set to ensure unique Pokémon types

  try {
    // Fetch the list of all Pokémon
    const res2 = await fetch(`${urlQuery}`);
    const data2 = await res2.json();

    const batchSize = 100; // Number of Pokémon to process in each batch
    const results = data2.results;

    // Process Pokémon in batches to avoid overwhelming the API
    for (let i = 0; i <= results.length; i += batchSize) {
      const batch = results.slice(i, i + batchSize);

      // Fetch detailed data for each Pokémon in the batch
      const batchPromises = batch.map(async (obj) => {
        try {
          const response = await fetch(obj.url);
          const data3 = await response.json();

          // Extract and store Pokémon types
          data3.types.forEach(typeObj => {
            allTypes.add(typeObj.type.name);
          });
        } catch (error) {
          console.error("Error processing batch of Pokémon types: ", error);
        }
      });

      // Wait for all promises in the batch to complete
      await Promise.all(batchPromises);
    }

    console.log("All types array: ", Array.from(allTypes));
    console.timeEnd('Time'); // End the timer and log the runtime
    return Array.from(allTypes); // Return the array of unique types
  } catch (error) {
    console.error("Error fetching Pokémon types: ", error);
  }
};

// Array of all Pokémon types (used as reference)
const typesArr = [
  'grass', 'poison', 'fire', 'flying', 'water', 'bug', 'normal',
  'electric', 'ground', 'fairy', 'fighting', 'psychic', 'rock',
  'steel', 'ice', 'ghost', 'dragon', 'dark'
];

// Function to display Pokémon details in the DOM
const showResults = (data) => {
  // Destructure necessary fields from the fetched Pokémon data
  const { name, id, weight, height, sprites, types, stats } = data;
  const typeNames = types.map(({ type }) => type.name);

  // Extract base stats
  const hp = stats[0].base_stat;
  const attack = stats[1].base_stat;
  const defense = stats[2].base_stat;
  const specialAttack = stats[3].base_stat;
  const specialDefense = stats[4].base_stat;
  const speed = stats[5].base_stat;
  const image = sprites.front_default;

  // Update the DOM with Pokémon data
  pokemonRendering.innerHTML = `
    <div id="mid-section" class="mid-section details">
      <div class="top-details">
          <div class="name-container">
              <div id="pokemon-name">${name.toUpperCase()}</div>
              <div id="pokemon-id">#${id}</div>
          </div>
          <div class="weight-container">
              <div id="weight">Weight: ${weight}</div>
              <div id="height">Height: ${height}</div>
          </div>
      </div>
      <div id="image"><img id="sprite" src="${image}" alt="Pokemon Image"></div>
      <div id="types"></div>
    </div>

    <div id="bottom-section" class="bottom-section details">
      <table class="table">
        <thead>
            <tr>
                <th class="th-left">Base</th>
                <th class="th-right">Stats</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>HP:</td><td>${hp}</td></tr>
            <tr><td>Attack:</td><td>${attack}</td></tr>
            <tr><td>Defense:</td><td>${defense}</td></tr>
            <tr><td>Sp. Attack:</td><td>${specialAttack}</td></tr>
            <tr><td>Sp. Defense:</td><td>${specialDefense}</td></tr>
            <tr><td>Speed:</td><td>${speed}</td></tr>
        </tbody>
      </table>
    </div>`;

  // Add Pokémon types dynamically
  const pokemonTypes = document.getElementById("types");
  typeNames.forEach((type) => {
    const typeDiv = document.createElement("div");
    typeDiv.className = `types-div ${type.toLowerCase()}`;
    typeDiv.textContent = type.toUpperCase();
    pokemonTypes.appendChild(typeDiv);
  });
};

// Event listener for search button click
searchButton.addEventListener('click', () => {
  pokemonRendering.innerHTML = ""; // Clear previous results

  if (searchInput.value) {
    fetchData(); // Fetch Pokémon data
    searchInput.value = ''; // Clear the input field
  } else {
    alert("Please enter a Pokémon name or ID"); // Notify user if input is empty
  }
});

// Event listener for Enter key press in the input field
searchInput.addEventListener("keydown", (e) => {
  pokemonRendering.innerHTML = ""; // Clear previous results

  if (e.key === "Enter") {
    e.preventDefault();

    if (searchInput.value) {
      fetchData(); // Fetch Pokémon data
      searchInput.value = ''; // Clear the input field
    } else {
      alert("Please enter a Pokémon name or ID"); // Notify user if input is empty
    }
  }
});
