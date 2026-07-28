import { ClipboardList } from "lucide-react";

import { getWorkOrders } from "../../../services/makeService";

export default function PendingOrders() {

    const orders = getWorkOrders();

    const pendingOrders = orders.filter(
        (order) => order.status === "pending"
    );

    return (

        <section className="make-panel">

            <div className="panel-header">

                <h3>

                    Órdenes pendientes

                </h3>

            </div>

            {

                pendingOrders.length === 0 ? (

                    <div className="make-empty-state">

                        <div className="empty-icon">

                            <ClipboardList size={34} />

                        </div>

                        <h4>

                            No existen órdenes pendientes

                        </h4>

                        <p>

                            Las órdenes generadas desde las rutinas de MAKE aparecerán aquí para su seguimiento.

                        </p>

                    </div>

                ) : (

                    <div className="pending-orders-list">

                        {

                            pendingOrders.map(order => (

                                <div
    key={order.id}
    className="pending-order-card"
>

    <div className="pending-order-header">

        <ClipboardList size={18} />

        <strong>

            {order.routineName}

        </strong>

    </div>

    <div className="pending-order-date">

        <span>

            Inicio programado

        </span>

        <strong>

            {order.plannedDate}

        </strong>

    </div>

    <span className="status-badge pending">

        Pendiente

    </span>

</div>

                            ))

                        }

                    </div>

                )

            }

        </section>

    );

}