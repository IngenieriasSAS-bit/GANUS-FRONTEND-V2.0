/**
 * ==========================================================
 * Servicio: activityListenerService
 *
 * Responsabilidad:
 * Detectar actividad del usuario y
 * reiniciar el temporizador de sesión.
 * ==========================================================
 */

import {

    iniciarTemporizadorSesion,
    reiniciarTemporizadorSesion,
    detenerTemporizadorSesion,

} from "./sessionTimeoutService";

const EVENTOS = [

    "mousemove",

    "mousedown",

    "click",

    "keydown",

    "scroll",

    "touchstart",

];

// ==========================================================
// Iniciar monitoreo
// ==========================================================

export function iniciarMonitoreoActividad() {

    iniciarTemporizadorSesion();

    EVENTOS.forEach((evento) => {

        window.addEventListener(

            evento,

            reiniciarTemporizadorSesion,

            true

        );

    });

}

// ==========================================================
// Detener monitoreo
// ==========================================================

export function detenerMonitoreoActividad() {

    EVENTOS.forEach((evento) => {

        window.removeEventListener(

            evento,

            reiniciarTemporizadorSesion,

            true

        );

    });

    detenerTemporizadorSesion();

}