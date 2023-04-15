import { dataFetch, mealsCard } from "../../helpers/mealsCard.js";
import { SPOONACULAR_API_KEY } from "../../util/keys.js";

//we set the url to an empty string so we can populate it with data below
let url = "";
//we set variables and call their values from local storage assuming they are commas seperated arrays. If no stored value exists it returns an empty array.
let searchQuery1 = JSON.parse(localStorage.getItem("options")) || [];
let searchQuery2 =
  JSON.parse(localStorage.getItem("dietaryRestrictions")) || [];
let searchQuery3 = JSON.parse(localStorage.getItem("excludedItems")) || [];

// mealsCard(dataFetch);
// mealsCard(dataFetch);
// mealsCard(dataFetch);
// mealsCard(dataFetch);

// set up if statements to fill in url. We assume the variables are arrays and check their length to see what url we need for our api call.
if (
  //this api call is for when users input data for ingredients they want with no other restrictions
  searchQuery1.length > 0 &&
  searchQuery2.length === 0 &&
  searchQuery3.length === 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&query=" +
    //selects the first object in the searchquery1 variable and selects the value of pendingrequest, this is essentially the users search query for items they want to include in their recipe search
    searchQuery1[0].pendingRequest +
    //the following line is added to all api calls to make the maximum number of recipies recieved 10, may be changed later once testing is finished. Maxmium of 100 is possible
    "&number=10";
} else if (
  //this api call is for when users input data for ingredients they want with dietary restrictions
  searchQuery1.length > 0 &&
  searchQuery2.length > 0 &&
  searchQuery3.length === 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&query=" +
    searchQuery1[0].pendingRequest +
    "&diet=" +
    searchQuery2 +
    "&number=10";
} else if (
  //this api call is for when users input data for ingredients they want with excluded items
  searchQuery1.length > 0 &&
  searchQuery2.length === 0 &&
  searchQuery3.length > 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&query=" +
    searchQuery1[0].pendingRequest +
    "&excludeIngredients=" +
    searchQuery3 +
    "&number=10";
} else if (
  //this api call is for when users input data for ingredients they want with dietary restrictions and excluded items
  searchQuery1.length > 0 &&
  searchQuery2.length > 0 &&
  searchQuery3.length > 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&query=" +
    searchQuery1[0].pendingRequest +
    "&diet=" +
    searchQuery2 +
    "&excludeIngredients=" +
    searchQuery3 +
    "&number=10";
} else if (
  //this api call is for when users want to exclude items from their recipe search and do nothing else
  searchQuery1.length === 0 &&
  searchQuery2.length > 0 &&
  searchQuery3.length === 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&diet=" +
    searchQuery2 +
    "&number=10";
} else if (
  //this api call is for when users want to exclude items from their recipe search and include dietary restrictions
  searchQuery1.length === 0 &&
  searchQuery2.length > 0 &&
  searchQuery3.length > 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&diet=" +
    searchQuery2 +
    "&excludeIngredients=" +
    searchQuery3 +
    "&number=10";
} else if (
  //this api call is for when users want to search for recipes with only their dietary restrictions in mind
  searchQuery1.length === 0 &&
  searchQuery2.length === 0 &&
  searchQuery3.length > 0
) {
  url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    SPOONACULAR_API_KEY +
    "&excludeIngredients=" +
    searchQuery3 +
    "&number=10";
}

//this is the API call using the selected URL based off conditions stated above
console.log(url);
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // handle data that's returned from the API call
    console.log(data);
  })
  //handle errors
  .catch((error) => {
    console.error(error);
  });
  
// if there is not a bulk info localStorage item we get bulk info

let bulkApiData = [{}, {}, {}];

//parses through first set of data results to get the IDs from API call and then passes them to an empty array as a comma seperated list 
let idList = ""
for (let i = 0 ; i < data.results.length ; i++){
  const id = data.results[i].id;
  idList += id + ",";
} 

//removes last comma from the list
idList = idList.slice(0, -1);

//sets a new url variable for the 2nd appi call using the comma seperated list from the first
let url1 = 
"https://api.spoonacular.com/recipes/informationBulk?ids="
+idList

console.log(url1);
fetch(url1)
  .then((response) => response.json())
  .then((bulkApiData) => {
    // handle data that's returned from the API call
    console.log(bulkApiData);
  })
  //handle errors
  .catch((error) => {
    console.error(error);
  });

// set it to localStorage called currentApiInfoBulk

localStorage.setItem("currentApiInfoBulk", JSON.stringify(bulkApiData));

// get the localStorage items currentApiInfoBulk

let bulkInfo = JSON.parse(localStorage.getItem(currentApiInfoBulk));

//generates all meal cards for page
bulkInfo.forEach((meal) => {
  mealsCard(meal);
});
