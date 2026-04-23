const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Header  token 
    const token = req.header('x-auth-token');

    // 2. Agar token nahi hai toh access mana hai
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, access denied!' });
    }

    // 3. Token  verification
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // User in user obj
        req.user = decoded.id;
        
        next(); // next step of user request processing
    } catch (err) {
        res.status(401).json({ success: false, message: 'Token is not valid!' });
    }
};