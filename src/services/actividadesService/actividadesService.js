import actividadesIniciales from "../../data/actividades";

const CLAVE_ACTIVIDADES = "ganus_actividades";

export const obtenerActividades = () => {
  const actividadesGuardadas = localStorage.getItem(
    CLAVE_ACTIVIDADES
  );

  if (!actividadesGuardadas) {
    localStorage.setItem(
      CLAVE_ACTIVIDADES,
      JSON.stringify(actividadesIniciales)
    );

    return actividadesIniciales;
  }

  return JSON.parse(actividadesGuardadas);
};

export const guardarActividades = (
  actividades
) => {

  localStorage.setItem(
    CLAVE_ACTIVIDADES,
    JSON.stringify(actividades)
  );

  window.dispatchEvent(

    new Event(
      "actividades-updated"
    )

  );

};

export const crearActividad = (
  nuevaActividad
) => {
  const actividades =
    obtenerActividades();

  const nuevoId =
    actividades.length > 0
      ? Math.max(
          ...actividades.map(
            (actividad) => actividad.id
          )
        ) + 1
      : 1;

if (!nuevaActividad.activoId) {

    throw new Error(
        "Debe seleccionar un activo."
    );

}

if (!nuevaActividad.actividad) {

    throw new Error(
        "Debe indicar la actividad."
    );

}


  const actividadCreada = {

    ...nuevaActividad,

    id: nuevoId,

    createdAt:
        new Date().toISOString(),

    updatedAt:
        new Date().toISOString(),

};

  const actividadesActualizadas = [
    ...actividades,
    actividadCreada,
  ];

  guardarActividades(
    actividadesActualizadas
);

/*
=========================================
PUNTO DE INTEGRACIÓN
KNOWLEDGE / MAKE
=========================================
*/
// registrarEvento(...)

return actividadCreada; 
};
export const obtenerActividadesPorActivo = (
  activoId
) => {
  return obtenerActividades().filter(
    (actividad) =>
      actividad.activoId === activoId
  );
};

export const eliminarActividad = (
  actividadId
) => {
  const actividades =
    obtenerActividades();

    

  const actividadesActualizadas =
    actividades.filter(
      (actividad) =>
        actividad.id !== actividadId
    );

  guardarActividades(
    actividadesActualizadas
  );
};

export const actualizarActividad = (actividadActualizada) => {

    const actividades = obtenerActividades();

    const actividadesNuevas = actividades.map((actividad) =>

        actividad.id === actividadActualizada.id
            ? {
                  ...actividad,
                  ...actividadActualizada,
                  updatedAt: new Date().toISOString(),
              }
            : actividad

    );

    guardarActividades(actividadesNuevas);

    return actividadActualizada;

};

export const obtenerActividadesRecientes = (cantidad = 5) => {

    return obtenerActividades()

        .slice()

        .reverse()

        .slice(0, cantidad);

};

export const obtenerActividadesPendientes = () => {

    return obtenerActividades().filter(

        actividad =>

            actividad.estado !== "Completada"

    );

};