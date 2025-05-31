import express from 'express';
import clienteController from '../controllers/clienteController.js';

const router = express.Router();

// 1. Obtener todos los clientes
router.get('/', clienteController.getAll);

// 2. Obtener un cliente por correo (útil para login o búsqueda)
router.get('/correo/:correo', clienteController.getByCorreo);

// 3. Obtener un cliente por ID
router.get('/:id', clienteController.getById);

// 4. Crear un nuevo cliente (registro)
router.post('/registro', clienteController.create);

// 5. Ruta de login
router.post('/login', clienteController.login);

// 6. Actualizar los datos de un cliente
router.put('/:id', clienteController.update);

// 7. Actualizar los puntos del cliente
router.put('/:id/puntos', clienteController.updatePuntos);

// 8. Eliminar un cliente
router.delete('/:id', clienteController.delete);

export default router;