import db from './db.js';

const Producto = {
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT 
        p.id_producto, 
        p.nombre, 
        p.descripcion, 
        p.precio, 
        p.stock, 
        p.imagen,
        tp.nombre AS tipoProducto, 
        c.nombre AS categoriaProducto
      FROM producto p
      JOIN tipo_producto tp ON p.id_tipo_producto = tp.id_tipo_producto
      LEFT JOIN categoria c ON tp.id_categoria = c.id_categoria;
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute(`
      SELECT 
        p.id_producto, 
        p.nombre, 
        p.descripcion, 
        p.precio, 
        p.stock, 
        p.imagen,
        tp.nombre AS tipoProducto, 
        c.nombre AS categoriaProducto
      FROM producto p
      JOIN tipo_producto tp ON p.id_tipo_producto = tp.id_tipo_producto
      LEFT JOIN categoria c ON tp.id_categoria = c.id_categoria
      WHERE p.id_producto = ?
    `, [id]);
    return rows[0];
  },

  create: async (nombre, descripcion, precio, imagen, stock, id_tipo_producto) => {
    const [result] = await db.execute(`
      INSERT INTO producto (nombre, descripcion, precio, imagen, stock, id_tipo_producto)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, precio, imagen, stock, id_tipo_producto]
    );
    return {
      id_producto: result.insertId,
      nombre,
      descripcion,
      precio,
      imagen,
      stock,
      id_tipo_producto
    };
  },

  update: async (id, nombre, descripcion, precio, imagen, stock, id_tipo_producto) => {
    const [result] = await db.execute(`
      UPDATE producto 
      SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, stock = ?, id_tipo_producto = ?
      WHERE id_producto = ?`,
      [nombre, descripcion, precio, imagen, stock, id_tipo_producto, id]
    );
    return result.affectedRows > 0 ? {
      id_producto: id,
      nombre,
      descripcion,
      precio,
      imagen,
      stock,
      id_tipo_producto
    } : null;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM producto WHERE id_producto = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default Producto;