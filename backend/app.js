import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import productoRoutes from './routes/productoRoutes.js';
import productoCategoriaRoutes from './routes/productoCategoriaRoutes.js';
import tipoProductoRoutes from './routes/tipoProductoRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import comprobanteRoutes from './routes/comprobanteRoutes.js';
import detallePedidoRoutes from './routes/detallePedidoRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import metodoPagoRoutes from './routes/metodoPagoRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

import path from 'path';
const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/api/productos', productoRoutes);
app.use('/api/producto-categorias', productoCategoriaRoutes);
app.use('/api/tipos-producto', tipoProductoRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/comprobantes', comprobanteRoutes);
app.use('/api/detalles-pedido', detallePedidoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/metodos-pago', metodoPagoRoutes);
app.use('/api/menus', menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});