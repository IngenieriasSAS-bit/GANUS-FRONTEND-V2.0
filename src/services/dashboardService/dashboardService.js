/**
 * ==========================================================
 * Servicio: Dashboard
 * Módulo: Dashboard
 *
 * Responsabilidad:
 * Centralizar toda la información utilizada por el Dashboard.
 * ==========================================================
 */

import { obtenerResumenOrganizacion } from "../organizationService/organizationService";
import { obtenerActivos } from "../activosService/activosService";
import { obtenerAlertas } from "../alertasService/alertasService";
import { obtenerActividades } from "../actividadesService/actividadesService";

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

    return {

        grupos: organizacion.grupos,

        fincas: organizacion.fincas,

        usuarios: organizacion.usuarios,

        roles: organizacion.roles,

        activos: activos.length,

        actividadesHoy: actividades.length,

        alertasActivas: alertas.filter(

            alerta => !alerta.atendida

        ).length,

        tareasPendientes: actividades.filter(

            actividad =>

                actividad.estado !== "Completada"

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