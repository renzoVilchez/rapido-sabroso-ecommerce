import Categoria from '../models/categoriaModel.js';

const categoriaController = {
  getAll: async (req, res) => {
    try {
      const categorias = await Categoria.getAll();
      res.json(categorias);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener categorías' });
    }
  },

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
      res.status(500).json({ error: 'Error al obtener categoría' });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre } = req.body;
      const nueva = await Categoria.create(nombre);
      res.status(201).json(nueva);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear categoría' });
    }
  },

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
      res.status(500).json({ error: 'Error al actualizar categoría' });
    }
  },

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
      res.status(500).json({ error: 'Error al eliminar categoría' });
    }
  },
};

export default categoriaController;