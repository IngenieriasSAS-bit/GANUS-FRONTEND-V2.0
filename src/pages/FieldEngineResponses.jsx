import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FilterX } from "lucide-react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import FieldEngineResponsesHeader from "../components/fieldengine/FieldEngineResponsesHeader";
import FieldEngineResponsesStats from "../components/fieldengine/FieldEngineResponsesStats";
import FieldEngineResponsesTable from "../components/fieldengine/FieldEngineResponsesTable";
import Modal from "../components/common/Modal";
import FieldEngineResponseDetail from "../components/fieldengine/FieldEngineResponseDetail";
import FieldEngineTemplateSelector from "../components/fieldengine/FieldEngineTemplateSelector";

import {
    getFieldEngineResponses,
} from "../services/fieldEngineResponseService";

import {
    getFieldEngineTemplates,
} from "../services/fieldEngineService";

import "../styles/fieldengine/fieldEngineResponses.css";

export default function FieldEngineResponses() {

    const navigate = useNavigate();

    const responses = useMemo(() => getFieldEngineResponses(), []);

    const templates = useMemo(() => getFieldEngineTemplates(), []);

    const [selectedResponse, setSelectedResponse] = useState(null);

    const [showTemplateSelector, setShowTemplateSelector] = useState(false);

    const todayResponses = responses.filter((response) => {

        const today = new Date().toDateString();

        return (
            new Date(response.createdAt).toDateString() === today
        );

    }).length;

    const completedResponses = responses.filter(
        (response) => response.status === "completed"
    ).length;

    return (

        <div className="field-engine-shell">

            <Sidebar />

            <div className="field-engine-main">

                <Navbar />

                <main className="field-engine-responses">

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
                                />

                            </div>

                            <div className="fe-toolbar-actions">

                                <select>

                                    <option>
                                        Todos los estados
                                    </option>

                                </select>

                                <select>

                                    <option>
                                        Todas las plantillas
                                    </option>

                                </select>

                                <input type="date" />

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
    responses={responses}
    onView={setSelectedResponse}
/>
                    </section>

                    <Modal
    isOpen={Boolean(selectedResponse)}
    titulo="Detalle del registro"
    onClose={() => setSelectedResponse(null)}
>

    {
        selectedResponse && (

            <FieldEngineResponseDetail
                response={selectedResponse}
            />

        )
    }

</Modal>

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

                </main>

            </div>

        </div>

    );

}