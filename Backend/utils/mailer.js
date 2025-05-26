const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'longta2004.vtv3@gmail.com',
    pass: 'ctzp dpex azjm gjsy'
  }
});

async function sendMail(to, subject, text) {
  await transporter.sendMail({
    from: 'Hệ thống Ký túc xá',
    to,
    subject,
    text
  });
}

module.exports = sendMail;
