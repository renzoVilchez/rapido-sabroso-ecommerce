import express from 'express';
import clienteController from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', clienteController.getAll);
router.get('/:id', clienteController.getById);
router.post('/', clienteController.create);
router.put('/:id', clienteController.update);
router.delete('/:id', clienteController.delete);

export default router;