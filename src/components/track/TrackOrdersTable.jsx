import {

    Eye,

    Clock3,

    CheckCircle2,

    PauseCircle,

    PlayCircle,

} from "lucide-react";

export default function TrackOrdersTable({

    orders = [],

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

        <section className="track-table-container">

            <div className="track-table-header">

                <h2>

                    Seguimiento Operativo

                </h2>

                <span>

                    {orders.length} órdenes registradas

                </span>

            </div>

            <table className="track-table">

                <thead>

                    <tr>

                        <th>Orden</th>

                        <th>Rutina</th>

                        <th>Estado</th>

                        <th>Prioridad</th>

                        <th>Operadores</th>

                        <th>Programada</th>

                        <th>Acción</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.length === 0 && (

                            <tr>

                                <td

                                    colSpan="7"

                                    className="track-empty"

                                >

                                    No existen órdenes para supervisar.

                                </td>

                            </tr>

                        )

                    }

                    {

                        orders.map(order => (

                            <tr key={order.id}>

                                <td>

                                    {order.id.slice(0,8)}

                                </td>

                                <td>

                                    {order.routineName}

                                </td>

                                <td>

                                    <span

                                        className={`track-status ${order.status}`}

                                    >

                                        {getStatusIcon(order.status)}

                                        {order.status}

                                    </span>

                                </td>

                                <td>

                                    {order.priority}

                                </td>

                                <td>

                                    {

                                        order.assignedOperators?.length || 0

                                    }

                                </td>

                                <td>

                                    {

                                        order.plannedDate || "-"

                                    }

                                </td>

                                <td>

                                    <button

                                        className="track-view-button"

                                    >

                                        <Eye size={17}/>

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </section>

    );

}