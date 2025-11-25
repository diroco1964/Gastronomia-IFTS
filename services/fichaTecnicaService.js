const { 
  insertRecord, 
  checkRecordExists, 
  getAllRecords, 
  getRecordById, 
  updateRecord, 
  deleteRecord 
} = require("../mocks");

// Crear receta (ficha técnica)
async function crearReceta(data) {
  const {
    nombre_receta,
    descripcion,
    codigo,
    categoria,
    utensilios,
    factor_correccion,
    proporcion,
    presentacion,
    costo_porcion,
    notas
  } = data;

  if (!nombre_receta || !codigo) {
    throw new Error("Los campos 'nombre_receta' y 'codigo' son obligatorios.");
  }

  const exists = await checkRecordExists("FichaTecnica", "codigo", codigo);
  if (exists) throw new Error("Ya existe una receta con ese código.");

  const receta = {
    nombre_receta,
    descripcion: descripcion || null,
    codigo,
    categoria: categoria || null,
    utensilios: utensilios || null,
    factor_correccion: factor_correccion || 1,
    proporcion: proporcion || 1,
    presentacion: presentacion || null,
    costo_porcion: costo_porcion || 0,
    notas: notas || null
  };

  return insertRecord("FichaTecnica", receta);
}

// Listar todas las recetas
async function listarRecetas() {
  return getAllRecords("FichaTecnica");
}

// Obtener una receta por ID
async function obtenerReceta(id) {
  const receta = await getRecordById("FichaTecnica", "id", id);
  if (!receta) throw new Error("Receta no encontrada");
  return receta;
}

// Actualizar receta
async function actualizarReceta(id, data) {
  const exists = await checkRecordExists("FichaTecnica", "id", id);
  if (!exists) throw new Error("Receta no encontrada.");

  return updateRecord("FichaTecnica", data, "id", id);
}

// Eliminar receta
async function eliminarReceta(id) {
  const exists = await checkRecordExists("FichaTecnica", "id", id);
  if (!exists) throw new Error("Receta no encontrada.");

  // eliminar ingredientes asociados primero
  await deleteRecord("receta_ingrediente", "id_receta", id);
  
  return deleteRecord("FichaTecnica", "id", id);
}

module.exports = {
  crearReceta,
  listarRecetas,
  obtenerReceta,
  actualizarReceta,
  eliminarReceta
};
