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

const formatResultsForFile = (totalResults) => {
  let newDate = new Date(Date.now());
  const totalResultDataToWrite = `
    ${newDate.toDateString()} - ${newDate.toLocaleTimeString()}: ${totalResults}
    `;

  return totalResultDataToWrite;
};

const formatCountyResultsForFile = (results) => {
  let counties = "";
  results.forEach((result) => {
    counties += result;
    counties += "----";
  });
  return counties;
};

module.exports = {
  formatResults,
  formatResultsForFile,
};
