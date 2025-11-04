let currentMovies = [];
const moviesListEl = document.querySelector(".movie__list");


async function onSearchChange(event) {
  currentMovies = moviesData.Search;
  const id = event.target.value;
  const movies = await fetch(`https://www.omdbapi.com/?apikey=cb5f54d1&s=${id}`);
  const moviesData =  await movies.json();
  moviesListEl.innerHTML = moviesData.Search.slice(0,6).map((movie) => {
    return `<div class="movie__card" onclick="showMovies('${movie.imdbID}')">
          <div class="movie__card--container">
            <figure class="movies__img">
              <img src="${movie.Poster}" alt="" class="movie__img">
            </figure>
            <div class="movie__details">
            <div class="movie__title">${movie.Title}</div>
            <div class="movie__year">${movie.Year}</div>
            </div>
          </div>
        </div>`
      }).join('');
 }


async function main(filter) {
  const movies = await fetch(`https://www.omdbapi.com/?apikey=cb5f54d1&s=${'Fast'}&page=1`);
  const moviesData = await movies.json();


  if (!moviesData.Search) {
    moviesListEl.innerHTML = "<p>No movies found. Try another title.</p>";
    return;
  }



  const  moviesHTML = moviesData.Search.slice(0,6).map((movie) => {
    return `<div class="movie__card" onclick="showMovies('${movie.imdbID}')">
          <div class="movie__card--container">
            <figure class="movies__img">
              <img src="${movie.Poster}" alt="" class="movie__img">
            </figure>
            <div class="movie__details">
            <div class="movie__title">${movie.Title}</div>
            <div class="movie__year">${movie.Year}</div>
            </div>
          </div>
        </div>`
  })
    .join('');
  
    moviesListEl.innerHTML = moviesHTML;
  
  }
    main();
  
  
  
    function sortMovies(event) {
      if (event.target.value === "OLDEST_TO_NEWEST") {
        currentMovies.sort((a, b) => a.Year - b.Year);
      } else {
        currentMovies.sort((a, b) => b.Year - a.Year);
      }
      
    }

    