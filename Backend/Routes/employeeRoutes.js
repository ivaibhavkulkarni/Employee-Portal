const express = require('express');
const multer = require('multer');
const path = require('path');
const Employee = require('../models/employee');
const { request } = require('https');
const { error } = require('console');
const router = express.Router();

// Configure multer for file uploads

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null,'uploads/');
    },
    filename: (request, file, cb) =>{
        cb(null,Date.now() + path.extname(file.originalname)) // for unique file name 
    }
});

const upload = multer({storage: storage});

// Get all employee

router.get('/get', async(request,respose) =>{
    try{
        const employee = await Employee.find();
        respose.json(employee);
    }
    catch (error){
        respose.status(500).json({message: 'Error fetching employees'});
    }
});


// Create a new Employee 

router.post('/add',upload.single('picture'), async(request,respose)=> {
    try{
        const {name, email, mobile, gender, designation, course} = request.body;
        const picturePath = request.file ? `/uploads/${request.file.filename}` : ``;

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
        respose.status(201).json(newEmployee);
    }
    catch(error){
        respose.status(400).json({error: error.message})
    }
});


// Edit Employee 

router.put('/edit/:id', upload.single('picture'), async(request,response) =>{
    try{
        const employeeId = request.params.id;
        const { name, email, mobile, gender, designation, course} = request.body;
        const picturePath = request.file ? `uploads/${request.file.filename}` : undefined;

        // find employee by id and update 
        const updateEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            {
                name,
                email,
                mobile,
                gender,
                designation,
                course,
                ...(picturePath && {picture: picturePath}),
            },
            {new: true}
        );
        
        if(!updateEmployee){
            return response.status(404).json({error: 'Employee not found'});
        }

        response.status(200).json(updateEmployee);
    }
    catch (error){
        response.status(400).json({error: error.message});
    }
});


// Delete by id 

router.delete('/delete/:id', async (request,response) =>{
    try{
        const employeeId = request.params.id;

        const deleteEmployee = await Employee.findByIdAndDelete(employeeId);

        if(!deleteEmployee){
            return response.status(404).json({error: 'Employee not found'});
        }

        response.status(200).json({message: 'Employee deleted successfully'});
    }
    catch (error){
        response.status(400).json({error: error.message});
    }
});


// Testing

router.get('/Message',async(request,response) =>{
    try{
        response.send("Connected to Server message from backend");
    }
    catch (error){
        response.status(500).json({message: 'Error fetching data'})
    }
});


module.exports = router;