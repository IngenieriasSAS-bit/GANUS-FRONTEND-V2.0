import actividadesIniciales from "../data/actividades";

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

  const actividadCreada = {
    ...nuevaActividad,
    id: nuevoId,
  };

  const actividadesActualizadas = [
    ...actividades,
    actividadCreada,
  ];

  guardarActividades(
    actividadesActualizadas
  );

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