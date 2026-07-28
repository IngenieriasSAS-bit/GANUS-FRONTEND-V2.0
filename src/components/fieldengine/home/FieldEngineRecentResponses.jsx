import {
    ClipboardCheck,
    Clock3,
} from "lucide-react";

import useFieldEngineDashboard from "../../../hooks/useFieldEngineDashboard";


export default function FieldEngineRecentResponses() {

    const dashboard = useFieldEngineDashboard();

const responses = dashboard.recentResponses;

    return (

        <section className="fe-home-list-card">

            <div className="fe-home-list-header">

                <h3>

                    Registros recientes

                </h3>

                <span>

                    {responses.length}

                </span>

            </div>

            {

                responses.length === 0 ? (

                    <div className="fe-home-empty-mini">

                        No existen registros.

                    </div>

                ) : (

                    responses.map((response) => (

                        <article

                            key={response.id}

                            className="fe-home-list-item"

                        >

                            <div className="fe-home-list-icon">

                                <ClipboardCheck size={18} />

                            </div>

                            <div className="fe-home-list-content">

                                <strong>

                                    {
                                        response.context?.recordCode ||
                                        "SIN-CÓDIGO"
                                    }

                                </strong>

                                <span>

                                    {response.templateName}

                                </span>

                            </div>

                            <div className="fe-home-list-date">

                                <Clock3 size={15} />

                                {

                                    new Date(
                                        response.createdAt
                                    ).toLocaleDateString("es-CO")

                                }

                            </div>

                        </article>

                    ))

                )

            }

        </section>

    );

}