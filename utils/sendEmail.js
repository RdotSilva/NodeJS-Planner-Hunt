const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const emailSentOutputPath = path.join(__dirname, "../output/emailSent.txt");

dotenv.config();
const { FROM_EMAIL: fromEmail, TO_EMAIL: toEmail } = process.env;

const sendEmail = (results) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `Test User" ${fromEmail}`,
    to: toEmail,
    subject: "New Results Found!",
    text: results,
  });

  console.log(`Message sent: ${info.messageId}`);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
  fs.appendFileSync(emailSentOutputPath, new Date());
};

module.exports = {
  sendEmail,
};
