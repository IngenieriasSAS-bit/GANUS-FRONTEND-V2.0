import { useState } from "react";
import {
    Pencil,
    Eye,
    Play,
    Pause,
    ClipboardPlus,
} from "lucide-react";

import useMake from "../../../hooks/useMake";
import {
    changeRoutineStatus,
    generateWorkOrder,
} from "../../../services/makeService";

import Modal from "../../common/Modal";
import RoutineDetails from "./RoutineDetails";
import RoutineFilters from "./RoutineFilters";

export default function RoutineTable({

    onEdit,

}) {

    const dashboard = useMake();

    const routines = dashboard.routines || [];

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    const [selectedRoutine, setSelectedRoutine] = useState(null);

    const filteredRoutines = routines.filter((routine) => {

        const matchesSearch = routine.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all"
                ? true
                : routine.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    const handleChangeStatus = (routineId, status) => {

        try {

            changeRoutineStatus(routineId, status);

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    };

    const handleGenerateWorkOrder = (routineId) => {

    try {

        generateWorkOrder(routineId);

        alert("Orden de Trabajo generada correctamente.");

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

};

    return (

        <>

            <section className="make-panel">

                <div className="panel-header">

                    <h3>

                        Rutinas

                    </h3>

                </div>

                {

                    routines.length === 0 ? (

                        <p>

                            No hay rutinas registradas.

                        </p>

                    ) : (

                        <>

                            <RoutineFilters

                                search={search}

                                onSearch={setSearch}

                                status={statusFilter}

                                onStatus={setStatusFilter}

                            />

                            <table className="routine-table">

                                <thead>

                                    <tr>

                                        <th>Rutina</th>

                                        <th>Plantilla</th>

                                        <th>Estado</th>

                                        <th>Prioridad</th>

                                        <th>Operadores</th>

                                        <th>Acciones</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        filteredRoutines.map((routine) => (

                                            <tr key={routine.id}>

                                                <td>

                                                    {routine.name}

                                                </td>

                                                <td>

                                                    {routine.templateName}

                                                </td>

                                                <td>

    <span
        className={`status-badge status-${routine.status}`}
    >
        {{
            draft: "Borrador",
            active: "Activa",
            paused: "Pausada",
            completed: "Finalizada",
        }[routine.status] || routine.status}
    </span>

</td>

                                                <td>

                                                    {routine.priority}

                                                </td>

                                                <td>

                                                    {routine.operators.length}

                                                </td>

                                                <td className="routine-actions">

                                                    <button

                                                        title="Ver"

                                                        onClick={() =>

                                                            setSelectedRoutine(routine)

                                                        }

                                                    >

                                                        <Eye size={18} />

                                                    </button>

                                                    <button

    title="Editar"

    onClick={() =>

        onEdit?.(routine)

    }

>

    <Pencil size={18} />

</button>

                                                    <button

                                                        title="Activar"

                                                        onClick={() =>

                                                            handleChangeStatus(

                                                                routine.id,

                                                                "active"

                                                            )

                                                        }

                                                    >

                                                        <Play size={18} />

                                                    </button>

<button

    title="Generar Orden de Trabajo"

    onClick={() =>

        handleGenerateWorkOrder(

            routine.id

        )

    }

>

    <ClipboardPlus size={18} />

</button>

                                                    <button

                                                        title="Pausar"

                                                        onClick={() =>

                                                            handleChangeStatus(

                                                                routine.id,

                                                                "paused"

                                                            )

                                                        }

                                                    >

                                                        <Pause size={18} />

                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </>

                    )

                }

            </section>

            <Modal

                isOpen={!!selectedRoutine}

                titulo="Detalle de la rutina"

                onClose={() =>

                    setSelectedRoutine(null)

                }

            >

                <RoutineDetails

                    routine={selectedRoutine}

                />

            </Modal>

        </>

    );

}