import Comprobante from '../models/comprobanteModel.js';

const comprobanteController = {
  // Obtener todos los comprobantes
  getAll: async (req, res) => {
    try {
      const comprobantes = await Comprobante.getAll();
      res.json(comprobantes);
    } catch (error) {
      console.error('Error al obtener comprobantes:', error);
      res.status(500).json({ message: 'Error al obtener comprobantes' });
    }
  },

  // Obtener comprobante por ID
  getByPedidoId: async (req, res) => {
    const { id } = req.params;

    try {
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }

      const comprobante = await Comprobante.getByPedidoId(id);

      if (!comprobante) {
        return res.status(404).json({ message: 'Comprobante no encontrado' });
      }

      res.status(200).json(comprobante);

    } catch (error) {
      console.error('Error al obtener comprobante por ID:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Obtener comprobantes por ID de cliente
  getByClienteId: async (req, res) => {
    const { idCliente } = req.params;

    try {
      if (isNaN(idCliente)) {
        return res.status(400).json({ message: 'ID de cliente inválido' });
      }

      const comprobantes = await Comprobante.getByClienteId(idCliente);

      res.status(200).json(comprobantes);

    } catch (error) {
      console.error('Error al obtener comprobantes por cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Crear un nuevo comprobante
  create: async (req, res) => {
    try {
      const data = req.body;
      const nuevoComprobante = await Comprobante.create(data);
      res.status(201).json(nuevoComprobante);
    } catch (error) {
      console.error('Error al crear comprobante:', error);
      res.status(500).json({ message: 'Error al crear comprobante' });
    }
  },

  // Actualizar un comprobante por ID
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const actualizado = await Comprobante.update(id, data);
      if (!actualizado) {
        return res.status(404).json({ message: 'Comprobante no encontrado para actualizar' });
      }
      res.json({ message: 'Comprobante actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar comprobante:', error);
      res.status(500).json({ message: 'Error al actualizar comprobante' });
    }
  },

  // Eliminar un comprobante por ID
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const eliminado = await Comprobante.delete(id);
      if (!eliminado) {
        return res.status(404).json({ message: 'Comprobante no encontrado para eliminar' });
      }
      res.json({ message: 'Comprobante eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar comprobante:', error);
      res.status(500).json({ message: 'Error al eliminar comprobante' });
    }
  }
};

export default comprobanteController;