
```
AS an indiviual with health rescritions
I WANT to be able to enter a product or a list of products and get recipes that exclude those items
AS an individual with a specific diet
I WANT to be able to enter my dietary restrictions an get recipes that cater to it
```

## Excluding one ingredient from a meal

API endpoint example:

- We use the base url `https://api.spoonacular.com`.
- We include the appropriate paths after the base url `/recipes/complexSearch`.
- We include our api key in the query `?apiKey={API_KEY}`.
- The `?` starts a query.
- Finally, we make our query with certain parameters that the api has predefined for users. We do this after our api key with the `&` sign `&query=breakfast&excludeIngredients=eggs`.
- The `&` sign basically seperates the different options also know as the `parameters`.
- Now, here is what the full api url looks like `https://api.spoonacular.com/recipes/complexSearch?apiKey={API_KEY}&query=breakfast&excludeIngredients=eggs`.

## Excluding multiple items from a meal

API endpoint example:

- `https://api.spoonacular.com/recipes/complexSearch?apiKey={API_KEY}&query=breakfast&excludeIngredients=eggs,bacon,beef`.

- The only difference here is that we are adding multiple ingredients to the excludeIngredients parameter seperated by commas.

### This is an example of one of the objects we get from the response array

```
{
	"id": 649122,
	"title": "Kumato Salad",
	"image": "https://spoonacular.com/recipeImages/649122-312x231.jpg",
	"imageType": "jpg"
}
```
## Get recipes with dietary rescritions

API endpoint example:

- `https://api.spoonacular.com/recipes/complexSearch?apiKey={API_KEY}&diet=Pescetarian`.

- We use the `diet` parameter and select a dietary restrictions options. There is a list of what we can use [here](https://spoonacular.com/food-api/docs#Diets).

## Getting the analyzed recipe instructions

API endpoint example:

- `https://api.spoonacular.com/recipes/{id}/analyzedInstructions?apiKey={API_KEY}`.

- We will get the `id` from one of the above responses and replace the `${id}` with it. This will generate the steps on how to prepare the recipe.

Note - This endpoint structure is not a global rule to all APIs, every API has a different way of structuring their endpoints. I followed the docs [here](https://spoonacular.com/food-api/docs#Search-Recipes-Complex). As for where to put the API key I followed this guide [here](https://spoonacular.com/food-api/docs#Authentication).

## Homepage

![Can't have it homepage]()

### The process

- When a user lands on the home page they are presented with an input and some content.
- The user can type in one or more ingredients to recieve recipes.
- If the user has no restrictions, they will be presented with a modal asking if they have an food restrictions.
- If the user selects yes, they will be redirected to the restrictions page.

- If the user selects no, they will continue to look at recipes.

## Meals page

- This is the page where the list of recipes will be displayed. A user can click on a recipe to get more information about it as well as cooking instructions.

- The user can also save the recipes.

## Meal page

- This is a page that displays a single meal.
- Giving information as well as cooking instructions.

## Restrictions page

- This page allows the user to set restrictions of any allergies/dietary restrictions/ or unliked foods to be set while they look through recipes.

- Users can add and remove the restrictions.
