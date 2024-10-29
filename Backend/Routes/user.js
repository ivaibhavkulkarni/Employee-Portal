const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user'); 

// Create user 
router.post('/createUser', async (request, response) => {
    try {
        const { username, password } = request.body;

    
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return response.status(400).json({ error: 'Username already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        response.status(201).json({ message: 'User Created Successfully' });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

// Login 
router.post('/login', async (request, response) => {
    try {
        const { username, password } = request.body;

        
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return response.status(404).json({ error: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return response.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: existingUser._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

        response.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = router;
