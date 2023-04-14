export const dataFetch = {
  id: "649122",
  title: "Kumato Salad",
  readyInMinutes: 45,
  servings: 3,
  diets: ["gluten free", "dairy free", "pescatarian"],
  instructions: `"instructions": "Quartered kumato tomatoes. Put in a salad bowl and set aside. Also quartered some cherry tomatoes for garnishing.\nIn a bowl, mix in fish sauce, sugar, lime juice and finely chopped garlic. Stir until the sugar dissolves.\nThinly slice the red onions and mix with kumato tomatoes.\nPour in the dressings and give it a good toss.\nServe in individual bowls and garnish with some cherry tomatoes if you wish. Sprinkle some toasted unsalted peanuts before serving."`,
  vegetarian: false,
  vegan: false,
  glutenFree: true,
  dairyFree: true,
  veryHealthy: false,
  cheap: false,
  veryPopular: false,
  image: "https://spoonacular.com/recipeImages/649122-556x370.jpg",
  summary:
    "Kumato Salad is a <b>gluten free, dairy free, and pescatarian</b> recipe with 3 servings. For <b>$2.56 per serving</b>, this recipe <b>covers 17%</b> of your daily requirements of vitamins and minerals. One portion of this dish contains roughly <b>6g of protein</b>, <b>3g of fat</b>, and a total of <b>167 calories</b>. It is brought to you by Foodista. Not a lot of people made this recipe, and 1 would say it hit the spot. A mixture of sugar, onions, cherry tomato, and a handful of other ingredients are all it takes to make this recipe so flavorful. It works best as a hor d'oeuvre, and is done...",
};

export function mealsCard(meal) {
  const container = document.querySelector(".results-container");
  const parser = new DOMParser();
  let item = parser.parseFromString(
    `<div id=${meal.id} class="results-item flex bg-whiteFull rounded-[10px] max-w-[890px] overflow-hidden shadow-med">
        <div>
          <img
            class="results-img max-w-[224px] h-full object-cover"
            src="${meal.image}"
            alt=""
          />
        </div>
        <div class="py-[15px] pl-[20px] pr-[35px]">
          <div class="resultItem-content flex gap-[30px] items-center mb-[15px]">
            <h4 class="text-[18px]">${meal.title}</h4>
            <div class="resultItem-tags flex gap-[8px] items-center">
              <span class="block text-[8px] bg-vegetarian rounded-full px-[13px] py-[5px]">
                Vegetarian
              </span>
              <span class="block text-[8px] bg-vegan rounded-full px-[13px] py-[5px]">
                Vegan
              </span>
              <span class="block text-[8px] bg-popular text-whiteFull rounded-full px-[13px] py-[5px]">
                Popular
              </span>
            </div>
          </div>
          <p class="text-[12px] leading-[19.5px]">
           ${meal.summary}
          </p>
        </div>
      </div>`,
    "text/html"
  );
  container.appendChild(item.documentElement);
}
