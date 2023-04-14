import { dataFetch, mealsCard } from "../../helpers/mealsCard.js";
import { SPOONACULAR_API_KEY } from "../../util/keys.js";
let data = JSON.parse(localStorage.getItem("pendingRequest"));

// let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${data}&number=100`;

//  if dietary restrictions

// https://api.spoonacular.com/recipes/complexSearch?apiKey=6011a6a178b345a191a3bac0d7aa7aa3&diet=vegan

//  if dietary restrictions and excludedItems

// https://api.spoonacular.com/recipes/complexSearch?apiKey=6011a6a178b345a191a3bac0d7aa7aa3&query=peanuts&excludeIngredients=lime,salt&diet=vegan

// else

// https://api.spoonacular.com/recipes/complexSearch?apiKey=6011a6a178b345a191a3bac0d7aa7aa3&query=peanuts

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     // handle data that's returned from the API call
//     console.log(data.results);
//   })
//   //handle errors
//   .catch((error) => {
//     console.error(error);
//   });
