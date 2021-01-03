let newsArticles = [];
let resultArea = document.getElementById('results');

let isFirstTimeUpdate = true;
let loadMoreButton = document.getElementById("load-more-button");

let articlesCount = 0;
let totalArticles = 0;
let articlesInfo = document.getElementById("articles-info");


const apiKeys = [
  '4d4ecf6a69b9425e822a25c3e7e88ed5',
  'b33510f07e8f4a5bbf0fce2f2bd4608e',
  '09c3f6162e744605bf7da2267c5a0be3'
];

// var apiKey = apiKeys[0];
var apiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

const apiRoot = 'http://newsapi.org'; 

const apiEndpoint = [
  '/v2/top-headlines',
  '/v2/everything'
];
// https://newsapi.org/docs/endpoints

// Starting page is 1
let page = 1; 

let queryString = getQueryString();
let url = getURL();

function getQueryString() {
  return `q=technology
            &language=en
            &sortBy=publishedAt`
          .replace(/\s/g,'')      // Because we break the query string into different lines, we need to replace all the space, new line with empty string to use it with fetch()
          + `&page=${page}`
          + `&apiKey=${apiKey}`;
}
// https://newsapi.org/docs/endpoints/top-headlines;

function getURL() {
  return `${apiRoot}${apiEndpoint[1]}?${queryString}`;
}

async function update() {
  try { // Catch error in both fetch() and result.json() https://javascript.info/async-await#error-handling
    const result = await fetch(url);
    const data = await result.json();
    if (data.status === "ok") {
      newsArticles = data.articles;

      page += 1;
      articlesCount += data.articles.length;
      totalArticles = data.totalResults;

      renderArticles(resultArea);
      renderArticlesCount(articlesInfo);
      showLoadMoreButton(loadMoreButton);
    }
  } catch (error) {
    console.log("Something's wrong. Maybe it's your Wifi." + error);
  }
}

function showLoadMoreButton(element) {
  if (isFirstTimeUpdate) {
    element.style.display = "block";
    isFirstTimeUpdate = false;
  }
}

function renderArticlesCount(element) {
  element.innerHTML = `
    <span>Showing <span class="fw-bold">${articlesCount}</span>/${totalArticles} articles.</span>
  `;
}
function renderArticleCard(article) {
  return `
  <article class="col-12 col-lg-4 my-3">
    <div class="card article">
      <div class="ratio ratio-16x9 article--image" style="background-image: url(${article.urlToImage || ""});"></div>
      <div class="card-body">
        <h5 class="card-title">${article.title}</h5>
        <div class="article--info mb-2">
          <span class="article--source">${article.source.name}</span>
          ·
          <span class="article--published-at">${moment(article.publishedAt).fromNow()}</span>
        </div>
        <div class="article--link">
          <a href="${article.url}">More</a>
        </div>
      </div>
    </div>
  </article>
`;
}
// https://momentjs.com/docs/#/displaying/fromnow/
// ${article.urlToImage || ""} => Prevent reference to null otherwise the browser will try to look for the image at localhost/null and the console will show an error GET http://localhost:5500/null 404 (Not Found)


function renderArticles(element) {
  let newsArticlesHTML = newsArticles
    .map((article) => 
      renderArticleCard(article))
    .join('\n');

  element.insertAdjacentHTML('beforeend', newsArticlesHTML);
}

function loadMore() {
  queryString = getQueryString();
  url = getURL();
  update();
}

// Load articles after visit page
update();

loadMoreButton.onclick = loadMore;