const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config();
const {
  TWILIO_SID: twilioSid,
  TWILIO_TOKEN: twilioToken,
  TO_NUMBER: toNumber,
  FROM_NUMBER: fromNumber,
} = process.env;

const twilioClient = new twilio(twilioSid, twilioToken);

/**
 * Format results so they are easily readable in text message
 * @param {Array} results List of result links
 * @returns
 */
const formatResults = (results) => {
  let links = "";
  results.forEach((result) => {
    links += result;
    links += " ";
  });
  return links;
};

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

module.exports = {
  sendSms,
};
