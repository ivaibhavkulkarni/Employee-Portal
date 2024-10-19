const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();


// Add Employee

router.post('/addEmployee', async(request,response) =>{
    const { name, email, mobile, gender, designation, course, picture} = request.body;

    try{
        const employee = new Employee({ name, email, mobile, gender, designation, course, picture});
        await employee.save();
        response.status(201).json(employee);
    }
    catch (error) {
        response.status(500).json({ error: error.message });
    }
});


// Get Employee

router.get('/employee', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Employee by ID

router.get('/employee/:id', async(req,res) =>{
    try{
        const employeeId = req.params;
        const employee = await Employee.findById(employeeId);

        if(!employee){
            return res.status(404).json({ error: 'Employee not found' })
        }
        res.json(employee)
    }
    catch(error){
        res.status(500).json({ error: 'error.message'});
    }
});

// Update Employee

router.put('/employee/:id', async (request, response) => {
    const { id } = request.params;
    const { name, email, mobile, gender, designation, course, picture } = request.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, email, mobile, gender, designation, course, picture }, { new: true });
        if (!updatedEmployee) return response.status(404).json({ message: 'Employee not found' });
        response.json(updatedEmployee);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});


// Delete Employee

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;