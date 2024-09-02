require('dotenv').config();
const nodemailer = require('nodemailer');

class msgEmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendMessageNotification(sender, receiver, content, images = []) {
    const msgMailOptions = {
      from: process.env.EMAIL_USER,
      to: receiver.email,
      subject: 'New Message Received',
      text: `Dear ${receiver.username},\n\nYou have received a new message from ${sender.username}.\n\nMessage:\n${content}\n\nSent on: ${new Date().toLocaleString()}\n\nThank you!`,
    };

    if (images.length > 0) {
      msgMailOptions.attachments = images.map(image => ({
        filename: image,
        path: `./uploads/${image}`, 
      }));
    }

    return this.transporter.sendMail(msgMailOptions);
  }
}

module.exports = msgEmailService;
