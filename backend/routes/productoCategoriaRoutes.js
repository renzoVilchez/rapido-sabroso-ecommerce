import express from 'express';
import productoCategoriaController from '../controllers/productoCategoriaController.js';

const router = express.Router();

// Rutas para obtener, crear y eliminar relaciones entre productos y categorías
router.get('/categorias-por-tipo', productoCategoriaController.getCategoriasPorTipo);
router.get('/', productoCategoriaController.getAll);
router.get('/:id', productoCategoriaController.getById);
router.post('/', productoCategoriaController.create);
router.delete('/:idProducto/:idCategoria', productoCategoriaController.delete);

export default router;