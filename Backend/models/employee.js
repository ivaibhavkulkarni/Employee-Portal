const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    addDate: {
        type: Date,
        default: Date.now,
    },
    picture: {
        type: String,
        required: true,
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;