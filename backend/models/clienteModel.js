import db from './db.js';

const Cliente = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM cliente');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM cliente WHERE idCliente = ?', [id]);
    return rows[0];
  },

  getByCorreo: async (correo) => {
    const [rows] = await db.execute('SELECT * FROM cliente WHERE correo = ?', [correo]);
    return rows[0];
  },

  create: async (nombre, correo, password, telefono = null, direccion = null) => {
    const [result] = await db.execute(
      'INSERT INTO cliente (nombre, correo, password, telefono, direccion, puntos) VALUES (?, ?, ?, ?, ?, 0)',
      [nombre, correo, password, telefono, direccion]
    );
    return {
      idCliente: result.insertId,
      nombre,
      correo,
      telefono,
      direccion,
      puntos: 0
    };
  },

  update: async (id, nombre, correo, telefono, direccion) => {
    const [result] = await db.execute(
      'UPDATE cliente SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE idCliente = ?',
      [nombre, correo, telefono, direccion, id]
    );
    return result.affectedRows > 0 ? { idCliente: id, nombre, correo, telefono, direccion } : null;
  },

  updatePuntos: async (idCliente, puntos) => {
    const [result] = await db.execute(
      'UPDATE cliente SET puntos = ? WHERE idCliente = ?',
      [puntos, idCliente]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM cliente WHERE idCliente = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default Cliente;