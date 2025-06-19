// Install dependencies: express and nodemailer
// npm install express nodemailer

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Optional agar aap frontend ko yahin serve karna chahein

// Email configuration (aap apna email details yahan dalein)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your.email@gmail.com',       // apna Gmail
    pass: 'your-app-password-or-oauth', // Gmail app password ya OAuth token
  }
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  const mailOptions = {
    from: email,
    to: 'your.email@gmail.com', // jahan aap message receive karna chahte hain
    subject: `New Contact Message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Email could not be sent' });
    }
    res.json({ message: 'Message sent successfully!' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
