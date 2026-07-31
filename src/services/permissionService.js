/**
 * ==========================================================
 * Servicio: permissionService
 * Módulo: Seguridad / Organización
 *
 * Responsabilidad:
 * Gestionar los permisos por Rol (RBAC).
 * ==========================================================
 */

import {
    obtenerOrganizacion,
    guardarOrganizacion,
} from "./organizationStorageService";

/**
 * Obtiene un Rol.
 */
export function obtenerRol(idRol) {

    const organizacion = obtenerOrganizacion();

    return organizacion.roles.find(

    (rol) => String(rol.id) === String(idRol)

);

}

/**
 * Obtiene la matriz de permisos
 * del Rol.
 */
export function obtenerPermisosRol(idRol) {

    const rol = obtenerRol(idRol);

    if (!rol) {

        return [];

    }

    return structuredClone(

        rol.permisosDetalle ?? []

    );

}

/**
 * Cuenta los permisos activos.
 */
export function contarPermisos(permisos) {

    let total = 0;

    permisos.forEach((modulo) => {

        Object.entries(modulo).forEach(

            ([campo, valor]) => {

                if (

                    campo !== "modulo" &&

                    valor === true

                ) {

                    total++;

                }

            }

        );

    });

    return total;

}

/**
 * Guarda permisos del Rol.
 */
export function guardarPermisosRol(

    idRol,

    permisos

) {

    const organizacion = obtenerOrganizacion();

    const rol = organizacion.roles.find(

    (r) => String(r.id) === String(idRol)

);

    if (!rol) {

        return;

    }

    rol.permisosDetalle = structuredClone(

        permisos

    );

    rol.permisos = contarPermisos(

        permisos

    );

    guardarOrganizacion(

        organizacion

    );

}

/**
 * Valida un permiso.
 */
export function hasPermission(

    idRol,

    modulo,

    accion

) {

    const permisos = obtenerPermisosRol(

        idRol

    );

    const moduloEncontrado = permisos.find(

        (item) => item.modulo === modulo

    );

    if (!moduloEncontrado) {

        return false;

    }

    return Boolean(

        moduloEncontrado[accion]

    );

}