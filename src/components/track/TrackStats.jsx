import {

    Activity,

    PlayCircle,

    PauseCircle,

    CheckCircle2,

} from "lucide-react";

export default function TrackStats({

    stats,

}) {

    const cards = [

        {

            title: "En ejecución",

            value: stats.inProgress,

            icon: PlayCircle,

        },

        {

            title: "Pausadas",

            value: stats.paused,

            icon: PauseCircle,

        },

        {

            title: "Finalizadas",

            value: stats.completed,

            icon: CheckCircle2,

        },

        {

            title: "Total",

            value: stats.total,

            icon: Activity,

        },

    ];

    return (

        <section className="track-stats">

            {

                cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <article

                            key={card.title}

                            className="track-stat-card"

                        >

                            <div className="track-stat-icon">

                                <Icon size={24}/>

                            </div>

                            <div>

                                <h2>

                                    {card.value}

                                </h2>

                                <span>

                                    {card.title}

                                </span>

                            </div>

                        </article>

                    );

                })

            }

        </section>

    );

}