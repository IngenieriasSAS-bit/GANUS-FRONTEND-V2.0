import {
    Play,
    Pause,
    CheckCircle2,
    CalendarDays,
    Users,
    Flag,
    ClipboardList,
} from "lucide-react";

import {

    startWorkOrder,

    pauseWorkOrder,

    resumeWorkOrder,

    finishWorkOrderExecution,

} from "../../services/makeService";

const STATUS = {

    pending: {
        text: "Pendiente",
        className: "warning",
    },

    in_progress: {
        text: "En ejecución",
        className: "success",
    },

    paused: {
        text: "Pausada",
        className: "secondary",
    },

    completed: {
        text: "Finalizada",
        className: "primary",
    },

};

export default function OrdenesActivas({

    ordenes = [],

}) {

    const cambiarEstado = (orden, accion) => {

    try {

        switch (accion) {

            case "start":

                startWorkOrder(orden.id);

                break;

            case "pause":

                pauseWorkOrder(orden.id);

                break;

            case "resume":

                resumeWorkOrder(orden.id);

                break;

            case "finish":

                finishWorkOrderExecution(
                    orden.id,
                    orden.execution?.responses || {}
                );

                break;

            default:

                break;

        }

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

};

    if (!ordenes.length) {

        return (

            <section className="operacion-section">

                <h2>

                    Órdenes Activas

                </h2>

                <div className="operacion-empty">

                    No existen órdenes de trabajo.

                </div>

            </section>

        );

    }

    return (

        <section className="operacion-section">

            <div className="operacion-section-header">

                <h2>

                    Órdenes Activas

                </h2>

                <span>

                    {ordenes.length} orden(es)

                </span>

            </div>

            <div className="operacion-orders-grid">

                {

                    ordenes.slice(0,6).map((orden) => {
                        console.log("OPERADORES:", orden.assignedOperators);

                        const estado =

                            STATUS[orden.status] ||

                            {

                                text: orden.status,

                                className: "primary",

                            };

                        return (

                            <article

                                key={orden.id}

                                className="operacion-order-card"

                            >

                                <div className="operacion-order-header">

                                    <div className="operacion-order-icon">

                                        <ClipboardList size={22} />

                                    </div>

                                    <div>

                                        <h3>

                                            {orden.routineName}

                                        </h3>

                                        <span

                                            className={`status-badge ${estado.className}`}

                                        >

                                            {estado.text}

                                        </span>

                                    </div>

                                </div>

                                <div className="operacion-order-info">

                                    <div>

                                        <CalendarDays size={16} />

                                        <span>

                                            {

                                                orden.plannedDate ||

                                                "Sin fecha"

                                            }

                                        </span>

                                    </div>

                                    <div>

                                        <Flag size={16} />

                                        <span>

                                            {orden.priority}

                                        </span>

                                    </div>

                                    <div>

                                        <Users size={16} />

                                        <span>

                                            {

                                                orden.assignedOperators

                                                    ?.map(

                                                        item => item.nombre

                                                    )

                                                    .join(", ")

                                            }

                                        </span>

                                    </div>

                                </div>

                                <div className="operacion-order-actions">

    {orden.status === "pending" && (

        <button
            className="ganus-btn-success"
            onClick={() => cambiarEstado(orden, "start")}
        >
            <Play size={16} />
            Iniciar
        </button>

    )}

    {orden.status === "in_progress" && (

        <>

            <button
                className="ganus-btn-warning"
                onClick={() => cambiarEstado(orden, "pause")}
            >
                <Pause size={16} />
                Pausar
            </button>

            <button
                className="ganus-btn-primary"
                onClick={() => cambiarEstado(orden, "finish")}
            >
                <CheckCircle2 size={16} />
                Finalizar
            </button>

        </>

    )}

    {orden.status === "paused" && (

        <>

            <button
                className="ganus-btn-success"
                onClick={() => cambiarEstado(orden, "resume")}
            >
                <Play size={16} />
                Reanudar
            </button>

            <button
                className="ganus-btn-primary"
                onClick={() => cambiarEstado(orden, "finish")}
            >
                <CheckCircle2 size={16} />
                Finalizar
            </button>

        </>

    )}

    {orden.status === "completed" && (

        <div className="operacion-order-completed">

            <CheckCircle2 size={18} />

            <span>Orden finalizada</span>

        </div>

    )}

</div>

                            </article>

                        );

                    })

                }

            </div>

        </section>

    );

}