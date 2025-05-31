import db from './db.js';
import bcrypt from 'bcrypt';

const Cliente = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM cliente');
    return rows;
  },

  getById: async (id_cliente) => {
    const [rows] = await db.execute('SELECT * FROM cliente WHERE id_cliente = ?', [id_cliente]);
    return rows[0];
  },

  getByCorreo: async (email) => {
    const [rows] = await db.execute('SELECT * FROM cliente WHERE email = ?', [email]);
    return rows[0];
  },

  login: async (email, password) => {
    const cliente = await Cliente.getByCorreo(email);
    if (!cliente) return null;

    const match = await bcrypt.compare(password, cliente.password);
    if (!match) return null;

    const { password: _, ...safeData } = cliente;
    return safeData;
  },

  create: async ({
    nombre,
    apellidos,
    email,
    password, // se espera ya hasheado
    tipo_documento = null,
    dni = null,
    ruc = null,
    razon_social = null,
    direccion = null,
    direccion_fiscal = null
  }) => {
    const [result] = await db.execute(`
      INSERT INTO cliente 
        (nombre, apellidos, email, password, tipo_documento, dni, ruc, razon_social, direccion, direccion_fiscal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellidos, email, password, tipo_documento, dni, ruc, razon_social, direccion, direccion_fiscal]
    );

    const newCliente = await Cliente.getById(result.insertId);
    const { password: _, ...safeData } = newCliente;
    return safeData;
  },

  update: async (id_cliente, data) => {
    const {
      nombre,
      apellidos,
      email,
      tipo_documento,
      dni,
      ruc,
      razon_social,
      direccion,
      direccion_fiscal,
      password
    } = data;

    const campos = [
      'nombre = ?', 'apellidos = ?', 'email = ?', 'tipo_documento = ?',
      'dni = ?', 'ruc = ?', 'razon_social = ?', 'direccion = ?', 'direccion_fiscal = ?'
    ];
    const valores = [nombre, apellidos, email, tipo_documento, dni, ruc, razon_social, direccion, direccion_fiscal];

    if (password) {
      campos.push('password = ?');
      valores.push(password);
    }

    valores.push(id_cliente);

    await db.execute(`
    UPDATE cliente SET ${campos.join(', ')} WHERE id_cliente = ?
  `, valores);

    const updatedCliente = await Cliente.getById(id_cliente);
    const { password: _, ...safeData } = updatedCliente;
    return safeData;
  },

  updatePuntos: async (id_cliente, puntos) => {
    const [result] = await db.execute(
      'UPDATE cliente SET puntos = ? WHERE id_cliente = ?',
      [puntos, id_cliente]
    );
    return result.affectedRows > 0;
  },

  delete: async (id_cliente) => {
    const [result] = await db.execute('DELETE FROM cliente WHERE id_cliente = ?', [id_cliente]);
    return result.affectedRows > 0;
  },
};

export default Cliente;