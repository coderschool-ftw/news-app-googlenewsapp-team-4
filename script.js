let newsArticles = [];
let resultArea = document.getElementById('results');

let isFirstTimeUpdate = true;
let loadMoreButton = document.getElementById("load-more-button");

let articlesCount = 0;
let totalArticles = 0;
let articlesInfo = document.getElementById("articles-info");

let errorElement = document.getElementById("error");

const apiKeys = [
  '4d4ecf6a69b9425e822a25c3e7e88ed5',
  'b33510f07e8f4a5bbf0fce2f2bd4608e',
  '09c3f6162e744605bf7da2267c5a0be3'
];

// var apiKey = apiKeys[0];
var apiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

let page = 1; // Starting page is 1
let url;

/**
 * This function use destructuring assignment to make it smart.
 * It "has many parameters, most of which are optional". And we don't want to remember the order of arguments.
 * https://javascript.info/destructuring-assignment#smart-function-parameters
 * When call it, we need to pass an object - with only the properties we need - as the only argument.
 * e.g.
 * - getURL() -> The function will be invoked with all the default option.
 * - getURL({ page }) -> page is the one we pass, other is default.
 * - getURL({ endpoint: 0})
 * - getURL({ q: 'Vietnam' })
 */
function getURL({
  country = 'us',
  q: qInTitle = 'vietnam', // Keywords or phrases to search for in the article title only. -> We should search only in the title, the article will be more relevant to the keyword.
  page = 1, 
  apiKey: key = apiKey, // We want to use the same property name - apiKey when pass to the function, so inside the function, we need to rename it to another name.
  endpoint = 1,
  sortBy = 'publishedAt',
  language = 'en'
} = {}) {
  const apiRoot = 'http://newsapi.org'; 

  const apiEndpoint = [
    '/v2/top-headlines',
    '/v2/everything'
  ];
  // https://newsapi.org/docs/endpoints

  let queryString;

  // 2 endpoints have some different parameters
  if (endpoint === 0) { // I still don't understand about top-headlines endpoint. Sometimes it show just a few results.
    queryString = `
      country=${country}
      ${ typeof someVar !== 'undefined' ? `&category=${category}` : '' } /* This will only add the category parameter into queryString if we pass it to the function */
    `;
  } else if (endpoint === 1) {
    queryString = `
      qInTitle=${qInTitle}
      &sortBy=${sortBy}
    `;
  }

  queryString += `
    &language=${language}
    &page=${page}
    &apiKey=${key}
  `

  queryString = queryString.replace(/\s/g,'');
  // Because we break the query string into different lines,
  // we need to remove all the spaces, new lines before use it with fetch()

  return `${apiRoot}${apiEndpoint[endpoint]}?${queryString}`;
}
// https://newsapi.org/docs/endpoints/top-headlines;

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
    } else if (data.status === "error") {
      let message;

      switch (data.code) {
        case "maximumResultsReached":
          message = `
            <h1 class="alert-heading">🚧 STOP HERE 🛑</h1>
            <p>We are showing you 100 articles for free.</p>
            <hr>
            <p class="mb-0">Still wanna more. Show we your 💳.</p>
          `;
          break;
        case "rateLimited":
          message = `
            <h1 class="alert-heading">🤚 HEY, PLEASE TAKE A BREAK ⚠</h1>
            <p>You are trying so hard.</p>
            <hr>
            <p class="mb-0">
              Just take a break ... then change the API key
              <a href="https://newsapi.org/register">(Register here)</a>.
            </p>
          `;
          break;
        default:
          message = "Sorry. There's an error. But we haven't seen it before too!";
          console.log(data);
      }
      
      // console.log("message: " + message);
      renderError(errorElement, message);
    }
  } catch (error) {
    console.log("Something's wrong. Maybe it's your Wifi." + error);
  }
}

function showLoadMoreButton(element) {
  if (isFirstTimeUpdate) {
    element.style.display = "flex";
    isFirstTimeUpdate = false;
  }
}

function renderArticlesCount(element) {
  element.innerHTML = `
    <span>Showing <span class="fw-bold">${articlesCount}</span>/${totalArticles} articles.</span>
  `;
}

function renderError(element, message) {
  element.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show fs-3 text-center" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
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
  url = getURL({ page });
  update();
}

// Load articles after visit page
url = getURL();
update();

loadMoreButton.onclick = loadMore;