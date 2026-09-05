import { initialProducts } from '../../../server/data/products.js';

export const calculateCustomCombo = async (req, res) => {
  try {
    const { selectedProductIds } = req.body;
    if (!selectedProductIds || !Array.isArray(selectedProductIds)) {
      return res.status(400).json({ success: false, message: 'Select products array required' });
    }

    const selectedProducts = initialProducts.filter(p => selectedProductIds.includes(p.id));
    const originalTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
    const discount = selectedProducts.length >= 4 ? 100 : selectedProducts.length * 20;
    const finalPrice = Math.max(0, originalTotal - discount);

    res.json({
      success: true,
      boxItemsCount: selectedProducts.length,
      originalTotal,
      discount,
      finalPrice,
      selectedProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
