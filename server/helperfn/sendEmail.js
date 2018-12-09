import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'houseofjiro@gmail.com',
    pass: 'elooghene',
  },
});
const sendEmail = (to, subject, message) => {
  const mailOptions = {
    from: 'iReporter <no-reply@iReporter.com>',
    to,
    subject,
    html: message,
  };
  transport.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};

export default sendEmail;
