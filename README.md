# Pokémon Info App

This is a web application that allows users to search for detailed information about any Pokémon by name or ID using the PokéAPI. The app fetches and displays Pokémon stats, types, and additional details in a clean and user-friendly interface.

## Features

- Search for a Pokémon by its name or ID.
- View detailed information, including:
  - Name and ID
  - Weight and height
  - Image/sprite
  - Base stats (HP, Attack, Defense, Special Attack, Special Defense, Speed)
  - Types
- Handles invalid searches with error messages.

## Technologies Used

- **HTML**: For structuring the application.
- **CSS**: For styling the application.
- **JavaScript (ES6)**: For interactivity and fetching data from the PokéAPI.
- **PokéAPI**: A RESTful API providing data about Pokémon.

## How It Works

1. **User Input**: The user enters a Pokémon name or ID into the search bar.
2. **Fetch Data**: The application sends a request to the PokéAPI to retrieve information about the specified Pokémon.
3. **Display Results**: The app displays the Pokémon’s details, including its image, stats, and types.
4. **Error Handling**: If the Pokémon is not found or there is an issue with the API request, an error message is displayed.

## Code Overview

### Key Files

- **index.html**: The main HTML file containing the structure of the app.
- **style.css**: Contains styles for the application.
- **script.js**: Contains the logic for fetching and displaying Pokémon data.

### Main Functions

#### `fetchData()`
Fetches detailed information about a Pokémon based on the user’s input. Handles errors if the Pokémon is not found.

#### `getTypes()`
Retrieves all unique Pokémon types from the API. This function processes the data in batches to optimize performance.

#### `showResults(data)`
Displays the fetched Pokémon details in the DOM, including name, image, stats, and types.

### Event Listeners

- **Search Button**: Triggers a fetch request when clicked.
- **Enter Key**: Allows the user to search by pressing the Enter key.

## Future Improvements

- Add a dropdown to filter Pokémon by type.
- Include pagination for browsing all Pokémon.
- Implement loading indicators while fetching data.
- Enhance the UI with animations and better responsiveness.


