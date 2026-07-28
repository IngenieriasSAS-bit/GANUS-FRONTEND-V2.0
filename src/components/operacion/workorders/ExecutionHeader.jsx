import {
    ClipboardCheck,
    CircleGauge,
    User,
} from "lucide-react";

const STATUS_LABELS = {

    pending:"Pendiente",

    assigned:"Asignada",

    scheduled:"Programada",

    in_progress:"En ejecución",

    paused:"Pausada",

    completed:"Finalizada",

    cancelled:"Cancelada",

};

export default function ExecutionHeader({

    workOrder,

}){

    if(!workOrder){

        return null;

    }

    const progress =

    workOrder.execution?.progress ??

    workOrder.progress ??

    0;

        const orderCode =

    workOrder.code ||

    `OT-${String(

        workOrder.sequence ||

        1

    ).padStart(6, "0")}`;

    const operators =

        workOrder.assignedOperators?.length

            ? workOrder.assignedOperators

                  .map(item=>item.nombre)

                  .join(", ")

            : "Sin asignar";

    return(

        <section className="execution-header">

            <div className="execution-header-top">

                <div>

                    <small>

                        Orden de trabajo

                    </small>

                    <h2>

    {orderCode}

</h2>

                </div>

                <div className="execution-status-pill">

                    {

                        STATUS_LABELS[workOrder.status] ||

                        workOrder.status

                    }

                </div>

            </div>

            <div className="execution-progress">

                <div className="execution-progress-info">

                    <CircleGauge size={18}/>

                    <span>

                        Progreso

                    </span>

                    <strong>

                        {progress}%

                    </strong>

                </div>

                <div className="execution-progress-bar">

                    <div

                        style={{

                            width:`${progress}%`

                        }}

                    />

                </div>

            </div>

            <div className="execution-header-footer">

                <div>

                    <ClipboardCheck size={18}/>

                    <span>

                        {workOrder.templateName}

                    </span>

                </div>

                <div>

                    <User size={18}/>

                    <span>

                        {operators}

                    </span>

                </div>

            </div>

        </section>

    );

}