const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/user');
const employeeRoutes = require('./Routes/employeeRoutes');
const authMiddleware = require('./middleware/authMiddleware'); // Import authMiddleware
const cors = require('cors');
const path = require('path'); // For handling paths
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'uploads' directory for image access
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/userRoutes', userRoutes);
app.use('/api/employeeRoutes', authMiddleware, employeeRoutes); // Use authMiddleware here

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
