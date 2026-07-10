import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FilePlus2,
  FileText,
  Layers3,
  Search,
  Sparkles,
  Clock3,
  ChevronRight,
  PencilLine,
  ClipboardCheck,
} from "lucide-react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import {
  createField,
  createSection,
} from "../constants/fieldEngineConstants";

import {
  createFieldEngineTemplate,
  getFieldEngineTemplates,
  saveFieldEngineTemplate,
} from "../services/fieldEngineService";

import "../styles/fieldengine/fieldEngineTemplates.css";

export default function FieldEngineTemplates() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [templates, setTemplates] = useState(() =>
    getFieldEngineTemplates()
  );

  const filteredTemplates = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return templates;
    }

    return templates.filter((template) => {
      const searchableContent = [
        template.name,
        template.description,
        template.consumerModule,
        template.functionalContext,
        template.contextType,
        template.contextValue,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(
        normalizedSearch
      );
    });
  }, [search, templates]);

  const handleCreateTemplate = () => {
    const template = createFieldEngineTemplate();

    setTemplates(getFieldEngineTemplates());

    navigate(`/field-engine/${template.id}`);
  };

  const handleGenerateStructure = () => {
    try {
      const template = createFieldEngineTemplate();

      const identificationSection = createSection(
        "Identificación del registro"
      );

      identificationSection.description =
        "Información principal utilizada para identificar el registro dentro de GANUS.";

      const codeField = createField("short-text");

      codeField.name = "Código";
      codeField.key = "codigo";
      codeField.description =
        "Identificador principal y único del registro.";
      codeField.placeholder = "Ej. ACT-001";
      codeField.required = true;

      const nameField = createField("short-text");

      nameField.name = "Nombre";
      nameField.key = "nombre";
      nameField.description =
        "Nombre visible del registro.";
      nameField.placeholder =
        "Ingresa un nombre descriptivo";
      nameField.required = true;

      identificationSection.fields = [
        codeField,
        nameField,
      ];

      const operationalSection = createSection(
        "Información operativa"
      );

      operationalSection.description =
        "Datos relacionados con el estado y operación del registro.";

      const statusField = createField("select");

      statusField.name = "Estado";
      statusField.key = "estado";
      statusField.description =
        "Estado operativo actual del registro.";
      statusField.required = true;
      statusField.options = [
        {
          id: crypto.randomUUID(),
          label: "Activo",
          value: "activo",
        },
        {
          id: crypto.randomUUID(),
          label: "Inactivo",
          value: "inactivo",
        },
        {
          id: crypto.randomUUID(),
          label: "En mantenimiento",
          value: "mantenimiento",
        },
      ];

      const dateField = createField("date");

      dateField.name = "Fecha de registro";
      dateField.key = "fecha_registro";
      dateField.description =
        "Fecha asociada al registro operativo.";
      dateField.required = true;

      operationalSection.fields = [
        statusField,
        dateField,
      ];

      const observationSection = createSection(
        "Observaciones"
      );

      observationSection.description =
        "Información complementaria del registro.";

      const observationsField = createField(
        "long-text"
      );

      observationsField.name = "Observaciones";
      observationsField.key = "observaciones";
      observationsField.description =
        "Comentarios o información adicional.";
      observationsField.placeholder =
        "Registra información complementaria";
      observationsField.required = false;

      observationSection.fields = [
        observationsField,
      ];

      const generatedTemplate = {
        ...template,

        name: "Estructura generada",

        description:
          "Plantilla base generada automáticamente por Field Engine.",

        functionalContext: "Registro operativo",

        sections: [
          identificationSection,
          operationalSection,
          observationSection,
        ],

        updatedAt: new Date().toISOString(),
      };

      const savedTemplate =
        saveFieldEngineTemplate(generatedTemplate);

      setTemplates(getFieldEngineTemplates());

      navigate(`/field-engine/${savedTemplate.id}`);
    } catch (error) {
      console.error(
        "No fue posible generar la estructura:",
        error
      );
    }
  };

  const handleOpenTemplate = (template) => {
    if (template.state === "published") {
      navigate(
        `/field-engine/capture/${template.id}`
      );

      return;
    }

    navigate(`/field-engine/${template.id}`);
  };

  const getFieldCount = (template) =>
    template.sections?.reduce(
      (total, section) =>
        total + (section.fields?.length || 0),
      0
    ) || 0;

  const publishedTemplates = templates.filter(
    (template) => template.state === "published"
  ).length;

  const draftTemplates = templates.filter(
    (template) => template.state !== "published"
  ).length;

  return (
    <div className="fe-templates-shell">
      <Sidebar />

      <div className="fe-templates-main">
        <Navbar />

        <main className="fe-templates">
          <header className="fe-templates__header">
            <div>
              <h1>Field Engine</h1>

              <p>
                Administra las plantillas dinámicas que
                definen la captura de información en GANUS.
              </p>
            </div>

            <div className="fe-templates__actions">
              <button
                type="button"
                className="fe-templates__assistant-button"
                onClick={handleGenerateStructure}
              >
                <Sparkles size={18} />

                <span>Generar estructura</span>
              </button>

              <button
                type="button"
                className="fe-templates__create-button"
                onClick={handleCreateTemplate}
              >
                <FilePlus2 size={18} />

                <span>Nueva plantilla</span>
              </button>
            </div>
          </header>

          <section className="fe-templates__stats">
            <article className="fe-template-stat">
              <div className="fe-template-stat__icon">
                <Layers3 size={21} />
              </div>

              <div>
                <span>Plantillas</span>

                <strong>{templates.length}</strong>

                <small>
                  Estructuras configuradas
                </small>
              </div>
            </article>

            <article className="fe-template-stat">
              <div className="fe-template-stat__icon">
                <FileText size={21} />
              </div>

              <div>
                <span>Publicadas</span>

                <strong>{publishedTemplates}</strong>

                <small>
                  Disponibles para operación
                </small>
              </div>
            </article>

            <article className="fe-template-stat">
              <div className="fe-template-stat__icon">
                <Clock3 size={21} />
              </div>

              <div>
                <span>Borradores</span>

                <strong>{draftTemplates}</strong>

                <small>
                  Pendientes de publicación
                </small>
              </div>
            </article>
          </section>

          <section className="fe-template-manager">
            <div className="fe-template-manager__header">
              <div>
                <h2>Plantillas de captura</h2>

                <p>
                  Abre un borrador para continuar su
                  configuración o ejecuta una plantilla
                  publicada.
                </p>
              </div>

              <label className="fe-template-search">
                <Search size={18} />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Buscar plantilla"
                />
              </label>
            </div>

            <div className="fe-template-list">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => {
                  const isPublished =
                    template.state === "published";

                  return (
                    <button
                      key={template.id}
                      type="button"
                      className="fe-template-card"
                      onClick={() =>
                        handleOpenTemplate(template)
                      }
                    >
                      <div className="fe-template-card__icon">
                        {isPublished ? (
                          <ClipboardCheck size={22} />
                        ) : (
                          <PencilLine size={22} />
                        )}
                      </div>

                      <div className="fe-template-card__content">
                        <div className="fe-template-card__title">
                          <h3>
                            {template.name ||
                              "Plantilla sin nombre"}
                          </h3>

                          <span
                            className={`fe-template-card__status fe-template-card__status--${
                              isPublished
                                ? "published"
                                : "draft"
                            }`}
                          >
                            {isPublished
                              ? "Publicada"
                              : "Borrador"}
                          </span>
                        </div>

                        <p>
                          {template.description ||
                            "Plantilla dinámica de captura configurada en Field Engine."}
                        </p>

                        <div className="fe-template-card__meta">
                          <span>
                            {template.sections?.length || 0}{" "}
                            secciones
                          </span>

                          <span>
                            {getFieldCount(template)} campos
                          </span>

                          <span>
                            Versión {template.version || 1}
                          </span>

                          <span>
                            {isPublished
                              ? "Abrir formulario"
                              : "Continuar edición"}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        className="fe-template-card__arrow"
                        size={20}
                      />
                    </button>
                  );
                })
              ) : (
                <div className="fe-template-empty">
                  <FileText size={28} />

                  <h3>
                    No se encontraron plantillas
                  </h3>

                  <p>
                    Ajusta la búsqueda o crea una nueva
                    estructura de captura.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}