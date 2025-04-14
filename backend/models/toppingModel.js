import db from './db.js';

const getAll = async () => {
  const [rows] = await db.query('SELECT * FROM toppings');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM toppings WHERE toppingId = ?', [id]);
  return rows[0];
};

const create = async (topping) => {
  const { toppingName, toppingPrice } = topping;
  const [result] = await db.query(
    'INSERT INTO toppings (toppingName, toppingPrice) VALUES (?, ?)',
    [toppingName, toppingPrice]
  );
  return { id: result.insertId, ...topping };
};

const remove = async (id) => {
  await db.query('DELETE FROM toppings WHERE toppingId = ?', [id]);
};

export default { getAll, getById, create, remove };