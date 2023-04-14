import { dataFetch, mealsCard } from "../../helpers/mealsCard.js";
import { SPOONACULAR_API_KEY } from "../../util/keys.js";

//we set the url to an empty string so we can populate it with data below
let url = "";
//we set variables and call their values from local storage assuming they are commas seperated arrays. If no stored value exists it returns an empty array.
let searchQuery1 = JSON.parse(localStorage.getItem("pendingRequest")) || [];
let searchQuery2 =
  JSON.parse(localStorage.getItem("dietaryRestrictions")) || [];
let searchQuery3 = JSON.parse(localStorage.getItem("excludedItems")) || [];

mealsCard(dataFetch);
mealsCard(dataFetch);
mealsCard(dataFetch);
mealsCard(dataFetch);

// if there is not a bulk info localStorage item we get bulk info

let bulkApiData = [{}, {}, {}];

// set it to localStorage called currentApiInfoBulk

// get the localStorage items currentApiInfoBulk

// mealsCard(bulkInfo)

// set up if statements to fill in url. We assume the variables are arrays and check their length to see what url we need for our api call.
if (
  searchQuery1.length > 0 &&
  searchQuery2.length === 0 &&
  searchQuery3.length === 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&query=" +
    searchQuery1 +
    "&number=100";
} else if (
  searchQuery1.length > 0 &&
  searchQuery2.length > 0 &&
  searchQuery3.length === 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&query=" +
    searchQuery1 +
    "&diet=" +
    searchQuery2 +
    "&number=100";
} else if (
  searchQuery1.length > 0 &&
  searchQuery2.length === 0 &&
  searchQuery3.length > 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&query=" +
    searchQuery1 +
    "&excludeIngredients=" +
    searchQuery3 +
    "&number=100";
} else if (
  searchQuery1.length > 0 &&
  searchQuery2.length > 0 &&
  searchQuery3.length > 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&query=" +
    searchQuery1 +
    "&diet=" +
    searchQuery2 +
    "&excludeIngredients=" +
    searchQuery3 +
    "&number=100";
} else if (
  searchQuery1.length === 0 &&
  searchQuery2.length > 0 &&
  searchQuery3.length === 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&diet=" +
    searchQuery2 +
    "&number=100";
} else if (
  searchQuery1.length === 0 &&
  searchQuery2.length > 0 &&
  !searchQuery3.length > 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&diet=" +
    searchQuery2 +
    "&excludeIngredients=" +
    searchQuery3 +
    "&number=100";
} else if (
  searchQuery1.length === 0 &&
  searchQuery2.length === 0 &&
  searchQuery3.length > 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&excludeIngredients=" +
    searchQuery3 +
    "&number=100";
} 

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // handle data that's returned from the API call
    console.log(data.results);
  })
  //handle errors
  .catch((error) => {
    console.error(error);
  });
