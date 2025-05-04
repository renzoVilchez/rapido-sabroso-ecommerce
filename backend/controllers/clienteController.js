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

  getByCorreo: async (req, res) => {
    try {
      const { correo } = req.params;
      const cliente = await Cliente.getByCorreo(correo);
      if (cliente) {
        res.json(cliente);
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al buscar cliente por correo' });
    }
  },

  // Nuevo método para login
  login: async (req, res) => {
    try {
      const { correo, password } = req.body; // Cambié a body en lugar de params para que sea más seguro

      const cliente = await Cliente.login(correo, password);

      if (!cliente) {
        return res.status(401).json({ success: false, message: 'Correo no encontrado' });
      }

      return res.status(200).json({
        success: true,
        message: 'Login exitoso',
        cliente
      });
    } catch (err) {
      res.status(500).json({ error: 'Error al intentar iniciar sesión' });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, correo, password, tipoPersona, documento, razonSocial, direccionFiscal, direccionEnvio } = req.body;

      // Se agrega 'direccionEnvio' al crear el cliente
      const nuevoCliente = await Cliente.create({
        nombreCliente: nombre,
        correoCliente: correo,
        passwordCliente: password,
        tipoPersona,
        dniCliente: tipoPersona === 'natural' ? documento : null,
        rucCliente: tipoPersona === 'juridica' ? documento : null,
        razonSocialCliente: razonSocial || null,
        direccionFiscalCliente: direccionFiscal || null,
        direccionEnvio
      });

      res.status(201).json(nuevoCliente);
    } catch (error) {
      console.error('Error al registrar cliente:', error.message);
      res.status(500).json({ error: 'Error al registrar cliente', detalle: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, correo, tipoPersona, documento, razonSocial, direccionFiscal, direccionEnvio } = req.body;

      // Se incluye el campo 'direccionEnvio' al actualizar el cliente
      const actualizado = await Cliente.update(id, {
        nombre,
        correo,
        tipoPersona,
        documento,
        razonSocial,
        direccionFiscal,
        direccionEnvio // Ahora también se actualiza la dirección de envío
      });

      if (actualizado) {
        res.json(actualizado);
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al actualizar cliente' });
    }
  },

  updatePuntos: async (req, res) => {
    try {
      const { id } = req.params;
      const { puntos } = req.body;
      const actualizado = await Cliente.updatePuntos(id, puntos);
      if (actualizado) {
        res.json({ mensaje: 'Puntos actualizados correctamente' });
      } else {
        res.status(404).json({ error: 'Cliente no encontrado o sin cambios' });
      }
    } catch {
      res.status(500).json({ error: 'Error al actualizar puntos del cliente' });
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
  }
};



export default clienteController;