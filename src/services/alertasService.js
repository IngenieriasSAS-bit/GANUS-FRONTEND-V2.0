import alertasIniciales from "../data/alertas";

const CLAVE_ALERTAS = "ganus_alertas";

export const EVENTO_ALERTAS_ACTUALIZADAS =
  "ganus-alertas-actualizadas";

const notificarActualizacionAlertas = () => {

  window.dispatchEvent(

    new Event(
      EVENTO_ALERTAS_ACTUALIZADAS
    )

  );

};


export const obtenerAlertas = () => {

  const alertasGuardadas =
    localStorage.getItem(CLAVE_ALERTAS);

  if (!alertasGuardadas) {

    localStorage.setItem(
      CLAVE_ALERTAS,
      JSON.stringify(alertasIniciales)
    );

    return alertasIniciales.filter(
      (alerta) => !alerta.archivada
    );

  }

  return JSON.parse(alertasGuardadas).filter(
    (alerta) => !alerta.archivada
  );

};

export const obtenerHistorialAlertas = () => {

  const alertasGuardadas =
    localStorage.getItem(CLAVE_ALERTAS);

  if (!alertasGuardadas) {

    return [];

  }

  return JSON.parse(alertasGuardadas).filter(

    (alerta) => alerta.archivada

  );

};

export const guardarAlertas = (alertas) => {
  localStorage.setItem(
    CLAVE_ALERTAS,
    JSON.stringify(alertas)
  );
};

export const crearAlerta = (nuevaAlerta) => {
  const alertas = obtenerAlertas();

  const nuevoId =
    alertas.length > 0
      ? Math.max(
          ...alertas.map(
            (alerta) => alerta.id
          )
        ) + 1
      : 1;

  const alertaCreada = {
  ...nuevaAlerta,
  id: nuevoId,
  estado: "Pendiente",
  archivada: false,
  fechaResolucion: null,
  usuarioResolucion: null,
};

  const alertasActualizadas = [
    ...alertas,
    alertaCreada,
  ];

  guardarAlertas(alertasActualizadas);

notificarActualizacionAlertas();

return alertaCreada;
};

export const obtenerAlertasPorActivo = (
  activoId
) => {
  return obtenerAlertas().filter(
    (alerta) =>
      alerta.activoId === activoId
  );
};

export const obtenerAlertasPendientes = () => {
  return obtenerAlertas().filter(
    (alerta) =>
      alerta.estado === "Pendiente"
  );
};

export const atenderAlerta = (alertaId) => {

  const todasLasAlertas = JSON.parse(

    localStorage.getItem(CLAVE_ALERTAS)

  ) || [];

  const alertasActualizadas =
    todasLasAlertas.map((alerta) =>

      alerta.id === alertaId

        ? {

            ...alerta,

            estado: "Atendida",

            archivada: true,

            fechaResolucion:
              new Date()
                .toISOString()
                .split("T")[0],

            usuarioResolucion:
              localStorage.getItem("usuario") ||
              "admin",

          }

        : alerta

    );

  guardarAlertas(alertasActualizadas);

  notificarActualizacionAlertas();

  return alertasActualizadas;

};