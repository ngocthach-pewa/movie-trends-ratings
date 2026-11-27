function filterMovies(data, filters = {}) {

  const {
    title = "",
    genre = "All",
    year = "All",
    actor = ""
  } = filters;

  return data.filter(movie => {

    // Search by movie title
    const matchTitle =
      movie.title.toLowerCase()
        .includes(title.trim().toLowerCase());

    // Filter by genre
    const matchGenre =
      genre === "All" ||
      movie.genres.includes(genre);

    // Filter by release year
    const matchYear =
      year === "All" ||
      movie.year === Number(year);

    // Search by actor
    const matchActor =
      (movie.actors || "").toLowerCase()
        .includes(actor.trim().toLowerCase());

    // Combine all conditions
    return matchTitle &&
           matchGenre &&
           matchYear &&
           matchActor;
  });
}


function getMovieRanking(data, filters = {}) {

  // Filter movies based on user preferences
  const filteredMovies = filterMovies(data, filters);

  // Get the top 10 highest-rated movies
  return getTop10Movies(filteredMovies);
}


function getFilterOptions(data) {

  // Get all unique genres
  const genres = [...new Set(
    data.flatMap(movie => movie.genres)
  )].sort(d3.ascending);

  // Get all unique release years
  const years = [...new Set(
    data.map(movie => movie.year)
  )].sort(d3.descending);

  // Get all unique actors
  const actors = [...new Set(
    data.flatMap(movie =>
      (movie.actors || "")
        .split(",")
        .map(actor => actor.trim())
        .filter(actor => actor !== "")
    )
  )].sort(d3.ascending);

  return {
    genres,
    years,
    actors
  };
}
