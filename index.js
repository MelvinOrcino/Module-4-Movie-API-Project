let currentMovies = [];
const moviesListEl = document.querySelector(".movie__list");
const searchInput = document.getElementById('search__input');
const searchTerm = searchInput.value.trim();



async function onSearchSubmit(event) {
  event.preventDefault();

  const searchInput = document.getElementById('search__input');
  const searchTerm = searchInput.value.trim();


  if (!searchTerm) {
    moviesListEl.innerHTML = "<p>Please enter a movie title.</p>";
    return;
  }

  try {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=cb5f54d1&s=${id}`);
    const moviesData =  await movies.json();
    currentMovies = moviesData.Search;
    renderMovies();
  }

  catch {
    moviesListEl.innerHTML = "<p>Error loading movies. Please try again.</p>";
     console.error('Error fetching movies:', error);
  }



 }



function renderMovies(movies) {
  moviesListEl.innerHTML = movies.map((movie) => {
    return `<div class="movie__card">
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
    return `<div class="movie__card">
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
      if (!currentMovies.length) {
        return;
      }

      if (event.target.value === "OLDEST_TO_NEWEST") {
        currentMovies.sort((a, b) => a.Year - b.Year);
      } 
      else if (event.target.value === "NEWEST_TO_OLDEST") {
        currentMovies.sort((a, b) => b.Year - a.Year);
      }

      renderMovies(currentMovies.slice(0,6));
  }