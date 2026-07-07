/**
 * ---------------------------------------------------------
 * Servicio: activosService
 * Módulo: GANUS Inventario
 *
 * Responsabilidad:
 * Gestionar la persistencia local de activos del MVP.
 * ---------------------------------------------------------
 */

import { activosIniciales } from "../data/activos";

const STORAGE_KEY = "ganus_activos";


export function obtenerActivos() {

  const datos = localStorage.getItem(STORAGE_KEY);

  if (!datos) {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(activosIniciales)
    );

    return activosIniciales;

  }

  return JSON.parse(datos);

}


export function guardarActivos(activos) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(activos)
  );

}


export function crearActivo(activo) {

  const activos = obtenerActivos();

  const nuevoActivo = {

    ...activo,

    id: `ACT-${Date.now()}`,

    fechaCreacion: new Date().toISOString(),

  };

  const nuevosActivos = [
    ...activos,
    nuevoActivo,
  ];

  guardarActivos(nuevosActivos);

  return nuevoActivo;

}


export function actualizarActivo(
  id,
  datosActualizados
) {

  const activos = obtenerActivos();

  const nuevosActivos = activos.map(
    (activo) =>

      activo.id === id

        ? {
            ...activo,
            ...datosActualizados,
            fechaActualizacion:
              new Date().toISOString(),
          }

        : activo
  );

  guardarActivos(nuevosActivos);

  return nuevosActivos;

}


export function desactivarActivo(id) {

  const activos = obtenerActivos();

  const nuevosActivos = activos.map(
    (activo) =>

      activo.id === id

        ? {
            ...activo,
            estado: "Inactivo",
            fechaActualizacion:
              new Date().toISOString(),
          }

        : activo
  );

  guardarActivos(nuevosActivos);

  return nuevosActivos;

}


export function buscarActivos(termino) {

  const activos = obtenerActivos();

  const busqueda = termino
    .toLowerCase()
    .trim();

  if (!busqueda) {

    return activos;

  }

  return activos.filter((activo) => {

    return (

      activo.nombre
        ?.toLowerCase()
        .includes(busqueda)

      ||

      activo.codigo
        ?.toLowerCase()
        .includes(busqueda)

      ||

      activo.identificador
        ?.toLowerCase()
        .includes(busqueda)

      ||

      activo.categoria
        ?.toLowerCase()
        .includes(busqueda)

    );

  });

}