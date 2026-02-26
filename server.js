require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoute = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5170;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
