const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGNUP: new user registeration
exports.signup = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;

        // 1. Password  hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Database  saving
        const user = await User.create({
            name, email, age,
            password: hashedPassword
        });

        res.status(201).json({ success: true, message: "User registered!" });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// LOGIN: User verification and token generation
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "wrong Email or Password" });

        // 3. Password match karein
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "wrong Email or Password" });

        // 4. JWT Token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};