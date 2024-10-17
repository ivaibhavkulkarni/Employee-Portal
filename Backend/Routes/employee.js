const express = require('express');
const multer = require('multer');
const Employee = require('../models/employee');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();


// Multer setup for file uploads (storing in uploads/ directory)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });


// Create a new employee
router.post('/employees', authenticateToken, upload.single('picture'), async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;
        const employee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            picture: req.file.filename,  // Store uploaded file's name
        });
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get all employees
router.get('/employees', authenticateToken, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get employee by ID
router.get('/employees/:id', authenticateToken, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Update employee by ID
router.put('/employees/:id', authenticateToken, async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, email, mobile, designation, gender, course },
            { new: true }
        );
        res.json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Delete employee by ID
router.delete('/employees/:id', authenticateToken, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
