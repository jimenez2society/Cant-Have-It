export function mealsCard(meal) {
  let loading = document.querySelector(".loading-container");
  loading.setAttribute("hidden", true);
  const container = document.querySelector(".results-container");
  const parser = new DOMParser();
  let item = parser.parseFromString(
    `
    <div  id=${
      meal.id
    } class="results-item relative overflow-hidden  flex bg-whiteFull  rounded-[10px] max-w-[890px]   shadow-med">
    <div class="opacity-0 bg-[rgba(0, 0, 0, 0.656)] result-backdrop  absolute w-full h-full z-[1000]">
    </div>
    <div class="result-actions w-full h-full absolute z-[2000]">
    <div id=${meal.id} class="absolute save-btn opacity-0">
          ${
            meal?.isSaved
              ? `saved`
              : `<img id=${meal.id} src="../assets/svg/bookmark-not-saved.svg"/>`
          }
          </div>
    <a class="absolute opacity-0" href=${
      meal.spoonacularSourceUrl
    } target="_blank "><img src="../assets/svg/link.svg"/></a>
    </div>
        <div class="flex">
        <div href=${
          meal.spoonacularSourceUrl
        } target="_blank" class="results-img-container">
          <img
            class=" results-img  max-w-[224px] h-full object-cover"
            src="${meal.image}"
            alt=""
          /></div>
        </div>
        <div class="results-body relative py-[15px] pl-[20px] pr-[35px]  cursor-pointer">
          <div class="resultItem-content flex flex-col items-start mb-[15px]">
            <h4 class="text-[14px] mb-[6px]">${meal.title}</h4>
            <div class="resultItem-tags flex gap-[8px] items-center">
            ${meal.diets
              .map((diet, i) => {
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
                console.log(meal.id);
                item = `<span  class="block ${
                  i >= 3 ? "hidden" : ""
                } bg-${bgColor} text-[8px] rounded-full px-[10px] py-[5px]">
                ${diet}
              </span>`;
                return item;
              })
              .join(" ")}
              ${
                meal.cheap
                  ? `<span class="block text-[8px] bg-cheap rounded-full px-[13px] py-[5px]">
                Cheap
              </span>`
                  : ""
              }
              ${
                meal.veryPopular
                  ? `<span class="block text-[8px] bg-veryPopular rounded-full px-[13px] py-[5px]">
                Very popular
              </span>`
                  : ""
              }
              <span class="text-[8px] ${
                meal.diets.length < 3 ? "hidden" : "block"
              }">
                ${meal.diets.length > 3 ? `${meal.diets.length - 3}+` : ""}
              </span>
            </div>
          </div>
          <p class="text-[12px] leading-[19.5px]">
           ${meal.summary.substring(0, 600)}${
      meal.summary.length >= 300 && "..."
    }
          </p>
        </div>
      </div>`,
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
