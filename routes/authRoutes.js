const express = require('express');
const auth = require('../middleware/auth'); 
const router = express.Router();
const { signup, login } = require('../controllers/authController');


router.post('/signup', signup);
router.post('/login', login);


// testing route 
router.get('/test-auth', auth, (req, res) => {
    res.json({ message: "Congrats! Your Token is right.", userId: req.user });
});

module.exports = router;