const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/authRoutes'); 

// 1. Config Load
dotenv.config();

// 2. Database  connection
connectDB();

const app = express();

// 3. Body Parser (JSON data handling)
app.use(express.json());

// 4. Routes define 
app.use('/api/auth', authRoutes); // Task 2: Signup/Login
app.use('/api/users', userRoutes); // Task 1: CRUD

// 5. Server start 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});