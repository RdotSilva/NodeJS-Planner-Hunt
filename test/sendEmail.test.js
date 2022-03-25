const assert = require("assert");
const { sendEmail } = require("../utils/sendEmail");

describe("SendEmail", function () {
  describe("#sendEmail()", function () {
    it("success should send email and log to console", function () {
      const emailSent = await sendEmail();
      const expected = `Message sent: testuser@test.com`;
      assert.equal(emailSent, expected);
    });

    it("failure should not send email and log error to console", function () {
      const emailSent = await sendEmail("invalid");
      const expected = `Unable to send message to: testuser@test.com`;
      assert.equal(emailSent, expected);
    });
  });
});
