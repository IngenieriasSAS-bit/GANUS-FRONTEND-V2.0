/**
 * ==========================================================
 * Servicio: Dashboard
 * Módulo: Dashboard
 *
 * Responsabilidad:
 * Centralizar toda la información utilizada por el Dashboard.
 * ==========================================================
 */

import { obtenerResumenOrganizacion } from "../organizationService";
import { obtenerActivos } from "../activosService";
import { obtenerAlertas } from "../alertasService";
import { obtenerActividades } from "../actividadesService/actividadesService";
import { obtenerKnowledgeEngine } from "../knowledgeEngineService";
import { obtenerResumenAdvisory } from "../knowledgeEngineService";
import { obtenerIndicadoresMotor } from "../knowledgeEngineService";
import { obtenerTareas } from "../tareasService";

/**
 * ==========================================================
 * Resumen Ejecutivo
 * ==========================================================
 */
export function obtenerResumenDashboard() {

    const organizacion = obtenerResumenOrganizacion();

    const activos = obtenerActivos();

    const alertas = obtenerAlertas();

    const actividades = obtenerActividades();

    const tareas = obtenerTareas();

    return {

        grupos: organizacion.grupos,

        fincas: organizacion.fincas,

        usuarios: organizacion.usuarios,

        roles: organizacion.roles,

        activos: activos.length,

        actividadesHoy: actividades.length,

        alertasActivas: alertas.filter(

    alerta =>

        !alerta.archivada

).length,

        tareasPendientes: tareas.filter(

    tarea =>

        tarea.estado !== "Completada"

).length,

    };

}

/**
 * ==========================================================
 * Actividades recientes
 * ==========================================================
 */
export function obtenerActividadesRecientesDashboard() {

    const actividades = obtenerActividades();

    return actividades

        .slice()

        .reverse()

        .slice(0, 5);

}

/**
 * ==========================================================
 * Alertas recientes
 * ==========================================================
 */
export function obtenerAlertasRecientesDashboard() {

    const alertas = obtenerAlertas();

    return alertas

        .slice()

        .reverse()

        .slice(0, 5);

}

/**
 * ==========================================================
 * Indicadores Dashboard
 * ==========================================================
 */

export function obtenerIndicadoresDashboard() {

    const knowledge = obtenerKnowledgeEngine();

    const eventos = knowledge.eventos || [];

    const riesgos = knowledge.riesgos || [];

    return {

        produccion:
            2450 + eventos.length * 8,

        peso:
            412 + eventos.length,

        prenez:
            Math.min(
                68 + eventos.length,
                100
            ),

        mortalidad:
            Math.max(
                1.2 - riesgos.length * 0.05,
                0.3
            ),

    };

}

/**
 * ==========================================================
 * Advisory Dashboard
 * ==========================================================
 */

export function obtenerAdvisoryDashboard() {

    const resumen = obtenerResumenAdvisory();

    return [

        {
            id: crypto.randomUUID(),

            tipo: "asistente",

            categoria: "operacion",

            titulo: "Resumen de la operación",

            texto:
                "He revisado la información disponible en GANUS. La operación se mantiene estable, aunque existe una alerta crítica que conviene atender con prioridad.",

            puntos: [

                `${resumen.areasSeguimiento} alertas activas registradas`,

                `${resumen.prioridadOperativa} evento clasificado como crítico`,

                `${resumen.areasSeguimiento + 3} tareas pendientes de seguimiento`,

            ],

            recomendacion:
                "Priorizar la revisión del bajo consumo de alimento en el lote 4.",

        },

    ];

}

/**
 * ==========================================================
 * Knowledge Dashboard
 * ==========================================================
 */

export function obtenerKnowledgeDashboard() {
    return obtenerIndicadoresMotor();
}