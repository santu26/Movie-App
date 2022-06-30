const API_URL=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b828f572a511892eccf2f1179d16c2fd&page=1`;
const IMAGE_PATH=`https://image.tmdb.org/t/p/w1280`;
const SEARCH_URL=`https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=b828f572a511892eccf2f1179d16c2fd&query=`;

const form=document.getElementById("form");
const search=document.getElementById("search");
const main=document.getElementById("main");

getMOvies(API_URL)
async function getMOvies(url){
    const response=await fetch(url)
    const data=await response.json()
    displayMovies(data.results);
    console.log(data.results);
}
function displayMovies(movies){
    main.innerHTML="";
    movies.forEach((movie) => {
        const {title, poster_path,vote_average,overview}=movie
        const moviesElement=document.createElement("div");
        moviesElement.classList.add("movie")
        moviesElement.innerHTML=`
        <img src="${IMAGE_PATH + poster_path}" alt="${title}" />
        <div class ="movie_info">
        <h3>${title}</h3>
        <span class="${getClassByRating(vote_average)}">${vote_average}</span>
        <div class ="overview">
        <h3>${overview}</h3>
        </div>
        </div>`
        main.appendChild(moviesElement)

    });
}
function getClassByRating(rating){
    if(rating>=7){
        return 'green'
    }else if(rating>=5){
        return 'orange'
    }else {
        return 'red'
    }
}

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const searchValue=search.value;
    if(searchValue && searchValue !==""){
        getMOvies(SEARCH_URL + searchValue)
        searchValue=""
    }else{
        window.location.reload();
    }
})

