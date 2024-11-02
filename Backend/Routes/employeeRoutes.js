const express = require('express');
const multer = require('multer');
const path = require('path');
const Employee = require('../models/employee');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // for unique file name
    }
});

const upload = multer({ storage: storage });

// Get all employees - Protected Route
router.get('/get', authMiddleware, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees' });
    }
});

// Create a new employee - Protected Route
router.post('/add', authMiddleware, upload.single('picture'), async (req, res) => {
    try {
        const { name, email, mobile, gender, designation, course } = req.body;
        const picturePath = req.file ? `/uploads/${req.file.filename}` : '';

        const newEmployee = new Employee({
            name,
            email,
            mobile,
            gender,
            designation,
            course,
            picture: picturePath
        });

        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Edit Employee - Protected Route
router.put('/edit/:id', authMiddleware, upload.single('picture'), async (req, res) => {
    try {
        const employeeId = req.params.id;
        const { name, email, mobile, gender, designation, course } = req.body;
        const picturePath = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            {
                name,
                email,
                mobile,
                gender,
                designation,
                course,
                ...(picturePath && { picture: picturePath }),
            },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete by id - Protected Route
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const employeeId = req.params.id;

        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Testing route
router.get('/message', async (req, res) => {
    try {
        res.send("Connected to Server message from backend");
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
});

module.exports = router;
