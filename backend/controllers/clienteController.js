import Cliente from '../models/clienteModel.js';

const clienteController = {
  getAll: async (req, res) => {
    try {
      const clientes = await Cliente.getAll();
      res.json(clientes);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener clientes' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.getById(id);
      if (cliente) {
        res.json(cliente);
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al obtener cliente' });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, correo, password, telefono, direccion } = req.body;
      const nuevoCliente = await Cliente.create(nombre, correo, password, telefono, direccion);
      res.status(201).json(nuevoCliente);
    } catch {
      res.status(500).json({ error: 'Error al registrar cliente' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, correo, telefono, direccion } = req.body;
      const actualizado = await Cliente.update(id, nombre, correo, telefono, direccion);
      if (actualizado) {
        res.json(actualizado);
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al actualizar cliente' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Cliente.delete(id);
      if (eliminado) {
        res.json({ mensaje: 'Cliente eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al eliminar cliente' });
    }
  },
};

export default clienteController;