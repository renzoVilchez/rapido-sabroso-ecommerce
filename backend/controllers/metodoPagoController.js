import MetodoPago from '../models/metodoPagoModel.js';

const metodoPagoController = {
  // Obtener todos los métodos de pago (opcionalmente por cliente)
  getAll: async (req, res) => {
    try {
      const { idCliente } = req.query; // opcional para filtrar por cliente
      const metodos = await MetodoPago.getAll(idCliente);
      res.json(metodos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener métodos de pago' });
    }
  },

  // Obtener método de pago por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const metodo = await MetodoPago.getById(id);
      if (metodo) {
        res.json(metodo);
      } else {
        res.status(404).json({ error: 'Método de pago no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener método de pago' });
    }
  },

  // Crear un nuevo método de pago
  create: async (req, res) => {
    try {
      const { id_cliente, nombre, numero } = req.body;
      if (!id_cliente || !nombre || !numero) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
      }

      const nuevoMetodo = await MetodoPago.create({ id_cliente, nombre, numero });
      res.status(201).json(nuevoMetodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear método de pago' });
    }
  },

  // Actualizar un método de pago por ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_cliente, nombre, numero } = req.body;

      if (!id_cliente || !nombre || !numero) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
      }

      const actualizado = await MetodoPago.update(id, { id_cliente, nombre, numero });
      if (actualizado) {
        res.json(actualizado);
      } else {
        res.status(404).json({ error: 'Método de pago no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar método de pago' });
    }
  },

  // Eliminar un método de pago por ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await MetodoPago.delete(id);
      if (eliminado) {
        res.json({ mensaje: 'Método de pago eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Método de pago no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar método de pago' });
    }
  },
};

export default metodoPagoController;