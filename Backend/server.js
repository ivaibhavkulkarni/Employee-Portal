const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const userRoutes = require('./Routes/user'); 
const employeeRoutes = require('./Routes/employee'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());  

mongoose.connect('mongodb://localhost:27017/employeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
