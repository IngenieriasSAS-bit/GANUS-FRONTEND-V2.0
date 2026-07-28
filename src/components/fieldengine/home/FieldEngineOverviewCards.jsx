import {
    FileText,
    ClipboardCheck,
    CheckCircle2,
    PencilRuler,
} from "lucide-react";

import {
    getFieldEngineTemplates,
} from "../../../services/fieldEngineService";

import {
    getFieldEngineResponses,
} from "../../../services/fieldEngineResponseService";



export default function FieldEngineOverviewCards() {

    const templates = getFieldEngineTemplates();

    const responses = getFieldEngineResponses();

    const published = templates.filter(
        template => template.state === "published"
    ).length;

    const drafts = templates.filter(
        template => template.state === "draft"
    ).length;

    const cards = [

        {
            title:"Plantillas",
            value:templates.length,
            icon:FileText,
        },

        {
            title:"Publicadas",
            value:published,
            icon:CheckCircle2,
        },

        {
            title:"Borradores",
            value:drafts,
            icon:PencilRuler,
        },

        {
            title:"Registros",
            value:responses.length,
            icon:ClipboardCheck,
        },

    ];

    return(

        <section className="fe-home-overview">

            {

                cards.map(card=>{

                    const Icon = card.icon;

                    return(

                        <article

                            key={card.title}

                            className="fe-home-overview-card"

                        >

                            <div className="fe-home-overview-icon">

                                <Icon size={24}/>

                            </div>

                            <strong>

                                {card.value}

                            </strong>

                            <span>

                                {card.title}

                            </span>

                        </article>

                    );

                })

            }

        </section>

    );

}