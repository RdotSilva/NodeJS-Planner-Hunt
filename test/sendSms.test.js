const assert = require("assert");
const { sendSms } = require("../utils/sendSms");

describe("SendSms", function () {
  describe("#sendSms()", function () {
    it("success should send SMS", function () {
      const smsSent = await sendSms('pass');
      const expected = `SMS sent`
      assert.equal(smsSent, expected);
    });
      
    it("failure should not send SMS", function () {
        const smsSent = await sendSms('fail');
        const expected = `Unable to send SMS`
        assert.equal(smsSent, expected);
      });
  });
});
