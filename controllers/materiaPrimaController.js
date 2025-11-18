const materiaPrimaService = require("../services/materiaPrimaService");

const insertMateriaPrima = async (req, res) => {
  try {
    await materiaPrimaService.crearIngrediente(req.body);
    res.status(201).json({ message: "Ingrediente insertado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllIngredientes = async (req, res) => {
  try {
    const ingredientes = await materiaPrimaService.listarIngredientes();
    res.status(200).json(ingredientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIngredienteById = async (req, res) => {
  try {
    const ingrediente = await materiaPrimaService.obtenerIngrediente(req.params.id);
    res.status(200).json(ingrediente);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateIngrediente = async (req, res) => {
  try {
    await materiaPrimaService.actualizarIngrediente(req.params.id, req.body);
    res.status(200).json({ message: "Ingrediente actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteIngrediente = async (req, res) => {
  try {
    await materiaPrimaService.eliminarIngrediente(req.params.id);
    res.status(200).json({ message: "Ingrediente eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  insertMateriaPrima,
  getAllIngredientes,
  getIngredienteById,
  updateIngrediente,
  deleteIngrediente
};
