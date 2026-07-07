import relacionesActivosIniciales from "../data/relacionesActivos";

const CLAVE_RELACIONES_ACTIVOS = "ganus_relaciones_activos";

export const obtenerRelacionesActivos = () => {
  const relacionesGuardadas = localStorage.getItem(
    CLAVE_RELACIONES_ACTIVOS
  );

  if (!relacionesGuardadas) {
    localStorage.setItem(
      CLAVE_RELACIONES_ACTIVOS,
      JSON.stringify(relacionesActivosIniciales)
    );

    return relacionesActivosIniciales;
  }

  return JSON.parse(relacionesGuardadas);
};

export const guardarRelacionesActivos = (relaciones) => {
  localStorage.setItem(
    CLAVE_RELACIONES_ACTIVOS,
    JSON.stringify(relaciones)
  );
};

export const crearRelacionActivo = (nuevaRelacion) => {
  const relaciones = obtenerRelacionesActivos();

  const nuevoId =
    relaciones.length > 0
      ? Math.max(
          ...relaciones.map((relacion) => relacion.id)
        ) + 1
      : 1;

  const relacionCreada = {
    ...nuevaRelacion,
    id: nuevoId,
    estado: "Activo",
  };

  const relacionesActualizadas = [
    ...relaciones,
    relacionCreada,
  ];

  guardarRelacionesActivos(relacionesActualizadas);

  return relacionCreada;
};

export const obtenerRelacionesPorActivo = (activoId) => {
  const relaciones = obtenerRelacionesActivos();

  return relaciones.filter(
    (relacion) =>
      relacion.estado === "Activo" &&
      (
        relacion.activoOrigenId === activoId ||
        relacion.activoDestinoId === activoId
      )
  );
};

export const desactivarRelacionActivo = (relacionId) => {
  const relaciones = obtenerRelacionesActivos();

  const relacionesActualizadas = relaciones.map(
    (relacion) =>
      relacion.id === relacionId
        ? {
            ...relacion,
            estado: "Inactivo",
          }
        : relacion
  );

  guardarRelacionesActivos(relacionesActualizadas);
};