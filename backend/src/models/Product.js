import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  marathiName: { type: String, trim: true },
  category: { type: String, required: true, enum: ['Masalas & Spices', 'Pickles & Chutneys', 'Snacks & Namkeen', 'Staples & Mixes'] },
  region: { type: String, required: true },
  heatLevel: { type: Number, required: true, min: 1, max: 4 },
  heatLabel: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number },
  weight: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 50 },
  badge: { type: String },
  description: { type: String, required: true },
  ingredients: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 50 },
  image: { type: String, required: true }
}, {
  timestamps: true
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
