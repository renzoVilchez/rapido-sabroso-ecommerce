import productModel from '../models/productModel.js';

const getAll = async (req, res) => {
  try {
    const products = await productModel.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};

export default {
  getAll,
};