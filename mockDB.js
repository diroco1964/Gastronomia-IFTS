const { recetas, receta_ingredientes, materias_primas } = require("./mocks");

let idCounter = 3;

const insertRecord = async (table, record) => {
  record.id = idCounter++;
  if (table === "FichaTecnica") recetas.push(record);
  if (table === "receta_ingrediente") receta_ingredientes.push(record);
  if (table === "MateriaPrima") materias_primas.push(record);
  return record;
};

const checkRecordExists = async (table, field, value) => {
  let arr = [];
  if (table === "FichaTecnica") arr = recetas;
  if (table === "receta_ingrediente") arr = receta_ingredientes;
  if (table === "MateriaPrima") arr = materias_primas;
  return arr.some(r => r[field] === value);
};

const getRecordById = async (table, field, value) => {
  let arr = [];
  if (table === "FichaTecnica") arr = recetas;
  if (table === "receta_ingrediente") arr = receta_ingredientes;
  if (table === "MateriaPrima") arr = materias_primas;
  return arr.find(r => r[field] === value) || null;
};

const getAllRecords = async (table, field, value) => {
  let arr = [];
  if (table === "FichaTecnica") arr = recetas;
  if (table === "receta_ingrediente") arr = receta_ingredientes;
  if (table === "MateriaPrima") arr = materias_primas;
  if (field && value != null) return arr.filter(r => r[field] === value);
  return arr;
};

const updateRecord = async (table, data, field, value) => {
  let arr = [];
  if (table === "FichaTecnica") arr = recetas;
  if (table === "receta_ingrediente") arr = receta_ingredientes;
  if (table === "MateriaPrima") arr = materias_primas;
  const index = arr.findIndex(r => r[field] === value);
  if (index === -1) return null;
  arr[index] = { ...arr[index], ...data };
  return arr[index];
};

const deleteRecord = async (table, field, value) => {
  let arr = [];
  if (table === "FichaTecnica") arr = recetas;
  if (table === "receta_ingrediente") arr = receta_ingredientes;
  if (table === "MateriaPrima") arr = materias_primas;
  const index = arr.findIndex(r => r[field] === value);
  if (index === -1) return null;
  return arr.splice(index, 1)[0];
};

module.exports = {
  insertRecord,
  checkRecordExists,
  getRecordById,
  getAllRecords,
  updateRecord,
  deleteRecord
};
