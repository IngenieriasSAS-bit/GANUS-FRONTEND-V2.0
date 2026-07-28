/*
|--------------------------------------------------------------------------
| Archivo: roles.js
| Módulo: Organización
| Responsabilidad:
| Datos simulados para la administración de Roles.
|--------------------------------------------------------------------------
*/

import permisosBase from "./permisos";

const crearPermisos = () => structuredClone(permisosBase);

const contarPermisos = (permisos) => {

    return permisos.reduce((total, modulo) => {

        return total + Object.values(modulo)
            .filter((valor) => valor === true)
            .length;

    }, 0);

};

const roles = [

    {
        id: 1,
        nombre: "Administrador General",
        descripcion: "Acceso completo a todos los módulos del sistema.",
        estado: "Activo",
        permisosDetalle: crearPermisos(),
    },

    {
        id: 2,
        nombre: "Supervisor",
        descripcion: "Supervisa la operación de las fincas y consulta indicadores.",
        estado: "Activo",
        permisosDetalle: crearPermisos().map((permiso) => ({

            ...permiso,

            crear:
                permiso.modulo === "Roles"
                    ? false
                    : permiso.crear,

            editar:
                permiso.modulo === "Roles"
                    ? false
                    : permiso.editar,

            desactivar:
                permiso.modulo === "Roles"
                    ? false
                    : permiso.desactivar,

        })),
    },

    {
        id: 3,
        nombre: "Operario",
        descripcion: "Ejecuta actividades operativas dentro de la plataforma.",
        estado: "Activo",
        permisosDetalle: crearPermisos().map((permiso) => ({

            ...permiso,

            crear: false,
            editar: false,
            desactivar: false,
            exportar: false,

        })),
    },

    {
        id: 4,
        nombre: "Consulta",
        descripcion: "Acceso únicamente de lectura.",
        estado: "Inactivo",
        permisosDetalle: crearPermisos().map((permiso) => ({

            ...permiso,

            crear: false,
            editar: false,
            desactivar: false,
            exportar: false,

        })),
    },

];

/*
|--------------------------------------------------------------------------
| Calcular automáticamente el total de permisos
|--------------------------------------------------------------------------
*/

roles.forEach((rol) => {

    rol.permisos = contarPermisos(rol.permisosDetalle);

});

export default roles;