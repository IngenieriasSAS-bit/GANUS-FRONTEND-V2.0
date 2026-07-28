import {
  Calendar,
  CheckCircle2,
  Eye,
  FileText,
  Tag,
} from "lucide-react";

export default function FieldEngineResponseCard({
  response,
  onView,
}) {
  return (
    <article className="fe-response-card">

      <div className="fe-response-card__header">

        <div>

          <span className="fe-response-card__label">
            Código
          </span>

          <h3>
            {response.context?.recordCode}
          </h3>

        </div>

        <span className="fe-response-card__status">

          <CheckCircle2 size={16} />

          {response.status}

        </span>

      </div>

      <div className="fe-response-card__body">

        <div>

          <FileText size={16} />

          <span>{response.templateName}</span>

        </div>

        <div>

          <Tag size={16} />

          <span>
            Versión {response.templateVersion}
          </span>

        </div>

        <div>

          <Calendar size={16} />

          <span>
            {new Date(
              response.createdAt
            ).toLocaleDateString("es-CO")}
          </span>

        </div>

      </div>

      <div className="fe-response-card__footer">

        <button
          type="button"
          className="fe-button fe-button--secondary"
          onClick={() => onView(response)}
        >

          <Eye size={17} />

          <span>Ver detalle</span>

        </button>

      </div>

    </article>
  );
}