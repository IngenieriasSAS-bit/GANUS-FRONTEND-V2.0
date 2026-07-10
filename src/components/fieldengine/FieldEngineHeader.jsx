import {
  ArrowLeft,
  Eye,
  History,
  Save,
  Send,
} from "lucide-react";

export default function FieldEngineHeader({
  template,
  onSave,
  onPublish,
  onPreview,
  onBack,
}) {
  const isPublished = template?.state === "published";

  return (
    <header className="fe-header">
      <div className="fe-header__main">
        <button
          type="button"
          className="fe-icon-button"
          onClick={onBack}
          aria-label="Volver a plantillas"
          title="Volver a plantillas"
        >
          <ArrowLeft size={19} />
        </button>

        <div className="fe-header__identity">
          <div className="fe-header__title-row">
            <h1>{template?.name || "Plantilla sin nombre"}</h1>

            <span
              className={`fe-status fe-status--${
                isPublished ? "published" : "draft"
              }`}
            >
              {isPublished ? "Publicada" : "Borrador"}
            </span>
          </div>

          <p>
            Versión {template?.version || 1} · Constructor dinámico de formularios
          </p>
        </div>
      </div>

      <div className="fe-header__actions">
        <button
          type="button"
          className="fe-button fe-button--secondary"
          onClick={onPreview}
        >
          <Eye size={17} />
          <span>Vista previa</span>
        </button>

        <button
          type="button"
          className="fe-button fe-button--secondary"
          title="Historial de versiones"
        >
          <History size={17} />
          <span>Historial</span>
        </button>

        {!isPublished && (
          <>
            <button
              type="button"
              className="fe-button fe-button--secondary"
              onClick={onSave}
            >
              <Save size={17} />
              <span>Guardar</span>
            </button>

            <button
              type="button"
              className="fe-button fe-button--primary"
              onClick={onPublish}
            >
              <Send size={17} />
              <span>Publicar</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}