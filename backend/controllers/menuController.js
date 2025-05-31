import menu from '../models/menuModel.js';

const menuController = {
  // GET /menus
  async getAll(req, res) {
    try {
      const menus = await menu.getAll();
      res.json(menus);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los menús' });
    }
  },

  // POST /menus
  async create(req, res) {
    try {
      const nuevoMenu = await menu.create(req.body);
      res.status(201).json(nuevoMenu);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el menú' });
    }
  },

  // PUT /menus/:id
  async update(req, res) {
    try {
      const updated = await menu.update(req.params.id, req.body);
      if (updated) {
        res.json({ mensaje: 'Menú actualizado correctamente' });
      } else {
        res.status(404).json({ error: 'Menú no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el menú' });
    }
  },

  // DELETE /menus/:id
  async delete(req, res) {
    try {
      const deleted = await menu.delete(req.params.id);
      if (deleted) {
        res.json({ mensaje: 'Menú eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Menú no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el menú' });
    }
  }
};

export default menuController;