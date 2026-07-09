const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Public routes: Anyone can view products or a single shoe's details
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin-only routes: Only logged-in users with the 'admin' role can add or delete products
router.post('/', protect, adminOnly, createProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;