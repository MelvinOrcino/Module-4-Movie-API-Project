const moviesListEl = document.querySelector(".movie__list");


async function onSearchChange(event) {
  const id = event.target.value;
  const movies = await fetch(`https://www.omdbapi.com/?apikey=cb5f54d1&s=${id}`);
  const moviesData =  await movies.json();
  moviesListEl.innerHTML = moviesData.Search.slice(0,6).map((movie) => {
    return `<div class="movie__card" onclick="showMovies(${movie.imdbID})>
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



  if (filter === 'OLDEST_TO_NEWEST') {
    moviesData.Search.sort((a, b) => a.Year - b.Year);
  }
  else if (filter === 'NEWEST_TO_OLDEST') {
    moviesData.Search.sort((a, b) => b.Year - a.Year);
  }




  const  moviesHTML = moviesData.Search.slice(0,6).map((movie) => {
    return `<div class="movie__card" onclick="showMovies(${movie.imdbID})>
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
      main(event.target.value);
    }