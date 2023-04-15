// testing form submit

import { openToast } from "./assets/js/toast.js";
import { openModal } from "./helpers/modalHelper.js";


let ingredientsFormMainPage = document.querySelector(
  "#main-page__ingredients-form"
);
let ingredients = document.querySelector(`input[name="ingredients"]`);
ingredientsFormMainPage.addEventListener("submit", (e) => {
  e.preventDefault();

  if (ingredients.value === "") {
    openToast("Please enter atleast one ingredient");
    return;
  }
  //Split the input value into an array of ingredients
  let formData = ingredients.value.split(" ");

  //this sets the value of the variable options in case the user reuses the same search query
  let options =
    localStorage.getItem("options") &&
    JSON.parse(localStorage.getItem("options"));
  // If there are multiple ingredients, this function joins them
  let finalizedData = formData.length > 1 ? formData.join(",") : formData[0];
  //if statement checks if the options variable exists and if the finalizedData variable matches the pendingRequest value for the first item in the options array set in local stoarge below 
  if (
    options &&
    finalizedData === options[0].pendingRequest &&
    localStorage.getItem("answeredRestrictedModal")
  ) {
    //  we will keep previous items in the local storage
    window.location.pathname = "/pages/meals.html";
  } else {
    alert("api");
    // remove the bulkInfo localStorage item
  }
  // save the items in localStorage temporarily called options with the property pendingrequest set to the value of finalizedData

  localStorage.setItem(
    "options",
    JSON.stringify([{ pendingRequest: finalizedData }])
  );

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