import db from './db.js';

const DetallePedido = {
  // Obtener todos los detalles de un pedido
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM detalle_pedido');
    return rows;
  },

  // Obtener los detalles de un pedido por ID
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM detalle_pedido WHERE idDetallePedido = ?', [id]);
    return rows[0];
  },

  // Crear un nuevo detalle de pedido
  create: async (idPedido, idProducto, cantidad, precio) => {
    const [result] = await db.execute(
      'INSERT INTO detalle_pedido (idPedido, idProducto, cantidad, precio) VALUES (?, ?, ?, ?)',
      [idPedido, idProducto, cantidad, precio]
    );
    return {
      idDetallePedido: result.insertId,
      idPedido,
      idProducto,
      cantidad,
      precio
    };
  },

  // Actualizar un detalle de pedido
  update: async (id, idPedido, idProducto, cantidad, precio) => {
    const [result] = await db.execute(
      'UPDATE detalle_pedido SET idPedido = ?, idProducto = ?, cantidad = ?, precio = ? WHERE idDetallePedido = ?',
      [idPedido, idProducto, cantidad, precio, id]
    );
    return result.affectedRows > 0
      ? { idDetallePedido: id, idPedido, idProducto, cantidad, precio }
      : null;
  },

  // Eliminar un detalle de pedido
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM detalle_pedido WHERE idDetallePedido = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default DetallePedido;