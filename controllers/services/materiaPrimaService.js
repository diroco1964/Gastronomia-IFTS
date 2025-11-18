const { 
  insertRecord, 
  checkRecordExists, 
  getAllRecords, 
  getRecordById, 
  updateRecord, 
  deleteRecord 
} = require("../utils/sqlFunctions");

// Validación de números no negativos
function validarNumeroNoNegativo(valor, nombreCampo) {
  const numero = parseFloat(valor);
  if (isNaN(numero) || numero < 0) {
    throw new Error(`El campo '${nombreCampo}' debe ser un número válido mayor o igual a 0.`);
  }
  return numero;
}

// Crear ingrediente
async function crearIngrediente(data) {
  const { nombre, unidadMedida, precioUnitario, stock, proveedor } = data;

  if (!nombre || !unidadMedida) {
    throw new Error("Los campos 'nombre' y 'unidadMedida' son obligatorios.");
  }

  const precio = validarNumeroNoNegativo(precioUnitario, "precioUnitario");
  const stockVal = validarNumeroNoNegativo(stock, "stock");

  const exists = await checkRecordExists("MateriaPrima", "nombre", nombre);
  if (exists) throw new Error("El ingrediente ya existe");

  const materiaPrima = {
    nombre,
    unidadMedida,
    precioUnitario: precio,
    stock: stockVal,
    proveedor: proveedor || null,
  };

  return insertRecord("MateriaPrima", materiaPrima);
}

// Obtener todos los ingredientes
async function listarIngredientes() {
  return getAllRecords("MateriaPrima");
}

// Obtener un ingrediente por ID
async function obtenerIngrediente(id) {
  const ingrediente = await getRecordById("MateriaPrima", "id", id);
  if (!ingrediente) throw new Error("Ingrediente no encontrado");
  return ingrediente;
}

// Actualizar ingrediente
async function actualizarIngrediente(id, data) {
  const existing = await checkRecordExists("MateriaPrima", "id", id);
  if (!existing) throw new Error("Ingrediente no encontrado");

  if (data.precioUnitario != null) data.precioUnitario = validarNumeroNoNegativo(data.precioUnitario, "precioUnitario");
  if (data.stock != null) data.stock = validarNumeroNoNegativo(data.stock, "stock");

  return updateRecord("MateriaPrima", data, "id", id);
}

// Eliminar ingrediente
async function eliminarIngrediente(id) {
  const existing = await checkRecordExists("MateriaPrima", "id", id);
  if (!existing) throw new Error("Ingrediente no encontrado");

  return deleteRecord("MateriaPrima", "id", id);
}

module.exports = {
  crearIngrediente,
  listarIngredientes,
  obtenerIngrediente,
  actualizarIngrediente,
  eliminarIngrediente
};
