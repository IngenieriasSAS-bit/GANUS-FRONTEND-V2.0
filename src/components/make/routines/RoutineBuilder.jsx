import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
    createRoutineFromTemplate,
    updateRoutine,
} from "../../../services/makeService";

import TemplateStep from "../steps/TemplateStep";
import ContextStep from "../steps/ContextStep";
import ScopeStep from "../steps/ScopeStep";
import OperatorsStep from "../steps/OperatorsStep";
import ScheduleStep from "../steps/ScheduleStep";
import SummaryStep from "../steps/SummaryStep";
import StepIndicator from "../shared/StepIndicator";

const STEPS = [
    "Plantilla",
    "Contexto",
    "Alcance",
    "Operadores",
    "Programación",
    "Resumen",
];

export default function RoutineBuilder({
    routine: editingRoutine = null,
    onFinish,
}) {

    const [currentStep, setCurrentStep] = useState(0);

    const [routine, setRoutine] = useState({
        template: null,
        scope: {},
        operators: [],
        schedule: {},
    });

    useEffect(() => {

    if (!editingRoutine) {

        return;

    }

    queueMicrotask(() => {

        setRoutine({

            id: editingRoutine.id,

            name: editingRoutine.name,

            description: editingRoutine.description,

            template: {

                id: editingRoutine.templateId,

                name: editingRoutine.templateName,

                consumerModule: editingRoutine.consumerModule,

            },

            scope: editingRoutine.scope || {},

            operators: editingRoutine.operators || [],

            schedule: editingRoutine.schedule || {},

            status: editingRoutine.status,

        });

    });

}, [editingRoutine]);

    const nextStep = () => {

    switch (currentStep) {

        case 0:

            if (!routine.template) {

                alert("Debe seleccionar una plantilla.");

                return;

            }

            break;

        case 2:

            if (!routine.scope?.groupId) {

                alert("Debe seleccionar un grupo empresarial.");

                return;

            }

            break;

        case 3:

            if (routine.operators.length === 0) {

                alert("Debe asignar al menos un operador.");

                return;

            }

            break;

        case 4:

            if (!routine.schedule?.frequency) {

                alert("Debe definir una programación.");

                return;

            }

            break;

        default:
            break;

    }

    setCurrentStep((prev) => prev + 1);

};

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleFinish = () => {

    try {

        if (editingRoutine) {

            updateRoutine(
                editingRoutine.id,
                {
                    name: routine.name,
                    description: routine.description,
                    scope: routine.scope,
                    operators: routine.operators,
                    schedule: routine.schedule,
                    status: "active",
                }
            );

            alert("Rutina actualizada correctamente.");

        } else {

            createRoutineFromTemplate(
                routine.template.id,
                {
                    scope: routine.scope,
                    operators: routine.operators,
                    schedule: routine.schedule,
                    status: "active",
                }
            );

            alert("Rutina creada correctamente.");

        }

        onFinish?.();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

};

    return (

        <div className="make-builder">

            <div className="page-header">

                <h2>
                    {editingRoutine ? "Editar Rutina" : "Nueva Rutina"}
                </h2>

                <p>
                    Configure una rutina operativa basada en una plantilla publicada.
                </p>

            </div>

            <StepIndicator
                steps={STEPS}
                currentStep={currentStep}
            />

            {currentStep === 0 && (
                <TemplateStep
    routine={routine}
    setRoutine={setRoutine}
    isEditing={!!editingRoutine}
/>
            )}

            {currentStep === 1 && (
                <ContextStep
                    routine={routine}
                />
            )}

            {currentStep === 2 && (
                <ScopeStep
                    routine={routine}
                    setRoutine={setRoutine}
                />
            )}

            {currentStep === 3 && (
                <OperatorsStep
                    routine={routine}
                    setRoutine={setRoutine}
                />
            )}

            {currentStep === 4 && (
                <ScheduleStep
                    routine={routine}
                    setRoutine={setRoutine}
                />
            )}

            {currentStep === 5 && (

    <SummaryStep

        routine={routine}

        onFinish={handleFinish}

        isEditing={!!editingRoutine}

    />

)}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 30,
                    paddingTop: 20,
                    borderTop: "1px solid #E5E7EB",
                }}
            >

                {currentStep > 0 ? (
                    <button
                        type="button"
                        onClick={previousStep}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "12px 20px",
                            borderRadius: 12,
                            border: "1px solid #D1D5DB",
                            background: "#FFFFFF",
                            cursor: "pointer",
                        }}
                    >
                        <ArrowLeft size={18} />
                        Anterior
                    </button>
                ) : (
                    <div />
                )}

                {currentStep < STEPS.length - 1 && (
                    <button
                        type="button"
                        onClick={nextStep}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "12px 20px",
                            borderRadius: 12,
                            border: "none",
                            background: "#082B55",
                            color: "#FFFFFF",
                            cursor: "pointer",
                        }}
                    >
                        Siguiente
                        <ArrowRight size={18} />
                    </button>
                )}

            </div>

        </div>

    );

}