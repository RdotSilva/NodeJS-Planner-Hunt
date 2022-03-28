const dotenv = require("dotenv");
const twilio = require("twilio");
const {
  formatResults,
  formatCountyResultsForFile,
  formatPositions,
} = require("../utils/formatResults");

dotenv.config();
const {
  TWILIO_SID: twilioSid,
  TWILIO_TOKEN: twilioToken,
  SECONDARY_TO_NUMBER: secondaryToNumber,
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

/**
 * Send SMS to secondary number (US number)
 * @param {String} results
 */
const sendSmsSecondary = (results) => {
  twilioClient.messages.create({
    body: formatCountyResultsForFile(results),
    to: secondaryToNumber,
    from: fromNumber,
  });
};

/**
 * Send SMS positions data to secondary number (US number)
 * @param {String} results
 */
const sendSmsSecondaryPositions = (results) => {
  twilioClient.messages.create({
    body: formatPositions(results),
    to: secondaryToNumber,
    from: fromNumber,
  });
};

const sendSmsNoResults = () => {
  twilioClient.messages.create({
    body: "NO RESULTS FOUND: CHECK SCRIPT",
    to: secondaryToNumber,
    from: fromNumber,
  });
};

module.exports = {
  sendSms,
  sendSmsSecondary,
  sendSmsSecondaryPositions,
};
