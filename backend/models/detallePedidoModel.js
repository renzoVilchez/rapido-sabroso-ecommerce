import db from './db.js';

const DetallePedido = {
  // Obtener todos los detalles de un pedido
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM detalle_pedido');
    return rows;
  },

  // Obtener los detalles de un pedido por ID
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM detalle_pedido WHERE idDetallePedido = ?', [id]);
    return rows[0];
  },

  create: async (idPedido, idProducto, cantidadDetallePedido, precioUnitarioDetallePedido) => {
    const subtotalDetallePedido = cantidadDetallePedido * precioUnitarioDetallePedido; // Calculamos el subtotal

    const [result] = await db.execute(
      `INSERT INTO detalle_pedido 
        (idPedido, idProducto, cantidadDetallePedido, precioUnitarioDetallePedido, subtotalDetallePedido) 
        VALUES (?, ?, ?, ?, ?)`,
      [idPedido, idProducto, cantidadDetallePedido, precioUnitarioDetallePedido, subtotalDetallePedido]
    );

    return {
      idDetallePedido: result.insertId,
      idPedido,
      idProducto,
      cantidadDetallePedido,
      precioUnitarioDetallePedido,
      subtotalDetallePedido
    };
  },

  // Actualizar un detalle de pedido
  update: async (id, idPedido, idProducto, cantidadDetallePedido, precioUnitarioDetallePedido) => {
    const subtotalDetallePedido = cantidadDetallePedido * precioUnitarioDetallePedido; // Calculamos el subtotal
    const [result] = await db.execute(
      'UPDATE detalle_pedido SET idPedido = ?, idProducto = ?, cantidadDetallePedido = ?, precioUnitarioDetallePedido = ?, subtotalDetallePedido = ? WHERE idDetallePedido = ?',
      [idPedido, idProducto, cantidadDetallePedido, precioUnitarioDetallePedido, subtotalDetallePedido, id]
    );
    return result.affectedRows > 0
      ? { idDetallePedido: id, idPedido, idProducto, cantidadDetallePedido, precioUnitarioDetallePedido, subtotalDetallePedido }
      : null;
  },

  // Eliminar un detalle de pedido
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM detalle_pedido WHERE idDetallePedido = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default DetallePedido;