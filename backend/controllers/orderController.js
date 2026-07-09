const Order = require('../models/Order');

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
exports.createNewOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    const order = new Order({
      user: req.user ? req.user._id : null, // Set by authMiddleware, or null for guest orders
      orderItems: items,
      shippingAddress,
      paymentMethod,
      itemsPrice: totalAmount,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: totalAmount,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: `Order Creation Failed: ${error.message}` });
  }
};

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: `Fetching Orders Failed: ${error.message}` });
  }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: `Fetching Order Details Failed: ${error.message}` });
  }
};