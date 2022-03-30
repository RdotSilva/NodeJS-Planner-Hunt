const assert = require("assert");
const { sendSms } = require("../utils/sendSms");

describe("SendSms", function () {
  describe("#sendSms()", function () {
    it("success should send SMS", function () {
      const smsSent = await sendSms();
      const expected = `SMS sent`
      assert.equal(smsSent, expected);
    });
  });
});
