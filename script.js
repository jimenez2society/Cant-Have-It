// testing form submit

import { mealsCard } from "./helpers/mealsCard.js";
import { openModal } from "./helpers/modalHelper.js";

let ingredientsFormMainPage = document.querySelector(
  "#main-page__ingredients-form"
);
let ingredientsFormMainPageBtn = document.querySelector(
  "#main-page__ingredients-btn"
);
let ingredients = document.querySelector(`input[name="ingredients"]`);
ingredientsFormMainPage.addEventListener("submit", (e) => {
  e.preventDefault();

  //Split the input value into an array of ingredients
  let formData = ingredients.value.split(" ");

  // If there are multiple ingredients join them

  let finalizedData = formData.length > 1 ? formData.join(",") : formData[0];

  // save the items in localStorage temporarily called pendingRequest

  localStorage.setItem(
    "options",
    JSON.stringify([{ pendingRequest: finalizedData }])
  );

  //set value fo answeredRestrictLocal
  // check if there is a answeredRestrictionModal in localStorage
  if (localStorage.getItem("answeredRestrictedModal")) {
    window.location.pathname = "/pages/meals.html";
  } else {
    openModal();
  }
});
