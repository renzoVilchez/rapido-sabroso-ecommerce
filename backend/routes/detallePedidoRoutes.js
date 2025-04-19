import express from 'express';
import detallePedidoController from '../controllers/detallePedidoController.js';

const router = express.Router();

router.get('/', detallePedidoController.getAll);
router.get('/:id', detallePedidoController.getById);
router.post('/', detallePedidoController.create);
router.put('/:id', detallePedidoController.update);
router.delete('/:id', detallePedidoController.delete);

export default router;