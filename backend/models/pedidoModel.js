import db from './db.js';

const Pedido = {
  // Obtener todos los pedidos con JOINs
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT 
        p.id_pedido,
        c.nombre AS cliente,
        mp.nombre AS metodo_pago,
        p.fecha,
        p.subtotal,
        p.igv,
        p.descuento,
        p.total,
        p.direccion_entrega,
        p.metodo_envio,
        p.notas,
        p.puntos_usados
      FROM pedido p
      JOIN cliente c ON p.id_cliente = c.id_cliente
      JOIN metodo_pago mp ON p.id_metodo_pago = mp.id_metodo_pago
      ORDER BY p.fecha DESC
    `);
    return rows;
  },

  // Obtener un pedido por ID con JOINs
  getById: async (id) => {
    const [rows] = await db.execute(`
      SELECT 
        p.id_pedido,
        c.nombre AS cliente,
        mp.nombre AS metodo_pago,
        p.fecha,
        p.subtotal,
        p.igv,
        p.descuento,
        p.total,
        p.direccion_entrega,
        p.metodo_envio,
        p.notas,
        p.puntos_usados
      FROM pedido p
      JOIN cliente c ON p.id_cliente = c.id_cliente
      JOIN metodo_pago mp ON p.id_metodo_pago = mp.id_metodo_pago
      WHERE p.id_pedido = ?
    `, [id]);
    return rows[0];
  },

  create: async (pedidoData) => {
    const {
      id_cliente,
      id_metodo_pago,
      direccion_entrega = null,
      metodo_envio = null,
      notas = null,
      descuento = 0,
      puntos_usados = 0,
      productos = [],
      menus = [],
      tipo_comprobante = 'boleta',
      dni = null,
      ruc = null,
      razon_social = null,
      direccion_fiscal = null
    } = pedidoData;

    let subtotal = 0;

    for (const item of productos) {
      subtotal += item.precio * item.cantidad;
    }

    for (const menu of menus) {
      subtotal += menu.precio * menu.cantidad;
    }

    const total_con_descuento = Math.max(0, subtotal - descuento);
    const igv = +(total_con_descuento * 18 / 118).toFixed(2);
    const total = +total_con_descuento.toFixed(2);

    try {
      const [pedidoResult] = await db.execute(`
      INSERT INTO pedido (
        id_cliente, id_metodo_pago, subtotal, igv, descuento, total,
        direccion_entrega, metodo_envio, notas, puntos_usados
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        id_cliente,
        id_metodo_pago,
        subtotal,
        igv,
        descuento,
        total,
        direccion_entrega,
        metodo_envio,
        notas,
        puntos_usados
      ]);

      const id_pedido = pedidoResult.insertId;

      for (const item of productos) {
        const [productoExistente] = await db.execute(
          'SELECT id_producto FROM producto WHERE id_producto = ?',
          [item.id_producto]
        );
        if (productoExistente.length === 0) {
          throw new Error(`Producto con ID ${item.id_producto} no existe`);
        }

        const subtotalItem = +(item.precio * item.cantidad).toFixed(2);
        const igvItem = +(subtotalItem * 18 / 118).toFixed(2);

        await db.execute(`
        INSERT INTO detalle_pedido (
          id_pedido, id_producto, cantidad, precio, subtotal, igv
        ) VALUES (?, ?, ?, ?, ?, ?)
      `, [
          id_pedido,
          item.id_producto,
          item.cantidad,
          item.precio,
          subtotalItem,
          igvItem
        ]);
      }

      for (const menu of menus) {
        const subtotalMenu = +(menu.precio * menu.cantidad).toFixed(2);
        const igvMenu = +(subtotalMenu * 18 / 118).toFixed(2);

        await db.execute(`
        INSERT INTO detalle_pedido (
          id_pedido, id_menu, cantidad, precio, subtotal, igv
        ) VALUES (?, ?, ?, ?, ?, ?)
      `, [
          id_pedido,
          menu.id_menu,
          menu.cantidad,
          menu.precio,
          subtotalMenu,
          igvMenu
        ]);
      }

      const [comprobanteCountRows] = await db.execute(`
      SELECT COUNT(*) AS count FROM comprobante WHERE tipo = ?
    `, [tipo_comprobante]);

      const correlativo = comprobanteCountRows[0].count + 1;
      const serie = tipo_comprobante === 'boleta' ? 'B001' : 'F001';

      await db.execute(`
      INSERT INTO comprobante (
        id_pedido, tipo, serie, correlativo, dni, ruc, razon_social,
        direccion, direccion_fiscal
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        id_pedido,
        tipo_comprobante,
        serie,
        correlativo,
        dni,
        ruc,
        razon_social,
        direccion_entrega,
        direccion_fiscal
      ]);

      return {
        id_pedido,
        subtotal,
        igv,
        descuento,
        total,
        comprobante: {
          tipo: tipo_comprobante,
          serie,
          correlativo
        }
      };
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      throw new Error('No se pudo registrar el pedido');
    }
  },

  // Actualizar un pedido
  update: async (id_pedido, pedidoData) => {
    const {
      id_cliente,
      id_metodo_pago,
      direccion_entrega,
      metodo_envio,
      notas,
      descuento = 0,
      puntos_usados = 0,
      productos = [],
      menus = []
    } = pedidoData;

    let subtotal = 0;
    for (const p of productos) {
      subtotal += p.precio * p.cantidad;
    }
    for (const m of menus) {
      subtotal += m.precio * m.cantidad;
    }

    const total_con_descuento = Math.max(0, subtotal - descuento);
    const igv = +(total_con_descuento * 18 / 118).toFixed(2);
    const total = +total_con_descuento.toFixed(2);

    try {
      const [result] = await db.execute(`
      UPDATE pedido SET
        id_cliente = ?, id_metodo_pago = ?, subtotal = ?, igv = ?, descuento = ?, total = ?,
        direccion_entrega = ?, metodo_envio = ?, notas = ?, puntos_usados = ?
      WHERE id_pedido = ?
    `, [
        id_cliente, id_metodo_pago, subtotal, igv, descuento, total,
        direccion_entrega, metodo_envio, notas, puntos_usados,
        id_pedido
      ]);

      if (result.affectedRows === 0) return null;

      await db.execute('DELETE FROM detalle_pedido WHERE id_pedido = ?', [id_pedido]);

      for (const producto of productos) {
        const subtotalProd = +(producto.precio * producto.cantidad).toFixed(2);
        const igvProd = +(subtotalProd * 18 / 118).toFixed(2);

        await db.execute(`
        INSERT INTO detalle_pedido (
          id_pedido, id_producto, cantidad, precio, subtotal, igv
        ) VALUES (?, ?, ?, ?, ?, ?)
      `, [
          id_pedido,
          producto.id_producto,
          producto.cantidad,
          producto.precio,
          subtotalProd,
          igvProd
        ]);
      }

      for (const menu of menus) {
        const subtotalMenu = +(menu.precio * menu.cantidad).toFixed(2);
        const igvMenu = +(subtotalMenu * 18 / 118).toFixed(2);

        await db.execute(`
        INSERT INTO detalle_pedido (
          id_pedido, id_menu, cantidad, precio, subtotal, igv
        ) VALUES (?, ?, ?, ?, ?, ?)
      `, [
          id_pedido,
          menu.id_menu,
          menu.cantidad,
          menu.precio,
          subtotalMenu,
          igvMenu
        ]);
      }

      return {
        id_pedido,
        id_cliente,
        subtotal,
        igv,
        descuento,
        total
      };
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
      throw new Error('No se pudo actualizar el pedido');
    }
  },

  // Eliminar un pedido
  delete: async (id_pedido) => {
    try {
      await db.execute('DELETE FROM comprobante WHERE id_pedido = ?', [id_pedido]);
      await db.execute('DELETE FROM detalle_pedido WHERE id_pedido = ?', [id_pedido]);

      const [result] = await db.execute('DELETE FROM pedido WHERE id_pedido = ?', [id_pedido]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
      throw new Error('No se pudo eliminar el pedido');
    }
  },
};

export default Pedido;