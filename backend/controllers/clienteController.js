import Cliente from '../models/clienteModel.js';
import bcrypt from 'bcrypt';

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
      cliente ? res.json(cliente) : res.status(404).json({ error: 'Cliente no encontrado' });
    } catch {
      res.status(500).json({ error: 'Error al obtener cliente' });
    }
  },

  getByCorreo: async (req, res) => {
    try {
      const { correo } = req.params;
      const cliente = await Cliente.getByCorreo(correo);
      cliente ? res.json(cliente) : res.status(404).json({ error: 'Cliente no encontrado' });
    } catch {
      res.status(500).json({ error: 'Error al buscar cliente por correo' });
    }
  },

  login: async (req, res) => {
    try {
      const { correo, password } = req.body;
      const cliente = await Cliente.getByCorreo(correo);
      if (!cliente) return res.status(401).json({ success: false, message: 'Correo no encontrado' });

      const match = await bcrypt.compare(password, cliente.password);
      if (!match) return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });

      delete cliente.password;
      res.status(200).json({ success: true, message: 'Login exitoso', cliente });
    } catch (err) {
      res.status(500).json({ error: 'Error al intentar iniciar sesión' });
    }
  },

  create: async (req, res) => {
    try {
      const datos = req.body;

      // Hashear la contraseña antes de pasarla al modelo
      const salt = await bcrypt.genSalt(10);
      datos.password = await bcrypt.hash(datos.password, salt);

      const nuevoCliente = await Cliente.create(datos);
      res.status(201).json(nuevoCliente);
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar cliente', detalle: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      const actualizado = await Cliente.update(id, req.body);
      actualizado
        ? res.json(actualizado)
        : res.status(404).json({ error: 'Cliente no encontrado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar cliente' });
    }
  },

  updatePuntos: async (req, res) => {
    try {
      const { id } = req.params;
      const { puntos } = req.body;
      const actualizado = await Cliente.updatePuntos(id, puntos);
      actualizado
        ? res.json({ mensaje: 'Puntos actualizados correctamente' })
        : res.status(404).json({ error: 'Cliente no encontrado o sin cambios' });
    } catch {
      res.status(500).json({ error: 'Error al actualizar puntos del cliente' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Cliente.delete(id);
      eliminado
        ? res.json({ mensaje: 'Cliente eliminado correctamente' })
        : res.status(404).json({ error: 'Cliente no encontrado' });
    } catch {
      res.status(500).json({ error: 'Error al eliminar cliente' });
    }
  }
};

export default clienteController;