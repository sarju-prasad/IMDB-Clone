const movieSearchBox=document.querySelector("#movie-search-box");
const searchList=document.querySelector("#search-list");
const resultGrid=document.querySelector("#result-grid");

//load Movies from API
async function loadMovies(search){
    const url=`https://www.omdbapi.com/?s=${search}&page=1&apikey=bfd6b563`;
    const res=await fetch(`${url}`);
    const data=await res.json();
    // console.log(data.Search);
    if(data.Response=="True"){
        displayMovieList(data.Search);
    }
}
// Searching the movies
function findMovies(){
    let searchTerm=(movieSearchBox.value).trim();
    if(searchTerm.length>0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);

    }else{
        searchList.classList.add('hide-search-list');
    }
}

// Showing the the Movies list
function displayMovieList(movies){
    searchList.innerHTML="";
    for(let i=0;i<movies.length;i++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id=movies[i].imdbID; //setting the movie id in datat-id
        movieListItem.classList.add('search-list-item');
        if(movies[i].Poster!="N/A"){
            moviePoster=movies[i].Poster;
        }
        else{
            moviePoster="imagenotfound.jpg";

        }
        movieListItem.innerHTML=`
        <div class="search-item-thumbnail">
            <img src="${moviePoster}" alt="" srcset="">
        </div>
        <div class="search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>
                ${movies[i].Year}
            </p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}
// fiunction load Movie Details
function loadMovieDetails(){
    const searchListMovies=searchList.querySelectorAll(".search-list-item");
    searchListMovies.forEach(movie=>{
        movie.addEventListener('click',async()=>{
            searchList.classList.add('hide-search-list');
            movieSearchBox.value="";
            const result=await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=bfd6b563`);
            const movieDetails=await result.json();
            displayMovieDetails(movieDetails);
        });
    });

}

//function DisplayMovie Details
function displayMovieDetails(details){
    resultGrid.innerHTML=`
    <div class="movie-poster">
    <img src="${(details.Poster!="N/A")?detailsPoster:"image_not_found.png"}" alt="movie poster" srcset="">
    </div>
    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-music-info">
            <li class="year">Year:${details.Year}</li>
            <li class="rated">Ratings:${details.Rated}</li>
            <li class="released">Released:{details.Released}</li>
        </ul>
        <p class="genre"><b>Genre</b>${details.Genre}</p>
        <p class="writer"><b>Writer</b>${details.Writer}</p>
        <p class="actors"><b>Actors</b>${details.Actors}</p>
        <p class="plot"><b>Plot</b>${details.Plot}</p>
        <p class="language"><b>Language:</b>${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    
    `;
}
window.addEventListener('click',(event)=>{
    if(event.target.className!="form-control"){
        searchList.classList.add('hide-search-list');
    }
})

