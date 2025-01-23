const urlQuery = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const detailsElements = document.querySelectorAll(".details");
const midSection = document.getElementById("mid-section");
const bottomSection = document.getElementById("bottom-section");


const fetchData = async () => {
  const cleanSearchInput = searchInput.value.toLowerCase().replace(/[^a-z0-9]/g, '');
  try {
    const res = await fetch(`${urlQuery}/${cleanSearchInput}`);
    const data = await res.json();
    showResults(data);
  }catch (error) {
    console.error(`The following error occurred while fetching data from URL: https://pokeapi-proxy.freecodecamp.rocks/api/pokemon...
ERROR: ${error}`);
    alert("Pokémon not found");
  }
}

//getTypes used to get types from all pokemon objects for typesArr. //
// const getTypes = async () => {
//   console.log("getTypes function Running...");
//   console.time('Time');
//   const allTypes = new Set();
//  try {
//   const res2 = await fetch(`${urlQuery}`);
//   const data2 = await res2.json();

//   const batchSize = 100;
//   const results = data2.results;

//   for (let i = 0; i <= results.length; i += batchSize) {
//     const batch = results.slice(i, i + batchSize);
    
//     const batchPromises = batch.map(async (obj) => {
//         try{
//           const response = await fetch(obj.url);
//           const data3 = await response.json();

//           data3.types.forEach(typeObj => {
//             allTypes.add(typeObj.type.name);
//           })
//         } catch(error) {
//           console.error("Batch Error getting Pokémon types - ERROR: ", error);
//         }
//       });
//       await Promise.all(batchPromises);
//     }
//     console.log("All types array: ", Array.from(allTypes));
//     console.log("getTypes function total runtime...");
//     console.timeEnd('Time');
//     return Array.from(allTypes);

//   } catch (error) {
//     console.error("Main Try{} Error getting Pokémon types - ERROR: ", error)
//   }
// }

// getTypes();

const typesArr = [
  'grass',
  'poison',
  'fire',
  'flying',
  'water',
  'bug',
  'normal',
  'electric',
  'ground',
  'fairy',
  'fighting',
  'psychic',
  'rock',
  'steel',
  'ice',
  'ghost',
  'dragon',
  'dark'
];

console.log("typesArr length: ", typesArr.length);

const showResults = (data) => {
  const {
    name, id, weight, height, sprites, types, stats
  } = data;
  const typeNames = types.map(({type}) => type.name);
  const hp = stats[0].base_stat;
  const attack = stats[1].base_stat;
  const defense = stats[2].base_stat;
  const specialAttack = stats[3].base_stat;
  const specialDefense = stats[4].base_stat;    
  const speed = stats[5].base_stat;
  const image = sprites.front_default;

  console.log("Data: ", data);

  midSection.innerHTML = `
    <div class="top-details">
        <div class="name-container">
            <div id="pokemon-name" class="">${name.toUpperCase()}</div>
            <div id="pokemon-id" class="">#${id}</div>
        </div>
        <div class="weight-container">
            <div id="weight" class="">Weight: ${weight}</div>
            <div id="height" class="">Height: ${height}</div>
        </div>
    </div>
    <div id="image" class=""><img id="sprite" src="${image}" alt="Pokemon Image"></div>
    <div id="types" class=""></div>`;

    midSection.className = "mid-section details";

  bottomSection.innerHTML = `
    <table class="table">
      <thead>
          <tr>
              <th class="th-left">Base</th>
              <th class="th-right">Stats</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>HP:</td>
              <td id="hp" class="">${hp}</td>
          </tr>
          <tr>
              <td>Attack:</td>
              <td id="attack" class="">${attack}</td>
          </tr>
          <tr>
              <td>Defense:</td>
              <td id="defense" class="">${defense}</td>
          </tr>
          <tr>
              <td>Sp. Attack:</td>
              <td id="special-attack" class="">${specialAttack}</td>
          </tr>
          <tr>
              <td>Sp. Defense:</td>
              <td id="special-defense" class="">${specialDefense}</td>
          </tr>
          <tr>
              <td class="td-bottom-left">Speed:</td>
              <td id="speed" class="td-bottom-right">${speed}</td>
          </tr>
      </tbody>
    </table>`;

    const pokemonTypes = document.getElementById("types");
    typeNames.forEach((type) => {
      const typeDiv = document.createElement("div");
      typeDiv.className= `types-div ${type.toLowerCase()}`;
      typeDiv.textContent = type.toUpperCase();
      pokemonTypes.appendChild(typeDiv);
    });
}


searchButton.addEventListener('click', () => {
  detailsElements.forEach(elem => elem.innerHTML = "" );
  midSection.className = "";
  if(searchInput.value) {
    fetchData();
    searchInput.value = '';
  } else {
    alert ("Please enter a Pokémon name or ID");
  }
})

searchInput.addEventListener("keydown", (e) => {
  // midSection.className = "";
  detailsElements.forEach(elem => elem.innerHTML = "" );

  if(e.key === "Enter") {
    e.preventDefault();

    if(searchInput.value) {
      fetchData();
      searchInput.value = '';
    } else {
      midSection.className = "";
      alert ("Please enter a Pokémon name or ID");
    }
  }
})