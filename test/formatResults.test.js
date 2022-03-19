const assert = require("assert");
const {
  formatResults,
  formatResultsForFile,
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
});
