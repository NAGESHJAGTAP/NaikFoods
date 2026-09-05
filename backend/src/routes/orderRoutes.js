import express from 'express';
import { createOrder, getAnalytics } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/analytics', getAnalytics);

export default router;
