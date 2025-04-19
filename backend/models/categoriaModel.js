import db from './db.js';

const Categoria = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM categoria');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM categoria WHERE idCategoria = ?', [id]);
    return rows[0];
  },

  create: async (nombre) => {
    const [result] = await db.execute(
      'INSERT INTO categoria (nombre) VALUES (?)',
      [nombre]
    );
    return { idCategoria: result.insertId, nombre };
  },

  update: async (id, nombre) => {
    const [result] = await db.execute(
      'UPDATE categoria SET nombre = ? WHERE idCategoria = ?',
      [nombre, id]
    );
    return result.affectedRows > 0 ? { idCategoria: id, nombre } : null;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM categoria WHERE idCategoria = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default Categoria;