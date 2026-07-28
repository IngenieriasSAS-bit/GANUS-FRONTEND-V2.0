import {
    Plus,
    ClipboardList,
    FileText,
    BookOpen,
    Boxes
} from "lucide-react";

import { useNavigate } from "react-router-dom";


export default function FieldEngineQuickActions(){

    const navigate = useNavigate();

    const actions=[

        {
            title:"Nueva plantilla",
            description:"Crear un nuevo formulario dinámico.",
            icon:Plus,
            action:()=>navigate("/field-engine/templates")
        },

        {
            title:"Nueva captura",
            description:"Registrar una nueva captura.",
            icon:ClipboardList,
            action:()=>navigate("/field-engine/responses")
        },

        {
            title:"Ver registros",
            description:"Consultar todas las respuestas.",
            icon:FileText,
            action:()=>navigate("/field-engine/responses")
        },

        {
            title:"Catálogos",
            description:"Administrar listas maestras.",
            icon:BookOpen,
            action:()=>navigate("/field-engine/templates")
        },

        {
            title:"Tipos de activos",
            description:"Administrar tipos disponibles.",
            icon:Boxes,
            action:()=>navigate("/field-engine/templates")
        }

    ];

    return(

        <section className="fe-home-section">

            <div className="fe-home-section__header">

                <h2>

                    Acciones rápidas

                </h2>

                <p>

                    Accesos directos a las tareas más utilizadas del módulo.

                </p>

            </div>

            <div className="fe-home-actions">

                {

                    actions.map(action=>{

                        const Icon=action.icon;

                        return(

                            <button

                                key={action.title}

                                className="fe-home-action"

                                onClick={action.action}

                            >

                                <Icon size={24}/>

                                <div>

                                    <strong>

                                        {action.title}

                                    </strong>

                                    <span>

                                        {action.description}

                                    </span>

                                </div>

                            </button>

                        );

                    })

                }

            </div>

        </section>

    );

}