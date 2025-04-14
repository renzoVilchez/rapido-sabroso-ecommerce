import toppingModel from '../models/toppingModel.js';

export const getToppings = async (req, res) => {
  const toppings = await toppingModel.getAll();
  res.json(toppings);
};

export const getTopping = async (req, res) => {
  const topping = await toppingModel.getById(req.params.id);
  if (topping) res.json(topping);
  else res.status(404).json({ message: 'Topping no encontrado' });
};

export const createTopping = async (req, res) => {
  const newTopping = await toppingModel.create(req.body);
  res.status(201).json(newTopping);
};

export const deleteTopping = async (req, res) => {
  await toppingModel.remove(req.params.id);
  res.status(204).end();
};