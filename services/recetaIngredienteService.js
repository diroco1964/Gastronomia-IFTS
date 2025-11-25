const { 
  insertRecord, 
  checkRecordExists, 
  getRecordById,
  getAllRecords,
  updateRecord, 
  deleteRecord 
} = require("../utils/sqlFunctions");

// -------------------------------
// VALIDACIONES
// -------------------------------
function validarCantidad(valor, nombreCampo) {
  const numero = parseFloat(valor);
  if (isNaN(numero) || numero <= 0) {
    throw new Error(`El campo '${nombreCampo}' debe ser un número mayor a 0.`);
  }
  return numero;
}

// -------------------------------
// CREAR INGREDIENTE EN RECETA
// -------------------------------
async function agregarIngredienteAReceta(data) {
  const {
    id_receta,
    id_materia_prima,
    cantidad_bruta,
    cantidad_neta,
    unidad_medida
  } = data;

  // Validaciones básicas
  const bruta = validarCantidad(cantidad_bruta, "cantidad_bruta");
  const neta = validarCantidad(cantidad_neta, "cantidad_neta");

  if (neta > bruta) {
    throw new Error("La cantidad neta no puede ser mayor que la cantidad bruta.");
  }

  // Revisar existencia de receta
  const recetaExiste = await checkRecordExists("FichaTecnica", "id", id_receta);
  if (!recetaExiste) throw new Error("La receta no existe.");

  // Revisar existencia de materia prima
  const ingredienteExiste = await checkRecordExists("MateriaPrima", "id", id_materia_prima);
  if (!ingredienteExiste) throw new Error("La Materia Prima no existe.");

  // Cálculo real de factor de corrección
  const factor_correccion = bruta / neta;

  const registro = {
    id_receta,
    id_materia_prima,
    cantidad_bruta: bruta,
    cantidad_neta: neta,
    factor_correccion,
    unidad_medida
  };

  return insertRecord("receta_ingrediente", registro);
}

// -------------------------------
// LISTAR INGREDIENTES DE LA RECETA
// -------------------------------
async function listarIngredientesDeReceta(id_receta) {
  return getAllRecords("receta_ingrediente", "id_receta", id_receta);
}

// -------------------------------
// OBTENER UN INGREDIENTE POR ID
// -------------------------------
async function obtenerIngredienteReceta(id) {
  const registro = await getRecordById("receta_ingrediente", "id", id);
  if (!registro) throw new Error("Ingrediente no encontrado.");
  return registro;
}

// -------------------------------
// ACTUALIZAR INGREDIENTE
// -------------------------------
async function actualizarIngredienteReceta(id, data) {
  const exists = await checkRecordExists("receta_ingrediente", "id", id);
  if (!exists) throw new Error("Ingrediente no encontrado.");

  let { cantidad_bruta, cantidad_neta } = data;

  // Validaciones si se actualizan cantidades
  if (cantidad_bruta != null) {
    cantidad_bruta = validarCantidad(cantidad_bruta, "cantidad_bruta");
    data.cantidad_bruta = cantidad_bruta;
  }

  if (cantidad_neta != null) {
    cantidad_neta = validarCantidad(cantidad_neta, "cantidad_neta");
    data.cantidad_neta = cantidad_neta;
  }

  // Si se modifican ambas cantidades → recalcular factor
  if (cantidad_bruta != null && cantidad_neta != null) {
    if (cantidad_neta > cantidad_bruta) {
      throw new Error("La cantidad neta no puede ser mayor que la cantidad bruta.");
    }
    data.factor_correccion = cantidad_bruta / cantidad_neta;
  }

  return updateRecord("receta_ingrediente", data, "id", id);
}

// -------------------------------
// ELIMINAR INGREDIENTE
// -------------------------------
async function eliminarIngredienteReceta(id) {
  const exists = await checkRecordExists("receta_ingrediente", "id", id);
  if (!exists) throw new Error("Ingrediente no encontrado.");

  return deleteRecord("receta_ingrediente", "id", id);
}

// -------------------------------
module.exports = {
  agregarIngredienteAReceta,
  listarIngredientesDeReceta,
  obtenerIngredienteReceta,
  actualizarIngredienteReceta,
  eliminarIngredienteReceta
};
