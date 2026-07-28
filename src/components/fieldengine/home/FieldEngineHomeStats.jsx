import {
    FileText,
    ClipboardCheck,
    BookOpen,
    Boxes
} from "lucide-react";

import {
    getFieldEngineTemplates,
    getFieldEngineCatalogs,
    getFieldEngineAssetTypes
} from "../../../services/fieldEngineService";

import {
    getFieldEngineResponses
} from "../../../services/fieldEngineResponseService";



export default function FieldEngineHomeStats(){

    const templates=getFieldEngineTemplates();

    const responses=getFieldEngineResponses();

    const catalogs=getFieldEngineCatalogs();

    const assets=getFieldEngineAssetTypes();

    const cards=[

        {
            icon:<FileText size={22}/>,
            title:"Plantillas",
            value:templates.length,
            subtitle:"Formularios creados"
        },

        {
            icon:<ClipboardCheck size={22}/>,
            title:"Registros",
            value:responses.length,
            subtitle:"Capturas realizadas"
        },

        {
            icon:<BookOpen size={22}/>,
            title:"Catálogos",
            value:catalogs.length,
            subtitle:"Listas maestras"
        },

        {
            icon:<Boxes size={22}/>,
            title:"Tipos de activo",
            value:assets.length,
            subtitle:"Configuraciones"
        }

    ];

    return(

        <section className="fe-home-stats">

            {

                cards.map(card=>(

                    <article
                        key={card.title}
                        className="fe-home-stat"
                    >

                        <div className="fe-home-stat__icon">

                            {card.icon}

                        </div>

                        <div>

                            <strong>

                                {card.value}

                            </strong>

                            <h4>

                                {card.title}

                            </h4>

                            <span>

                                {card.subtitle}

                            </span>

                        </div>

                    </article>

                ))

            }

        </section>

    );

}