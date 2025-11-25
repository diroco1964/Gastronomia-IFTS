const { getRecordById, getAllRecords } = require("../utils/sqlFunctions");

async function calcularCostoReceta(idReceta, porcionesDeseadas) {
  // Obtener receta
  const receta = await getRecordById("FichaTecnica", "id", idReceta);
  if (!receta) throw new Error("Receta no encontrada");

  // Obtener ingredientes de la receta
  const ingredientes = await getAllRecords("receta_ingrediente", "id_receta", idReceta);
  if (!ingredientes || ingredientes.length === 0)
    throw new Error("La receta no tiene ingredientes cargados");

  let costoTotalBase = 0;
  const detalleIngredientes = [];

  for (let ing of ingredientes) {
    const materia = await getRecordById("MateriaPrima", "id", ing.id_materia_prima);
    if (!materia) throw new Error(`Materia prima con ID ${ing.id_materia_prima} no encontrada`);

    // Costo por ingrediente
    const costoIngrediente = ing.cantidad_neta * materia.precioUnitario;
    costoTotalBase += costoIngrediente;

    detalleIngredientes.push({
      ingrediente: materia.nombre,
      cantidad_bruta: ing.cantidad_bruta,
      cantidad_neta: ing.cantidad_neta,
      factor_correccion: ing.factor_correccion,
      unidad: ing.unidad_medida,
      precio_unitario: materia.precioUnitario,
      costo_ingrediente: costoIngrediente
    });
  }

  // Ajuste por porciones deseadas
  const porcionesBase = receta.proporcion || 1;
  const factorPorciones = porcionesDeseadas / porcionesBase;
  const costoTotalAjustado = costoTotalBase * factorPorciones;
  const costoPorPorcion = costoTotalAjustado / porcionesDeseadas;

  return {
    receta: receta.nombre_receta,
    porcionesBase,
    porcionesSolicitadas: porcionesDeseadas,
    factorPorciones,
    detalleIngredientes,
    costoTotalBase,
    costoTotalAjustado,
    costoPorPorcion
  };
}

module.exports = { calcularCostoReceta };
