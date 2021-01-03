let newsArticles = [];

let isFirstTimeUpdate = true;
let loadMoreButton = document.getElementById("load-more-button");

const searchForm = document.querySelector(".search");
const input = document.querySelector(".input-box");

let searchTerm; // We need to save the search term so the load more button know what to put in the url

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //sets initial page
  page = 1;

  //set the user input value as a variable to use in the inital render and moreafter with the load more button
  searchTerm = input.value;

  //the input value is used to generate and render page 1 with the user input
  queryString = getQueryString(searchTerm);

  //the url is generated to show the articles on screen
  url = getURL();

  // Hide the load more button before show it again
  loadMoreButton.style.display = "none";
  isFirstTimeUpdate = true;

  //removes previously loaded content in order to create space for newly rendered material
  let resultArea = document.getElementById("results");
  resultArea.innerHTML = "";

  //page is updated
  update();
});

const apiKey = "7c0b04dca86c473bab95e9b6f66d3f07";
const apiRoot = "https://newsapi.org";

// https://newsapi.org/docs/endpoints
const apiEndpoint = ["/v2/top-headlines", "/v2/everything"];

// Starting page is 1
let page = 1;

let queryString = getQueryString();
let url = getURL();

//keyword

// https://newsapi.org/docs/endpoints/top-headlines;
function getQueryString(param1) {
  // This just a local variable inside this function

  // This input is different, not the <input>
  let queryString =
    `qInTitle=${param1}\
            &language=en\
            &sortBy=publishedAt`.replace(/\s/g, "") +
    `&page=${page}` +
    `&apiKey=${apiKey}`;

  console.log(queryString);
  return queryString;
}

function getURL() {
  return `${apiRoot}${apiEndpoint[1]}?${queryString}`;
}

async function update() {
  const result = await fetch(url);
  const data = await result.json();
  newsArticles = data.articles;

  //Render articles then show the load more button
  render();
  showLoadMoreButton(loadMoreButton);
}

function showLoadMoreButton(element) {
  if (isFirstTimeUpdate) {
    element.style.display = "flex";
    isFirstTimeUpdate = false;
  }
}

// https://momentjs.com/docs/#/displaying/fromnow/
function renderArticleCard(article) {
  return `
  <div class="col-12 col-lg-4 my-3">
    <div class="card article">
      <div class="ratio ratio-16x9 article--image" style="background-image: url(${
        article.urlToImage
      });"></div>
      <div class="card-body"></div>
        <h5 class="card-title">${article.title}</h5>
        <div class="article--info mb-2">
          <span class="article--source">${article.source.name}</span>
          ·
          <span class="article--published-at">${moment(
            article.publishedAt
          ).fromNow()}</span>
        </div>
        <div class="article--link">
          <a href="${article.url}">More</a>
        </div>
      </div>
    </div>
  </div>
`;
}

function render() {
  let resultArea = document.getElementById("results");
  let newsArticlesHTML = newsArticles
    .map((article) => renderArticleCard(article))
    .join("\n");

  resultArea.insertAdjacentHTML("beforeend", newsArticlesHTML);
  // It will insert news article to the end of the resultArea, not replace it
}

// const previousLi = document.getElementById("previousLi");
// const previousA = document.getElementById("previousA");
// const nextLi = document.getElementById("nextLi");
// const nextA = document.getElementById("nextA");
// const ul = document.getElementById("ul");

// function previous() {
//   page--;
//   update();
// }

// let next = nextLi.addEventListener("click", () => {
//   previousLi.classList.remove("disabled");
//   loadMore();
// });

// let previousButt = previousLi.addEventListener("click", () => {
//   if (page === 0) {
//     previousLi.classList.add("disabled");
//   }
//   previous();
// });

function loadMore() {
  // let start = 0;
  // let end = 20;
  // start += 20;
  // end += 20;
  // newsArticles.slice(start, end);
  page++;
  queryString = getQueryString(searchTerm);
  url = getURL();
  update();
}

loadMoreButton.onclick = loadMore;
