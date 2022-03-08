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

export const sendSms = (results) => {
  twilioClient.messages.create({
    body: formatResults(results),
    to: toNumber,
    from: fromNumber,
  });
};
