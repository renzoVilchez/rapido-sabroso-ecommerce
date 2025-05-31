import express from 'express';
import comprobanteController from '../controllers/comprobanteController.js';

const router = express.Router();

// Obtener todos los comprobantes
router.get('/', comprobanteController.getAll);

// Obtener un comprobante por pedido
router.get('/pedido/:id', comprobanteController.getByPedidoId);

// Ruta para obtener comprobantes por cliente
router.get('/cliente/:idCliente', comprobanteController.getByClienteId);

// Crear un nuevo comprobante
router.post('/', comprobanteController.create);

// Actualizar un comprobante por ID
router.put('/:id', comprobanteController.update);

// Eliminar un comprobante por ID
router.delete('/:id', comprobanteController.delete);

export default router;