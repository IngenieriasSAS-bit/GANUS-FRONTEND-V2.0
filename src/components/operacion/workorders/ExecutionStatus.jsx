import {
    Calendar,
    Clock3,
    ClipboardCheck,
    User,
} from "lucide-react";

import { getUsersByIds } from "../../../services/organizationService";

const STATUS_LABELS = {
    pending: "Pendiente",
    assigned: "Asignada",
    scheduled: "Programada",
    in_progress: "En ejecución",
    paused: "Pausada",
    completed: "Completada",
    cancelled: "Cancelada",
};

const formatDate = (date) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("es-CO", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(date));
};

export default function ExecutionStatus({ workOrder }) {



    const execution = workOrder.execution || {};

    const operators = getUsersByIds(

    workOrder.assignedOperatorIds || []

);

    const responsables =

    operators.length

        ? operators

        : [];

    return (
        <section className="wo-status-card">

            <div className="wo-status-header">

                <h3>Estado de la ejecución</h3>

                <span className={`wo-status-badge ${workOrder.status}`}>
                    {STATUS_LABELS[workOrder.status] || workOrder.status}
                </span>

            </div>

            <div className="wo-status-grid">

                <div>

                    <ClipboardCheck size={18} />

                    <div>

                        <small>Plantilla</small>

                        <strong>
                            {workOrder.templateName || "-"}
                        </strong>

                    </div>

                </div>

                <div>

                    <Clock3 size={18} />

                    <div>

                        <small>Último guardado</small>

                        <strong>
                            {formatDate(execution.lastSavedAt)}
                        </strong>

                    </div>

                </div>

                <div>

                    <Calendar size={18} />

                    <div>

                        <small>Inicio de ejecución</small>

                        <strong>
                            {formatDate(

    execution.startedAt ||

    workOrder.createdAt

)}
                        </strong>

                    </div>

                </div>

                <div>

                    <User size={18} />

                    <div>

                        <small>Responsables</small>

                        <div className="wo-operators">

    {

        responsables.length === 0

            ? (

                <span>

                    Sin responsables

                </span>

            )

            : responsables.map(operator => (

                <div

                    key={operator.id}

                    className="wo-operator"

                >

                    <strong>

                        {operator.nombre}

                    </strong>

                    <small>

                        {operator.rol}

                    </small>

                </div>

            ))

    }

</div>

                    </div>

                </div>

            </div>

        </section>
    );

}