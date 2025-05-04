import db from './db.js';

const Pedido = {
  // Obtener todos los pedidos
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM pedido');
    return rows;
  },

  // Obtener un pedido por ID
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM pedido WHERE idPedido = ?', [id]);
    return rows[0];
  },

  // Crear un nuevo pedido
  create: async (idCliente, fechaPedido, productos, puntosGanados = 0, puntosUsados = 0) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Calcular el total del pedido
      let totalPedido = 0;
      for (const producto of productos) {
        totalPedido += producto.precioProducto * producto.cantidad;
      }

      // Aplicar puntos usados
      totalPedido = Math.max(0, totalPedido - puntosUsados);

      // Insertar en tabla pedido
      const [pedidoResult] = await connection.execute(
        'INSERT INTO pedido (idCliente, fechaPedido, totalPedido, puntosGanados, puntosUsados) VALUES (?, ?, ?, ?, ?)',
        [idCliente, fechaPedido, totalPedido, puntosGanados, puntosUsados]
      );
      const idPedido = pedidoResult.insertId;

      // Insertar en tabla detalle_pedido
      if (productos && productos.length > 0) {
        for (const producto of productos) {
          const cantidadDetallePedido = producto.cantidad;
          const precioUnitarioDetallePedido = producto.precioProducto;
          const subtotalDetallePedido = cantidadDetallePedido * precioUnitarioDetallePedido;

          await connection.execute(
            `INSERT INTO detalle_pedido (idPedido, idProducto, cantidadDetallePedido, precioUnitarioDetallePedido, subtotalDetallePedido)
             VALUES (?, ?, ?, ?, ?)`,
            [idPedido, producto.idProducto, cantidadDetallePedido, precioUnitarioDetallePedido, subtotalDetallePedido]
          );
        }
      }

      await connection.commit();

      return {
        idPedido,
        idCliente,
        fechaPedido,
        totalPedido,
        puntosGanados,
        puntosUsados
      };
    } catch (error) {
      await connection.rollback();
      console.error('Error al crear pedido:', error);
      throw new Error('Error al crear el pedido');
    } finally {
      connection.release();
    }
  },

  // Actualizar un pedido
  update: async (id, idCliente, fechaPedido, totalPedido, puntosGanados, puntosUsados) => {
    const [result] = await db.execute(
      'UPDATE pedido SET idCliente = ?, fechaPedido = ?, totalPedido = ?, puntosGanados = ?, puntosUsados = ? WHERE idPedido = ?',
      [idCliente, fechaPedido, totalPedido, puntosGanados, puntosUsados, id]
    );
    return result.affectedRows > 0
      ? { idPedido: id, idCliente, fechaPedido, totalPedido, puntosGanados, puntosUsados }
      : null;
  },

  // Eliminar un pedido
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM pedido WHERE idPedido = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default Pedido;