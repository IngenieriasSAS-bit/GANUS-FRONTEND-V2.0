import { X } from "lucide-react";

export default function TrackOrderDetail({

    order,

    onClose,

}) {

    if (!order) return null;

    return (

        <div
            className="track-detail-overlay"
            onMouseDown={onClose}
        >

            <div
                className="track-detail-modal"
                onMouseDown={(e)=>e.stopPropagation()}
            >

                <header className="track-detail-header">

                    <div>

                        <span>

                            Seguimiento operativo

                        </span>

                        <h2>

                            {order.routineName}

                        </h2>

                    </div>

                    <button onClick={onClose}>

                        <X size={20}/>

                    </button>

                </header>

                <section className="track-detail-body">

                    <div className="track-detail-item">

                        <label>Código</label>

                        <strong>{order.id}</strong>

<div className="track-detail-item">

    <label>Código</label>

    <strong>{order.id}</strong>

</div>


                    </div>

                    <div className="track-detail-item">

                        <label>Estado</label>

                        <strong>{order.status}</strong>

                    </div>

                    <div className="track-detail-item">

                        <label>Prioridad</label>

                        <strong>{order.priority}</strong>

                    </div>

                    <div className="track-detail-item">

                        <label>Programada</label>

                        <strong>{order.plannedDate}</strong>

                    </div>

                    <div className="track-detail-item">

                        <label>Operadores</label>

                        <strong>

                            {order.assignedOperators?.length || 0}

                        </strong>

                    </div>

                    <div className="track-detail-item">

                        <label>Formulario</label>

                        <strong>

                            {order.templateName || "-"}

                        </strong>

                    </div>

                        <div className="track-detail-progress">

    <div className="track-progress-header">

        <span>Avance de ejecución</span>

        <strong>

            {order.status === "completed"
                ? "100%"
                : order.status === "in_progress"
                ? "65%"
                : order.status === "paused"
                ? "40%"
                : "10%"}

        </strong>

    </div>

    <div className="track-progress-bar">

        <div
            className={`track-progress-fill ${order.status}`}
        />

    </div>

</div>

                </section>

                <footer className="track-detail-footer">

                    <button
                        className="track-close-button"
                        onClick={onClose}
                    >

                        Cerrar

                    </button>

                </footer>

            </div>

        </div>

    );

}