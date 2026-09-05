import { initialProducts, recipesData } from '../../../server/data/products.js';

let inMemoryProducts = [...initialProducts];

export const getProducts = async (req, res) => {
  try {
    let { category, region, heatLevel, search, sort } = req.query;
    let result = [...inMemoryProducts];

    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (region && region !== 'All') {
      result = result.filter(p => p.region.toLowerCase().includes(region.toLowerCase()));
    }

    if (heatLevel && heatLevel !== 'All') {
      result = result.filter(p => p.heatLevel === parseInt(heatLevel));
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.marathiName && p.marathiName.includes(q)) || 
        p.description.toLowerCase().includes(q) ||
        p.ingredients.toLowerCase().includes(q)
      );
    }

    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    res.json({ success: true, count: result.length, products: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const prod = inMemoryProducts.find(p => p.id === req.params.id);
  if (!prod) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product: prod });
};

export const getRecipes = async (req, res) => {
  res.json({ success: true, recipes: recipesData });
};

export const addProduct = async (req, res) => {
  const newP = {
    id: `prod_${inMemoryProducts.length + 1}`,
    ...req.body,
    rating: 5.0,
    reviewsCount: 1,
    inStock: true,
    stockCount: parseInt(req.body.stockCount || 50)
  };
  inMemoryProducts.unshift(newP);
  res.status(201).json({ success: true, product: newP });
};
