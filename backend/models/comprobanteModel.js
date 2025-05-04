import db from './db.js';

const Comprobante = {
  // Obtener todos los comprobantes
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM comprobante');
    return rows;
  },

  // Obtener un comprobante por ID
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM comprobante WHERE idComprobante = ?', [id]);
    return rows[0];
  },

  // Crear un nuevo comprobante
// Crear un nuevo comprobante
create: async (idPedido, tipoComprobante, dniComprobante, rucComprobante, razonSocialComprobante, direccionFiscalComprobante) => {
  const fechaEmisionComprobante = new Date();
  const [result] = await db.execute(
    'INSERT INTO comprobante (idPedido, tipoComprobante, fechaEmisionComprobante, dniComprobante, rucComprobante, razonSocialComprobante, direccionFiscalComprobante) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [idPedido, tipoComprobante, fechaEmisionComprobante, dniComprobante, rucComprobante, razonSocialComprobante, direccionFiscalComprobante]
  );
  return {
    idComprobante: result.insertId,
    idPedido,
    tipoComprobante,
    fechaEmisionComprobante,
    dniComprobante,
    rucComprobante,
    razonSocialComprobante,
    direccionFiscalComprobante,
  };
},

  // Actualizar un comprobante
  update: async (id, idCliente, idPedido, total, tipoComprobante, dniComprobante, rucComprobante, razonSocialComprobante, direccionFiscalComprobante) => {
    const [result] = await db.execute(
      'UPDATE comprobante SET idCliente = ?, idPedido = ?, total = ?, tipoComprobante = ?, dniComprobante = ?, rucComprobante = ?, razonSocialComprobante = ?, direccionFiscalComprobante = ? WHERE idComprobante = ?',
      [idCliente, idPedido, total, tipoComprobante, dniComprobante, rucComprobante, razonSocialComprobante, direccionFiscalComprobante, id]
    );
    return result.affectedRows > 0 ? { idComprobante: id, idCliente, idPedido, total, tipoComprobante, dniComprobante, rucComprobante, razonSocialComprobante, direccionFiscalComprobante } : null;
  },

  // Eliminar un comprobante
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM comprobante WHERE idComprobante = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default Comprobante;