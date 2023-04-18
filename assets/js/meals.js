import { storage } from "../../helpers/localStorage.js";
import { mealsCard } from "../../helpers/mealsCard.js";
import { SPOONACULAR_API_KEY } from "../../util/keys.js";
let allOptions = storage.get("options");

// set up if statements to fill in url. We assume the variables are arrays and check their length to see what url we need for our api call.

// we desctructor the allOptions object
let { pendingRequest, dietaryRestrictions, excludedItems } = allOptions;

// checking if there is data in the "bulkDataApi" local storage
const bulkDataApi = JSON.parse(localStorage.getItem("bulkDataApi"));
console.log(storage.get("savedData"));
// a function that takes a parameter of type
const query = (type) => {
  // we structure the api url depending on what "type" equals then return it
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${pendingRequest}${
    type === "diet" ? `&diet=${dietaryRestrictions}` : ""
  }${type === "excludedItems" ? `&excludedItems=${excludedItems}` : ""}${
    type === "all"
      ? `&diet=${dietaryRestrictions}&excludedItems=${excludedItems}`
      : ""
  }&number=20`;
  console.log(url);
  return url;
};

const handleApiCall = (url) => {
  // set ids to an empty array for later use
  let ids = [];

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // for each result item we push the id to the ids array above
      data?.results.forEach((item) => ids.push(item.id));
      // we reset ids to itself as a string seperated by commas
      ids = ids.join(",");
      // we return another fetch that gets the bulk data for each id
      return fetch(
        `https://api.spoonacular.com/recipes/informationBulk?apiKey=${SPOONACULAR_API_KEY}&ids=${ids}`
      );
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        let loading = document.querySelector(".loading-container");
        loading.setAttribute("hidden", true);
        let noItems = document.querySelector(".no-items");
        noItems.classList.remove("hidden");
      }
      // we update the buildDataApi with the data that was given from the returned fetch
      // the update method on 'storage' returns the localStorage item as well, so we set it to a variable
      let d = storage.update("bulkDataApi", data);
      // for each data in d we render a mealsCard
      d.forEach((data) => mealsCard(data));
      let saveBtn = document.querySelectorAll(".save-btn");
      saveBtn.forEach((item) =>
        item.addEventListener("click", (e) => {
          let dataToSearch = storage.get("bulkDataApi");
          let idToCompare = Number(e.target.id);
          let foundData = dataToSearch.find((item) => item.id === idToCompare);
          foundData.isSaved = true;
          let prevSavedData = storage.get("savedData");
          let dataExists = prevSavedData?.find(
            (data) => data.id === idToCompare
          );

          if (dataExists) {
            console.log("EXITED");
            return;
          }
          if (prevSavedData) {
            let data = [foundData, ...prevSavedData];
            storage.set("savedData", data);
          } else {
            storage.set("savedData", [foundData]);
          }

          console.log(storage.get("savedData"));
        })
      );
    });
};
// if bulkDataApi does not exist in the localStorage then allow for api calls
if (!bulkDataApi) {
  // if no dietary restrictions or no excluded items then only use pendingRequest data
  if (pendingRequest && !dietaryRestrictions && !excludedItems?.length) {
    console.log("No restrictions");
    handleApiCall(query());
  }
  // if no excluded items then only use pendingRequest and dietaryRestrictions data
  if (pendingRequest && dietaryRestrictions && !excludedItems?.length) {
    console.log("dietary restrictions");
    handleApiCall(query("diet"));
  }
  // if no dietaryRestrictions then only use pendingRequest and excluded items data
  if (pendingRequest && !dietaryRestrictions && excludedItems) {
    console.log("excluded items restrictions");
    handleApiCall(query("excludedItems"));
  }
  // if all exists then make full query with all the data
  if (pendingRequest && dietaryRestrictions && excludedItems.length) {
    console.log("all restrictions");
    handleApiCall(query("all"));
  }
}
// use the storage object method get() to get the bulkDataApi item from localStorage. The storage object is a created in the ./helpers/localStorage.js file
let bulkInfo = storage.get("bulkDataApi");
bulkInfo?.forEach((meal) => {
  mealsCard(meal);
});
let saveBtn = document.querySelectorAll(".save-btn");
saveBtn.forEach((item) =>
  item.addEventListener("click", (e) => {
    let dataToSearch = storage.get("bulkDataApi");
    let idToCompare = Number(e.target.id);
    let foundData = dataToSearch.find((item) => item.id === idToCompare);
    foundData.isSaved = true;
    let prevSavedData = storage.get("savedData");
    let dataExists = prevSavedData?.find((data) => data.id === idToCompare);
localStorag
    if (dataExists) {
      console.log("EXITED");
      return;
    }
    if (prevSavedData) {
      let data = [foundData, ...prevSavedData];
      storage.set("savedData", data);
    } else {
      storage.set("savedData", [foundData]);
    }

    console.log(storage.get("savedData"));
  })
);
