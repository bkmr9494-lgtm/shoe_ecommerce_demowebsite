const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
// Import protect middleware to guard private profile routes
const { protect } = require('../middlewares/authMiddleware');

// Public routes
router.post('/signup', registerUser);
router.post('/login', loginUser);

// Protected route (requires a valid JWT token in headers)
router.get('/profile', protect, getUserProfile);

module.exports = router;