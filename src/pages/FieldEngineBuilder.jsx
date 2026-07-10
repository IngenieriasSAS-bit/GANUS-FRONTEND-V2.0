import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileText,
  Layers3,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import DynamicFormRenderer from "../components/fieldengine/DynamicFormRenderer";

import {
  getFieldEngineCatalogs,
  getPublishedTemplateById,
} from "../services/fieldEngineService";

import "../styles/fieldengine/fieldEngineBuilder.css";
import "../styles/fieldengine/dynamicFormRenderer.css";

export default function FieldEngineBuilder() {
  const navigate = useNavigate();
  const { templateId } = useParams();

  const [lastResponse, setLastResponse] = useState(null);

  const catalogs = useMemo(
    () => getFieldEngineCatalogs(),
    []
  );

  const template = useMemo(
    () => getPublishedTemplateById(templateId),
    [templateId]
  );

  const totalFields = useMemo(() => {
    if (!template) {
      return 0;
    }

    return template.sections.reduce(
      (total, section) =>
        total +
        section.fields.filter(
          (field) =>
            field.visible !== false &&
            !["separator", "title", "note"].includes(
              field.type
            )
        ).length,
      0
    );
  }, [template]);

  const handleFormSubmit = (formResponse) => {
    setLastResponse(formResponse);

    console.log(
      "Registro generado por Field Engine:",
      formResponse
    );
  };

  if (!template) {
    return (
      <div className="fe-form-shell">
        <Sidebar />

        <div className="fe-form-shell__main">
          <Navbar />

          <main className="fe-form-page">
            <section className="fe-form-not-found">
              <span className="fe-form-not-found__icon">
                <FileText size={30} />
              </span>

              <h1>Formulario no disponible</h1>

              <p>
                La plantilla solicitada no existe o todavía no
                ha sido publicada en Field Engine.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/field-engine")
                }
              >
                <ArrowLeft size={18} />

                <span>Volver a Field Engine</span>
              </button>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="fe-form-shell">
      <Sidebar />

      <div className="fe-form-shell__main">
        <Navbar />

        <main className="fe-form-page">
          <header className="fe-form-header">
            <button
              type="button"
              className="fe-form-header__back"
              onClick={() => navigate("/field-engine")}
            >
              <ArrowLeft size={18} />

              <span>Field Engine</span>
            </button>

            <div className="fe-form-header__content">
              <div>
                <span className="fe-form-header__eyebrow">
                  Formulario operativo
                </span>

                <h1>{template.name}</h1>

                <p>
                  {template.description ||
                    "Formulario dinámico generado desde una plantilla publicada en Field Engine."}
                </p>
              </div>

              <div className="fe-form-header__status">
                <CheckCircle2 size={18} />

                <div>
                  <strong>Plantilla publicada</strong>

                  <span>
                    Versión {template.version}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <section className="fe-form-summary">
            <article className="fe-form-summary__card">
              <span className="fe-form-summary__icon">
                <Layers3 size={20} />
              </span>

              <div>
                <strong>{template.sections.length}</strong>

                <span>
                  {template.sections.length === 1
                    ? "Sección"
                    : "Secciones"}
                </span>
              </div>
            </article>

            <article className="fe-form-summary__card">
              <span className="fe-form-summary__icon">
                <ClipboardList size={20} />
              </span>

              <div>
                <strong>{totalFields}</strong>

                <span>
                  {totalFields === 1
                    ? "Campo de captura"
                    : "Campos de captura"}
                </span>
              </div>
            </article>

            <article className="fe-form-summary__card">
              <span className="fe-form-summary__icon">
                <ShieldCheck size={20} />
              </span>

              <div>
                <strong>Activo</strong>

                <span>Motor de validación</span>
              </div>
            </article>
          </section>

          <section className="fe-form-layout">
            <div className="fe-form-layout__content">
              <DynamicFormRenderer
                template={template}
                catalogs={catalogs}
                onSubmit={handleFormSubmit}
              />
            </div>

            <aside className="fe-form-context">
              <div className="fe-form-context__header">
                <span className="fe-form-context__icon">
                  <FileText size={19} />
                </span>

                <div>
                  <span>Contexto de captura</span>

                  <h2>Información del formulario</h2>
                </div>
              </div>

              <div className="fe-form-context__details">
                <div className="fe-form-context__detail">
                  <span>Módulo consumidor</span>

                  <strong>
                    {template.consumerModule}
                  </strong>
                </div>

                <div className="fe-form-context__detail">
                  <span>Tipo de contexto</span>

                  <strong>{template.contextType}</strong>
                </div>

                <div className="fe-form-context__detail">
                  <span>Contexto funcional</span>

                  <strong>
                    {template.contextValue ||
                      "No definido"}
                  </strong>
                </div>

                <div className="fe-form-context__detail">
                  <span>Versión</span>

                  <strong>
                    {template.version}
                  </strong>
                </div>
              </div>

              <div className="fe-form-context__notice">
                <ShieldCheck size={18} />

                <p>
                  La estructura de este formulario proviene de
                  una versión publicada y no puede modificarse
                  durante la captura.
                </p>
              </div>

              {lastResponse && (
                <div className="fe-form-context__result">
                  <CheckCircle2 size={20} />

                  <div>
                    <strong>Registro procesado</strong>

                    <span>
                      {new Date(
                        lastResponse.capturedAt
                      ).toLocaleString("es-CO")}
                    </span>
                  </div>
                </div>
              )}
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}