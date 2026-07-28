import {
    ClipboardCheck,
    CalendarClock,
    Users,
    Layers
} from "lucide-react";


import PrimaryButton from "../../common/PrimaryButton";

export default function SummaryStep({

    routine,

    onFinish,

    isEditing = false,

}) {

    

    return (

        <section className="make-summary">

            <div className="step-section-header">

                <div className="step-section-icon">

                    <ClipboardCheck size={22} />

                </div>

                <div>

                    <h3>

                        Resumen Ejecutivo

                    </h3>

                    <p>

                        Revise la información antes de crear la rutina operativa.

                    </p>

                </div>

            </div>

            <div className="summary-grid">

                <div className="summary-item">

                    <Layers size={20} />

                    <strong>

                        Plantilla

                    </strong>

                    <span>

                        {routine.template?.name || "No seleccionada"}

                    </span>

                </div>

                <div className="summary-item">

                    <Layers size={20} />

                    <strong>

                        Módulo

                    </strong>

                    <span>

                        {routine.template?.consumerModule || "-"}

                    </span>

                </div>

               <div className="summary-item">

    <Users size={20} />

    <strong>

        Operadores

    </strong>

    <div>

        {

            routine.operators.length > 0

                ? routine.operators.map((operator) => (

                    <div key={operator.id}>

                        {operator.nombre}

                        <small>

                            {" "}— {operator.rol}

                        </small>

                    </div>

                ))

                : (

                    <span>

                        Sin asignar

                    </span>

                )

        }

    </div>

</div>

                <div className="summary-item">

                    <CalendarClock size={20} />

                    <strong>

                        Programación

                    </strong>

                    <span>

                        {

                            routine.schedule?.frequency ||

                            "No definida"

                        }

                    </span>

                </div>

            </div>

            <div className="summary-actions">

                <PrimaryButton
    onClick={onFinish}
>

    {

        isEditing

            ? "Guardar cambios"

            : "Crear Rutina"

    }

</PrimaryButton>

            </div>

        </section>

    );

}