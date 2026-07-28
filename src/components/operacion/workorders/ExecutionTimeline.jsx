import {
    Clock3,
    Play,
    Save,
    FileText,
    CheckCircle2,
} from "lucide-react";

const ICONS = {

    created: Clock3,

    started: Play,

    saved: Save,

    observations: FileText,

    completed: CheckCircle2,

    "status-change": Clock3,

};

const LABELS = {

    created: "Orden creada",

    started: "Orden iniciada",

    saved: "Progreso guardado",

    observations: "Observaciones actualizadas",

    completed: "Orden finalizada",

    "status-change": "Cambio de estado",

};

const formatDate = (date) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("es-CO", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(date));
};

export default function ExecutionTimeline({

    history = [],

}) {

    return (

        <section className="wo-timeline-card">

            <div className="wo-section-title">

                <Clock3 size={20}/>

                <div>

                    <h3>Bitácora de ejecución</h3>

                    <p>
                        Registro cronológico de todas las acciones realizadas durante la ejecución de la orden.
                    </p>

                </div>

            </div>

            <div className="wo-timeline">

                {

                    history.length === 0 && (

                        <p className="wo-empty">

                            No existen eventos registrados.

                        </p>

                    )

                }

                {

                    history.map((event)=>{

                        const Icon =
                            ICONS[event.action] || Clock3;

                        return (

                            <div
                                key={event.id}
                                className="wo-event"
                            >

                                <div className="wo-event-icon">

                                    <Icon size={18}/>

                                </div>

                                <div>

                                    <strong>

                                        {

                                            LABELS[event.action] ||

                                            event.action

                                        }

                                    </strong>

                                    <small>

                                        {

                                            formatDate(event.date)

                                        }

                                    </small>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </section>

    );

}