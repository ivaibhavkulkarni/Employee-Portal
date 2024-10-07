const express = require("express");
const mongo = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const multer = require("multer")
const EmployeeList = require("./models/employee");


app.use(express.json());


// Connecting to mongoDB

mongo.connect("mongodb://localhost:27017/", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

.then(() =>{
    console.log('MongoDB Connected Succesfully');
    
    app.listen(PORT,()=>{
        console.log(`Server is running at http://localhost:${PORT}`);
    });

})

.catch((error) =>{
    console.error('MongoDB connection error',error);
});


// Testing API's
app.get('/', (req, res) => {
    res.send('Welcome to the Employee Portal API');
});


// 
