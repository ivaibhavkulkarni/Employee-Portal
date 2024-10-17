const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticateToken = require('../middlewares/auth');


const router = express.Router();
const JWT_SECRET = 'your_jwt_secret';


// Register a new user

router.post('/register',async (request,response) => {
    const { username, password } = request.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username,password: hashedPassword});
        await newUser.save();
        response.status(201).json({message: 'User registered successfully'});
    }
    catch(error){
        console.error('Error registering user:', error);
        response.status(500).json({error: 'Internal Server Error'});
    }
});


// Login and generate JWT 

router.post('/login',async(request,response) => {
    const { username, password } = request.body;
    try{
        const user = await User.findOne({username});
        
        if(!user){
            return response.status(401).json({ error: 'Invalid username or password' })
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        response.json({token})
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

