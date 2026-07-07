/**
 * ---------------------------------------------------------
 * Componente: ResumenOrganizacion
 * Módulo: Organización
 * Responsabilidad:
 * Mostrar los indicadores principales del módulo.
 * ---------------------------------------------------------
 */

import StatCard from "../common/StatCard";

import "./ResumenOrganizacion.css";

export default function ResumenOrganizacion() {

    return (

        <section className="organizacion-resumen">

            <StatCard
                title="Grupos Empresariales"
                value="1"
                subtitle="Grupo registrado"
            />

            <StatCard
                title="Fincas"
                value="3"
                subtitle="Fincas activas"
            />

            <StatCard
                title="Usuarios"
                value="12"
                subtitle="Usuarios registrados"
            />

            <StatCard
                title="Roles"
                value="5"
                subtitle="Roles configurados"
            />

        </section>

    );

}