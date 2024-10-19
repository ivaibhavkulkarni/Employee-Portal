const connectDB = require('./config/db');

const testConnection = async () => {
    await connectDB();
};

testConnection();
