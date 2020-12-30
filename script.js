let newsArticles = [];

const apiKey = '4d4ecf6a69b9425e822a25c3e7e88ed5';
const apiRoot = 'http://newsapi.org'; 
const apiEndpoint = '/v2/top-headlines';    // https://newsapi.org/docs/endpoints
const queryString = "country=us\
                      &language=en\
                      &sortBy=publishedAt"
                    .replace(/\s/g,'') + `&apiKey=${apiKey}`; // https://newsapi.org/docs/endpoints/top-headlines

const url = `${apiRoot}${apiEndpoint}?${queryString}`;

async function update() {
  const result = await fetch(url);
  const data = await result.json();

  newsArticles = data.articles;

  render();
}

// https://momentjs.com/docs/#/displaying/fromnow/
function renderArticleCard(article) {
  return `
  <div class="col-12 col-lg-4 my-3">
    <div class="card article">
      <div class="ratio ratio-16x9 article--cover" style="background-image: url(${article.urlToImage});"></div>
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
  </div>
`;
}

function render() {
  let resultArea = document.getElementById('results');
  resultArea.innerHTML = newsArticles
    .map((article) => renderArticleCard(article))
    .join('\n');
}

update();
