import {

    Clock3,

    CheckCircle2,

    PauseCircle,

    PlayCircle,

} from "lucide-react";

export default function TrackOrdersTable({

    orders = [],

    onView,

}) {

    const getStatusIcon = (status) => {

        switch (status) {

            case "pending":

                return <Clock3 size={16} />;

            case "in_progress":

                return <PlayCircle size={16} />;

            case "paused":

                return <PauseCircle size={16} />;

            case "completed":

                return <CheckCircle2 size={16} />;

            default:

                return <Clock3 size={16} />;

        }

    };

    return (

        <section className="track-orders-grid">

    {

        orders.length === 0 && (

            <div className="track-empty-card">

                No existen órdenes para supervisar.

            </div>

        )

    }

    {

        orders.map(order => (

            <article
                key={order.id}
                className="track-order-card"
            >

                <div className="track-order-top">

                    <div>

                        <small>

                            ORDEN DE TRABAJO

                        </small>

                        <h3>

                            {order.routineName}

                        </h3>

                    </div>

                    <span
                        className={`track-status ${order.status}`}
                    >

                        {getStatusIcon(order.status)}

                        {
    order.status === "pending"
        ? "Pendiente"
        : order.status === "in_progress"
        ? "En ejecución"
        : order.status === "paused"
        ? "Pausada"
        : order.status === "completed"
        ? "Finalizada"
        : order.status
}

                    </span>

                </div>

                <div className="track-order-info">

                    <span>

                        📅 {order.plannedDate}

                    </span>

                    <span>

                        👥 {order.assignedOperators?.length || 0} operadores

                    </span>

                    <span>

                        ⚑ {order.priority}

                    </span>

                </div>

                <button

                    className="track-detail-button"

                    onClick={() => onView(order)}

                >

                    Ver seguimiento

                </button>

            </article>

        ))

    }

</section>

    );

}