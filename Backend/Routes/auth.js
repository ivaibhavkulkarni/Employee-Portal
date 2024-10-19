const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');


const router = express.Router();

// Register User

router.post('/register',async(request,response) =>{

    const { username, password } = request.body;

    try{

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, password: hashedPassword});
        await user.save();

        response.status(201).json({ message: 'User registered successfully' });
    }
    catch(error){
        response.status(500).json({ error: error.message });
    }
 });


// Login User

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

