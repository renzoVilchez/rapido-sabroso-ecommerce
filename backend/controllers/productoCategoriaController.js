import ProductoCategoria from '../models/productocategoriaModel.js';

const productoCategoriaController = {
  // Obtener todas las relaciones entre productos y categorías
  getAll: async (req, res) => {
    try {
      const relaciones = await ProductoCategoria.getAll();
      res.json(relaciones);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener relaciones producto-categoría' });
    }
  },

  // Obtener una relación entre producto y categoría por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const relacion = await ProductoCategoria.getById(id);
      if (relacion) {
        res.json(relacion);
      } else {
        res.status(404).json({ error: 'Relación producto-categoría no encontrada' });
      }
    } catch {
      res.status(500).json({ error: 'Error al obtener relación producto-categoría' });
    }
  },

  // Obtener categorías agrupadas por tipo sin agrupar los datos
  getCategoriasPorTipo: async (req, res) => {
    try {
      const categoriasPorTipo = await ProductoCategoria.getCategoriasPorTipo();
      res.json(categoriasPorTipo);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener categorías por tipo' });
    }
  },  

  // Crear una nueva relación entre producto y categoría
  create: async (req, res) => {
    try {
      const { idProducto, idCategoria } = req.body;
      const nuevaRelacion = await ProductoCategoria.create(idProducto, idCategoria);
      res.status(201).json(nuevaRelacion);
    } catch {
      res.status(500).json({ error: 'Error al crear relación producto-categoría' });
    }
  },

  // Eliminar una relación entre producto y categoría
  delete: async (req, res) => {
    try {
      const { idProducto, idCategoria } = req.params;
      const eliminado = await ProductoCategoria.delete(idProducto, idCategoria);
      if (eliminado) {
        res.json({ mensaje: 'Relación producto-categoría eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Relación producto-categoría no encontrada' });
      }
    } catch {
      res.status(500).json({ error: 'Error al eliminar relación producto-categoría' });
    }
  },
};

export default productoCategoriaController;