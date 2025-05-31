import express from 'express';
import categoriaController from '../controllers/categoriaController.js';

const router = express.Router();

router.get('/', categoriaController.getAll);
router.get('/:id', categoriaController.getById);
router.post('/', categoriaController.create);
router.put('/:id', categoriaController.update);
router.delete('/:id', categoriaController.delete);
router.get('/con-tipos/all', categoriaController.getConTipos);

export default router;