import {
    ClipboardList,
    PlayCircle,
    CheckCircle2,
    Bell,
} from "lucide-react";

export default function OperacionStats({
    resumen,
}) {

    const cards = [

        {
            titulo: "Órdenes Pendientes",
            valor: resumen.ordenesPendientes,
            icono: ClipboardList,
            color: "blue",
        },

        {
            titulo: "En Ejecución",
            valor: resumen.ordenesProceso,
            icono: PlayCircle,
            color: "green",
        },

        {
            titulo: "Finalizadas",
            valor: resumen.ordenesFinalizadas,
            icono: CheckCircle2,
            color: "success",
        },

        {
            titulo: "Alertas",
            valor: resumen.alertas,
            icono: Bell,
            color: "warning",
        },

    ];

    return (

        <section className="operacion-section">

            <h2>

                Resumen Operativo

            </h2>

            <div className="operacion-stats">

                {

                    cards.map((card) => {

                        const Icon = card.icono;

                        return (

                            <article

                                key={card.titulo}

                                className="operacion-stat-card"

                            >

                                <div className="operacion-stat-top">

                                    <div
                                        className={`operacion-stat-icon ${card.color}`}
                                    >

                                        <Icon size={28} />

                                    </div>

                                    <div className="operacion-stat-info">

                                        <span className="operacion-stat-number">

                                            {card.valor}

                                        </span>

                                        <p>

                                            {card.titulo}

                                        </p>

                                    </div>

                                </div>

                                <div
                                    className={`operacion-stat-bar ${card.color}`}
                                />

                            </article>

                        );

                    })

                }

            </div>

        </section>

    );

}