import db from './db.js';

const MetodoPago = {
  // Obtener todos los métodos de pago (opcionalmente filtrar por cliente)
  getAll: async (idCliente = null) => {
    let query = `SELECT id_metodo_pago, id_cliente, nombre, numero FROM metodo_pago`;
    let params = [];

    if (idCliente) {
      query += ` WHERE id_cliente = ?`;
      params.push(idCliente);
    }

    const [rows] = await db.execute(query, params);
    return rows;
  },

  // Obtener método de pago por ID
  getById: async (id) => {
    const [rows] = await db.execute(
      `SELECT id_metodo_pago, id_cliente, nombre, numero FROM metodo_pago WHERE id_metodo_pago = ?`,
      [id]
    );
    return rows[0];
  },

  // Crear un nuevo método de pago
  create: async ({ id_cliente, nombre, numero }) => {
    const [result] = await db.execute(
      `INSERT INTO metodo_pago (id_cliente, nombre, numero) VALUES (?, ?, ?)`,
      [id_cliente, nombre, numero]
    );
    return { id_metodo_pago: result.insertId, id_cliente, nombre, numero };
  },

  // Actualizar un método de pago por ID
  update: async (id, { id_cliente, nombre, numero }) => {
    const [result] = await db.execute(
      `UPDATE metodo_pago SET id_cliente = ?, nombre = ?, numero = ? WHERE id_metodo_pago = ?`,
      [id_cliente, nombre, numero, id]
    );
    if (result.affectedRows === 0) return null;
    return { id_metodo_pago: id, id_cliente, nombre, numero };
  },

  // Eliminar un método de pago por ID
  delete: async (id) => {
    const [result] = await db.execute(
      `DELETE FROM metodo_pago WHERE id_metodo_pago = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
};

export default MetodoPago;