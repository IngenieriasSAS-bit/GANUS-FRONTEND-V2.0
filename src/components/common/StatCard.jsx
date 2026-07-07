/**
 * ---------------------------------------------------------
 * Componente: StatCard
 * Responsabilidad:
 * Mostrar una tarjeta de información resumida.
 * ---------------------------------------------------------
 */

import "./StatCard.css";

export default function StatCard({

    title,

    value,

    subtitle

}) {

    return (

        <article className="stat-card">

            <h3 className="stat-card__title">

                {title}

            </h3>

            <h2 className="stat-card__value">

                {value}

            </h2>

            <p className="stat-card__subtitle">

                {subtitle}

            </p>

        </article>

    );

}