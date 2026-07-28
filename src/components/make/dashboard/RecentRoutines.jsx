import useMake from "../../../hooks/useMake";

export default function RecentRoutines() {

    const dashboard = useMake();

    const recentRoutines =
        dashboard.routines.slice(0, 5);

    return (

        <section className="make-panel">

            <div className="panel-header">

                <h3>

                    Rutinas recientes

                </h3>

            </div>

            {

                recentRoutines.length === 0 && (

                    <p>

                        No hay rutinas registradas.

                    </p>

                )

            }

            {

                recentRoutines.map(routine => (

                    <div
                        key={routine.id}
                        className="routine-row"
                    >

                        <div>

                            <strong>

                                {routine.name}

                            </strong>

                            <p>

                                {routine.templateName}

                            </p>

                        </div>

                        <div>

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

                        </div>

                    </div>

                ))

            }

        </section>

    );

}