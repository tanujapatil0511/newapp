const apiKey = 'c583f74029774002bda0eafb3d6ab2e6';

const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Random News Data:", data); // Debugging line
        return data.articles;

    } catch (error) {
        console.error("Error fetching random new", error)
        return [];
    }
}

searchButton.addEventListener("click",async()=>{
    const query= searchField.value.trim();
    console.log("Search Query:", query); // Debugging line
    if(query!=="")
        {
            try{
                const articles = await fetchNewsQuery(query)
                console.log("Search Results Articles:", articles); // Debugging line
                displayBox(articles);


            }catch(error){
                console.log("Error fetching news by query",error)

            }
        }
})

async function fetchNewsQuery(query)
{
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Search Results Data:", data); // Debugging line
        return data.articles;

    } catch (error) {
        console.error("Error fetching random new", error)
        return [];
    }
}

function displayBox(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card")
        const img = document.createElement("img")
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2")
        const truncatedtitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." :
            article.title
        title.textContent = truncatedtitle;
        const description = document.createElement("p")
        const truncateddes = article.title.length > 120 ? article.title.slice(0, 120) + "...." :
            article.description
        description.textContent = truncateddes;

        blogCard.appendChild(img);
        blogCard.appendChild(title)
        blogCard.appendChild(description);
        blogCard.addEventListener('click',()=>{
            window.open(article.url, "_blank")
        })

        blogContainer.appendChild(blogCard);
    })
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBox(articles);

    } catch (error) {
        console.log("Error in fetching random news", error)
    }
})();