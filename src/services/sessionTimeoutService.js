/**
 * ==========================================================
 * Servicio: sessionTimeoutService
 *
 * Responsabilidad:
 * Gestionar la expiración automática
 * de la sesión por inactividad.
 * ==========================================================
 */

import {

    cerrarSesion,

} from "./sessionService";

let temporizador = null;

// ==========================================================
// Configuración
// ==========================================================

// 30 minutos
const TIEMPO_EXPIRACION = 30 * 60 * 1000;

// ==========================================================
// Detener temporizador
// ==========================================================

export function detenerTemporizadorSesion() {

    if (temporizador) {

        clearTimeout(temporizador);

        temporizador = null;

    }

}

// ==========================================================
// Reiniciar temporizador
// ==========================================================

export function reiniciarTemporizadorSesion() {

    detenerTemporizadorSesion();

    temporizador = setTimeout(() => {

        cerrarSesion();

        alert(

            "La sesión ha expirado por inactividad."

        );

        window.location.hash = "#/login";

    }, TIEMPO_EXPIRACION);

}

// ==========================================================
// Iniciar temporizador
// ==========================================================

export function iniciarTemporizadorSesion() {

    reiniciarTemporizadorSesion();

}