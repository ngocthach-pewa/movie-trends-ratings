// load data
function loadCsvRows(URL) {
  return d3.text(URL)
    .then(text => d3.csvParse(text.replace(/^\uFEFF/, "")));
}


// check rows and columns
function checkDataset(rows) {
  console.log("Number of rows:", rows.length);
  console.log("Number of columns:", rows.columns.length);
  console.log("Column names:", rows.columns);

  // Expected: 1000 rows and 12 columns
  if (rows.length !== 1000 || rows.columns.length !== 12) {
    console.warn("Unexpected dataset size!");
  } else {
    console.log("Dataset size is correct.");
  }
}


function isMissing(raw) {
  return raw === undefined ||
         raw === null ||
         String(raw).trim() === "";
}

function checkMissingValues(rows) {
  const missing = {};

  rows.columns.forEach(column => {
    missing[column] = rows.filter(
      row => isMissing(row[column])
    ).length;
  });

  console.log("Missing values:");
  console.table(missing);
}



// Convert non-negative numeric values
function parseCount(raw) {
  if (isMissing(raw)) return null;

  const n = Number(raw);

  return Number.isFinite(n) && n >= 0 ? n : null;
}

// Check valid year
function parseYear(raw) {
  const year = parseCount(raw);

  return Number.isInteger(year) &&
         year >= 2006 &&
         year <= 2016
         ? year : null;
}

// Check valid IMDb rating (0–10)
function parseRating(raw) {
  const rating = parseCount(raw);

  return rating !== null && rating <= 10
         ? rating : null;
}

// Check valid Metascore (0–100)
function parseMetascore(raw) {
  const score = parseCount(raw);

  return score !== null && score <= 100
         ? score : null;
}

// Clean text values
function parseText(raw) {
  return isMissing(raw) ? null : String(raw).trim();
}

// Split genres into an array
function parseGenre(raw) {
  if (isMissing(raw)) return [];

  const genres = raw.split(",")
    .map(genre => genre.trim())
    .filter(genre => genre !== "");

  return [...new Set(genres)];
}


function parsing(raw) {
  return {
    rank: parseCount(raw.Rank),
    title: parseText(raw.Title),
    genres: parseGenre(raw.Genre),
    description: parseText(raw.Description),
    director: parseText(raw.Director),
    actors: parseText(raw.Actors),
    year: parseYear(raw.Year),
    runtime: parseCount(raw["Runtime (Minutes)"]),
    rating: parseRating(raw.Rating),
    votes: parseCount(raw.Votes),
    revenue: parseCount(raw["Revenue (Millions)"]),
    metascore: parseMetascore(raw.Metascore)
  };
}


function removeInvalidRows(rows) {
  const validRows = rows.filter(movie =>
    movie.title !== null &&
    movie.director !== null &&
    movie.year !== null &&
    movie.rating !== null &&
    movie.genres.length > 0
  );

  console.log(
    "Invalid rows removed:",
    rows.length - validRows.length
  );

  return validRows;
}

function removeDuplicates(rows) {
  const seen = new Set();

  const uniqueRows = rows.filter(movie => {
    const key = JSON.stringify([
      movie.title.toLowerCase(),
      movie.year,
      movie.director.toLowerCase()
    ]);

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });

  console.log(
    "Duplicate rows removed:",
    rows.length - uniqueRows.length
  );

  return uniqueRows;
}


function cleanData(rows) {
  checkDataset(rows);
  checkMissingValues(rows);

  // Convert data types
  const parsedRows = rows.map(parsing);

  // Remove invalid rows
  const validRows = removeInvalidRows(parsedRows);

  // Remove duplicate movies
  const cleanedRows = removeDuplicates(validRows);

  console.log("Original rows:", rows.length);
  console.log("Cleaned rows:", cleanedRows.length);
  console.log("Cleaned data:");
  console.table(cleanedRows.slice(0, 5));

  return cleanedRows;
}
