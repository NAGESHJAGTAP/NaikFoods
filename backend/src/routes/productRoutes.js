import express from 'express';
import { getProducts, getProductById, getRecipes, addProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/recipes', getRecipes);
router.get('/:id', getProductById);
router.post('/', addProduct);

export default router;
