import db from './db.js';

export const getUsers = async () => {
  const [rows] = await db.execute('SELECT * FROM users');
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE idUser = ?', [id]);
  return rows[0];
};

export const createUser = async (userData) => {
  const { name, email, password } = userData;
  const [result] = await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
  return result.insertId;
};

export const updateUser = async (id, userData) => {
  const { name, email, password } = userData;
  const [result] = await db.execute(
    'UPDATE users SET name = ?, email = ?, password = ? WHERE idUser = ?',
    [name, email, password, id]
  );
  return result.affectedRows;
};

export const deleteUser = async (id) => {
  const [result] = await db.execute('DELETE FROM users WHERE idUser = ?', [id]);
  return result.affectedRows;
};