(async () => {
  const { crearReceta, listarRecetas } = require("./services/fichaTecnicaService");
  const { crearIngrediente } = require("./services/materiaPrimaService");
  const { agregarIngredienteAReceta, listarIngredientesDeReceta } = require("./services/recetaIngredienteService");

  const receta = await crearReceta({ nombre_receta: "Brownie", codigo: "R002" });
  console.log("Receta creada:", receta);

  const ing = await crearIngrediente({ nombre: "Chocolate", unidadMedida: "g", precioUnitario: 3, stock: 500 });
  console.log("Ingrediente creado:", ing);

  const ingReceta = await agregarIngredienteAReceta({ 
    id_receta: receta.id,
    id_materia_prima: ing.id,
    cantidad_bruta: 200,
    cantidad_neta: 180,
    unidad_medida: "g"
  });
  console.log("Ingrediente agregado a receta:", ingReceta);

  console.log("Ingredientes de la receta:", await listarIngredientesDeReceta(receta.id));
})();