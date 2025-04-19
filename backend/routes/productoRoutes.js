// routes/productoRoutes.js
import express from 'express';
import productoController from '../controllers/productoController.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', productoController.getAllProductos);

// Obtener un producto por ID
router.get('/:id', productoController.getProductoById);

// Crear un nuevo producto
router.post('/', productoController.createProducto);

// Actualizar un producto
router.put('/:id', productoController.updateProducto);

// Eliminar un producto
router.delete('/:id', productoController.deleteProducto);

export default router;