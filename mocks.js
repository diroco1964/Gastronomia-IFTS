// mocks.js
const recetas = [
  { id: 1, nombre_receta: "Tarta de Manzana", proporcion: 4 }
];

const receta_ingredientes = [
  { id: 1, id_receta: 1, id_materia_prima: 1, cantidad_bruta: 1000, cantidad_neta: 850, factor_correccion: 1.176, unidad_medida: "g" },
  { id: 2, id_receta: 1, id_materia_prima: 2, cantidad_bruta: 500, cantidad_neta: 500, factor_correccion: 1, unidad_medida: "ml" }
];

const materias_primas = [
  { id: 1, nombre: "Manzana", precioUnitario: 2 },  // $2 por 100g
  { id: 2, nombre: "Azúcar", precioUnitario: 1 }   // $1 por 100g
];

module.exports = { recetas, receta_ingredientes, materias_primas };
