import { dataFetch, mealsCard } from "../../helpers/mealsCard.js";
import { SPOONACULAR_API_KEY } from "../../util/keys.js";

//we set the url to an empty string so we can populate it with data below
let url = "";
//we set variables and call their values from local storage assuming they are commas seperated arrays. If no stored value exists it returns an empty array.
let searchQuery1 = JSON.parse(localStorage.getItem("pendingRequest")) || [];
let searchQuery2 =
  JSON.parse(localStorage.getItem("dietaryRestrictions")) || [];
let searchQuery3 = JSON.parse(localStorage.getItem("excludedItems")) || [];

//set up if statements to fill in url. We assume the variables are arrays and check their length to see what url we need for our api call.
if (
  searchQuery1.length.length > 0 &&
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
} else {
  alert(
    "We need some information to get you some recipies(this is a placeholder we might just return to the homepage or not let this happen)"
  );
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

//retrieve IDs for recipies from API call above

//turn those IDs into a variable that is an array

// else

// https://api.spoonacular.com/recipes/complexSearch?apiKey=6011a6a178b345a191a3bac0d7aa7aa3&query=peanuts

//pass that into another API call as was done above and make it look like this. This api call refereneces calling for recipie info in bulk, you might need an if statement to call for individual recipies in case there is only one called by retrictions and other user inputs used above
//https://api.spoonacular.com/recipes/informationBulk?&apiKey=6011a6a178b345a191a3bac0d7aa7aa3&ids=715538,716429

// (THIS ONE CAN BE DONE LATER) Add an event listener to select idividual meal cards and then redirect them to a page with the individual card for that meal that will be generated from the below API call using that ID

// (ALSO TO BE DONE LATER) Add an event listener to both this page and the individual card page so a user can save the recipies they like and call them when they go to their saved tab. This will involve saving the IDs to local storage, creating an API call for bulk recipe info to generate a summary cards for them, then creating another API call for the individual recipie info

//retrieve IDs for recipies from API call

//turn those IDs into a variable that is an array

//turn that array into a comma seperated list

//pass that into another API call as was done above and make it look like this. This API call references calling information a single recipie.
//https://api.spoonacular.com/recipes/716429/information?&apiKey=6011a6a178b345a191a3bac0d7aa7aa3&includeNutrition=false
