let newsUrl = `https://newsapi.org/v2/everything?q=health-food&apiKey=8ced9118ba534ceeb967b259202faa4a`;
// fetch news api url and map through the articlas and display a card for each item
fetch(newsUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    data?.articles.forEach((articles) => {
      let loading = document.querySelector(".loading-container");
      loading.setAttribute("hidden", true);
      const container = document.querySelector(".results-container");
      const parser = new DOMParser();
      let item = parser.parseFromString(
        `
              <div  id=${articles.id} class="results-item relative overflow-hidden  flex bg-whiteFull  rounded-[10px] shadow-med">
              <a href=${articles.url} target="_blank" class="opacity-0 bg-[rgba(0, 0, 0, 0.656)] result-backdrop  absolute w-full h-full z-[1000]">
              </a>
                  <div class="flex">
                  <div href=${articles.url} target="_blank" class="results-img-container">
                    <img
                      class=" results-img  max-w-[224px] h-full object-cover"
                      src="${articles.urlToImage}"
                      alt=""
                    /></div>
                  </div>
                  <div class="results-body relative py-[15px] pl-[20px] pr-[35px]  cursor-pointer">
                    <div class="resultItem-content flex flex-col items-start mb-[15px]">
                      <h4 class="text-[14px] mb-[6px]">${articles.title}</h4>
                    </div>
                    <p class="text-[12px] leading-[19.5px]">
                     ${articles.description}
                    </p>
                  </div>
                </div>`,
        "text/html"
      );
      container.appendChild(item.documentElement);
    });
  });
