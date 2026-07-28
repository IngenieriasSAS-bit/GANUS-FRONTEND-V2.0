/**
 * ---------------------------------------------------------
 * Servicio: permissionGuard
 * Módulo: Seguridad
 *
 * Responsabilidad:
 * Validar si el rol actual posee permisos
 * sobre un módulo específico.
 * ---------------------------------------------------------
 */

import { obtenerPermisosRol } from "./permissionService";

/**
 * Buscar permiso de un módulo.
 */
function buscarModulo(rolId, modulo) {

    const permisos = obtenerPermisosRol(rolId);

    return permisos.find(

        (item) => item.modulo === modulo

    );

}

/**
 * Puede ver
 */
export function puedeVer(rolId, modulo) {

    return buscarModulo(

        rolId,

        modulo

    )?.ver ?? false;

}

/**
 * Puede crear
 */
export function puedeCrear(rolId, modulo) {

    return buscarModulo(

        rolId,

        modulo

    )?.crear ?? false;

}

/**
 * Puede editar
 */
export function puedeEditar(rolId, modulo) {

    return buscarModulo(

        rolId,

        modulo

    )?.editar ?? false;

}

/**
 * Puede desactivar
 */
export function puedeDesactivar(rolId, modulo) {

    return buscarModulo(

        rolId,

        modulo

    )?.desactivar ?? false;

}

/**
 * Puede exportar
 */
export function puedeExportar(rolId, modulo) {

    return buscarModulo(

        rolId,

        modulo

    )?.exportar ?? false;

}