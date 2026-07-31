import {

    useEffect,

    useMemo,
     
    useRef,
    
    useState,

} from "react";



import Header from "./Header";
import ProgressBar from "./ProgressBar";
import DynamicForm from "./DynamicForm";
import OperatorObservations from "./OperatorObservations";
import ExecutionTimeline from "./ExecutionTimeline";
import ExecutionEvidence from "./ExecutionEvidence";
import {

    getExecutionEvidencesByOrder,

    saveExecutionEvidence,

    deleteExecutionEvidence,

} from "../../../services/executionEvidenceService";


import { getPublishedTemplateById } from "../../../services/fieldEngineService";

import {

    startWorkOrder,

    saveWorkOrderExecution,

    finishWorkOrderExecution,

} from "../../../services/makeService";
import ExecutionStatus from "./ExecutionStatus";
import WorkOrderContext from "./WorkOrderContext";
import ExecutionHeader from "./ExecutionHeader";

export default function WorkOrderExecution({

    workOrder,

    onBack,

    onSave,

    onFinish,

}) {

    const [values, setValues] = useState({});

    const [observations, setObservations] = useState(
        
    workOrder.observations || ""
);

    const [evidences, setEvidences] = useState([]);

    const [saveMessage, setSaveMessage] = useState("");

    const [isSaving, setIsSaving] = useState(false);

    const startedRef = useRef(false);

    const template = workOrder?.templateId
    ? getPublishedTemplateById(workOrder.templateId)
    : null;

    const handleChange = (fieldId, value) => {

        setValues(previous => ({

            ...previous,

            [fieldId]: value,

        }));

    };

    const totalFields = useMemo(() => {

        if (!template?.sections) {

            return 0;

        }

        return template.sections.reduce(

            (total, section) =>

                total +

                (section.fields?.length || 0),

            0

        );

    }, [template]);

    const completedFields = useMemo(() => {

        return Object.values(values).filter(

            value =>

                value !== "" &&

                value !== null &&

                value !== undefined

        ).length;

    }, [values]);

    const handleSave = () => {   
        setIsSaving(true);

    const progress =

        totalFields === 0
            ? 0
            : Math.round(
                (completedFields / totalFields) * 100
            );

    saveWorkOrderExecution(

    workOrder.id,

    {

        responses: values,

        observations,

    },

    progress

);

    setSaveMessage("Progreso guardado correctamente.");

setTimeout(() => {

    setSaveMessage("");

    setIsSaving(false);

}, 2000);

    onSave?.({

        values,

        progress,

    });

};

const handleFinish = () => {

    if(completedFields!==totalFields){

        const continuar=window.confirm(

            "Todavía existen campos sin diligenciar. ¿Desea finalizar de todas formas?"

        );

        if(!continuar){

            return;

        }

    }

    finishWorkOrderExecution(

    workOrder.id,

    {

        responses: values,

        observations,

    }

);


    

    onFinish?.({

        values,

        completed:true,

    });

    onBack();

};



useEffect(() => {

    if (!workOrder?.id) {
        return;
    }

    if (startedRef.current) {
        return;
    }

    if (workOrder.status !== "pending") {
        return;
    }

    startedRef.current = true;

    startWorkOrder(workOrder.id);

}, [workOrder]);

useEffect(() => {

    if (!workOrder?.execution?.responses) {
        return;
    }

    setTimeout(() => {
        setValues(workOrder.execution.responses);
    }, 0);

}, [workOrder]);

useEffect(() => {

    if (!workOrder?.id) {

        return;

    }

    queueMicrotask(() => {

        setEvidences(

            getExecutionEvidencesByOrder(

                workOrder.id

            )

        );

    });

}, [workOrder]);


    return (

        <div className="work-order-execution">


            <Header

                workOrder={workOrder}

                onBack={onBack}

            />

            <ProgressBar

                totalFields={totalFields}

                completedFields={completedFields}

            />

            <ExecutionStatus

    workOrder={workOrder}

/>

<ExecutionHeader

    workOrder={workOrder}

/>

<WorkOrderContext

    workOrder={workOrder}

/>



            {
    saveMessage && (

        <div className="wo-save-message">

            {saveMessage}

        </div>

    )
}

            <DynamicForm

                template={template}

                values={values}

                onChange={handleChange}

            />

            <OperatorObservations

    observations={observations}

    onChange={setObservations}

/>

<ExecutionEvidence

    evidences={evidences}

    onFiles={(event)=>{

        const files = Array.from(event.target.files);

        const nuevas = files.map(file =>

            saveExecutionEvidence(

                workOrder.id,

                file

            )

        );

        setEvidences(previous => [

            ...previous,

            ...nuevas,

        ]);

    }}

    onDelete={(id)=>{

        deleteExecutionEvidence(id);

        setEvidences(previous =>

            previous.filter(

                evidence => evidence.id !== id

            )

        );

    }}

/>

<ExecutionTimeline

    history={workOrder.history}

/>

            <div className="wo-actions">

                <button

    type="button"

    className="secondary-button"

    onClick={handleSave}

    disabled={isSaving}

>

    {

        isSaving

            ? "Guardando..."

            : "Guardar progreso"

    }

</button>

                <button

                    type="button"

                    className="primary-button"

                    onClick={handleFinish}

                >

                    Finalizar orden

                </button>

            </div>

        </div>

    );

}