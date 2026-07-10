import { useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Hash,
  Layers3,
} from "lucide-react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import DynamicFormRenderer from "../components/fieldengine/DynamicFormRenderer";

import {
  getFieldEngineActivityTypes,
  getFieldEngineAssetTypes,
  getFieldEngineCatalogs,
  getPublishedTemplateById,
} from "../services/fieldEngineService";

import {
  createFieldEngineResponse,
} from "../services/fieldEngineResponseService";

import "../styles/fieldengine/dynamicFormCapture.css";

export default function DynamicFormCapture() {
  const navigate = useNavigate();
const { templateId } = useParams();
const [searchParams] = useSearchParams();

const assetId = searchParams.get("assetId");

  const [savedResponse, setSavedResponse] = useState(null);
  const [saveError, setSaveError] = useState("");

  const template = useMemo(
    () => getPublishedTemplateById(templateId),
    [templateId]
  );

  const catalogs = useMemo(
    () => getFieldEngineCatalogs(),
    []
  );

  const assetTypes = useMemo(
    () => getFieldEngineAssetTypes(),
    []
  );

  const activityTypes = useMemo(
    () => getFieldEngineActivityTypes(),
    []
  );

  const contextInformation = useMemo(() => {
    if (!template) {
      return {
        name: "Contexto operativo",
        description:
          "Contexto funcional asociado a la plantilla.",
      };
    }

    if (template.contextType === "asset-type") {
      const assetType = assetTypes.find(
        (item) => item.id === template.contextValue
      );

      if (assetType) {
        return {
          name: assetType.name,
          description: assetType.description,
        };
      }
    }

    if (template.contextType === "activity-type") {
      const activityType = activityTypes.find(
        (item) => item.id === template.contextValue
      );

      if (activityType) {
        return {
          name: activityType.name,
          description: activityType.description,
        };
      }
    }

    return {
      name:
        template.contextValue || "Contexto operativo",
      description:
        "Contexto funcional asociado a la plantilla publicada.",
    };
  }, [template, assetTypes, activityTypes]);

  const totalFields = useMemo(() => {
    if (!template) {
      return 0;
    }

    return template.sections.reduce(
      (total, section) =>
        total + (section.fields?.length || 0),
      0
    );
  }, [template]);

  const handleSubmit = (values) => {
    setSaveError("");

    try {
      const response = createFieldEngineResponse({
        template,
        values,
        context: {
  primaryAsset: assetId || null,
  responsible: "admin",
  eventDate: new Date().toISOString(),
},
      });

      setSavedResponse(response);

      console.log(
        "Registro dinámico almacenado por Field Engine:",
        response
      );
    } catch (error) {
      console.error(
        "No fue posible almacenar la respuesta dinámica:",
        error
      );

      setSaveError(
        error.message ||
          "No fue posible guardar el registro dinámico."
      );
    }
  };

  if (!template) {
    return (
      <div className="dynamic-capture-shell">
        <Sidebar />

        <div className="dynamic-capture-main">
          <Navbar />

          <main className="dynamic-capture-page">
            <section className="dynamic-capture-not-found">
              <div className="dynamic-capture-not-found__icon">
                <FileText size={28} />
              </div>

              <h1>Formulario no disponible</h1>

              <p>
                La plantilla solicitada no existe o todavía
                no ha sido publicada desde Field Engine.
              </p>

              <button
                type="button"
                onClick={() => navigate("/field-engine")}
              >
                <ArrowLeft size={17} />

                <span>Volver a Field Engine</span>
              </button>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="dynamic-capture-shell">
      <Sidebar />

      <div className="dynamic-capture-main">
        <Navbar />

        <main className="dynamic-capture-page">
          <header className="dynamic-capture-header">
            <div className="dynamic-capture-header__main">
              <button
                type="button"
                className="dynamic-capture-back"
                onClick={() => navigate("/field-engine")}
                aria-label="Volver a Field Engine"
                title="Volver a Field Engine"
              >
                <ArrowLeft size={19} />
              </button>

              <div>
                <span className="dynamic-capture-header__eyebrow">
                  Captura dinámica
                </span>

                <h1>{template.name}</h1>

                <p>
                  {template.description ||
                    "Formulario operativo generado desde Field Engine."}
                </p>
              </div>
            </div>

            <div className="dynamic-capture-header__status">
              <ClipboardCheck size={18} />

              <div>
                <strong>Formulario publicado</strong>

                <span>
                  Versión {template.version || 1}
                </span>
              </div>
            </div>
          </header>

          <section className="dynamic-capture-summary">
            <article className="dynamic-capture-summary__item">
              <span className="dynamic-capture-summary__icon">
                <Layers3 size={19} />
              </span>

              <div>
                <strong>
                  {template.sections.length}
                </strong>

                <span>Secciones configuradas</span>
              </div>
            </article>

            <article className="dynamic-capture-summary__item">
              <span className="dynamic-capture-summary__icon">
                <FileText size={19} />
              </span>

              <div>
                <strong>{totalFields}</strong>

                <span>Campos de captura</span>
              </div>
            </article>

                        <article className="dynamic-capture-summary__context">
              <span>Contexto funcional</span>

              <strong>
                {contextInformation.name}
              </strong>

              <p>
                {contextInformation.description}
              </p>
            </article>
          </section>

          <section className="dynamic-capture-workspace">
            <div className="dynamic-capture-workspace__heading">
              <div>
                <span>Registro operativo</span>

                <h2>Completar formulario</h2>

                <p>
                  Registra la información solicitada por la
                  plantilla configurada en Field Engine.
                </p>
              </div>
            </div>

            {saveError && (
              <div className="dynamic-capture-save-error">
                <strong>No se pudo guardar el registro</strong>

                <p>{saveError}</p>
              </div>
            )}

            <DynamicFormRenderer
              template={template}
              catalogs={catalogs}
              onSubmit={handleSubmit}
            />
          </section>

          {savedResponse && (
            <section className="dynamic-capture-response">
              <div className="dynamic-capture-response__heading">
                <CheckCircle2 size={20} />

                <div>
                  <span>Registro almacenado</span>

                  <h2>
                    Captura guardada correctamente
                  </h2>
                </div>
              </div>

              <p>
                GANUS almacenó la información capturada y la
                relacionó con la plantilla publicada y su
                versión correspondiente.
              </p>

              <div className="dynamic-capture-response__summary">
                <article>
                  <span>
                    <Hash size={16} />
                    Código del registro
                  </span>

                  <strong>
                    {savedResponse.context.recordCode}
                  </strong>
                </article>

                <article>
                  <span>Plantilla</span>

                  <strong>
                    {savedResponse.templateName}
                  </strong>
                </article>

                <article>
                  <span>Versión</span>

                  <strong>
                    {savedResponse.templateVersion}
                  </strong>
                </article>

                <article>
                  <span>Estado</span>

                  <strong>Completado</strong>
                </article>
              </div>

              <details className="dynamic-capture-response__technical">
                <summary>
                  Ver estructura técnica del registro
                </summary>

                <pre>
                  {JSON.stringify(savedResponse, null, 2)}
                </pre>
              </details>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}