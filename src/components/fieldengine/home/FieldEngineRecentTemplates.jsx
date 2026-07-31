import { Clock3, FileText } from "lucide-react";

import useFieldEngineDashboard from "../../../hooks/useFieldEngineDashboard";

import { formatRelativeTime } from "../../../utils/dateUtils";

export default function FieldEngineRecentTemplates() {

    const dashboard = useFieldEngineDashboard();

const templates = dashboard.recentTemplates;

    return (

        <section className="fe-home-list-card">

            <div className="fe-home-list-header">

                <h3>

                    Plantillas recientes

                </h3>

                <span>

                    {templates.length}

                </span>

            </div>

            {

                templates.length === 0 ? (

                    <div className="fe-home-empty-mini">

                        No existen plantillas.

                    </div>

                ) : (

                    templates.map(template => (

                        <article

                            key={template.id}

                            className="fe-home-list-item"

                        >

                            <div className="fe-home-list-icon">

                                <FileText size={18} />

                            </div>

                            <div className="fe-home-list-content">

                                <strong>

                                    {template.name}

                                </strong>

                                <span className="fe-version-badge">

    v{template.version}

</span>

                            </div>

                            <div className="fe-home-list-date">

    <Clock3 size={15} />

    {

        formatRelativeTime(

            template.updatedAt ||

            template.createdAt

        )

    }

</div>

                        </article>

                    ))

                )

            }

        </section>

    );

}