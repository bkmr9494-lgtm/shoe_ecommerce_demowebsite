const express = require('express');
const router = express.Router();
const { 
  createNewOrder, 
  getOrderById, 
  getMyOrders 
} = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

// All order routes are private and require the user to be logged in (`protect`)
router.post('/', protect, createNewOrder);      // Place a new order
router.get('/myorders', protect, getMyOrders);   // Get logged-in user's order history
router.get('/:id', protect, getOrderById);      // Fetch a specific order details by ID

module.exports = router;