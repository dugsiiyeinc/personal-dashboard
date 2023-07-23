const feedsContener = document.querySelector(".feeds-feeds");
let userInformation = JSON.parse(localStorage.getItem("userInformation"));
let articles = JSON.parse(localStorage.getItem("articles"));
const itemsPage = 10;
let current = 1;

if (!userInformation) {
  window.location.href = "/index.html";
}

const renderArticles = function () {
  // feedsContener.innerHTML = '';

  const startIndex = (current - 1) * itemsPage;

  const endIndex = startIndex + itemsPage;

  const articleItems = articles.slice(startIndex, endIndex);

  articleItems
    .filter((fil) => fil.userId === userInformation.userId)
    .forEach((article) => {
      let html = `
        <div class="feed-feed">
                   
        <div class="feed-feed-part1">
          <img src="${article.photoUrl}" alt="${article.headline}">
        </div>
        <div class="feed-feed-part2">
          <h1>${article.headline}</h1>
          <p>${article.category}</p>
        </div>


      </div>
        
        `;

      feedsContener.insertAdjacentHTML("afterbegin", html);
    });

  current++;
};

renderArticles();

// console.log(userInformation)
// if(!userInformation){
//     window.location.href = '/index.html';
//     return
//   }
