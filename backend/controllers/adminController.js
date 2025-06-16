import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';

const adminController = {
  getAll: async (req, res) => {
    try {
      const admins = await Admin.getAll();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener administradores' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await Admin.getById(id);
      if (admin) {
        res.json(admin);
      } else {
        res.status(404).json({ error: 'Administrador no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener administrador' });
    }
  },

  getByCorreo: async (req, res) => {
    try {
      const { correo } = req.params;
      const adminEncontrado = await Admin.getByCorreo(correo);
      adminEncontrado
        ? res.json(adminEncontrado)
        : res.status(404).json({ error: 'Administrador no encontrado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al buscar administrador por correo' });
    }
  },

    login: async (req, res) => {
    try {
      const { correo, password } = req.body;
      const admin = await Admin.getByCorreo(correo);
      if (!admin) return res.status(401).json({ success: false, message: 'Correo no encontrado' });

      const match = await bcrypt.compare(password, admin.password);
      if (!match) return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });

      delete admin.password;
      res.status(200).json({ success: true, message: 'Login exitoso', admin });
    } catch (err) {
      res.status(500).json({ error: 'Error al intentar iniciar sesión' });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, correo, password } = req.body;
      const nuevoAdmin = await Admin.create(nombre, correo, password);
      res.status(201).json(nuevoAdmin);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear administrador' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, correo, password } = req.body;
      const actualizado = await Admin.update(id, nombre, correo, password);
      if (actualizado) {
        res.json(actualizado);
      } else {
        res.status(404).json({ error: 'Administrador no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar administrador' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Admin.delete(id);
      if (eliminado) {
        res.json({ mensaje: 'Administrador eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Administrador no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar administrador' });
    }
  },
};

export default adminController;