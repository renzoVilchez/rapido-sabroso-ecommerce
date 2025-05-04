import express from 'express';
import pedidoController from '../controllers/pedidoController.js';

const router = express.Router();

// Obtener todos los pedidos
router.get('/', pedidoController.getAll);

// Obtener un pedido por ID
router.get('/:id', pedidoController.getById);

// Crear un nuevo pedido
router.post('/', pedidoController.create);

// Actualizar un pedido por ID
router.put('/:id', pedidoController.update);

// Eliminar un pedido por ID
router.delete('/:id', pedidoController.delete);

export default router;