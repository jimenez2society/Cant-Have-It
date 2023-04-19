import { mealsCard } from "../../helpers/mealsCard.js";
import { SPOONACULAR_API_KEY } from "../../util/keys.js";
var currentApiInfoBulk = JSON.parse(localStorage.getItem("currentApiInfoBulk"));

//we set the url to an empty string so we can populate it with data below
let url = "";
//we set variables and call their values from local storage assuming they are commas seperated arrays. If no stored value exists it returns an empty array.
let allOptions = JSON.parse(localStorage.getItem("options"));
let prevDiet = JSON.parse(localStorage.getItem("previousRestrictions"));
// let searchQuery1 = JSON.parse(localStorage.getItem("options"))
// || [];
// let searchQuery2 =
//   JSON.parse(localStorage.getItegitm("dietaryRestrictions")) || [];
// let searchQuery3 = JSON.parse(localStorage.getItem("excludedItems")) || [];

// set up if statements to fill in url. We assume the variables are arrays and check their length to see what url we need for our api call.
let { pendingRequest, dietaryRestrictions, excludedItems } = allOptions;
let count = 20;

// let dietaryRestrictions = allOptions.dietaryRestrictions;
// let excludedItems = allOptions.excludedItems;

// const query = (type) => {

//   url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=
//   ${pendingRequest}
//   ${type === "diet" && `&diet=
//   ${dietaryRestrictions}
//   ${type === "excludedItems" ? `exludedItems=
//   ${excludedItems.join(",")}`:""}
//   `}&number=10`;
//   console.log(url);
// };
// url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=beans&excludedItems=fish,chicken,peanuts&number=10`
// query("diet");

if (
  !currentApiInfoBulk ||
  (prevDiet && dietaryRestrictions !== prevDiet.prevDiet)
) {
  localStorage.removeItem("currentApiInfoBulk");
  localStorage.setItem(
    "previousRestrictions",
    JSON.stringify({
      previousRestrictions: dietaryRestrictions,
    })
  );
  if (
    //this api call is for when users input data for ingredients they want with no other restrictions
    pendingRequest &&
    !dietaryRestrictions &&
    !excludedItems?.length
  ) {
    url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${pendingRequest}&number=${count}`;
    //selects the first object in the searchquery1 variable and selects the value of pendingrequest, this is essentially the users search query for items they want to include in their recipe search

    //the following line is added to all api calls to make the maximum number of recipies recieved 10, may be changed later once testing is finished. Maxmium of 100 is possible
  } else if (
    //this api call is for when users input data for ingredients they want with dietary restrictions
    pendingRequest &&
    dietaryRestrictions &&
    !excludedItems?.length
  ) {
    url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${pendingRequest}&diet=${dietaryRestrictions}&number=${count}`;
  } else if (
    //this api call is for when users input data for ingredients they want with excluded items
    pendingRequest &&
    !dietaryRestrictions &&
    excludedItems.length > 0
  ) {
    url =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      SPOONACULAR_API_KEY +
      "&query=" +
      pendingRequest +
      "&excludeIngredients=" +
      excludedItems +
      `&number=${count}`;
  } else if (
    //this api call is for when users input data for ingredients they want with dietary restrictions and excluded items
    pendingRequest &&
    dietaryRestrictions &&
    excludedItems
  ) {
    url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${pendingRequest}&diet=${dietaryRestrictions}&excludedIngredients=${excludedItems.join(
      ","
    )}&number=${count}`;
  } else if (
    //this api call is for when users want to exclude items from their recipe search and do nothing else
    !pendingRequest &&
    !dietaryRestrictions &&
    excludedItems
  ) {
    url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&excludedIngredients=${excludedItems.join(
      ","
    )}&number=${count}`;
  }

  // } else if (
  //   //this api call is for when users want to exclude items from their recipe search and include dietary restrictions
  //   searchQuery1.length === 0 &&
  //   searchQuery2.length > 0 &&
  //   searchQuery3.length > 0
  // ) {
  //   url =
  //     "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
  //     SPOONACULAR_API_KEY +
  //     "&diet=" +
  //     searchQuery2 +
  //     "&excludeIngredients=" +
  //     searchQuery3 +
  //     "&number=10";
  // } else if (
  //   //this api call is for when users want to search for recipes with only their dietary restrictions in mind
  //   !pendingRequest &&
  //   searchQuery2.length === 0 &&
  //   searchQuery3.length > 0
  // ) {
  //   url =
  //     "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
  //     SPOONACULAR_API_KEY +
  //     "&excludeIngredients=" +
  //     searchQuery3 +
  //     "&number=10";
  // }
  //this is the API call using the selected URL based off conditions stated above

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Made a request")
      //parses through first set of data results to get the IDs from API call and then passes them to an empty array as a comma seperated list
      let idList = "";
      for (let i = 0; i < data.results.length; i++) {
        const id = data.results[i].id;
        idList += id + ",";
      }

      //removes last comma from the list
      idList = idList.slice(0, -1);

      //sets a new url variable for the 2nd appi call using the comma seperated list from the first
      let bulkUrl = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${SPOONACULAR_API_KEY}&ids=${idList}`;

      return fetch(bulkUrl);
    })
    .then((response) => response.json())
    .then((bulkApiData) => {
      if (bulkApiData.length === 0) {
        let loading = document.querySelector(".loading-container");
        loading.setAttribute("hidden", true);
        let noItems = document.querySelector(".no-items");
        noItems.classList.remove("hidden");
      }
      // set it to localStorage called currentApiInfoBulk
      localStorage.setItem("currentApiInfoBulk", JSON.stringify(bulkApiData));
      // get the localStorage items currentApiInfoBulk
      let bulkInfo = JSON.parse(localStorage.getItem("currentApiInfoBulk"));
      //generates all meal cards for page
      bulkInfo.forEach((meal) => {
        mealsCard(meal);
      });
      let saveBtn = document.querySelectorAll(".save-btn");
      saveBtn.forEach((item) =>
        item.addEventListener("click", (e) => {
          let dataToSearch = JSON.parse(
            localStorage.getItem("currentApiInfoBulk")
          );
          let idToCompare = Number(e.target.id);
          let foundData = dataToSearch.find((item) => item.id === idToCompare);
          foundData.isSaved = true;
          let prevSavedData = JSON.parse(localStorage.getItem("savedData"));
          let dataExists = prevSavedData?.find(
            (data) => data.id === idToCompare
          );
          if (dataExists) {
            console.log("EXITED");
            return;
          }
          if (prevSavedData) {
            let data = [foundData, ...prevSavedData];
            localStorage.setItem("savedData", JSON.stringify(data));
          } else {
            localStorage.setItem("savedData", JSON.stringify([foundData]));
          }
          console.log(JSON.parse(localStorage.getItem("savedData")));
        })
      );
    })
    //handle errors
    .catch((error) => {
      console.error(error);
    });
}

let bulkInfo = JSON.parse(localStorage.getItem("currentApiInfoBulk"));
//generates all meal cards for page
bulkInfo?.forEach((meal) => {
  mealsCard(meal);
});

//test
