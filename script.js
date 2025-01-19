const urlQuery = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
// const pokemonName = document.getElementById("pokemon-name");
// const pokemonId = document.getElementById("pokemon-id");
// const pokemonWeight = document.getElementById("weight");
// const pokemonHeight = document.getElementById("height");

// const pokemonImage = document.getElementById("image");
// const pokemonHp = document.getElementById("hp");
// const pokemonAttack = document.getElementById("attack");
// const pokemonDefense = document.getElementById("defense");
// const pokemonSpAttack = document.getElementById("special-attack");
// const pokemonSpDefense = document.getElementById("special-defense");
// const pokemonSpeed = document.getElementById("speed");

const midSection = document.getElementById("mid-section");
const bottomSection = document.getElementById("bottom-section");


const fetchData = async () => {
  const cleanSearchInput = searchInput.value.toLowerCase().replace(/[^a-z0-9]/g, '');
  console.log(cleanSearchInput);
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
      typeDiv.className= "types-div";
      typeDiv.textContent = type.toUpperCase();
      pokemonTypes.appendChild(typeDiv);
    });

  // pokemonName.textContent = `${name.toUpperCase()}`;
  // pokemonId.textContent = `#${id}`;
  // pokemonWeight.textContent = `Weight: ${weight}`;
  // pokemonHeight.textContent = `Height: ${height}`;
  
  // pokemonImage.innerHTML = `<img id="sprite" src="${image}" alt="Pokemon Image">`;
}


searchButton.addEventListener('click', () => {
  const detailsElements = document.querySelectorAll(".details");
  detailsElements.forEach(elem => elem.innerHTML = "" );
  
  if(searchInput.value) {
    fetchData();
    searchInput.value = '';
  } else {
    alert ("Please enter a Pokémon name or ID");
  }
})

searchInput.addEventListener("keydown", (e) => {

  detailsElements.forEach(elem => elem.innerHTML = "" );
  if(e.key === "Enter") {
    e.preventDefault();

    if(searchInput.value) {
      fetchData();
      searchInput.value = '';
    } else {
      alert ("Please enter a Pokémon name or ID");
    }
  }
})