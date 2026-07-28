import {
    ClipboardList,
    Calendar,
    Flag,
    FileText,
    User,
    Package,
} from "lucide-react";

import {

    formatPriority,

    formatDate,

    formatConsumerModule,

    formatContextValue,

} from "../../../utils/formatters";

export default function WorkOrderContext({

    workOrder,

}) {

    if (!workOrder) {

        return null;

    }

    return (

        <section className="wo-context-card">

            <div className="wo-section-title">

                <ClipboardList size={20}/>

                <div>

                    <h3>Contexto de la orden</h3>

                    <p>

                        Información general de la orden de trabajo que será ejecutada.

                    </p>

                </div>

            </div>

            <div className="wo-context-grid">

                <div className="wo-context-item">

                    <FileText size={18}/>

                    <div>

                        <span>Rutina</span>

                        <strong>

                            {formatConsumerModule(workOrder.routineName)}

                        </strong>

                    </div>

                </div>

                <div className="wo-context-item">

                    <Package size={18}/>

                    <div>

                        <span>Plantilla</span>

                        <strong>

                            {formatConsumerModule(workOrder.templateName)}

                        </strong>

                    </div>

                </div>

                <div className="wo-context-item">

                    <Flag size={18}/>

                    <div>

                        <span>Prioridad</span>

                        <strong>

                            {formatPriority(workOrder.priority)}

                        </strong>

                    </div>

                </div>

                <div className="wo-context-item">

                    <Calendar size={18}/>

                    <div>

                        <span>Fecha programada</span>

                        <strong>

                            {formatDate(workOrder.plannedDate)}

                        </strong>

                    </div>

                </div>

                <div className="wo-context-item">

                    <User size={18}/>

                    <div>

                        <span>Responsables</span>

                        <strong>

                            {

                                workOrder.assignedOperators?.length

                                    ? workOrder.assignedOperators

                                          .map(

                                              operator =>

                                                  operator.nombre

                                          )

                                          .join(", ")

                                    : "-"

                            }

                        </strong>

                    </div>

                </div>

                <div className="wo-context-item">

                    <Package size={18}/>

                    <div>

                        <span>Activo</span>

                        <strong>

                            {formatContextValue(workOrder.contextValue)}

                        </strong>

                    </div>

                </div>

            </div>

        </section>

    );

}