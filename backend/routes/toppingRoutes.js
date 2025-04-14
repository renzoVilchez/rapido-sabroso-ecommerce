import express from 'express';
import {
  getToppings,
  getTopping,
  createTopping,
  deleteTopping
} from '../controllers/toppingController.js';

const router = express.Router();

router.get('/', getToppings);
router.get('/:id', getTopping);
router.post('/', createTopping);
router.delete('/:id', deleteTopping);

export default router;