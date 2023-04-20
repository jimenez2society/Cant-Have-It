import { savedMealsCard } from "../../helpers/mealsCard.js";

const savedMeals = JSON.parse(localStorage.getItem("savedData"));
savedMeals.forEach((meal) => savedMealsCard(meal));
