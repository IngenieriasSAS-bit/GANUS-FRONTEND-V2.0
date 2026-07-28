import {
    FilePlus2,
    ClipboardList,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import useFieldEngineDashboard from "../../../hooks/useFieldEngineDashboard";



export default function FieldEngineHero() {

    const navigate = useNavigate();

const dashboard = useFieldEngineDashboard();

    return (

        <section className="fe-home-hero">

            <div className="fe-home-hero__content">

                <span className="fe-home-hero__eyebrow">

                    FIELD ENGINE

                </span>

                <h1>

                    Centro de formularios dinámicos

                </h1>

                <p>

                    Diseña, publica y administra formularios inteligentes
                    para todos los módulos de GANUS. Desde aquí podrás
                    gestionar plantillas, registros capturados y la
                    configuración general del motor dinámico.

                </p>

            </div>

            <div className="fe-home-hero__actions">

    <button
        className="fe-home-primary"
        onClick={() => navigate("/field-engine/templates")}
    >
        <FilePlus2 size={18} />

        Plantillas

        <strong>
            {dashboard.totalTemplates}
        </strong>

    </button>

    <button
        className="fe-home-primary"
        onClick={() => navigate("/field-engine/responses")}
    >
        <ClipboardList size={18} />

        Registros dinámicos

        <strong>
            {dashboard.totalResponses}
        </strong>

    </button>

</div>

        </section>

    );

}