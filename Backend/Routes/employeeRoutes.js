const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Employee = require('../models/employee');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Ensure 'uploads/' directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save to 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File filter for image validation
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Error: File type not allowed!'), false);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route to get all employees (Protected Route)
router.get('/get', authMiddleware, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees' });
    }
});

// Route to add a new employee (Protected Route)
router.post('/add', authMiddleware, upload.single('picture'), async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log request body for debugging
        console.log('Uploaded File:', req.file); // Log file upload information

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
        console.error("Error in add employee route:", error); // Log error
        res.status(400).json({ error: error.message });
    }
});

// Route to edit an employee by ID (Protected Route)
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
                ...(picturePath ? { picture: picturePath } : {})
            },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error("Error in edit employee route:", error); // Log error
        res.status(400).json({ error: error.message });
    }
});

// Route to delete an employee by ID (Protected Route)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error("Error in delete employee route:", error); // Log error
        res.status(400).json({ error: error.message });
    }
});

// Testing route to confirm server connection
router.get('/message', async (req, res) => {
    try {
        res.send("Connected to Server message from backend");
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
});

module.exports = router;
