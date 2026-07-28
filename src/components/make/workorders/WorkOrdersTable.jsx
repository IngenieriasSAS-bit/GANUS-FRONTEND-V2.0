import {

    Eye,

    PlayCircle,

    PauseCircle,

    CheckCircle2,

} from "lucide-react";

export default function WorkOrdersTable({

    orders = [],

    onView,

    onStart,

    onPause,

    onComplete,

}) {

    return (

        <section className="workorders-table-wrapper">

            <table className="workorders-table">

                <thead>

                    <tr>

                        <th>Rutina</th>

                        <th>Estado</th>

                        <th>Prioridad</th>

                        <th>Operadores</th>

                        <th>Fecha</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.length === 0 && (

                            <tr>

                                <td

                                    colSpan="6"

                                    className="empty-table"

                                >

                                    No existen órdenes registradas.

                                </td>

                            </tr>

                        )

                    }

                    {

                        orders.map(order => (

                            <tr

                                key={order.id}

                            >

                                <td>

                                    <strong>

                                        {order.routineName}

                                    </strong>

                                </td>

                                <td>

                                    <span

                                        className={`status-badge ${order.status}`}

                                    >

                                        {order.status}

                                    </span>

                                </td>

                                <td>

                                    <span

                                        className={`priority-badge ${order.priority}`}

                                    >

                                        {order.priority}

                                    </span>

                                </td>

                                <td>

                                    {

                                        order.assignedOperators?.length ||

                                        0

                                    }

                                </td>

                                <td>

                                    {

                                        order.plannedDate ||

                                        "-"

                                    }

                                </td>

                                <td>

                                    <div className="table-actions">

                                        <button

                                            onClick={()=>

                                                onView?.(

                                                    order

                                                )

                                            }

                                        >

                                            <Eye size={17}/>

                                        </button>

                                        <button

                                            onClick={()=>

                                                onStart?.(

                                                    order

                                                )

                                            }

                                        >

                                            <PlayCircle size={17}/>

                                        </button>

                                        <button

                                            onClick={()=>

                                                onPause?.(

                                                    order

                                                )

                                            }

                                        >

                                            <PauseCircle size={17}/>

                                        </button>

                                        <button

                                            onClick={()=>

                                                onComplete?.(

                                                    order

                                                )

                                            }

                                        >

                                            <CheckCircle2 size={17}/>

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </section>

    );

}