const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 587,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  await transporter.sendMail({
    from: '"Blog App" <noreply@blogapp.com>',
    to,
    subject,
    html
  });
};

module.exports = sendEmail;