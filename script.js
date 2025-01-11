const urlQuery = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


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


}

searchButton.addEventListener('click', () => {
  
  if(searchInput.value) {
    fetchData();
    searchInput.value = '';
  } else {
    alert ("Please enter a Pokémon name or ID");
  }
})