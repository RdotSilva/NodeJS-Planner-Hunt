const assert = require("assert");
const {
  formatResults,
  formatResultsForFile,
  formatTotal,
} = require("../utils/formatResults");

describe("FormatResults", function () {
  describe("#formatResults()", function () {
    it("should return a string that contains each item of array", function () {
      const results = ["a", "b", "c"];
      const formatted = formatResults(results);
      assert.equal(formatted, "a b c");
    });
  });

  describe("#formatResultsForFile()", function () {
    it("should return a string that contains the date and results", function () {
      const results = ["a", "b", "c"];
      const formatted = formatResultsForFile(results);
      let newDate = new Date(Date.now());
      assert.equal(
        formatted,
        `${newDate.toDateString()} - ${newDate.toLocaleTimeString()}: a,b,c`
      );
    });
  });

  describe("#formatCountyResultsForFile()", function () {
    it("should return a string that contains total number of counties", function () {
      const results = ["a", "b", "c"];
      const formatted = formatCountyResultsForFile(results);
      assert.equal(formatted, `Counties: a b c`);
    });
  });

  describe("#formatTotal()", function () {
    it("should return a string that contains total number of results", function () {
      const results = ["a", "b", "c"];
      const formatted = formatTotal(results);
      assert.equal(formatted, `Total results: 3`);
    });
  });
});
