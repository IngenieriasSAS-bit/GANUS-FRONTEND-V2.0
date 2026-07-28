/**
 * ==========================================================
 * Componente: RoutineDetails
 *
 * Responsabilidad:
 * Mostrar toda la información de una rutina.
 * ==========================================================
 */

export default function RoutineDetails({

    routine,

}) {

    if (!routine) {

        return (

            <p>

                No hay información disponible.

            </p>

        );

    }

    return (

        <section className="routine-details">

            <h2>

                {routine.name}

            </h2>

            <div className="routine-details-grid">

                <div>

                    <strong>Plantilla</strong>

                    <p>{routine.templateName}</p>

                </div>

                <div>

                    <strong>Estado</strong>

                    <p>{routine.status}</p>

                </div>

                <div>

                    <strong>Prioridad</strong>

                    <p>{routine.priority}</p>

                </div>

                <div>

                    <strong>Módulo</strong>

                    <p>{routine.consumerModule}</p>

                </div>

                <div>

                    <strong>Tipo de contexto</strong>

                    <p>{routine.contextType}</p>

                </div>

                <div>

                    <strong>Contexto</strong>

                    <p>{routine.contextValue}</p>

                </div>

                <div>

    <strong>Operadores asignados</strong>

    {

        routine.operators.length === 0 ? (

            <p>

                No hay operadores asignados.

            </p>

        ) : (

            <ul
                style={{
                    margin: 0,
                    paddingLeft: "18px",
                }}
            >

                {

                    routine.operators.map((operator) => (

                        <li key={operator.id}>

                            <strong>

                                {operator.nombre}

                            </strong>

                            {" - "}

                            {operator.rol}

                        </li>

                    ))

                }

            </ul>

        )

    }

</div>

                <div>

                    <strong>Fecha de creación</strong>

                    <p>

                        {

                            new Date(

                                routine.createdAt

                            ).toLocaleString()

                        }

                    </p>

                </div>

            </div>

        </section>

    );

}