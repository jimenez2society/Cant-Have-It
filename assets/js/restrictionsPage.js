// get user restrictions info
//sets the ingredientsFormRestrictionsPage variable to a form from the restirctions page html
let options = JSON.parse(localStorage.getItem("options"));
let currentDietTag = document.querySelector(".current-diet");
let otherResrictionsInput = document.querySelector(".other-restrictions-input")
let otherResrictionsBtn = document.querySelector(".other-restrictions-btn")
let otherResrictionsForm = document.querySelector(".other-restrictions-form")
otherResrictionsForm.addEventListener("submit", function(e){
  e.preventDefault()
  let previousOptions = JSON.parse(localStorage.getItem("options"));
  if (previousOptions.excludedItems){
    previousOptions.excludedItems.push(otherResrictionsInput.value)
    localStorage.setItem("options", JSON.stringify(previousOptions))
  } else {
    previousOptions.excludedItems = [otherResrictionsInput.value]
    localStorage.setItem("options", JSON.stringify(previousOptions))
  }
  console.log(otherResrictionsInput.value)
  
}) 
console.log(otherResrictionsInput)
const dietToId = (diet) => {
  console.log(diet);
  if (diet.split("-")) {
    let dietToId = diet.split("-");
    if (dietToId[1]) {
      dietToId[1] = `${dietToId[1][0].toUpperCase()}${dietToId[1].substring(
        1
      )}`;
    }

    dietToId = dietToId.join("").trim(" ");
    return dietToId;
  }
  return diet;
};
if (options.dietaryRestrictions) {
  let id = dietToId(options.dietaryRestrictions);
  console.log(id);
  let currentDiet = document.querySelector(`#${id}`);
  console.log({ currentDiet });

  currentDietTag.textContent = options.dietaryRestrictions;
  currentDiet.checked = true;
}
// let fakeRestrictionsData = {
//   // ...options,
//   excludedItems: ["onions", "chicken"],
//   // dietaryRestrictions: "vegetarian",
// };
// console.log({ fakeRestrictionsData });
// localStorage.setItem("options", JSON.stringify(fakeRestrictionsData));
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
let restrictionElements = Array.from(document.querySelectorAll(".diet"));

restrictionElements.forEach((el) => {
  el.addEventListener("click", (e) => {
    console.log("CLICKED");
    if (e.target.checked) {
      currentDietTag.textContent = e.target.value;
      let optionsWithRestrictions = {
        ...options,
        dietaryRestrictions: e.target.value,
      };

      localStorage.setItem("options", JSON.stringify(optionsWithRestrictions));
    }
  });
});
console.log(restrictionElements);
