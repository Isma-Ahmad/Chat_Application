require('dotenv').config();
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,  
      },
    });
  }

  async sendApprovalEmail(user, originalPassword) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your account has been approved',
      text: `Dear ${user.username},\n\nYour account has been approved. You can now log in using your credentials.\n\nEmail: ${user.email}\nPassword: ${originalPassword}\n\nThank you!`,
    };

    return this.transporter.sendMail(mailOptions);
  }
}

module.exports =  EmailService;
