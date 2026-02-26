const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Note: You must provide EMAIL_USER and EMAIL_PASS in your .env file
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Change this if you use another provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send it to yourself
      replyTo: email, // If you click "reply", it goes to the person who filled out the form
      subject: `New Portfolio Contact Form Submission from ${name}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
