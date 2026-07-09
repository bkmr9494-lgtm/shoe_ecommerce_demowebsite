const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderItems: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String },
    price: { type: Number },
    size: { type: String },
    qty: { type: Number }
  }],
  shippingAddress: {
    name: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    pin: { type: String }
  },
  paymentMethod: { type: String },
  itemsPrice: { type: Number },
  taxPrice: { type: Number, default: 0 },
  shippingPrice: { type: Number, default: 0 },
  totalPrice: { type: Number },
  status: { type: String, default: 'Processing' }
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);