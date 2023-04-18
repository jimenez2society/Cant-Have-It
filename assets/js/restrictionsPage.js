// get user restrictions info
//sets the ingredientsFormRestrictionsPage variable to a form from the restirctions page html
let options = JSON.parse(localStorage.getItem("options"));
let fakeRestrictionsData = {
  ...options,
  excludedItems: ["onions", "chicken", "beans"],
  dietaryRestrictions: "vegetarian",
};
console.log({ fakeRestrictionsData });
localStorage.setItem("options", JSON.stringify(fakeRestrictionsData));

window.location.pathname = "/pages/meals.html";

// let ingredientsFormRestrictionsPage = document.querySelector(
//   "#restrictions-page__restricted-ingredients-form"
// );

// //sets the value of variable restrictedIngredients to that of user input within the html of restrictions page
// let restrictedIngredients = document.querySelector(
//   `input[name="restrictedIngredients"]`
// );

// //adds event listener to restrictions page for excluded ingredients
// ingredientsFormRestrictionsPage.addEventListener("submit", (e) => {
//   e.preventDefault();

//   //Split the input value into an array of ingredients
//   let formData = restrictedIngredients.value.split(" ");
//   //join the array as a comma seperated list
//   let finalizedData = formData.length > 1 ? formData.join(",") : formData[0];
//   //save the items to local storage
//   localStorage.setItem("excludedItems", finalizedData);
// });

// // not sure how the page for restricted diets is going to be set up yet but the local storage variable should be named dietaryRestrictions and should be assigned a value later
// localStorage.setItem("dietaryRestrictions", value);
