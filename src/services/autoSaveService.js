/**
 * ---------------------------------------------------------
 * Servicio: autoSaveService
 * Módulo: Productividad
 *
 * Responsabilidad:
 * Gestionar el guardado automático
 * de cualquier formulario.
 * ---------------------------------------------------------
 */

import {

    guardarDraft,

} from "./draftService";

import {

    establecerEstado,

} from "../managers/SaveManager";

/**
 * ---------------------------------------------------------
 * Iniciar AutoSave
 * ---------------------------------------------------------
 */
export function iniciarAutoSave(

    modulo,

    obtenerDatos,

    intervalo = 20000,

    onSaved = null

) {

    const timer = setInterval(() => {

        establecerEstado("saving");

        const datos = obtenerDatos();

        guardarDraft(

            modulo,

            datos

        );

        establecerEstado("saved");

        if (onSaved) {

            onSaved();

        }

    }, intervalo);

    return timer;

}

/**
 * ---------------------------------------------------------
 * Detener AutoSave
 * ---------------------------------------------------------
 */
export function detenerAutoSave(timer) {

    clearInterval(timer);

}