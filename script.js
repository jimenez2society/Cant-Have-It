// testing form submit
import { SPOONACULAR_API_KEY } from "./util/keys.js";

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

  localStorage.setItem("pendingRequest", JSON.stringify(finalizedData));

  //set value fo answeredRestrictLocal
  // check if there is a answeredRestrictionModal in localStorage
  if (localStorage.getItem("answeredRestirctModal")) {
    window.location.pathname = "/pages/meals.html";
  } else {
    window.location.pathname = "/pages/restrictionsPage.html";
  }

  // if modal returns false then continue with api call
  // callApi(pendingRequest)

  // if modal returns true then redirect to the resctrictions page

  // once restrictions are added perform api call with all variables

  //   callApi() this will have the added restrictions
  //   window.location.pathname = "/pages/restrictionsPage.html";
  //   `https://api.spoonacular.com/recipes/complexSearch?apiKey={API_KEY}&query=breakfast&excludeIngredients=finalizedData`
});
