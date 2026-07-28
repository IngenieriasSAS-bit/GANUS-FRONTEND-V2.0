/**
 * ---------------------------------------------------------
 * Servicio: draftService
 * Módulo: Productividad
 *
 * Responsabilidad:
 * Gestionar los borradores de cualquier
 * módulo de GANUS.
 *
 * Este servicio NO conoce LocalStorage.
 * Toda persistencia se delega al
 * persistenceService.
 * ---------------------------------------------------------
 */

import {

    guardar,

    obtener,

    eliminar,

} from "./persistenceService";

const PREFIJO = "ganus_draft_";

/**
 * ---------------------------------------------------------
 * Guardar borrador
 * ---------------------------------------------------------
 */
export function guardarDraft(

    modulo,

    datos

) {

    guardar(

        `${PREFIJO}${modulo}`,

        {

            fecha: new Date().toISOString(),

            datos,

        }

    );

}

/**
 * ---------------------------------------------------------
 * Obtener borrador
 * ---------------------------------------------------------
 */
export function obtenerDraft(modulo) {

    return obtener(

        `${PREFIJO}${modulo}`

    );

}

/**
 * ---------------------------------------------------------
 * Existe borrador
 * ---------------------------------------------------------
 */
export function existeDraft(modulo) {

    return obtenerDraft(modulo) !== null;

}

/**
 * ---------------------------------------------------------
 * Eliminar borrador
 * ---------------------------------------------------------
 */
export function eliminarDraft(modulo) {

    eliminar(

        `${PREFIJO}${modulo}`

    );

}

/**
 * ---------------------------------------------------------
 * Listar borradores
 * ---------------------------------------------------------
 */
export function listarDrafts() {

    const drafts = [];

    Object.keys(localStorage).forEach((key) => {

        if (

            key.startsWith(PREFIJO)

        ) {

            drafts.push({

                modulo: key.replace(

                    PREFIJO,

                    ""

                ),

                ...obtener(key),

            });

        }

    });

    return drafts;

}

/**
 * ---------------------------------------------------------
 * Eliminar todos
 * ---------------------------------------------------------
 */
export function limpiarDrafts() {

    listarDrafts().forEach(

        (draft) =>

            eliminarDraft(

                draft.modulo

            )

    );

}