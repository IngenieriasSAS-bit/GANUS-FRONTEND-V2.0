import { useMemo, useState } from "react";
import { Search, FilterX } from "lucide-react";
import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import FieldEngineResponsesHeader from "../components/fieldengine/FieldEngineResponsesHeader";
import FieldEngineResponsesStats from "../components/fieldengine/FieldEngineResponsesStats";
import FieldEngineResponsesTable from "../components/fieldengine/FieldEngineResponsesTable";

import FieldEngineTemplateSelector from "../components/fieldengine/FieldEngineTemplateSelector";
import Modal from "../components/common/Modal";
import FieldEngineResponseDetail from "../components/fieldengine/FieldEngineResponseDetail";

import {
    getFieldEngineResponses,
} from "../services/fieldEngineResponseService";

import {
    getFieldEngineTemplates,
} from "../services/fieldEngineService";

import "../styles/fieldengine/fieldEngineResponses.css";

export default function FieldEngineResponses() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const responseId = searchParams.get("responseId");

    const responses = useMemo(() => getFieldEngineResponses(), []);

    const templates = useMemo(() => getFieldEngineTemplates(), []);

    const selectedResponse = useMemo(() => {

    if (!responseId) {

        return null;

    }

    return responses.find(

        (response) => response.id === responseId

    ) || null;

}, [responses, responseId]);

    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState("");

    const [templateFilter, setTemplateFilter] = useState("");

    const [dateFilter, setDateFilter] = useState("");

    const todayResponses = responses.filter((response) => {

        const today = new Date().toDateString();

        return (
            new Date(response.createdAt).toDateString() === today
        );

    }).length;

    const completedResponses = responses.filter(
        (response) => response.status === "completed"
    ).length;

    const filteredResponses = responses.filter((response) => {

    const search = searchTerm.toLowerCase();

    const matchesSearch =

        !search ||

        response.context?.recordCode
            ?.toLowerCase()
            .includes(search) ||

        response.templateName
            ?.toLowerCase()
            .includes(search) ||

        (
            typeof response.context?.responsible === "string"

                ? response.context.responsible

                : response.context?.responsible?.nombre ||

                  response.context?.responsible?.name ||

                  ""
        )

        .toLowerCase()

        .includes(search);

    const matchesStatus =

        !statusFilter ||

        response.status === statusFilter;

    const matchesTemplate =

        !templateFilter ||

        response.templateId === templateFilter;

    const matchesDate =

        !dateFilter ||

        response.createdAt?.slice(0, 10) === dateFilter;

    return (

        matchesSearch &&

        matchesStatus &&

        matchesTemplate &&

        matchesDate

    );

});

    return (

        
        <div className="field-engine-shell">

            <Sidebar />

            <div className="field-engine-main">

                <Navbar />

                <main className="field-engine-responses">

    <div className="fe-page-top-navigation">

        <button
            type="button"
            className="fe-page-top-back"
            onClick={() => navigate("/field-engine")}
        >
            ← Volver a Field Engine
        </button>

    </div>

    <FieldEngineResponsesHeader
    
    onNewCapture={() =>

        setShowTemplateSelector(true)

    }
/>

                    <FieldEngineResponsesStats
                        totalResponses={responses.length}
                        todayResponses={todayResponses}
                        templates={templates.length}
                        completed={completedResponses}
                    />

                   

                    <section className="fe-responses-card">

                        

                        <div className="fe-card-header">

                            <div>

                                <h2>
                                    Registros dinámicos
                                </h2>

                                <p>
                                    Consulta, administra y visualiza todas las respuestas capturadas desde Field Engine.
                                </p>

                            </div>

                            <div className="fe-card-counter">

                                <span>{responses.length}</span>

                                <small>Registros</small>

                            </div>

                        </div>

                        <div className="fe-responses-toolbar">

                            <div className="fe-search">

                                <Search size={18} />

                                <input
    type="text"
    placeholder="Buscar código, plantilla o responsable..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
/>

                            </div>

                            <div className="fe-toolbar-actions">

                                <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
>

    <option value="">
        Todos los estados
    </option>

    <option value="completed">
        Completado
    </option>

    <option value="draft">
        Borrador
    </option>

</select>

                                <select
    value={templateFilter}
    onChange={(e) => setTemplateFilter(e.target.value)}
>

    <option value="">
        Todas las plantillas
    </option>

    {

        templates.map((template) => (

            <option
                key={template.id}
                value={template.id}
            >

                {template.name}

            </option>

        ))

    }

</select>

                                <input
    type="date"
    value={dateFilter}
    onChange={(e) => setDateFilter(e.target.value)}
/>

                                <button
                                    className="fe-clear-btn"
                                    type="button"
                                >

                                    <FilterX size={17} />

                                    Limpiar

                                </button>

                            </div>

                        </div>

                        <FieldEngineResponsesTable
    responses={filteredResponses}
    onView={(response) =>

        navigate(

            `/field-engine/responses?responseId=${response.id}`

        )

    }
/>
                    </section>

                    

<FieldEngineTemplateSelector

    isOpen={showTemplateSelector}

    onClose={() =>

        setShowTemplateSelector(false)

    }

    onSelect={(templateId) => {

        setShowTemplateSelector(false);

        navigate(

            `/field-engine/capture/${templateId}`

        );

    }}

/>

<Modal
    isOpen={Boolean(selectedResponse)}
    titulo="Detalle del registro"
    onClose={() => navigate("/field-engine/responses")}
>

    {
        selectedResponse && (

            <FieldEngineResponseDetail
                response={selectedResponse}
            />

        )
    }

</Modal>

                </main>

            </div>

        </div>

    );

}