import {
    ClipboardList,
    Play,
    CheckCircle2,
    Clock,
} from "lucide-react";

import { getWorkOrdersSummary } from "../../services/makeService";

export default function ExecutionMetrics() {

    const summary = getWorkOrdersSummary();

    const metrics = [

        {
            title: "Asignadas",
            value: summary.total,
            icon: ClipboardList,
        },

        {
            title: "Pendientes",
            value: summary.pending,
            icon: Clock,
        },

        {
            title: "En ejecución",
            value: summary.inProgress,
            icon: Play,
        },

        {
            title: "Finalizadas",
            value: summary.completed,
            icon: CheckCircle2,
        },

    ];

    return (

        <section className="execution-metrics">

            {

                metrics.map(metric => {

                    const Icon = metric.icon;

                    return (

                        <article
                            key={metric.title}
                            className="execution-metric-card"
                        >

                            <div className="execution-metric-icon">

                                <Icon size={24} />

                            </div>

                            <div className="execution-metric-content">

                                <h2>{metric.value}</h2>

                                <p>{metric.title}</p>

                            </div>

                        </article>

                    );

                })

            }

        </section>

    );

}