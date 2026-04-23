const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // process.env.MONGO_URI aapki .env file se link uthaye ga
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`❌ Error: ${err.message}`);
        process.exit(1); // Agar connect na ho toh app band ho jaye
    }
};

module.exports = connectDB;