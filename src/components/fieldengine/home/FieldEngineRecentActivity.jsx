import { useEffect, useState } from "react";

import {
    ClipboardCheck,
    FilePlus2,
    Rocket,
    Brain,
    Package,
    TriangleAlert,
    CalendarCheck
} from "lucide-react";

import useFieldEngineDashboard from "../../../hooks/useFieldEngineDashboard";
import { formatRelativeTime } from "../../../utils/dateUtils";


export default function FieldEngineRecentActivity() {

    const dashboard = useFieldEngineDashboard();
    const [, setNow] = useState(() => new Date().getTime());

useEffect(() => {

    const interval = setInterval(() => {

        setNow(Date.now());

    }, 60000);

    return () => clearInterval(interval);

}, []);

const activity = dashboard.recentActivity.map(item => {

    const icons = {

        "field-engine": <FilePlus2 size={18} />,

        advisory: <Brain size={18} />,

        make: <ClipboardCheck size={18} />,

        activities: <CalendarCheck size={18} />,

        inventory: <Package size={18} />,

        alerts: <TriangleAlert size={18} />

    };

    return {

        ...item,

        icon:

            icons[item.source] ||

            <ClipboardCheck size={18} />

    };

});

    return (

        <section className="fe-home-section">

            <div className="fe-home-section__header">

                <div className="fe-home-section__title">

    <h2>

        Actividad reciente

    </h2>

    <span className="fe-home-counter">

        {activity.length} eventos

    </span>

</div>

                <p>

                    Últimos movimientos registrados dentro del módulo.

                </p>

            </div>

            <div className="fe-home-timeline fe-home-timeline--scroll">

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

    {formatRelativeTime(item.date)}

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