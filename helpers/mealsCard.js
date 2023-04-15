export const dataFetch = {
  id: "649122",
  title: "Kumato Salad",
  readyInMinutes: 45,
  servings: 3,
  diets: ["gluten free", "dairy free", "pescatarian", "vegan"],
  instructions: `"instructions": "Quartered kumato tomatoes. Put in a salad bowl and set aside. Also quartered some cherry tomatoes for garnishing.\nIn a bowl, mix in fish sauce, sugar, lime juice and finely chopped garlic. Stir until the sugar dissolves.\nThinly slice the red onions and mix with kumato tomatoes.\nPour in the dressings and give it a good toss.\nServe in individual bowls and garnish with some cherry tomatoes if you wish. Sprinkle some toasted unsalted peanuts before serving."`,
  vegetarian: false,
  vegan: false,
  glutenFree: true,
  dairyFree: true,
  veryHealthy: false,
  cheap: false,
  veryPopular: false,
  image: "https://spoonacular.com/recipeImages/649122-556x370.jpg",
  spoonacularSourceUrl: " https://spoonacular.com/kumato-salad-649122",
  summary:
    'Kumato Salad is a <b>gluten free, dairy free, and pescatarian</b> recipe with 3 servings. For <b>$2.56 per serving</b>, this recipe <b>covers 17%</b> of your daily requirements of vitamins and minerals. One portion of this dish contains roughly <b>6g of protein</b>, <b>3g of fat</b>, and a total of <b>167 calories</b>. It is brought to you by Foodista. Not a lot of people made this recipe, and 1 would say it hit the spot. A mixture of sugar, onions, cherry tomato, and a handful of other ingredients are all it takes to make this recipe so flavorful. It works best as a hor d\'oeuvre, and is done in roughly <b>45 minutes</b>. With a spoonacular <b>score of 63%</b>, this dish is good. If you like this recipe, you might also like recipes such as <a href="https://spoonacular.com/recipes/my-organic-garden-courgette-fritters-with-home-made-kumato-ketchup-82628">My Organic Garden Courgette Fritters With Home Made Kumato Ketchup</a>, <a href="https://spoonacular.com/recipes/kachumber-salad-or-kuchumber-salad-indian-vegetable-salad-1230365">kachumber salad or kuchumber salad – indian vegetable salad</a>, and <a href="https://spoonacular.com/recipes/kachumber-salad-or-kuchumber-salad-indian-vegetable-salad-1222431">kachumber salad or kuchumber salad – indian vegetable salad</a>.',
};

export function mealsCard(meal) {
  const container = document.querySelector(".results-container");
  const parser = new DOMParser();

  let item = parser.parseFromString(
    `
    <a href=${meal.spoonacularSourceUrl} target="_blank" id=${
      meal.id
    } class="results-item flex bg-whiteFull rounded-[10px] max-w-[890px] overflow-hidden shadow-med">
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
            ${meal.diets
              .map((diet) => {
                let item;
                let bgColor = diet.split(" ");
                if (bgColor.length > 1) {
                  bgColor = `${
                    bgColor[0]
                  }${bgColor[1][0].toUpperCase()}${bgColor[1].substring(
                    1,
                    bgColor[0].length
                  )}`;
                }

                item = `<span class="block text-[8px] bg-${bgColor} rounded-full px-[13px] py-[5px]">
                ${diet}
              </span>`;
                return item;
              })
              .join(" ")}
            </div>
          </div>
          <p class="text-[12px] leading-[19.5px]">
           ${meal.summary.substring(0, 300)}${
      meal.summary.length >= 300 && "..."
    }
          </p>
        </div>
      </a>`,
    "text/html"
  );

  container.appendChild(item.documentElement);
  //   meal.diets.forEach((diet) => {
  //     let span = document.createElement("span");
  //     span.className = `block text-[8px] bg-${diet} rounded-full px-[13px] py-[5px]`;
  //     span.textContent = diet;
  //     let tagsContainer = document.querySelector(".resultItem-tags");
  //     tagsContainer.appendChild(span);
  //   });
}
