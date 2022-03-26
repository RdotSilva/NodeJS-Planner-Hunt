const assert = require("assert");
const {
  formatResults,
  formatResultsForFile,
  formatTotal,
  formatPositions,
  formatCategories,
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

  describe("#formatPositions()", function () {
    it("should return a string that contains all positions", function () {
      const results = [{ position: "a" }, { position: "b" }, { position: "c" }];
      const formatted = formatPositions(results);
      assert.equal(formatted, `a b c`);
    });

    it("should return correct string when no positions are found", function () {
      const results = [];
      const formatted = formatPositions(results);
      assert.equal(formatted, `No positions found`);
    });
  });

  describe("#formatCategories()", function () {
    it("should return a string that contains all cetegories", function () {
      const results = ["a", "b", "c"];
      const formatted = formatCategories(results);
      assert.equal(formatted, `Categories: a b c`);
    });
  });
});
