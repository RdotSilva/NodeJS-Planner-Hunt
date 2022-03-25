const assert = require("assert");
const { sendEmail } = require("../utils/sendEmail");

describe("SendEmail", function () {
  describe("#sendEmail()", function () {
    it("success should send email and log to console", function () {
      const emailSent = await sendEmail();
      const expected = `Message sent: testuser@test.com`;
      assert.equal(emailSent, expected);
    });
  });
});
