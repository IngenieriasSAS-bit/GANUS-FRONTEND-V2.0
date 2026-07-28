/**
 * ---------------------------------------------------------
 * Servicio: sessionService
 * Módulo: Seguridad
 *
 * Responsabilidad:
 * Gestionar la sesión del usuario autenticado.
 * ---------------------------------------------------------
 */

const SESSION_KEY = "ganus_session";

/**
 * Guarda la sesión.
 */
export function guardarSesion(usuario) {

    localStorage.setItem(

        SESSION_KEY,

        JSON.stringify(usuario)

    );

}

/**
 * Obtiene la sesión.
 */
export function obtenerSesion() {

    const datos = localStorage.getItem(

        SESSION_KEY

    );

    if (!datos) {

        return null;

    }

    return JSON.parse(datos);

}

/**
 * Elimina la sesión.
 */
export function cerrarSesion() {

    localStorage.removeItem(

        SESSION_KEY

    );

}

/**
 * Indica si existe una sesión.
 */
export function haySesion() {

    return obtenerSesion() !== null;

}