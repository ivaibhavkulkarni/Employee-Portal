require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./Routes/employeeRoutes');
const userRoutes = require('./Routes/user');

const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(express.json());

// MongoDB Connection

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB Connection error:', error));

// Routes

app.use('/api/employeeRoutes', employeeRoutes);
app.use('/api/userRoutes',userRoutes);


// Start the server

app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);
