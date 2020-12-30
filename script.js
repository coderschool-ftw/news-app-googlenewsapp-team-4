// http://newsapi.org/v2/everything?q=bitcoin&from=2020-11-30&sortBy=publishedAt&apiKey=7c0b04dca86c473bab95e9b6f66d3f07

// Update
// Render
// Update
// Render

let newsArticles = [];

async function update() {
  // fetch lastest news articles
  const url = `http://newsapi.org/v2/everything?q=bitcoin&from=2020-11-30&sortBy=publishedAt&languages=us&apiKey=7c0b04dca86c473bab95e9b6f66d3f07`;
  const result = await fetch(url); //fetch url
  const data = await result.json(); //parse into json
  console.log(data);
  newsArticles = data.articles; //return article details to the newsArticle[] array
  render();
}

update();

function render() {
  let resultsArea = document.getElementById("results");
  resultsArea.innerHTML = newsArticles.map(
    (article) =>
      `<div class="news-article">
      <div class="article-title">
        <h2>${article.title}</h2>
      </div>
      <div class="article-content">
      ${article.description}
      </div>
      <div class="published-at">
      ${article.publishedAt}
      </div>
      <div class="article-image">
      <img src="${article.urlToImage}"/>
      </div>
      <a href="${article.url}">View Story</a>
    </div>`
  );
}
