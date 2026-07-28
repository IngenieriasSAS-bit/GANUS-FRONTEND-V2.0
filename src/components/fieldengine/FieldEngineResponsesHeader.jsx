import { Plus } from "lucide-react";

export default function FieldEngineResponsesHeader({
    onNewCapture,
}) {
  return (
    <header className="fe-responses-header">
      <div className="fe-responses-header__content">
        <span className="fe-responses-header__eyebrow">
          FIELD ENGINE
        </span>

        <h1>Registros dinámicos</h1>

        <p>
          Consulta todos los formularios diligenciados desde las
          plantillas publicadas en Field Engine.
        </p>
      </div>

      <button
        type="button"
        className="fe-button fe-button--primary"
        onClick={onNewCapture}
      >
        <Plus size={18} />

        <span>Nueva captura</span>
      </button>
    </header>
  );
}