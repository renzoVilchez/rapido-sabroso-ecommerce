import db from './db.js';

const Categoria = {
  // Obtener todas las categorías
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM categoria');
    return rows;
  },

  // Obtener una categoría por ID
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM categoria WHERE id_categoria = ?', [id]);
    return rows[0];
  },

  // Crear una nueva categoría
  create: async (nombre) => {
    const [result] = await db.execute(
      'INSERT INTO categoria (nombre) VALUES (?)',
      [nombre]
    );
    return { id_categoria: result.insertId, nombre };
  },

  // Actualizar una categoría
  update: async (id, nombre) => {
    const [result] = await db.execute(
      'UPDATE categoria SET nombre = ? WHERE id_categoria = ?',
      [nombre, id]
    );
    return result.affectedRows > 0 ? { id_categoria: id, nombre } : null;
  },

  // Eliminar una categoría
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM categoria WHERE id_categoria = ?', [id]);
    return result.affectedRows > 0;
  },

  // Obtener categorías con sus tipos de producto
  getCategoriasConTipos: async () => {
    const [rows] = await db.query(`
      SELECT 
        c.id_categoria, 
        c.nombre AS categoria,
        t.id_tipo_producto, 
        t.nombre AS tipo_producto,
        t.imagen
      FROM categoria c
      LEFT JOIN tipo_producto t ON t.id_categoria = c.id_categoria
      ORDER BY c.id_categoria, t.id_tipo_producto
    `);

    // Reorganizar los datos por categoría
    const categorias = {};
    for (const row of rows) {
      const { id_categoria, categoria, id_tipo_producto, tipo_producto, imagen } = row;

      if (!categorias[id_categoria]) {
        categorias[id_categoria] = {
          id_categoria,
          nombre: categoria,
          tipos: []
        };
      }

      if (id_tipo_producto) {
        categorias[id_categoria].tipos.push({
          id_tipo_producto,
          nombre: tipo_producto,
          imagen
        });
      }
    }

    return Object.values(categorias);
  }
};

export default Categoria;