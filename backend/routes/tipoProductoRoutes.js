import express from 'express';
import tipoProductoController from '../controllers/tipoProductoController.js';

const router = express.Router();

router.get('/', tipoProductoController.getAll);
router.get('/:id', tipoProductoController.getById);
router.post('/', tipoProductoController.create);
router.put('/:id', tipoProductoController.update);
router.delete('/:id', tipoProductoController.delete);

export default router;