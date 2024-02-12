const sgMail = require("@sendgrid/mail");

const sendgridApiKey =
  "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";
const sendgridSenderId = "himeshdev99@gmail.com";
sgMail.setApiKey(sendgridApiKey);

const sendMail = async ({ to, subject, text, html }) => {
  const from = sendgridSenderId;
  const msg = {
    to: to,
    from: {
        email: 'himeshdev99@gmail.com',
        name: 'Himesh'
    },
    subject: 'Schedule Demo',
    text: "Your request to schedule a demo has been forwarded to our sales representative. They will contact you soon. Thank You"
  };

  console.log(msg);
//   const dummyMsg = {
//     to: 'himeshiddamalgoda@gmail.com',
//     from: {
//         email: 'himeshdev99@gmail.com',
//         name: 'Himesh'
//     },
//     subject: 'Hello World',
//     text: 'My first email through SendGrid'
//   };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error("Sendgrid error:", error.response.body); // This will print out the detailed errors
    }
  }
};

module.exports = sendMail;
