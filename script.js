const urlQuery = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const fetchData = async () => {
  try {
    const res = await fetch(urlQuery);
    const data = await res.json();
    showResults(data);
  }catch (error) {
    console.error(`The following error occured while fetching data from URL: https://pokeapi-proxy.freecodecamp.rocks/api/pokemon...
ERROR: ${error}`);
  }
}

fetchData();

const showResults = (data) => {
  console.log("Data: ", data);
}