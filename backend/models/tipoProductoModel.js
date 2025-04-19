import db from './db.js';

const TipoProducto = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM tipo_producto');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM tipo_producto WHERE idTipoProducto = ?', [id]);
    return rows[0];
  },

  create: async (nombre, descripcion) => {
    const [result] = await db.execute(
      'INSERT INTO tipo_producto (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion]
    );
    return { idTipoProducto: result.insertId, nombre, descripcion };
  },

  update: async (id, nombre, descripcion) => {
    const [result] = await db.execute(
      'UPDATE tipo_producto SET nombre = ?, descripcion = ? WHERE idTipoProducto = ?',
      [nombre, descripcion, id]
    );
    return result.affectedRows > 0 ? { idTipoProducto: id, nombre, descripcion } : null;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM tipo_producto WHERE idTipoProducto = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default TipoProducto;