export function mealsCard(meal) {}

//this function creates ten cards for the search requirement of pulling recipies from bulk and using their IDs to create 10 cards (NOTE: An event listener will need to added to the meals page for these cards so the user can call for the recipie information individually. Additionally, another function will need to be called to create a card for when the user selects a particular recipie.)
for (let i=1; i <= 10; i++) {
    //the data for 1 card is made from the API call and displayed below
    var { vegetarian } = data.vegetarian
    var { vegan } = data.vegan
    var { glutenFree } = data.glutenFree
    var { dairyFree } = data.dairyFree
    var { veryHealthy } = data.veryHealthy
    var { cheap } = data.cheap
    var { veryPopular } = data.veryPopular
    //this one is not called in the function but might be needed for succesive API calls so it is saved here
    var { id } = data.id
    var { title } = data.title
    var { image } = data.image
    var { summary } = data.summary
    
    //this selects the ID within a division or section of the meals page and appends a card with unique styling to be determined later to said divison or section
    var card = document.querySelector("#meals-card");
    //creates a div within the card being created
    var box = document.createElement("div");
    //adds classes to the card div created above
    box.classList.add("col-12", "col-md-2", "col-lg-2");
    //adds inner HTML contnet to the div created above using variables previously defined. NOTE: the classes within the headings,images and paragraph sections can be changed for styling but have simply been left with default values at the moment to demonstrate futurue functionality
    box.innerHTML= `
    <img src="${image}" />
    <h5 class = "card-title">${title}</h5>
    <h6 class = "bubbles">${vegetarian}</h6>
    <h6 class = "bubbles">${vegan}</h6>
    <h6 class = "bubbles">${glutenFree}</h6>
    <h6 class = "bubbles">${dairyFree}</h6>
    <h6 class = "bubbles">${veryHealthy}</h6>
    <h6 class = "bubbles">${cheap}</h6>
    <h6 class = "bubbles">${veryPopular}</h6>
    <p class="card-text"> ${summary} MPH</p>
    `;

    //this attaches the card we made to the meals page
    card.appendChild(box);
}