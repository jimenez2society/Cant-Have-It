// testing form submit

let ingredientsFormMainPage = document.querySelector(
  "#main-page__ingredients-form"
);
let ingredientsFormMainPageBtn = document.querySelector(
  "#main-page__ingredients-btn"
);
let ingrediendsFormData = new FormData(
  ingredientsFormMainPage,
  ingredientsFormMainPageBtn
);
ingredientsFormMainPage.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(ingrediendsFormData);
});
