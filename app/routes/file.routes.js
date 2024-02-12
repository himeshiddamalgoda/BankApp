const sendMail = require("../config/email.config");

module.exports = (app) => {

  var router = require("express").Router();

  router.post('/send-email', async (req, res) => {
    const { to, subject, text, html } = req.body;
  
    try {
      // Send email
      await sendMail({ to, subject, text, html });
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    }
  });


  app.use("/api/file", router);
};
