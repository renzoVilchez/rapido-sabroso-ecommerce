// controllers/productoController.js
import Producto from '../models/productoModel.js';

// Obtener todos los productos
const getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.getAll();
        res.status(200).json(productos);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener productos', error: err });
    }
};

// Obtener un producto por ID
const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.getById(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el producto', error: err });
    }
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
    const {
        nombreProducto,
        descripcionProducto,
        precioProducto,
        imagenProducto,
        stockProducto,
        idTipoProducto
    } = req.body;

    try {
        const newProducto = await Producto.create(
            nombreProducto,
            descripcionProducto,
            precioProducto,
            imagenProducto,
            stockProducto,
            idTipoProducto
        );
        res.status(201).json(newProducto);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el producto', error: err });
    }
};

// Actualizar un producto
const updateProducto = async (req, res) => {
    const { id } = req.params;
    const {
        nombreProducto,
        descripcionProducto,
        precioProducto,
        imagenProducto,
        stockProducto,
        idTipoProducto
    } = req.body;

    try {
        const updatedProducto = await Producto.update(
            id,
            nombreProducto,
            descripcionProducto,
            precioProducto,
            imagenProducto,
            stockProducto,
            idTipoProducto
        );

        if (!updatedProducto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(updatedProducto);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: err });
    }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProducto = await Producto.delete(id);
        if (!deletedProducto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: err });
    }
};

export default {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
};