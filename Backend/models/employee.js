const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    
    name: {type: String, required: true,},
    email: {type: String, required: true, unique: true},
    mobile: {type: String, require: true},
    designation: {type: String, require: true},
    gender: {type: String, require: true},
    course: {type: String, require: true},
    addDate: {type: Date, default: Date.now},
    picture: {type: String},

});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;  