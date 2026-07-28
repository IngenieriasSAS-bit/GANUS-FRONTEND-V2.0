/**
 * ---------------------------------------------------------
 * Servicio: organizationStorageService
 * Módulo: Organización
 *
 * Responsabilidad:
 * Gestionar la persistencia local del módulo Organización.
 * ---------------------------------------------------------
 */

const STORAGE_KEY = "ganus_organization";

import gruposEmpresariales from "../data/gruposEmpresariales";
import fincas from "../data/fincas";
import usuarios from "../data/usuarios";
import roles from "../data/roles";
import permisos from "../data/permisos";

/**
 * Obtiene toda la información de Organización.
 */
export function obtenerOrganizacion() {

    const datos = localStorage.getItem(STORAGE_KEY);

    if (!datos) {

        const estructuraInicial = {

            groups: gruposEmpresariales.map((grupo) => ({

                id: grupo.id,

                code: grupo.codigo ?? `GRP-${grupo.id}`,

                name: grupo.nombre,

                description: grupo.descripcion,

                farms: [],

                businessProfile: null,

                active: grupo.estado === "Activo",

                createdAt: new Date(),

                updatedAt: new Date(),

            })),

            farms: [...fincas],

            users: [...usuarios],

            roles: roles.map((rol) => ({

    ...rol,

    permisosDetalle: structuredClone(permisos),

})),

permissions: [],

            businessProfiles: [],

            processes: [],

            activityTypes: [],

        };

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(estructuraInicial)

        );

        return estructuraInicial;

    }

    return JSON.parse(datos);

}

/**
 * Guarda toda la estructura.
 */
export function guardarOrganizacion(data) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}