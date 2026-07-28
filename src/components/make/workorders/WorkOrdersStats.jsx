import {

    Clock3,

    CalendarClock,

    PlayCircle,

    CheckCircle2,

    XCircle,

    AlertTriangle,

} from "lucide-react";

const CARDS = [

    {

        key: "pending",

        title: "Pendientes",

        icon: Clock3,

    },

    {

        key: "scheduled",

        title: "Programadas",

        icon: CalendarClock,

    },

    {

        key: "inProgress",

        title: "En ejecución",

        icon: PlayCircle,

    },

    {

        key: "completed",

        title: "Finalizadas",

        icon: CheckCircle2,

    },

    {

        key: "cancelled",

        title: "Canceladas",

        icon: XCircle,

    },

    {

        key: "expired",

        title: "Vencidas",

        icon: AlertTriangle,

    },

];

export default function WorkOrdersStats({

    summary = {},

}) {

    const total = summary.total || 0;

    return (

        <section className="workorders-stats">

            {

                CARDS.map(card => {

                    const Icon = card.icon;

                    const value = summary[card.key] || 0;

                    const percentage =

                        total

                            ? Math.round(

                                  (value * 100) /

                                      total

                              )

                            : 0;

                    return (

                        <article

                            key={card.key}

                            className="workorders-stat-card"

                        >

                            <div className="stat-icon">

                                <Icon size={22} />

                            </div>

                            <div className="stat-content">

                                <h3>

                                    {value}

                                </h3>

                                <span>

                                    {card.title}

                                </span>

                                <small>

                                    {percentage}% del total

                                </small>

                            </div>

                        </article>

                    );

                })

            }

        </section>

    );

}