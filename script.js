const urlQuery = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonImage = document.getElementById("image");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpAttack = document.getElementById("special-attack");
const pokemonSpDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");


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

  pokemonName.textContent = `${name.toUpperCase()}`;
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;
  typeNames.map((type) => {
    return pokemonTypes.innerHTML += `<div class="types-div">${type.toUpperCase()}</div>`;
  });
  pokemonImage.innerHTML = `<img id="sprite" src="${image}" alt="Pokemon Image">`;
  pokemonHp.textContent = `${hp}`;
  pokemonAttack.textContent = `${attack}`;
  pokemonDefense.textContent = `${defense}`;
  pokemonSpAttack.textContent = `${specialAttack}`;
  pokemonSpDefense.textContent = `${specialDefense}`;
  pokemonSpeed.textContent = `${speed}`;

}

searchButton.addEventListener('click', () => {

  const detailsElements = document.querySelectorAll(".details");
  detailsElements.forEach(elem => elem.innerHTML = "" );
  // pokemonName.textContent = ``;
  // pokemonId.textContent = ``;
  // pokemonWeight.textContent = ``;
  // pokemonHeight.textContent = ``;
  // pokemonTypes.innerHTML = ``
  // pokemonImage.innerHTML = ``;
  // pokemonHp.textContent = ``;
  // pokemonAttack.textContent = ``;
  // pokemonDefense.textContent = ``;
  // pokemonSpAttack.textContent = ``;
  // pokemonSpDefense.textContent = ``;
  // pokemonSpeed.textContent = ``;
  
  if(searchInput.value) {
    fetchData();
    searchInput.value = '';
  } else {
    alert ("Please enter a Pokémon name or ID");
  }
})