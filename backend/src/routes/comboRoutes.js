import express from 'express';
import { calculateCustomCombo } from '../controllers/comboController.js';

const router = express.Router();

router.post('/calculate', calculateCustomCombo);

export default router;
