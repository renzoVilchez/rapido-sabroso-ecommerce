import db from './db.js';

const Cliente = {
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT 
        cliente.idCliente,
        cliente.nombreCliente,
        cliente.correoCliente,
        cliente.passwordCliente,
        cliente.puntosCliente,
        cliente.dniCliente,
        cliente.rucCliente,
        cliente.razonSocialCliente,
        cliente.direccionFiscalCliente,
        direccion.direccion AS direccionEnvio
      FROM cliente
      LEFT JOIN direccion ON cliente.idCliente = direccion.idCliente
    `);

    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute(`
      SELECT 
        cliente.idCliente,
        cliente.nombreCliente,
        cliente.correoCliente,
        cliente.passwordCliente,
        cliente.puntosCliente,
        cliente.dniCliente,
        cliente.rucCliente,
        cliente.razonSocialCliente,
        cliente.direccionFiscalCliente,
        direccion.direccion AS direccionEnvio
      FROM cliente
      LEFT JOIN direccion ON cliente.idCliente = direccion.idCliente
      WHERE cliente.idCliente = ?
    `, [id]);

    return rows[0];
  },

  getByCorreo: async (correo) => {
    const [rows] = await db.execute(`
      SELECT 
        cliente.idCliente,
        cliente.nombreCliente,
        cliente.correoCliente,
        cliente.passwordCliente,
        cliente.puntosCliente,
        cliente.dniCliente,
        cliente.rucCliente,
        cliente.razonSocialCliente,
        cliente.direccionFiscalCliente,
        direccion.direccion AS direccionEnvio
      FROM cliente
      LEFT JOIN direccion ON cliente.idCliente = direccion.idCliente
      WHERE cliente.correoCliente = ?
    `, [correo]);

    return rows[0];
  },

  // Método de login
  login: async (correo, password) => {
    const cliente = await Cliente.getByCorreo(correo);

    if (!cliente) {
      return null;  // Cliente no encontrado
    }

    // Comparar contraseñas en texto claro
    if (cliente.passwordCliente !== password) {
      return null;  // Contraseña incorrecta
    }

    // Si la contraseña es correcta, devolver los datos del cliente
    return {
      idCliente: cliente.idCliente,
      nombreCliente: cliente.nombreCliente,
      correoCliente: cliente.correoCliente,
      puntosCliente: cliente.puntosCliente,
      razonSocialCliente: cliente.razonSocialCliente,
      direccionFiscalCliente: cliente.direccionFiscalCliente,
      direccionEnvio: cliente.direccionEnvio,
    };
  },

  create: async ({
    nombreCliente,
    correoCliente,
    passwordCliente,
    tipoPersona,
    dniCliente = null,
    rucCliente = null,
    razonSocialCliente = null,
    direccionFiscalCliente = null,
    direccionEnvio,  // Nueva propiedad para la dirección de envío
  }) => {
    const documento = tipoPersona === 'juridica' ? rucCliente : dniCliente;
    const dniRucField = tipoPersona === 'juridica' ? 'rucCliente' : 'dniCliente';

    // Insertar cliente
    const [resultCliente] = await db.execute(
      `INSERT INTO cliente 
        (nombreCliente, correoCliente, passwordCliente, puntosCliente, razonSocialCliente, direccionFiscalCliente, ${dniRucField})
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nombreCliente,
        correoCliente,
        passwordCliente,
        0.00,
        razonSocialCliente,
        direccionFiscalCliente,
        documento
      ]
    );

    const idCliente = resultCliente.insertId;

    // Insertar dirección de envío
    const [resultDireccion] = await db.execute(
      `INSERT INTO direccion 
        (idCliente, direccion) 
       VALUES (?, ?)`,
      [idCliente, direccionEnvio]
    );

    return {
      idCliente,
      nombreCliente,
      correoCliente,
      puntosCliente: 0.00,
      razonSocialCliente,
      direccionFiscalCliente,
      [dniRucField]: documento,
      direccionEnvio,
    };
  },

  update: async (id, { nombre, correo, tipoPersona, documento, razonSocial, direccionFiscal, direccionEnvio }) => {
    let dniRucField = tipoPersona === 'juridica' ? 'rucCliente' : 'dniCliente';

    // Actualizar cliente
    const [resultCliente] = await db.execute(
      'UPDATE cliente SET nombreCliente = ?, correoCliente = ?, razonSocialCliente = ?, direccionFiscalCliente = ?, ' + dniRucField + ' = ? WHERE idCliente = ?',
      [nombre, correo, razonSocial, direccionFiscal, documento, id]
    );

    // Actualizar dirección de envío
    const [resultDireccion] = await db.execute(
      'UPDATE direccion SET direccion = ? WHERE idCliente = ?',
      [direccionEnvio, id]
    );

    return resultCliente.affectedRows > 0 || resultDireccion.affectedRows > 0
      ? { idCliente: id, nombre, correo, razonSocial, direccionFiscal, direccionEnvio, documento }
      : null;
  },

  updatePuntos: async (idCliente, puntos) => {
    const [result] = await db.execute(
      'UPDATE cliente SET puntosCliente = ? WHERE idCliente = ?',
      [puntos, idCliente]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    // Primero, eliminar direcciones asociadas al cliente
    await db.execute('DELETE FROM direccion WHERE idCliente = ?', [id]);

    // Luego eliminar al cliente
    const [result] = await db.execute('DELETE FROM cliente WHERE idCliente = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default Cliente;