import {
    CalendarDays,
    Play,
    Eye,
    Flag,
    ClipboardList,
    User,
    ChevronRight,
} from "lucide-react";

export default function OrdenCard({

    order,

    onExecute,

}) {

    const completed = order.status === "completed";

    const statusMap = {

        pending: {
            label: "Pendiente",
            className: "pending",
        },

        in_progress: {
            label: "En ejecución",
            className: "running",
        },

        completed: {
            label: "Finalizada",
            className: "completed",
        },

    };

    const priorityMap = {

        low: "Baja",
        medium: "Media",
        high: "Alta",

    };

    const status = statusMap[order.status] || {

        label: order.status,

        className: "pending",

    };

    return (

        <article className="operativo-order-card">

            {/* HEADER */}

            <div className="operativo-order-header">

                <div className="operativo-order-icon">

                    <ClipboardList size={26} />

                </div>

                <div className="operativo-order-header-content">

                    <h3>

                        {order.routineName || "Sin nombre"}

                    </h3>

                    <p>

                        {order.templateName || "Plantilla sin nombre"}

                    </p>

                </div>

            </div>

            {/* BODY */}

            <div className="operativo-order-body">

                <div className="operativo-info-row">

                    <CalendarDays size={16} />

                    <span>

                        {order.plannedDate || "Sin fecha programada"}

                    </span>

                </div>

                <div className="operativo-info-row">

                    <User size={16} />

                    <span>

                        {order.assignedOperator || "Operador sin asignar"}

                    </span>

                </div>

                <div className="operativo-info-row">

                    <Flag size={16} />

                    <span>

                        Prioridad {priorityMap[order.priority] || order.priority}

                    </span>

                </div>

            </div>

            {/* FOOTER */}

            <div className="operativo-order-footer">

                <span className={`operativo-status ${status.className}`}>

                    {status.label}

                </span>

                <button

                    className="operativo-order-button"

                    onClick={() => onExecute(order)}

                >

                    {

                        completed

                            ? <Eye size={18}/>

                            : <Play size={18}/>

                    }

                    <span>

                        {

                            completed

                                ? "Ver Detalle"

                                : "Ejecutar Orden"

                        }

                    </span>

                    <ChevronRight size={18}/>

                </button>

            </div>

        </article>

    );

}