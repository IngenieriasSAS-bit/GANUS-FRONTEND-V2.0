/*
|--------------------------------------------------------------------------
| Archivo: roles.js
| Módulo: Organización
| Responsabilidad:
| Datos simulados para la administración de Roles.
|--------------------------------------------------------------------------
*/

const roles = [
    {
        id: 1,
        nombre: "Administrador General",
        descripcion: "Acceso completo a todos los módulos del sistema.",
        estado: "Activo",
        permisos: 42,
    },
    {
        id: 2,
        nombre: "Supervisor",
        descripcion: "Supervisa la operación de las fincas y consulta indicadores.",
        estado: "Activo",
        permisos: 28,
    },
    {
        id: 3,
        nombre: "Operario",
        descripcion: "Ejecuta actividades operativas dentro de la plataforma.",
        estado: "Activo",
        permisos: 15,
    },
    {
        id: 4,
        nombre: "Consulta",
        descripcion: "Acceso únicamente de lectura.",
        estado: "Inactivo",
        permisos: 8,
    },
];

export default roles;