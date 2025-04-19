import db from './db.js';

const Pedido = {
  // Obtener todos los pedidos
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM pedido');
    return rows;
  },

  // Obtener un pedido por ID
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM pedido WHERE idPedido = ?', [id]);
    return rows[0];
  },

  // Crear un nuevo pedido
  create: async (idCliente, fechaPedido, total, estado) => {
    const [result] = await db.execute(
      'INSERT INTO pedido (idCliente, fechaPedido, total, estado) VALUES (?, ?, ?, ?)',
      [idCliente, fechaPedido, total, estado]
    );
    return {
      idPedido: result.insertId,
      idCliente,
      fechaPedido,
      total,
      estado
    };
  },

  // Actualizar un pedido
  update: async (id, idCliente, fechaPedido, total, estado) => {
    const [result] = await db.execute(
      'UPDATE pedido SET idCliente = ?, fechaPedido = ?, total = ?, estado = ? WHERE idPedido = ?',
      [idCliente, fechaPedido, total, estado, id]
    );
    return result.affectedRows > 0
      ? { idPedido: id, idCliente, fechaPedido, total, estado }
      : null;
  },

  // Eliminar un pedido
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM pedido WHERE idPedido = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default Pedido;