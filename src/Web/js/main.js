let cleanedData = [];
let analysisData = null;

loadCsvRows(URL)
  .then(rows => {

    // Data Cleaning
    cleanedData = cleanData(rows);

    // Data Analysis
    analysisData = analyzeData(cleanedData);

    // Genre Popularity Visualization
    drawGenrePopularity(
      analysisData.genrePopularity,
      cleanedData.length
    );

  })
  .catch(error => {
    console.error("Error processing data:", error);
  });