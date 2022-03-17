const dotenv = require("dotenv");
const twilio = require("twilio");
const {
  formatResults,
  formatCountyResultsForFile,
} = require("../utils/formatResults");

dotenv.config();
const {
  TWILIO_SID: twilioSid,
  TWILIO_TOKEN: twilioToken,
  TO_NUMBER: toNumber,
  FROM_NUMBER: fromNumber,
} = process.env;

const twilioClient = new twilio(twilioSid, twilioToken);

/**
 * Send SMS message using Twilio
 * Make sure to add your from number in the .env file
 * @param {String} results
 */
const sendSms = (results) => {
  twilioClient.messages.create({
    body: formatResults(results),
    to: toNumber,
    from: fromNumber,
  });
};

const sendSmsSecondary = (results) => {
  twilioClient.messages.create({
    body: formatCountyResultsForFile(results),
    to: secondaryToNumber,
    from: fromNumber,
  });
};

module.exports = {
  sendSms,
  sendSmsSecondary,
};
