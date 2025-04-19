import Pedido from '../models/pedidoModel.js';

const pedidoController = {
  // Obtener todos los pedidos
  getAll: async (req, res) => {
    try {
      const pedidos = await Pedido.getAll();
      res.json(pedidos);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener pedidos' });
    }
  },

  // Obtener un pedido por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const pedido = await Pedido.getById(id);
      if (pedido) {
        res.json(pedido);
      } else {
        res.status(404).json({ error: 'Pedido no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al obtener pedido' });
    }
  },

  // Crear un nuevo pedido
  create: async (req, res) => {
    try {
      const { idCliente, fechaPedido, total, estado } = req.body;
      const nuevoPedido = await Pedido.create(idCliente, fechaPedido, total, estado);
      res.status(201).json(nuevoPedido);
    } catch {
      res.status(500).json({ error: 'Error al crear pedido' });
    }
  },

  // Actualizar un pedido
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { idCliente, fechaPedido, total, estado } = req.body;
      const actualizado = await Pedido.update(id, idCliente, fechaPedido, total, estado);
      if (actualizado) {
        res.json(actualizado);
      } else {
        res.status(404).json({ error: 'Pedido no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al actualizar pedido' });
    }
  },

  // Eliminar un pedido
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Pedido.delete(id);
      if (eliminado) {
        res.json({ mensaje: 'Pedido eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Pedido no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al eliminar pedido' });
    }
  },
};

export default pedidoController;