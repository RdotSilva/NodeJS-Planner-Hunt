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

module.exports = {
  formatResults,
  formatResultsForFile,
  formatCountyResultsForFile,
  formatTotal,
};
