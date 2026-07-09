const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

// Import Route Handlers
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Serve static files from frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// API Mounting Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Fallback Route Handler for 404 Errors - serve index.html for SPA routing in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
} else {
  app.use((req, res, next) => {
    res.status(404).json({ message: `Route Not Found - ${req.originalUrl}` });
  });
}

const PORT = process.env.PORT || 5000;

// Execute database connection before spinning up the network server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 SoleX production server operational on port ${PORT}`));
});