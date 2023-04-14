// testing form submit

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
  let options =
    localStorage.getItem("options") &&
    JSON.parse(localStorage.getItem("options"));
  let finalizedData = formData.length > 1 ? formData.join(",") : formData[0];
  if (options && finalizedData === options[0].pendingRequest) {
    window.location.pathname = "/pages/meals.html";
  } else {
    alert("api");
    // remove the bulkInfo localStorage item
  }
  // save the items in localStorage temporarily called pendingRequest

  localStorage.setItem(
    "options",
    JSON.stringify([{ pendingRequest: finalizedData }])
  );

  //set value fo answeredRestrictionLocal
  // check if there is a answeredRestrictionModal in localStorage
  if (localStorage.getItem("answeredRestrictedModal")) {
    //if modal returns true redirect to meals page and continue api call
    window.location.pathname = "/pages/meals.html";
  } else {
    //if modal returns false redirect to restrictions page and get restrictions before continuing api call

    // open modal
    openModal();
  }
});
