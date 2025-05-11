// models/producto.js
import db from './db.js';

const Producto = {
    // Obtener todos los productos
    getAll: async () => {
        const [rows] = await db.execute(`
            SELECT p.idProducto, p.nombreProducto, p.descripcionProducto, p.precioProducto, p.stockProducto, p.imagenProducto , tp.nombreTipoProducto AS tipoProducto, c.nombreCategoria AS categoriaProducto 
            FROM producto p
            JOIN tipo_producto tp ON p.idTipoProducto = tp.idTipoProducto 
            LEFT JOIN producto_categoria pc ON p.idProducto = pc.idProducto 
            LEFT JOIN categoria c ON pc.idCategoria = c.idCategoria;
        `);
        return rows;
    },

    // Obtener un producto por ID
    getById: async (id) => {
        const [rows] = await db.execute(`
            SELECT p.idProducto, p.nombreProducto, p.descripcionProducto, p.precioProducto, p.stockProducto, tp.nombreTipoProducto AS tipoProducto, c.nombreCategoria AS categoriaProducto 
            FROM producto p
            JOIN tipo_producto tp ON p.idTipoProducto = tp.idTipoProducto 
            LEFT JOIN producto_categoria pc ON p.idProducto = pc.idProducto 
            LEFT JOIN categoria c ON pc.idCategoria = c.idCategoria
            WHERE p.idProducto = ?`, [id]);
        return rows[0];
    },

    // Crear un nuevo producto
    create: async (nombreProducto, descripcionProducto, precioProducto, imagenProducto, stockProducto, idTipoProducto) => {
        const [result] = await db.execute(
            'INSERT INTO producto(nombreProducto, descripcionProducto, precioProducto, imagenProducto, stockProducto, idTipoProducto) VALUES(?, ?, ?, ?, ?, ?)',
            [nombreProducto, descripcionProducto, precioProducto, imagenProducto, stockProducto, idTipoProducto]
        );
        return {
            idProducto: result.insertId,
            nombreProducto,
            descripcionProducto,
            precioProducto,
            imagenProducto,
            stockProducto,
            idTipoProducto
        };
    },

    // Actualizar un producto
    update: async (id, nombreProducto, descripcionProducto, precioProducto, imagenProducto, stockProducto, idTipoProducto) => {
        const [result] = await db.execute(
            'UPDATE producto SET nombreProducto = ?, descripcionProducto = ?, precioProducto = ?, imagenProducto = ?, stockProducto = ?, idTipoProducto = ? WHERE idProducto = ?',
            [nombreProducto, descripcionProducto, precioProducto, imagenProducto, stockProducto, idTipoProducto, id]
        );
        return result.affectedRows > 0 ? {
            idProducto: id,
            nombreProducto,
            descripcionProducto,
            precioProducto,
            imagenProducto,
            stockProducto,
            idTipoProducto
        } : null;
    },

    // Eliminar un producto
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM producto WHERE idProducto = ?', [id]);
        return result.affectedRows > 0;
    },
};

export default Producto;