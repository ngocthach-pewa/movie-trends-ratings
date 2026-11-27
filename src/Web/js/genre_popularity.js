const URL = "./data/IMDB-Movie-Data.csv";

function analyzeData(data) {
  // Count movies by all genres
  const allGenreCounts = countMoviesByGenre(data);

  // Select 7 genres and sort alphabetically
  const genrePopularity = sortGenres(allGenreCounts);

  // Get top 10 highest-rated movies
  const top10Movies = getMovieRanking(data);

  // Prepare options for search and filters
  const filterOptions = getFilterOptions(data);

  // Display analysis results
  console.log("DATA ANALYSIS");

  console.log("All genre counts:");
  console.table(allGenreCounts);

  console.log("Genre popularity:");
  console.table(genrePopularity);

  console.log("Top 10 highest-rated movies:");
  console.table(top10Movies, [
    "title",
    "genres",
    "year",
    "rating",
    "actors",
    "votes",
  ]);

  console.log("Filter options:");
  console.log(filterOptions);

  // Return analysis results
  return {
    allGenreCounts,
    genrePopularity,
    top10Movies,
    filterOptions,
  };
}

// Visualization
// chart configuration
const margin = {
  top: 20,
  bottom: 70,
  left: 145,
  right: 80,
};

const width = 800;
const height = 580;

const innerW = width - margin.left - margin.right;
const innerH = height - margin.top - margin.bottom;

const PALETTE = ["#1F1B18", "#5A493D", "#8D6D46", "#435055", "#786D5E"];

// Color scale
const color = d3
  .scaleOrdinal()
  .domain([...GENRE].sort(d3.ascending))
  .range(PALETTE);
