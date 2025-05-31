import db from './db.js';

const Comprobante = {
  // Obtener todos los comprobantes con datos del pedido
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT 
        c.id_comprobante,
        c.id_pedido,
        c.tipo,
        c.serie,
        c.correlativo,
        c.dni,
        c.ruc,
        c.razon_social,
        c.direccion,
        c.direccion_fiscal,
        c.fecha,
        p.total AS total_pedido
      FROM comprobante c
      LEFT JOIN pedido p ON c.id_pedido = p.id_pedido
      ORDER BY c.fecha DESC
    `);
    return rows;
  },

  // Obtener comprobante por ID de pedido
  getByPedidoId: async (idPedido) => {
    // Obtener comprobante con datos de cliente y pedido
    const [rows] = await db.execute(`
    SELECT 
      c.id_comprobante,
      c.tipo,
      c.serie,
      c.correlativo,
      c.fecha,
      p.subtotal,
      p.igv,
      p.descuento,
      p.total,
      cl.nombre,
      cl.apellidos,
      cl.tipo_documento,
      cl.dni,
      cl.ruc,
      cl.razon_social,
      cl.direccion_fiscal,
      cl.direccion AS direccion_cliente
    FROM comprobante c
    JOIN pedido p ON p.id_pedido = c.id_pedido
    JOIN cliente cl ON cl.id_cliente = p.id_cliente
    WHERE c.id_pedido = ?
  `, [idPedido]);

    if (rows.length === 0) return null;

    const comprobante = rows[0];

    // Obtener productos individuales
    const [productos] = await db.execute(`
    SELECT 
      dp.id_detalle_pedido,
      dp.id_producto,
      pr.nombre,
      dp.cantidad,
      dp.precio,
      dp.subtotal,
      dp.igv
    FROM detalle_pedido dp
    LEFT JOIN producto pr ON pr.id_producto = dp.id_producto
    WHERE dp.id_pedido = ? AND dp.id_producto IS NOT NULL
  `, [idPedido]);

    // Obtener menús
    const [menus] = await db.execute(`
    SELECT 
      dp.id_detalle_pedido,
      dp.id_menu,
      m.nombre,
      dp.cantidad,
      dp.precio,
      dp.subtotal,
      dp.igv
    FROM detalle_pedido dp
    LEFT JOIN menu m ON m.id_menu = dp.id_menu
    WHERE dp.id_pedido = ? AND dp.id_menu IS NOT NULL
  `, [idPedido]);

    // Unificar en un solo array
    const items = [
      ...productos.map(p => ({
        tipo: 'producto',
        id: p.id_producto,
        nombre: p.nombre,
        cantidad: p.cantidad,
        precioUnit: p.precio,
        subtotal: p.subtotal,
        igv: p.igv
      })),
      ...menus.map(m => ({
        tipo: 'menu',
        id: m.id_menu,
        nombre: m.nombre,
        cantidad: m.cantidad,
        precioUnit: m.precio,
        subtotal: m.subtotal,
        igv: m.igv
      }))
    ];

    // Armar objeto de respuesta completo
    return {
      idComprobante: comprobante.id_comprobante,
      tipoComprobante: comprobante.tipo,
      numeroSerie: `${comprobante.serie}-${comprobante.correlativo.toString().padStart(8, '0')}`,
      fechaEmision: comprobante.fecha,
      cliente: {
        nombre: `${comprobante.nombre} ${comprobante.apellidos}`,
        tipoDocumento: comprobante.tipo_documento,
        dni: comprobante.dni,
        ruc: comprobante.ruc,
        razonSocial: comprobante.razon_social,
        direccionFiscal: comprobante.direccion_fiscal || comprobante.direccion_cliente
      },
      productos: items,
      totales: {
        subtotal: parseFloat(comprobante.subtotal),
        igv: parseFloat(comprobante.igv),
        descuento: parseFloat(comprobante.descuento),
        total: parseFloat(comprobante.total)
      }
    };
  },

  // Obtener comprobantes por ID de cliente
  getByClienteId: async (idCliente) => {
    const [rows] = await db.execute(`
      SELECT 
        c.id_comprobante,
        c.id_pedido,
        c.tipo,
        c.serie,
        c.correlativo,
        c.dni,
        c.ruc,
        c.razon_social,
        c.direccion,
        c.direccion_fiscal,
        c.fecha,
        p.total AS total_pedido
      FROM comprobante c
      JOIN pedido p ON c.id_pedido = p.id_pedido
      JOIN cliente cl ON cl.id_cliente = p.id_cliente
      WHERE cl.id_cliente = ?
      ORDER BY c.fecha DESC
    `, [idCliente]);

    return rows;
  },

  // Crear un comprobante nuevo con correlativo automático
  create: async (data) => {
    const {
      id_pedido,
      tipo,
      serie,
      dni,
      ruc,
      razon_social,
      direccion,
      direccion_fiscal,
    } = data;

    // Convertir undefined a null para evitar error en la consulta
    const dniVal = dni === undefined ? null : dni;
    const rucVal = ruc === undefined ? null : ruc;
    const razonSocialVal = razon_social === undefined ? null : razon_social;
    const direccionVal = direccion === undefined ? null : direccion;
    const direccionFiscalVal = direccion_fiscal === undefined ? null : direccion_fiscal;

    // Obtener último correlativo para el tipo y serie dado
    const [rows] = await db.execute(`
    SELECT correlativo FROM comprobante
    WHERE tipo = ? AND serie = ?
    ORDER BY correlativo DESC
    LIMIT 1
  `, [tipo, serie]);

    // Calcular nuevo correlativo
    const nuevoCorrelativo = rows.length === 0 ? 1 : rows[0].correlativo + 1;

    // Insertar nuevo comprobante con el correlativo calculado
    const [result] = await db.execute(`
    INSERT INTO comprobante (
      id_pedido, tipo, serie, correlativo,
      dni, ruc, razon_social, direccion, direccion_fiscal
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
      id_pedido,
      tipo,
      serie,
      nuevoCorrelativo,
      dniVal,
      rucVal,
      razonSocialVal,
      direccionVal,
      direccionFiscalVal
    ]);

    return {
      id_comprobante: result.insertId,
      ...data,
      correlativo: nuevoCorrelativo
    };
  },


  // Actualizar comprobante por ID
  update: async (id, data) => {
    const {
      id_pedido,
      tipo,
      serie,
      correlativo,
      dni,
      ruc,
      razon_social,
      direccion,
      direccion_fiscal,
    } = data;

    const [result] = await db.execute(`
      UPDATE comprobante SET
        id_pedido = ?,
        tipo = ?,
        serie = ?,
        correlativo = ?,
        dni = ?,
        ruc = ?,
        razon_social = ?,
        direccion = ?,
        direccion_fiscal = ?
      WHERE id_comprobante = ?
    `, [
      id_pedido,
      tipo,
      serie,
      correlativo,
      dni,
      ruc,
      razon_social,
      direccion,
      direccion_fiscal,
      id
    ]);

    return result.affectedRows > 0;
  },

  // Eliminar comprobante por ID
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM comprobante WHERE id_comprobante = ?', [id]);
    return result.affectedRows > 0;
  }
};

export default Comprobante;