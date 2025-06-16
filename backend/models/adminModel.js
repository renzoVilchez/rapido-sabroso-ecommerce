import db from './db.js';
import bcrypt from 'bcrypt';

const Admin = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM admin');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM admin WHERE idAdmin = ?', [id]);
    return rows[0];
  },

  login: async (email, password) => {
    const admin = await Admin.getByCorreo(email);
    if (!admin) return null;

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return null;

    const { password: _, ...safeData } = admin;
    return safeData;
  },

  getByCorreo: async (email) => {
    const [rows] = await db.execute('SELECT * FROM admin WHERE email = ?', [email]);
    return rows[0];
  },

  create: async (nombre, correo, password) => {
    const [result] = await db.execute(
      'INSERT INTO admin (nombre, correo, password) VALUES (?, ?, ?)',
      [nombre, correo, password]
    );
    return { idAdmin: result.insertId, nombre, correo };
  },

  update: async (id, nombre, correo, password) => {
    const [result] = await db.execute(
      'UPDATE admin SET nombre = ?, correo = ?, password = ? WHERE idAdmin = ?',
      [nombre, correo, password, id]
    );
    return result.affectedRows > 0 ? { idAdmin: id, nombre, correo } : null;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM admin WHERE idAdmin = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default Admin;