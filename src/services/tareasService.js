/**
 * ---------------------------------------------------------
 * Servicio: tareasService
 * Módulo: GANUS Tareas
 *
 * Responsabilidad:
 * Gestionar la persistencia local de tareas operativas
 * para la versión MVP.
 * ---------------------------------------------------------
 */

import tareasIniciales from "../data/tareas";

const CLAVE_TAREAS = "ganus_tareas";


export const obtenerTareas = () => {

  const tareasGuardadas =
    localStorage.getItem(CLAVE_TAREAS);

  if (!tareasGuardadas) {

    localStorage.setItem(
      CLAVE_TAREAS,
      JSON.stringify(tareasIniciales)
    );

    return tareasIniciales;

  }

  return JSON.parse(tareasGuardadas);

};


export const guardarTareas = (
  tareas
) => {

  localStorage.setItem(
    CLAVE_TAREAS,
    JSON.stringify(tareas)
  );

};


export const crearTarea = (
  nuevaTarea
) => {

  const tareas = obtenerTareas();

  const nuevoId =
    tareas.length > 0

      ? Math.max(
          ...tareas.map(
            (tarea) => tarea.id
          )
        ) + 1

      : 1;

  const tareaCreada = {

    ...nuevaTarea,

    id: nuevoId,

    fechaCreacion:
      nuevaTarea.fechaCreacion ||
      new Date().toISOString().split("T")[0],

  };

  const tareasActualizadas = [

    ...tareas,

    tareaCreada,

  ];

  guardarTareas(
    tareasActualizadas
  );

  return tareaCreada;

};


export const actualizarTarea = (
  tareaId,
  datosActualizados
) => {

  const tareas = obtenerTareas();

  const tareasActualizadas =
    tareas.map((tarea) =>

      tarea.id === tareaId

        ? {
            ...tarea,
            ...datosActualizados,
          }

        : tarea

    );

  guardarTareas(
    tareasActualizadas
  );

  return tareasActualizadas;

};


export const cambiarEstadoTarea = (
  tareaId,
  nuevoEstado
) => {

  return actualizarTarea(
    tareaId,
    {
      estado: nuevoEstado,
    }
  );

};


export const obtenerTareasPorActivo = (
  activoId
) => {

  return obtenerTareas().filter(
    (tarea) =>
      tarea.activoId === activoId
  );

};


export const eliminarTarea = (
  tareaId
) => {

  const tareas = obtenerTareas();

  const tareasActualizadas =
    tareas.filter(
      (tarea) =>
        tarea.id !== tareaId
    );

  guardarTareas(
    tareasActualizadas
  );

  return tareasActualizadas;

};