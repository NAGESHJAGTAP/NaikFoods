import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  items: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'UPI' },
  status: { type: String, default: 'Confirmed' }
}, {
  timestamps: true
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
