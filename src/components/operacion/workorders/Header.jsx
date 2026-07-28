import {
    ArrowLeft,
    ClipboardList,
    Calendar,
    Flag,
    Users,
} from "lucide-react";

export default function Header({

    workOrder,

    onBack,

}) {

    if (!workOrder) return null;

    return (

    <section className="wo-header">

        <button
            type="button"
            className="wo-back-button"
            onClick={onBack}
        >
            <ArrowLeft size={18}/>
            Volver
        </button>

        <div className="wo-header-card">

            <div className="wo-header-left">

                <div className="wo-header-icon">

                    <ClipboardList size={38}/>

                </div>

                <div>

                    <span className="wo-label">
                        ORDEN DE TRABAJO
                    </span>

                    <h1>

                        {workOrder.routineName || "Orden sin nombre"}

                    </h1>

                    <p>

                        Código

                        {" "}

                        {workOrder.id}

                    </p>

                </div>

            </div>

            <div className="wo-header-right">

                <div className="wo-info-item">

                    <Calendar size={18}/>

                    <span>

                        {workOrder.scheduledDate || workOrder.plannedDate || "--"}

                    </span>

                </div>

                <div className="wo-info-item">

                    <Flag size={18}/>

                    <span>

                        Prioridad

                        {" "}

                        {workOrder.priority}

                    </span>

                </div>

                <div className="wo-info-item">

                    <Users size={18}/>

                    <span>

                        {

                            workOrder.assignedOperators?.length

                            ?

                            workOrder.assignedOperators
                                .map(op=>op.nombre)
                                .join(", ")

                            :

                            "Sin operador asignado"

                        }

                    </span>

                </div>

            </div>

        </div>

    </section>

);

}