let options = JSON.parse(localStorage.getItem("options"));
let currentDietTag = document.querySelector(".current-diet");
let otherResrictionsInput = document.querySelector(".other-restrictions-input");
let otherResrictionsBtn = document.querySelector(".other-restrictions-btn");
let otherResrictionsForm = document.querySelector(".other-restrictions-form");
let emptyTitle = document.querySelector(".emptyTitle");
let deleteDiet = document.querySelector(".delete-diet");
let saveBtn = document.querySelector(".save-restrictions");

saveBtn.addEventListener("click", (e) => {
  location.pathname = "/pages/meals.html";
});
if (options.excludedItems && options.excludedItems.length > 0) {
  emptyTitle.setAttribute("hidden", true);
}
otherResrictionsForm.addEventListener("submit", function (e) {
  e.preventDefault();
  emptyTitle.setAttribute("hidden", true);

  let previousOptions = JSON.parse(localStorage.getItem("options"));
  if (previousOptions?.excludedItems) {
    if (previousOptions.excludedItems.includes(otherResrictionsInput.value)) {
      alert("already exists");
      return;
    }
    previousOptions.excludedItems.push(otherResrictionsInput.value);
    localStorage.setItem("options", JSON.stringify(previousOptions));

    createTag(otherResrictionsInput.value, false);
  } else {
    previousOptions.excludedItems = [otherResrictionsInput.value];
    localStorage.setItem("options", JSON.stringify(previousOptions));
    createTag(otherResrictionsInput.value, false);
  }
  otherResrictionsInput.value = "";
});
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
if (options?.dietaryRestrictions) {
  let id = dietToId(options.dietaryRestrictions);
  let currentDiet = document.querySelector(`#${id}`);
  currentDietTag.textContent = options.dietaryRestrictions;

  currentDiet.checked = true;
}
let restrictionElements = Array.from(document.querySelectorAll(".diet"));

restrictionElements.forEach((el) => {
  el.addEventListener("click", (e) => {
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

const createTag = (itemName) => {
  let selectedRestrictions = document.querySelector(".selected-restrictions");
  let title = document.createElement("span");

  if (itemName) {
    let container = document.createElement("div");
    let exit = document.createElement("span");
    exit.id = itemName;

    container.className = `${itemName} flex justify-between px-[12px] py-[6px] text-whiteFull items-center bg-primary`;
    title.className = ` text-[12px]`;

    title.textContent = itemName;
    exit.className = "text-[8px] p-[5px] excludedItemsDelete";
    exit.textContent = "X";
    exit.style.cursor = "pointer";

    exit.addEventListener("click", (e) => {
      let updatedOptions = {
        ...options,
        excludedItems: JSON.parse(
          localStorage.getItem("options")
        ).excludedItems.filter((item) => item !== e.target.id),
      };

      console.log(updatedOptions.excludedItems.length);

      document.querySelector(`.${e.target.id}`).remove();
      if (updatedOptions.excludedItems.length === 0) {
        emptyTitle.removeAttribute("hidden");
      }
      localStorage.setItem("options", JSON.stringify(updatedOptions));
    });

    container.appendChild(title);
    container.appendChild(exit);
    selectedRestrictions.appendChild(container);
  }
};
createTag();
options?.excludedItems &&
  options?.excludedItems.forEach((item) => {
    createTag(item, false);
  });
