/**
 * Format results so they are easily readable in text message
 * @param {Array} results List of result links
 * @returns
 */
const formatResults = (results) => {
  let links = "";
  results.forEach((result) => {
    links += result;
    links += " ";
  });
  return links;
};

/**
 * Format results with current date to be used in local file
 * @param {String} totalResults Total number of results
 */
const formatResultsForFile = (totalResults) => {
  let newDate = new Date(Date.now());
  const totalResultDataToWrite = `
    ${newDate.toDateString()} - ${newDate.toLocaleTimeString()}: ${totalResults}
    `;

  return totalResultDataToWrite;
};

/**
 * Format results with county
 * @param {Array} results List of results
 */
const formatCountyResultsForFile = (results) => {
  let counties = "";
  results.forEach((result) => {
    counties += result;
    counties += "----";
  });
  return `Counties: ${counties}`;
};

const formatTotal = (results) => {
  return `Total results: ${results.length}`;
};

/**
 * Format results with positions
 * @param {Object} results List of positions
 */
const formatPositions = (results) => {
  let positions = "";
  results.forEach((result) => {
    positions += result.position;
    positions += "=======";
  });
};

/**
 * Format results with categories
 * @param {Object} results List of categories
 */
const formatCategories = (results) => {
  let categories = "";
  results.forEach((result) => {
    categories += result.categories;
    categories;
  });
};

const formatWithSeparatingLine = (results, type) => {
  let formatted = "";

  results.forEach((result) => {
    if (type === "category") {
      formatted += result.categories;
    }

    if (type === "position") {
      formatted += result.position;
      formatted += "=======";
    }

    if (type === "county") {
      formatted += result;
      formatted += "----";
    }
  });

  return formatted;
};

module.exports = {
  formatResults,
  formatResultsForFile,
  formatCountyResultsForFile,
  formatTotal,
  formatPositions,
  formatCategories,
};
