import Categoria from '../models/categoriaModel.js';

const categoriaController = {
  // Obtener todas las categorías
  getAll: async (req, res) => {
    try {
      const categorias = await Categoria.getAll();
      res.json(categorias);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener categorías', detalle: err.message });
    }
  },

  // Obtener categoría por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categoria.getById(id);
      if (categoria) {
        res.json(categoria);
      } else {
        res.status(404).json({ error: 'Categoría no encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener categoría', detalle: err.message });
    }
  },

  // Crear nueva categoría
  create: async (req, res) => {
    try {
      const { nombre } = req.body;
      const nueva = await Categoria.create(nombre);
      res.status(201).json(nueva);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear categoría', detalle: err.message });
    }
  },

  // Actualizar categoría
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      const actualizada = await Categoria.update(id, nombre);
      if (actualizada) {
        res.json(actualizada);
      } else {
        res.status(404).json({ error: 'Categoría no encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar categoría', detalle: err.message });
    }
  },

  // Eliminar categoría
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminada = await Categoria.delete(id);
      if (eliminada) {
        res.json({ mensaje: 'Categoría eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Categoría no encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar categoría', detalle: err.message });
    }
  },

  // Obtener categorías con tipos
  getConTipos: async (req, res) => {
    try {
      const resultado = await Categoria.getCategoriasConTipos();
      res.json(resultado);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener categorías con tipos', detalle: err.message });
    }
  }
};

export default categoriaController;