import mongoose from 'mongoose';

const comboSchema = new mongoose.Schema({
  comboName: { type: String, required: true },
  selectedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  originalPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  finalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Combo = mongoose.models.Combo || mongoose.model('Combo', comboSchema);
