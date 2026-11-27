// analysis 
const GENRE = [
  "Drama",
  "Action",
  "Comedy",
  "Adventure",
  "Thriller",
  "Crime",
  "Romance"
];


function countMoviesByGenre(data) {
  const genreCount = new Map();

  data.forEach(movie => {
    movie.genres.forEach(genre => {
      const count = genreCount.get(genre) || 0;
      genreCount.set(genre, count + 1);
    });
  });

  return Array.from(genreCount, ([genre, count]) => ({
    genre: genre,
    count: count
  }));
}


function sortGenres(data) {
  return data
    .filter(d => GENRE.includes(d.genre))
    .sort((a, b) => d3.ascending(a.genre, b.genre));
}



function getTop10Movies(data) {
  return [...data]
    .sort((a, b) =>
      d3.descending(a.rating, b.rating) ||
      d3.descending(a.votes ?? 0, b.votes ?? 0)
    )
    .slice(0, 10);
}