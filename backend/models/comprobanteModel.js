import db from './db.js';

const Comprobante = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM comprobante');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM comprobante WHERE idComprobante = ?', [id]);
    return rows[0];
  },

  create: async (idCliente, idPedido, total, tipoComprobante) => {
    const fechaEmision = new Date();
    const [result] = await db.execute(
      'INSERT INTO comprobante (idCliente, idPedido, total, fechaEmision, tipoComprobante) VALUES (?, ?, ?, ?, ?)',
      [idCliente, idPedido, total, fechaEmision, tipoComprobante]
    );
    return {
      idComprobante: result.insertId,
      idCliente,
      idPedido,
      total,
      fechaEmision,
      tipoComprobante,
    };
  },

  update: async (id, idCliente, idPedido, total, tipoComprobante) => {
    const [result] = await db.execute(
      'UPDATE comprobante SET idCliente = ?, idPedido = ?, total = ?, tipoComprobante = ? WHERE idComprobante = ?',
      [idCliente, idPedido, total, tipoComprobante, id]
    );
    return result.affectedRows > 0 ? { idComprobante: id, idCliente, idPedido, total, tipoComprobante } : null;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM comprobante WHERE idComprobante = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default Comprobante;