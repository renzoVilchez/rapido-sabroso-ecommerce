import DetallePedido from '../models/detallePedidoModel.js';

const detallePedidoController = {
  // Obtener todos los detalles de pedidos
  getAll: async (req, res) => {
    try {
      const detalles = await DetallePedido.getAll();
      res.json(detalles);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener detalles de pedidos' });
    }
  },

  // Obtener un detalle de pedido por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const detalle = await DetallePedido.getById(id);
      if (detalle) {
        res.json(detalle);
      } else {
        res.status(404).json({ error: 'Detalle de pedido no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al obtener detalle de pedido' });
    }
  },

  // Crear un nuevo detalle de pedido
  create: async (req, res) => {
    try {
      const { idPedido, idProducto, cantidad, precio } = req.body;
      const nuevoDetalle = await DetallePedido.create(idPedido, idProducto, cantidad, precio);
      res.status(201).json(nuevoDetalle);
    } catch {
      res.status(500).json({ error: 'Error al crear detalle de pedido' });
    }
  },

  // Actualizar un detalle de pedido
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { idPedido, idProducto, cantidad, precio } = req.body;
      const actualizado = await DetallePedido.update(id, idPedido, idProducto, cantidad, precio);
      if (actualizado) {
        res.json(actualizado);
      } else {
        res.status(404).json({ error: 'Detalle de pedido no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al actualizar detalle de pedido' });
    }
  },

  // Eliminar un detalle de pedido
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await DetallePedido.delete(id);
      if (eliminado) {
        res.json({ mensaje: 'Detalle de pedido eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Detalle de pedido no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al eliminar detalle de pedido' });
    }
  },
};

export default detallePedidoController;