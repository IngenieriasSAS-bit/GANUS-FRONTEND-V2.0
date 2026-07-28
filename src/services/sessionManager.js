/**
 * ==========================================================
 * Servicio: sessionManager
 * Módulo: Seguridad
 *
 * Responsabilidad:
 * Coordinar el ciclo de vida completo
 * de la sesión del usuario.
 * ==========================================================
 */

import {

    guardarSesion,

    cerrarSesion,

    obtenerSesion,

} from "./sessionService";

import {

    iniciarMonitoreoActividad,

    detenerMonitoreoActividad,

} from "./activityListenerService";

import {

    iniciarSesion,

} from "./authService";

/**
 * ==========================================================
 * Login
 * ==========================================================
 */
export function login(usuario, password) {

    const usuarioAutenticado = iniciarSesion(

        usuario,

        password

    );

    if (!usuarioAutenticado) {

        return false;

    }

    guardarSesion(

        usuarioAutenticado

    );

    iniciarMonitoreoActividad();

    return true;

}

/**
 * ==========================================================
 * Restaurar sesión
 * ==========================================================
 */
export function restaurarSesion() {

    const sesion = obtenerSesion();

    if (!sesion) {

        return null;

    }

    iniciarMonitoreoActividad();

    return sesion;

}

/**
 * ==========================================================
 * Cerrar sesión
 * ==========================================================
 */
export function logout() {

    detenerMonitoreoActividad();

    cerrarSesion();

}

/**
 * ==========================================================
 * Obtener usuario autenticado
 * ==========================================================
 */
export function obtenerUsuarioSesion() {

    return obtenerSesion();

}