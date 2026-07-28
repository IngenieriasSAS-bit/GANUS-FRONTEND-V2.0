/**
 * ---------------------------------------------------------
 * Servicio: operacionService
 * Módulo: Operación
 *
 * Responsabilidad:
 * Consolidar la información operativa proveniente
 * de los módulos MAKE y Field Engine.
 * ---------------------------------------------------------
 */

import {
    getMakeDashboard,
    getWorkOrders,
    getMakeRoutines,
} from "./makeService";

/* ==========================================================
   DASHBOARD OPERACIÓN
   ========================================================== */

export function obtenerDashboardOperacion() {

    const dashboard = getMakeDashboard();

    const orders = getWorkOrders();

    const routines = getMakeRoutines();

    /* ==========================================================
   ESTADO INTELIGENTE DE LOS MÓDULOS
   ========================================================== */

    let estadoMake = "Sin rutinas";
    let tipoMake = "warning";

    if (routines.length > 0) {

        estadoMake =
            `${routines.length} rutina(s) registradas`;

        tipoMake = "success";

    }

    const ordenesEnProceso = orders.filter(
        order => order.status === "in_progress"
    ).length;

    if (ordenesEnProceso > 0) {

        estadoMake =
            `${ordenesEnProceso} orden(es) en ejecución`;

    }

    return {

        resumen: {

            ordenesPendientes:

                orders.filter(
                    order => order.status === "pending"
                ).length,

            ordenesProceso:

                orders.filter(
                    order => order.status === "in_progress"
                ).length,

            ordenesFinalizadas:

                orders.filter(
                    order => order.status === "completed"
                ).length,

            alertas: dashboard.pendingOrders,

        },

       estadoSistema: [

    {
        id: 1,
        modulo: "MAKE",
        estado: estadoMake,
        tipo: tipoMake,
    },

    {
        id: 2,
        modulo: "Field Engine",
        estado:
            dashboard.templates.length > 0
                ? `${dashboard.templates.length} plantilla(s) publicadas`
                : "Sin plantillas publicadas",

        tipo:
            dashboard.templates.length > 0
                ? "success"
                : "warning",
    },

    {
        id: 3,
        modulo: "Knowledge Studio",
        estado: "Pendiente de integración",
        tipo: "warning",
    },

    {
        id: 4,
        modulo: "Alertas",
        estado:
            dashboard.pendingOrders > 0
                ? `${dashboard.pendingOrders} pendientes`
                : "Sin alertas",

        tipo:
            dashboard.pendingOrders > 0
                ? "warning"
                : "success",
    },

],

        actividad: [

            {
                id: 1,
                titulo: "Rutinas registradas",
                descripcion:
                    `Actualmente existen ${routines.length} rutina(s) registradas en MAKE.`,
                fecha: "Actualizado",
            },

            {
                id: 2,
                titulo: "Órdenes de trabajo",
                descripcion:
                    `Actualmente existen ${orders.length} orden(es) de trabajo.`,
                fecha: "Actualizado",
            },

            {
                id: 3,
                titulo: "Plantillas publicadas",
                descripcion:
                    `${dashboard.templates.length} plantilla(s) publicadas desde Field Engine.`,
                fecha: "Actualizado",
            },

        ],

ordenes: orders,

rutinas: routines,

        accesosRapidos: [

    {
        id: 1,
        nombre: "MAKE",
        ruta: "/make",
    },

    {
        id: 2,
        nombre: "Gestión de Rutinas",
        ruta: "/make",
    },

    {
        id: 3,
        nombre: "Knowledge Studio",
        ruta: "/knowledge",
    },

],

    };

}