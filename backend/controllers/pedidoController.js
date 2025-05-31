import Pedido from '../models/pedidoModel.js';

const pedidoController = {
  // Obtener todos los pedidos
  getAll: async (req, res) => {
    try {
      const pedidos = await Pedido.getAll();
      res.json(pedidos);
    } catch (err) {
      console.error('Error en getAll:', err);
      res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
  },

  // Obtener un pedido por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const pedido = await Pedido.getById(id);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      res.json(pedido);
    } catch (err) {
      console.error('Error en getById:', err);
      res.status(500).json({ error: 'Error al obtener el pedido' });
    }
  },

  // Crear un nuevo pedido
  create: async (req, res) => {
    try {
      const {
        id_cliente,
        id_metodo_pago,
        direccion_entrega,
        metodo_envio,
        notas,
        descuento = 0,
        puntos_usados = 0,
        productos = [],
        menus = [],
        tipo_comprobante = 'boleta',
        dni = null,
        ruc = null,
        razon_social = null,
        direccion_fiscal = null
      } = req.body;

      // Validación: cliente y método de pago son obligatorios
      if (!id_cliente || !id_metodo_pago) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
      }

      // Validación: debe haber al menos un producto o un menú
      if ((!Array.isArray(productos) || productos.length === 0) &&
        (!Array.isArray(menus) || menus.length === 0)) {
        return res.status(400).json({ error: 'Debe incluir al menos un producto o menú' });
      }

      // Crear el pedido (pasando todos los datos)
      const nuevoPedido = await Pedido.create({
        id_cliente,
        id_metodo_pago,
        direccion_entrega,
        metodo_envio,
        notas,
        descuento,
        puntos_usados,
        productos,
        menus,
        tipo_comprobante,
        dni,
        ruc,
        razon_social,
        direccion_fiscal
      });

      res.status(201).json(nuevoPedido);
    } catch (err) {
      console.error('Error en create:', err);
      res.status(500).json({ error: 'Error al crear el pedido' });
    }
  },

  // Actualizar un pedido
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        id_cliente,
        id_metodo_pago,
        direccion_entrega,
        metodo_envio,
        notas,
        descuento = 0,
        puntos_usados = 0,
        productos = []
      } = req.body;

      if (!id_cliente || !id_metodo_pago || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: 'Faltan datos obligatorios o productos inválidos' });
      }

      const pedidoActualizado = await Pedido.update(id, {
        id_cliente,
        id_metodo_pago,
        direccion_entrega,
        metodo_envio,
        notas,
        descuento,
        puntos_usados,
        productos
      });

      if (!pedidoActualizado) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      res.json(pedidoActualizado);
    } catch (err) {
      console.error('Error en update:', err);
      res.status(500).json({ error: 'Error al actualizar el pedido' });
    }
  },

  // Eliminar un pedido
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Pedido.delete(id);
      if (!eliminado) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      res.json({ mensaje: 'Pedido eliminado correctamente' });
    } catch (err) {
      console.error('Error en delete:', err);
      res.status(500).json({ error: 'Error al eliminar el pedido' });
    }
  },
};

export default pedidoController;