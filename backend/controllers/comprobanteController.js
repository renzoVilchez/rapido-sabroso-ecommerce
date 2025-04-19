import Comprobante from '../models/comprobanteModel.js';

const comprobanteController = {
  getAll: async (req, res) => {
    try {
      const comprobantes = await Comprobante.getAll();
      res.json(comprobantes);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener comprobantes' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const comprobante = await Comprobante.getById(id);
      if (comprobante) {
        res.json(comprobante);
      } else {
        res.status(404).json({ error: 'Comprobante no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al obtener comprobante' });
    }
  },

  create: async (req, res) => {
    try {
      const { idCliente, idPedido, total, tipoComprobante } = req.body;
      const nuevoComprobante = await Comprobante.create(idCliente, idPedido, total, tipoComprobante);
      res.status(201).json(nuevoComprobante);
    } catch {
      res.status(500).json({ error: 'Error al generar comprobante' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { idCliente, idPedido, total, tipoComprobante } = req.body;
      const actualizado = await Comprobante.update(id, idCliente, idPedido, total, tipoComprobante);
      if (actualizado) {
        res.json(actualizado);
      } else {
        res.status(404).json({ error: 'Comprobante no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al actualizar comprobante' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Comprobante.delete(id);
      if (eliminado) {
        res.json({ mensaje: 'Comprobante eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Comprobante no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al eliminar comprobante' });
    }
  },
};

export default comprobanteController;