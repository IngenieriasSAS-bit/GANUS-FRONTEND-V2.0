import {

    X,

    ClipboardList,

    User,

    Calendar,

    Flag,

    MapPinned,

    Clock3,

} from "lucide-react";

export default function WorkOrderDetails({

    order,

    open,

    onClose,

}) {

    if (!open || !order) {

        return null;

    }

    return (

        <div className="workorder-details-overlay">

            <aside className="workorder-details">

                <header>

                    <div>

                        <h2>

                            Detalle de la Orden

                        </h2>

                        <small>

                            {order.id}

                        </small>

                    </div>

                    <button

                        onClick={onClose}

                    >

                        <X size={20}/>

                    </button>

                </header>

                <section className="details-section">

                    <h3>

                        Información General

                    </h3>

                    <div className="detail-item">

                        <ClipboardList size={18}/>

                        <div>

                            <strong>

                                Rutina

                            </strong>

                            <span>

                                {order.routineName}

                            </span>

                        </div>

                    </div>

                    <div className="detail-item">

                        <Flag size={18}/>

                        <div>

                            <strong>

                                Prioridad

                            </strong>

                            <span>

                                {order.priority}

                            </span>

                        </div>

                    </div>

                    <div className="detail-item">

                        <Clock3 size={18}/>

                        <div>

                            <strong>

                                Estado

                            </strong>

                            <span>

                                {order.status}

                            </span>

                        </div>

                    </div>

                </section>

                <section className="details-section">

                    <h3>

                        Contexto

                    </h3>

                    <div className="detail-item">

                        <MapPinned size={18}/>

                        <div>

                            <strong>

                                Contexto

                            </strong>

                            <span>

                                {order.contextValue || "-"}

                            </span>

                        </div>

                    </div>

                    <div className="detail-item">

                        <ClipboardList size={18}/>

                        <div>

                            <strong>

                                Plantilla

                            </strong>

                            <span>

                                {order.templateName}

                            </span>

                        </div>

                    </div>

                </section>

                <section className="details-section">

                    <h3>

                        Operadores

                    </h3>

                    {

                        order.assignedOperators?.length

                            ? order.assignedOperators.map(

                                (operator,index)=>(

                                    <div

                                        key={index}

                                        className="detail-item"

                                    >

                                        <User size={18}/>

                                        <span>

                                            {operator}

                                        </span>

                                    </div>

                                )

                            )

                            :

                            <p>

                                No existen operadores asignados.

                            </p>

                    }

                </section>

                <section className="details-section">

                    <h3>

                        Programación

                    </h3>

                    <div className="detail-item">

                        <Calendar size={18}/>

                        <div>

                            <strong>

                                Fecha Programada

                            </strong>

                            <span>

                                {

                                    order.plannedDate ||

                                    "-"

                                }

                            </span>

                        </div>

                    </div>

                </section>

                <section className="details-section">

                    <h3>

                        Historial

                    </h3>

                    {

                        order.history?.length

                        ?

                        order.history.map(item=>(

                            <div

                                key={item.id}

                                className="history-item"

                            >

                                <strong>

                                    {item.action}

                                </strong>

                                <small>

                                    {item.date}

                                </small>

                            </div>

                        ))

                        :

                        <p>

                            No hay registros.

                        </p>

                    }

                </section>

            </aside>

        </div>

    );

}