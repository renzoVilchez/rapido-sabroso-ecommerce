import express from 'express';
import comprobanteController from '../controllers/comprobanteController.js';

const router = express.Router();

router.get('/', comprobanteController.getAll);
router.get('/:id', comprobanteController.getById);
router.post('/', comprobanteController.create);
router.put('/:id', comprobanteController.update);
router.delete('/:id', comprobanteController.delete);

export default router;