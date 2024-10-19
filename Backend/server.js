const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect DB

connectDB();

// Parse json 
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees',require('./routes/employee'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
