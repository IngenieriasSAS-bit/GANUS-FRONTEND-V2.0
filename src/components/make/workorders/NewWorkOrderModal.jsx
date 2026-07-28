import { useState } from "react";

import Modal from "../../common/Modal";

import {
    ClipboardList,
} from "lucide-react";

import {
    getMakeRoutines,
    generateWorkOrder,
} from "../../../services/makeService";

export default function NewWorkOrderModal({

    isOpen,

    onClose,

    onCreated,

}) {

    const routines = getMakeRoutines().filter(

        routine => routine.status === "active"

    );

    const [routineId, setRoutineId] = useState("");

    const createOrder = () => {

        if (!routineId) {

            alert("Seleccione una rutina.");

            return;

        }

        try {

            generateWorkOrder(routineId);

            onCreated?.();

            onClose();

            setRoutineId("");

        } catch (error) {

            alert(error.message);

        }

    };

    return (

        <Modal

            isOpen={isOpen}

            titulo="Nueva Orden de Trabajo"

            onClose={onClose}

        >

            <div className="new-order-modal">

                <div className="step-section-header">

                    <div className="step-section-icon">

                        <ClipboardList size={26} />

                    </div>

                    <div>

                        <h3>Nueva Orden</h3>

                        <p>

                            Seleccione una rutina activa para generar una nueva orden.

                        </p>

                    </div>

                </div>

                <div className="form-grid">

                    <div className="form-group">

                        <label>

                            <ClipboardList size={16}/>

                            Rutina

                        </label>

                        <select

                            value={routineId}

                            onChange={(e)=>setRoutineId(e.target.value)}

                        >

                            <option value="">

                                Seleccione...

                            </option>

                            {

                                routines.map(routine=>(

                                    <option

                                        key={routine.id}

                                        value={routine.id}

                                    >

                                        {routine.name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                </div>

                <div className="summary-actions">

                    <button

                        className="primary-button"

                        onClick={createOrder}

                    >

                        Generar Orden

                    </button>

                </div>

            </div>

        </Modal>

    );

}