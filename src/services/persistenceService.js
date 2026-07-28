/**
 * ---------------------------------------------------------
 * Servicio: persistenceService
 * Módulo: Infraestructura
 *
 * Responsabilidad:
 * Centralizar el acceso a la persistencia.
 *
 * Hoy:
 * LocalStorage
 *
 * Mañana:
 * API REST
 * Base de datos
 * IndexedDB
 * etc.
 * ---------------------------------------------------------
 */

/**
 * ---------------------------------------------------------
 * Guardar
 * ---------------------------------------------------------
 */
export function guardar(clave, datos) {

    localStorage.setItem(

        clave,

        JSON.stringify(datos)

    );

}

/**
 * ---------------------------------------------------------
 * Obtener
 * ---------------------------------------------------------
 */
export function obtener(clave) {

    const datos = localStorage.getItem(

        clave

    );

    if (!datos) {

        return null;

    }

    return JSON.parse(datos);

}

/**
 * ---------------------------------------------------------
 * Eliminar
 * ---------------------------------------------------------
 */
export function eliminar(clave) {

    localStorage.removeItem(clave);

}

/**
 * ---------------------------------------------------------
 * Existe
 * ---------------------------------------------------------
 */
export function existe(clave) {

    return localStorage.getItem(clave) !== null;

}

/**
 * ---------------------------------------------------------
 * Limpiar almacenamiento
 * ---------------------------------------------------------
 */
export function limpiar() {

    localStorage.clear();

}