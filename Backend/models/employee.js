const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    id:{
        type: Number,
        required:true,
        unique:true
    },

    picture:{
        type:ArrayBuffer,
        contentType: String
    },

    name:{
        type: String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    mobile:{
        type:String,
        required:true
    },

    designation:{
        type:String,
        required:true
    },

    gender:{
        type:String,
        required:true
    },

    course:{
        type:String,
        required:true
    },

    addDate:{
        type:Date,
        default:Date.now
    }
});


const EmployeeList = mongoose.model('EmployeeList',employeeSchema);

moodule.exports = EmployeeList;