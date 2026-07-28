import {
    FileText,
    ClipboardList,
    ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import useFieldEngineDashboard from "../../../hooks/useFieldEngineDashboard";


export default function FieldEngineQuickAccess() {

    const navigate = useNavigate();

    const dashboard = useFieldEngineDashboard();

const items = [

    {
        title: "Plantillas",
        description:
            "Diseña, edita y publica formularios dinámicos utilizados por todos los módulos de GANUS.",
        icon: FileText,
        route: "/field-engine/templates",
        count: dashboard.totalTemplates,
        action: "Administrar plantillas",
    },

    {
        title: "Registros dinámicos",
        description:
            "Consulta todos los formularios diligenciados y las respuestas capturadas en operación.",
        icon: ClipboardList,
        route: "/field-engine/responses",
        count: dashboard.totalResponses,
        action: "Ver registros",
    },

];

    return (

        <section className="fe-home-section">

            <div className="fe-home-quick-grid">

                {

                    items.map((item) => {

                        const Icon = item.icon;

                        return (

                            <article
                                key={item.title}
                                className="fe-home-quick-card"
                                onClick={() => navigate(item.route)}
                            >

                                <div className="fe-home-quick-card__icon">

                                    <Icon size={24} />

                                </div>

                                <div className="fe-home-quick-card__content">

                                    <span className="fe-home-quick-card__count">

                                        {item.count}

                                    </span>

                                    <h3>

                                        {item.title}

                                    </h3>

                                    <p>

                                        {item.description}

                                    </p>

                                    <span className="fe-home-quick-card__action">

                                        {item.action}

                                    </span>

                                </div>

                                <ChevronRight
                                    size={22}
                                    className="fe-home-quick-card__arrow"
                                />

                            </article>

                        );

                    })

                }

            </div>

        </section>

    );

}