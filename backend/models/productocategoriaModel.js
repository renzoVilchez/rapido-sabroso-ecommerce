import db from './db.js';

const ProductoCategoria = {
  // Obtener todas las relaciones entre productos y categorías con nombres
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT 
        pc.idProducto, 
        p.nombreProducto AS nombreProducto, 
        c.nombreCategoria AS nombreCategoria
      FROM producto_categoria pc
      JOIN producto p ON pc.idProducto = p.idProducto
      JOIN categoria c ON pc.idCategoria = c.idCategoria
    `);
    return rows;
  },

  // Obtener una relación entre producto y categoría (opcional, si vas a usar claves compuestas, puedes omitir esto)
  getById: async (idProducto, idCategoria) => {
    const [rows] = await db.execute(
      `SELECT 
        pc.idProducto, 
        p.nombreProducto AS nombreProducto,
        c.nombreCategoria AS nombreCategoria
      FROM producto_categoria pc
      JOIN producto p ON pc.idProducto = p.idProducto
      JOIN categoria c ON pc.idCategoria = c.idCategoria
      WHERE pc.idProducto = ? AND pc.idCategoria = ?`,
      [idProducto, idCategoria]
    );
    return rows[0];
  },

  // Obtener categorías agrupadas por tipo sin agrupar los datos
  getCategoriasPorTipo: async () => {
    try {
      const [rows] = await db.execute(`
        SELECT 
          tp.nombreTipoProducto AS tipoProducto, 
          c.nombreCategoria AS nombreCategoria
        FROM producto_categoria pc
        JOIN producto p ON pc.idProducto = p.idProducto
        JOIN tipo_producto tp ON p.idTipoProducto = tp.idTipoProducto
        JOIN categoria c ON pc.idCategoria = c.idCategoria
        ORDER BY tp.nombreTipoProducto, c.nombreCategoria;
      `);
  
      // Agrupar manualmente
      const agrupado = {};
  
      rows.forEach(row => {
        const tipo = row.tipoProducto;
        const categoria = row.nombreCategoria;
  
        if (!agrupado[tipo]) {
          agrupado[tipo] = new Set();
        }
        agrupado[tipo].add(categoria); // evitar duplicados
      });
  
      // Convertir a formato de array
      const resultado = Object.entries(agrupado).map(([tipoProducto, categoriasSet]) => ({
        tipoProducto,
        categorias: Array.from(categoriasSet)
      }));
  
      return resultado;
    } catch (error) {
      console.error('Error al obtener categorías por tipo:', error);
      throw error;
    }
  },

  // Crear una nueva relación entre producto y categoría
  create: async (idProducto, idCategoria) => {
    const [result] = await db.execute(
      'INSERT INTO producto_categoria (idProducto, idCategoria) VALUES (?, ?)',
      [idProducto, idCategoria]
    );
    return {
      idProducto,
      idCategoria
    };
  },

  // Eliminar una relación entre producto y categoría
  delete: async (idProducto, idCategoria) => {
    const [result] = await db.execute(
      'DELETE FROM producto_categoria WHERE idProducto = ? AND idCategoria = ?',
      [idProducto, idCategoria]
    );
    return result.affectedRows > 0;
  },
};

export default ProductoCategoria;