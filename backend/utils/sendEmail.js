const sendEmail = async (options) => {
  let nodemailer;
  try {
    nodemailer = require('nodemailer');
  } catch (error) {
    console.warn("⚠️ Nodemailer not installed. Email sending will be simulated.");
  }

  // If Nodemailer is missing or SMTP vars are not set, log to console
  if (!nodemailer || !process.env.SMTP_HOST) {
    console.log('\n========== EMAIL SIMULATION ==========');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Message Preview: ${options.message.substring(0, 100)}...`);
    console.log('======================================\n');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message, 
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;