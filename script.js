const apiKey = "42c72416512f4056aa3dd0bd895b6d2f"
let newsArticles = []
const resultsArea = document.getElementById("results");


async function update() {
    const url = `https://newsapi.org/v2/everything?q=music&apiKey=${apiKey}`
    const result = await fetch(url)
    const data = await result.json()
    newsArticles = data.articles
    console.log(data)
    render()
}

function renderArticleCard(article) {
    return `<div class="card news-article">
        <img src="${article.urlToImage}" class="card-img-top" />
        <div class="card-body">
        <h5 class="card-title">${article.title}</h5>
        <p class="card-text"> ${article.description}</p>
        <a href="${article.url}" class="btn btn-primary"> View Story</a>
        </div>
    </div>`; 
}


function render() {
   resultsArea.innerHTML = newsArticles.map(article => renderArticleCard(article)).join(",")
}


update();