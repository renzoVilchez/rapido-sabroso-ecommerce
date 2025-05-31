import express from 'express';
import metodoPagoController from '../controllers/metodoPagoController.js';

const router = express.Router();

// Obtener todos los métodos de pago (opcional filtro por cliente via query param)
router.get('/', metodoPagoController.getAll);

// Obtener método de pago por ID
router.get('/:id', metodoPagoController.getById);

// Crear un nuevo método de pago
router.post('/', metodoPagoController.create);

// Actualizar un método de pago por ID
router.put('/:id', metodoPagoController.update);

// Eliminar un método de pago por ID
router.delete('/:id', metodoPagoController.delete);

export default router;