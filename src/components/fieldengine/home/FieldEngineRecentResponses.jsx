import {
    ClipboardCheck,
    Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import useFieldEngineDashboard from "../../../hooks/useFieldEngineDashboard";

import { formatRelativeTime } from "../../../utils/dateUtils";
import { getModuleInfo } from "../../../utils/moduleUtils";



export default function FieldEngineRecentResponses() {

    const dashboard = useFieldEngineDashboard();
    const navigate = useNavigate();
    const responses = dashboard.recentResponses;
    
    const responseItems = responses.map(response => ({

    ...response,

    module: getModuleInfo(

        response.consumerModule

    )

}));

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

<div className="fe-home-list-scroll">

{

    responses.length === 0 ? (

                    <div className="fe-home-empty-mini">

                        No existen registros.

                    </div>

                ) : (

                    responseItems.map((response, index) => (

                        <article
    key={response.id}
    className="fe-home-list-item fe-home-clickable"
    onClick={() =>
        navigate(
    `${response.module.route}?responseId=${response.id}`
)
    }
>

                            <div className="fe-home-list-icon">

                                <ClipboardCheck size={18} />

                            </div>

                            <div className="fe-home-list-content">

    <strong>

        {

            response.context?.recordCode ||

            `REG-${String(index + 1).padStart(6, "0")}`

        }

    </strong>

    <span className="fe-home-list-title">

        {response.templateName}

    </span>

    <span

        className={`fe-module-badge ${response.module.badgeClass}`}

    >

        {response.module.name}

    </span>


</div>

<div className="fe-home-list-date">

    <Clock3 size={15} />

    {

        formatRelativeTime(

            response.createdAt

        )

    }

    <ChevronRight
        size={18}
        className="fe-open-icon"
    />

</div>

                        </article>

                                        ))

                )

            }

</div>

        </section>

    );

}