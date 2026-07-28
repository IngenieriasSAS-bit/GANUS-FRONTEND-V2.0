/**
 * ==========================================================
 * Componente: OperatorsStep
 *
 * Responsabilidad:
 * Asignar operadores responsables.
 * ==========================================================
 */

import { useState } from "react";
import { Users, X } from "lucide-react";
import { obtenerUsuarios } from "../../../services/organizationService";

export default function OperatorsStep({

    routine,

    setRoutine,

}) {

    const [selectedUser, setSelectedUser] = useState("");

    const usuarios = obtenerUsuarios().filter(

    (usuario) => usuario.estado === "Activo"

);

    const addOperator = () => {

    if (!selectedUser) {

        return;

    }

    const usuario = usuarios.find(
    item => String(item.id) === String(selectedUser)
);

    console.log("Usuario seleccionado:", usuario);

    if (!usuario) {

        return;

    }

    const existe = routine.operators.some(

        operator => operator.id === usuario.id

    );

    if (existe) {

        setSelectedUser("");

        return;

    }


console.log("Operadores antes:", routine.operators);

console.log("Intentando agregar operador...");
    setRoutine((prev) => ({

    ...prev,

    operators: [

        ...prev.operators,

        usuario,

    ],

}));

    setSelectedUser("");

};

    const removeOperator = (operatorId) => {

    setRoutine((prev) => ({

    ...prev,

    operators: prev.operators.filter(

        operator => operator.id !== operatorId

    ),

}));

};

    

    return (

        <section className="make-step">

            <div className="step-section-header">

                <div className="step-section-icon">

                    <Users size={22} />

                </div>

                <div>

                    <h3>

                        Operadores responsables

                    </h3>

                    <p>

                        Agregue los operadores que ejecutarán esta rutina.

                    </p>

                </div>

            </div>

            <div className="form-group">

                <label>

                    Operadores

                </label>

                <div className="operators-input-container">

    {routine.operators.map((operator) => (

        <div
            key={operator.id}
            className="operator-chip"
        >

            <div className="operator-chip-content">

                <strong>
                    {operator.nombre}
                </strong>

                <small>
                    {operator.rol}
                </small>

            </div>

            <button
                type="button"
                onClick={() => removeOperator(operator.id)}
            >
                <X size={14} />
            </button>

        </div>

    ))}

</div>

<div className="form-group">

    <label>

        Agregar operador

    </label>

    <div className="select-with-button">

        <select

            className="form-select"

            value={selectedUser}

            onChange={(e) =>
                setSelectedUser(e.target.value)
            }

        >

            <option value="">

                Seleccione un operador

            </option>

            {usuarios.map((usuario) => (

                <option
                    key={usuario.id}
                    value={usuario.id}
                >

                    {usuario.nombre} — {usuario.rol}

                </option>

            ))}

        </select>

        <button

            type="button"

            className="primary-button"

            onClick={addOperator}

        >

            Agregar

        </button>

    </div>

</div>

                <small className="make-help">

    Seleccione uno o varios usuarios activos registrados en el módulo Organización.

</small>

            </div>

            <div className="operators-summary">

                <span>

                    Operadores asignados

                </span>

                <strong>

                    {routine.operators.length}

                </strong>

            </div>

        </section>

    );

}