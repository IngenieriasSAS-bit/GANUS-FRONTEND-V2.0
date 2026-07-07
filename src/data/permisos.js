/*
|--------------------------------------------------------------------------
| Archivo: permisos.js
| Módulo: Organización
| Responsabilidad:
| Datos simulados para la matriz de permisos.
|--------------------------------------------------------------------------
*/

const permisosIniciales = [

    {
        modulo: "Grupo Empresarial",
        ver: true,
        crear: true,
        editar: true,
        desactivar: true,
        exportar: true,
    },

    {
        modulo: "Fincas",
        ver: true,
        crear: true,
        editar: true,
        desactivar: true,
        exportar: true,
    },

    {
        modulo: "Usuarios",
        ver: true,
        crear: true,
        editar: true,
        desactivar: true,
        exportar: false,
    },

    {
        modulo: "Roles",
        ver: true,
        crear: false,
        editar: false,
        desactivar: false,
        exportar: false,
    },

    {
        modulo: "Inventario",
        ver: true,
        crear: true,
        editar: true,
        desactivar: false,
        exportar: true,
    },

    {
        modulo: "Field Engine",
        ver: true,
        crear: false,
        editar: false,
        desactivar: false,
        exportar: false,
    },

    {
        modulo: "Knowledge Studio",
        ver: true,
        crear: false,
        editar: false,
        desactivar: false,
        exportar: false,
    }

];

export default permisosIniciales;