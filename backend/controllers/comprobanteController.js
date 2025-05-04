import Comprobante from '../models/comprobanteModel.js';

const comprobanteController = {
  // Obtener todos los comprobantes
  getAll: async (req, res) => {
    try {
      const comprobantes = await Comprobante.getAll();
      res.json(comprobantes);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener comprobantes' });
    }
  },

  // Obtener un comprobante por ID
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

  // Crear un nuevo comprobante
  create: async (req, res) => {
    try {
      const {
        idPedido,
        tipoComprobante,
        dniComprobante,
        rucComprobante,
        razonSocialComprobante,
        direccionFiscalComprobante
      } = req.body;
  
      const nuevoComprobante = await Comprobante.create(
        idPedido,
        tipoComprobante,
        dniComprobante,
        rucComprobante,
        razonSocialComprobante,
        direccionFiscalComprobante
      );
  
      res.status(201).json(nuevoComprobante);
    } catch (error) {
      console.error('Error al generar comprobante:', error);
      res.status(500).json({ error: 'Error al generar comprobante' });
    }
  },  

  // Actualizar un comprobante
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { idCliente, idPedido, total, tipoComprobante, dniComprobante, rucComprobante, razonSocialComprobante, direccionFiscalComprobante } = req.body;
      const actualizado = await Comprobante.update(
        id, 
        idCliente, 
        idPedido, 
        total, 
        tipoComprobante, 
        dniComprobante, 
        rucComprobante, 
        razonSocialComprobante, 
        direccionFiscalComprobante
      );
      if (actualizado) {
        res.json(actualizado);
      } else {
        res.status(404).json({ error: 'Comprobante no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al actualizar comprobante' });
    }
  },

  // Eliminar un comprobante
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