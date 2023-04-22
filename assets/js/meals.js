import { mealsCard } from "../../helpers/mealsCard.js";
import { SPOONACULAR_API_KEY } from "../../util/keys.js";
import { openToast } from "./toast.js";
// getting the currentApiInfoBulk and setting a variable url for later use
var currentApiInfoBulk = JSON.parse(localStorage.getItem("currentApiInfoBulk"));
let url = "";
let allOptions = JSON.parse(localStorage.getItem("options"));
let prevDiet = JSON.parse(localStorage.getItem("previousRestrictions"));
let prevExcluded = JSON.parse(localStorage.getItem("previousExcludedItems"));

// destructuring allOptions localStorage item
let { pendingRequest, dietaryRestrictions, excludedItems } = allOptions;
// setting count to 20 (the number of items we get from api)
let count = 20;
// if there isn't excluded items then we set it to an empty array to avoid error
if (!excludedItems) {
  excludedItems = [];
}

// set empty variable excludedChanged
let excludedChanged;
if (excludedItems && prevExcluded) {
  // we map through excludedItems and return and array with true or false depending on weather or not prevExcluded includes any of the items in excludedItems. Then we check if every items in the returned array is true with .every(Boolean)
  excludedItems
    .map((item) => {
      excludedChanged = !prevExcluded?.includes(item);
      console.log(excludedChanged);
      return excludedChanged;
    })
    .every(Boolean);
}
// conditionals to check weather the is any restrictions or excluded items and build the url depening on the condition
if (
  !currentApiInfoBulk ||
  dietaryRestrictions !== prevDiet?.previousRestrictions ||
  excludedChanged
) {
  localStorage.removeItem("currentApiInfoBulk");
  localStorage.setItem(
    "previousRestrictions",
    JSON.stringify({
      previousRestrictions: dietaryRestrictions,
    })
  );
  localStorage.setItem("previousExcludedItems", JSON.stringify(excludedItems));
  if (pendingRequest && !dietaryRestrictions && !excludedItems?.length) {
    url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${pendingRequest}&number=${count}`;
  } else if (pendingRequest && dietaryRestrictions && !excludedItems?.length) {
    url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${pendingRequest}&diet=${dietaryRestrictions}&number=${count}`;
  } else if (
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
  } else if (pendingRequest && dietaryRestrictions && excludedItems) {
    url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${pendingRequest}&diet=${dietaryRestrictions}&excludeIngredients=${excludedItems.join(
      ","
    )}&number=${count}`;
  } else if (!pendingRequest && !dietaryRestrictions && excludedItems) {
    url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&excludeIngredients=${excludedItems.join(
      ","
    )}&number=${count}`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // set idList to empty string for later use
      let idList = "";
      // loop through results and get id of each item and concat it to idList with a comma
      for (let i = 0; i < data.results.length; i++) {
        const id = data.results[i].id;
        idList += id + ",";
      }
      // remove the last comma
      idList = idList.slice(0, -1);
      // set bulk api to url with the id list
      let bulkUrl = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${SPOONACULAR_API_KEY}&ids=${idList}`;
      // return another fetch with the bulkUrl
      return fetch(bulkUrl);
    })
    .then((response) => response.json())
    .then((bulkApiData) => {
      // if no items we hide the loading screen and display the no items container
      if (bulkApiData.length === 0) {
        let loading = document.querySelector(".loading-container");
        loading.setAttribute("hidden", true);
        let noItems = document.querySelector(".no-items");
        noItems.classList.remove("hidden");
      }
      // set bulkApiData to the localStorage
      localStorage.setItem("currentApiInfoBulk", JSON.stringify(bulkApiData));
      // get the bulkData from localStorage
      let bulkInfo = JSON.parse(localStorage.getItem("currentApiInfoBulk"));
      // render a mealsCard for each meal
      bulkInfo.forEach((meal) => {
        mealsCard(meal);
      });

      // hanlde the save button to allow for saving a meal
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
          // open toast on successful save
          openToast("Successfully Saved ✅");
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

    .catch((error) => {
      console.error(error);
    });
}
// get the currentApiInfoBuilk from localStorage
let bulkInfo = JSON.parse(localStorage.getItem("currentApiInfoBulk"));
// render mealsCard again and handle save button outside of fetch just in case we dont make another api call
bulkInfo?.forEach((meal) => {
  mealsCard(meal);
});

let saveBtn = document.querySelectorAll(".save-btn");
saveBtn.forEach((item) =>
  item.addEventListener("click", (e) => {
    let dataToSearch = JSON.parse(localStorage.getItem("currentApiInfoBulk"));
    let idToCompare = Number(e.target.id);
    let foundData = dataToSearch.find((item) => item.id === idToCompare);
    foundData.isSaved = true;
    let prevSavedData = JSON.parse(localStorage.getItem("savedData"));
    let dataExists = prevSavedData?.find((data) => data.id === idToCompare);
    if (dataExists) {
      console.log("EXITED");
      return;
    }

    openToast("Successfully Saved ✅");
    if (prevSavedData) {
      let data = [foundData, ...prevSavedData];
      localStorage.setItem("savedData", JSON.stringify(data));
    } else {
      localStorage.setItem("savedData", JSON.stringify([foundData]));
    }
    console.log(JSON.parse(localStorage.getItem("savedData")));
  })
);
