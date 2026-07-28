import {
    Package,
    ClipboardList,
    Settings,
    Activity,
    ArrowRight
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import useFieldEngineDashboard from "../../../hooks/useFieldEngineDashboard";

import {

    getWorkOrders,

} from "../../../services/makeService";



export default function FieldEngineConsumerModules(){

    const navigate = useNavigate();

const dashboard = useFieldEngineDashboard();

const templates = dashboard.templates;

const responses = dashboard.responses;

const workOrders = getWorkOrders();


    const modules = [

    {
        name: "Inventario",
        icon: Package,
        route: "/inventario",
        consumer: "inventory",
    },

    {
        name: "MAKE Control",
        icon: ClipboardList,
        route: "/make",
        consumer: "make",
    },

    {
    name: "Operativo",
    icon: Settings,
    route: "/operativo",
    consumer: "operation",
},

{
    name: "Operación",
    icon: ClipboardList,
    route: "/operacion",
    consumer: "operation-dashboard",
},

    {
        name: "Track",
        icon: Activity,
        route: "/track",
        consumer: "track",
    },

    {
        name: "Advisory",
        icon: Activity,
        route: "/advisory",
        consumer: "advisory",
    },

];

    return(

        <section className="fe-home-section">

            <div className="fe-home-section__header">

                <h2>

                    Módulos consumidores

                </h2>

                <p>

                    Visualiza qué módulos utilizan actualmente el motor dinámico de Field Engine.

                </p>

            </div>

            <div className="fe-home-consumers">

                {

                    modules.map(module=>{

                        const Icon = module.icon;

                        let totalTemplates;

let totalResponses;

if (module.route === "/operativo") {

    totalTemplates = workOrders.filter(

    order => order.status === "pending"

).length;

totalResponses = workOrders.filter(

    order => order.status === "in_progress"

).length;

}

else {

    totalTemplates = templates.filter(

        template =>

            template.consumerModule === module.consumer

    ).length;

    totalResponses = responses.filter(

        response =>

            response.consumerModule === module.consumer

    ).length;

}

                        return(

                            <article

                                key={module.name}

                                className="fe-home-consumer-card"

                            >

                                <div className="fe-home-consumer-top">

                                    <div className="fe-home-consumer-icon">

                                        <Icon size={26}/>

                                    </div>

                                    <h3>

                                        {module.name}

                                    </h3>

                                </div>

                                <div className="fe-home-consumer-stats">

                                   <div>

    <strong>

        {totalTemplates}

    </strong>

    <span>

        {

            module.route === "/operativo"

                ? "Pendientes"

                : "Plantillas"

        }

    </span>

</div>

<div>

    <strong>

        {totalResponses}

    </strong>

    <span>

        {

            module.route === "/operativo"

                ? "En ejecución"

                : "Registros"

        }

    </span>

</div>

                                </div>

                                <button

                                    className="fe-home-consumer-btn"

                                    onClick={()=>navigate(module.route)}

                                >

                                    Abrir módulo

                                    <ArrowRight size={17}/>

                                </button>

                            </article>

                        );

                    })

                }

            </div>

        </section>

    );

}