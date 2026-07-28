/**
 * ---------------------------------------------------------
 * Componente: ResumenOrganizacion
 * Módulo: Organización
 *
 * Responsabilidad:
 * Mostrar indicadores calculados desde el servicio.
 * ---------------------------------------------------------
 */

import StatCard from "../common/StatCard";

import {

    obtenerResumenOrganizacion,

} from "../../services/organizationService";

import "./ResumenOrganizacion.css";

export default function ResumenOrganizacion() {

    const resumen = obtenerResumenOrganizacion();

    return (

        <section className="organizacion-resumen">

            <StatCard
                title="Grupos Empresariales"
                value={resumen.grupos}
                subtitle="Grupos registrados"
            />

            <StatCard
                title="Fincas"
                value={resumen.fincas}
                subtitle="Fincas registradas"
            />

            <StatCard
                title="Usuarios"
                value={resumen.usuarios}
                subtitle="Usuarios registrados"
            />

            <StatCard
                title="Roles"
                value={resumen.roles}
                subtitle="Roles configurados"
            />

        </section>

    );

}