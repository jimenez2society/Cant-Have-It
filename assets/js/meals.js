import { mealsCard } from "../../helpers/mealsCard.js";
import { SPOONACULAR_API_KEY } from "../../util/keys.js";
var currentApiInfoBulk = JSON.parse(localStorage.getItem("currentApiInfoBulk"));

let url = "";

let allOptions = JSON.parse(localStorage.getItem("options"));
let prevDiet = JSON.parse(localStorage.getItem("previousRestrictions"));

let prevExcluded = JSON.parse(localStorage.getItem("previousExcludedItems"));

let { pendingRequest, dietaryRestrictions, excludedItems } = allOptions;
let count = 20;
if (!excludedItems) {
  excludedItems = [];
};
let excludedChanged;

excludedItems
  .map((item) => {
    excludedChanged = !prevExcluded?.includes(item);
    console.log(excludedChanged);
    return excludedChanged;
  })
  .every(Boolean);
if (excludedItems.length <= 0 && prevExcluded) {
  excludedChanged = true;
}

if (
  !currentApiInfoBulk ||
  dietaryRestrictions !== prevDiet.previousRestrictions ||
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

  if (
    !currentApiInfoBulk ||
    dietaryRestrictions !== prevDiet.previousRestrictions ||
    excludedChanged
  ) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(url);
        console.log("Made a request");
        let idList = "";
        for (let i = 0; i < data.results.length; i++) {
          const id = data.results[i].id;
          idList += id + ",";
        }

        idList = idList.slice(0, -1);

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

        localStorage.setItem("currentApiInfoBulk", JSON.stringify(bulkApiData));

        let bulkInfo = JSON.parse(localStorage.getItem("currentApiInfoBulk"));

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
            let foundData = dataToSearch.find(
              (item) => item.id === idToCompare
            );
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

      .catch((error) => {
        console.error(error);
      });
  }
}

let bulkInfo = JSON.parse(localStorage.getItem("currentApiInfoBulk"));

bulkInfo?.forEach((meal) => {
  mealsCard(meal);
});
let saveBtn = document.querySelectorAll(".save-btn");
saveBtn.forEach((item) =>
  item.addEventListener("click", (e) => {
    alert("here");
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
    if (prevSavedData) {
      let data = [foundData, ...prevSavedData];
      localStorage.setItem("savedData", JSON.stringify(data));
    } else {
      localStorage.setItem("savedData", JSON.stringify([foundData]));
    }
    console.log(JSON.parse(localStorage.getItem("savedData")));
  })
);
