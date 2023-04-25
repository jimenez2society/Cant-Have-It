import { savedMealsCard } from "../../helpers/mealsCard.js";
// render all of the saved meals on the saved meals page
const savedMeals = JSON.parse(localStorage.getItem("savedData"));
savedMeals.forEach((meal) => savedMealsCard(meal));
