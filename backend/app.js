import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import toppingRoutes from './routes/toppingRoutes.js';

import path from 'path';
const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/api/users', userRoutes);
app.use('/api/hamburguesas', productRoutes);
app.use('/api/toppings', toppingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});