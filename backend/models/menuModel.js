import db from './db.js';

const menu = {
    // Obtener todos los menús con sus productos
    async getAll() {
        const [rows] = await db.query(`
      SELECT 
        m.*, 
        mp.id_producto, 
        mp.cantidad,
        p.nombre AS nombre_producto,
        p.descripcion AS descripcion_producto,
        p.imagen AS imagen_producto,
        p.precio AS precio_producto,
        tp.nombre AS tipo_producto,
        c.nombre AS categoria
        FROM menu m
        LEFT JOIN menu_producto mp ON m.id_menu = mp.id_menu
        LEFT JOIN producto p ON mp.id_producto = p.id_producto
        LEFT JOIN tipo_producto tp ON p.id_tipo_producto = tp.id_tipo_producto
        LEFT JOIN categoria c ON tp.id_categoria = c.id_categoria;

    `);

        // Agrupar productos por menú
        const menus = {};
        for (const row of rows) {
            const id = row.id_menu;
            if (!menus[id]) {
                menus[id] = {
                    id_menu: row.id_menu,
                    nombre: row.nombre,
                    descripcion: row.descripcion,
                    imagen: row.imagen,
                    precio: row.precio,
                    tipo_menu: row.tipo_menu,
                    productos: [],
                };
            }

            if (row.id_producto) {
                menus[id].productos.push({
                    id_producto: row.id_producto,
                    nombre: row.nombre_producto,
                    descripcion: row.descripcion_producto,
                    imagen: row.imagen_producto,
                    precio: row.precio_producto,
                    tipo_producto: row.tipo_producto,
                    cantidad: row.cantidad,
                });
            }
        }

        return Object.values(menus);
    },

    // Crear un nuevo menú
    async create({ nombre, descripcion, imagen, precio, tipo_menu }) {
        const [result] = await db.query(
            'INSERT INTO menu (nombre, descripcion, imagen, precio, tipo_menu) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, imagen, precio, tipo_menu]
        );
        return { id: result.insertId };
    },

    // Actualizar un menú existente
    async update(id, { nombre, descripcion, imagen, precio, tipo_menu }) {
        const [result] = await db.query(
            'UPDATE menu SET nombre = ?, descripcion = ?, imagen = ?, precio = ?, tipo_menu = ? WHERE id_menu = ?',
            [nombre, descripcion, imagen, precio, tipo_menu, id]
        );
        return result.affectedRows > 0;
    },

    // Eliminar un menú
    async delete(id) {
        const [result] = await db.query('DELETE FROM menu WHERE id_menu = ?', [id]);
        return result.affectedRows > 0;
    },
};

export default menu;