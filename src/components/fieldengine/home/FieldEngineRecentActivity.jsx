import {
    ClipboardCheck,
    FilePlus2,
    Rocket
} from "lucide-react";

import useFieldEngineDashboard from "../../../hooks/useFieldEngineDashboard";



export default function FieldEngineRecentActivity() {

    const dashboard = useFieldEngineDashboard();

const activity = dashboard.recentActivity.map(item => ({

    ...item,

    icon:

        item.type === "template"

            ? <FilePlus2 size={18} />

            : <ClipboardCheck size={18} />

}));

    return (

        <section className="fe-home-section">

            <div className="fe-home-section__header">

                <h2>

                    Actividad reciente

                </h2>

                <p>

                    Últimos movimientos registrados dentro del módulo.

                </p>

            </div>

            <div className="fe-home-timeline">

                {

                    activity.length === 0 ? (

                        <div className="fe-home-empty">

                            <Rocket size={34} />

                            <h3>

                                Sin actividad

                            </h3>

                            <p>

                                Aún no existen movimientos registrados.

                            </p>

                        </div>

                    ) : (

                        activity.map(item => (

                            <article

                                key={item.id}

                                className="fe-home-timeline-item"

                            >

                                <div className="fe-home-timeline-icon">

                                    {item.icon}

                                </div>

                                <div>

                                    <strong>

                                        {item.title}

                                    </strong>

                                    <p>

                                        {item.description}

                                    </p>

                                    <small>

                                        {

                                            new Date(

                                                item.date

                                            ).toLocaleString("es-CO")

                                        }

                                    </small>

                                </div>

                            </article>

                        ))

                    )

                }

            </div>

        </section>

    );

}