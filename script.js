// http://newsapi.org/v2/everything?q=bitcoin&from=2020-11-30&sortBy=publishedAt&apiKey=7c0b04dca86c473bab95e9b6f66d3f07

// Update
// Render
// Update
// Render

const searchForm = document.querySelector(".search");
const input = document.querySelector(".input-box");

searchForm.addEventListener("submit", update);

let newsArticles = [];

async function update(e) {
  // fetch lastest news articles
  e.preventDefault();

  const apiKey = `7c0b04dca86c473bab95e9b6f66d3f07`;
  let topic = input.value;

  const url = `http://newsapi.org/v2/everything?q=${topic}&from=2020-12-02&sortBy=publishedAt&language=en&apiKey=${apiKey}`;
  const result = await fetch(url); //fetch url
  const data = await result.json(); //parse into json
  console.log(data);
  newsArticles = data.articles; //return article details to the newsArticle[] array
  render();
}

function renderArticleCard(article) {
  return `
<div class="col-md-6 col-lg-4">
  <div class="news-article">
    <img src="${article.urlToImage}" class="card-img-top"/>
    <div class="card-body">
      <h5 class="card-title">${article.title}</h5>
      <p id="publishedDate">Published: ${moment(
        article.publishedAt.slice(0, 10)
      ).format("MMM Do YYYY")}, ${moment(article.publishedAt.slice(0, 10))
    .startOf("hour")
    .fromNow()}</p>
      
      <p class="card-text"> ${article.description}</p>
      <a href="${article.url}" class="btn btn-primary">View Story</a>
    </div>
  </div>
</div>`;
}

function render() {
  let resultsArea = document.getElementById("results");
  resultsArea.innerHTML = newsArticles
    .map((article) => renderArticleCard(article))
    .join("\n");
}

// update();
