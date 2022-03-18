const assert = require("assert");
const { formatResults } = require("../utils/formatResults");

describe("FormatResults", function () {
  describe("#formatResults()", function () {
    it("should return a string that contains each item of array", function () {
      const results = ["a", "b", "c"];
      const formatted = formatResults(results);
      assert.equal(formatted, "a b c");
    });
  });
});
