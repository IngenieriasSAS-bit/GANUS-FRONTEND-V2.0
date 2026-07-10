import {
  Database,
  Info,
  Settings2,
} from "lucide-react";

import {
  CAPTURE_METHODS,
  FIELD_TYPES,
} from "../../constants/fieldEngineConstants";

export default function FieldPropertiesPanel({
  selectedField,
  catalogs,
  onChange,
}) {
  if (!selectedField) {
    return (
      <aside className="fe-panel fe-properties">
        <div className="fe-panel__heading">
          <div className="fe-panel__heading-icon">
            <Settings2 size={19} />
          </div>

          <div>
            <h2>Propiedades</h2>
            <p>Configuración del campo seleccionado.</p>
          </div>
        </div>

        <div className="fe-properties__empty">
          <Info size={28} />

          <strong>Selecciona un campo</strong>

          <p>
            Elige un campo del diseñador para configurar sus propiedades,
            captura y comportamiento.
          </p>
        </div>
      </aside>
    );
  }

  const toggleCaptureMethod = (methodId) => {
    const currentMethods = selectedField.captureMethods || [];

    const nextMethods = currentMethods.includes(methodId)
      ? currentMethods.filter((id) => id !== methodId)
      : [...currentMethods, methodId];

    onChange("captureMethods", nextMethods);
  };

  const supportsCatalog = ["list", "multiselect"].includes(
    selectedField.type
  );

  return (
    <aside className="fe-panel fe-properties">
      <div className="fe-panel__heading">
        <div className="fe-panel__heading-icon">
          <Settings2 size={19} />
        </div>

        <div>
          <h2>Propiedades</h2>
          <p>Configuración del campo seleccionado.</p>
        </div>
      </div>

      <div className="fe-properties__content">
        <label className="fe-form-field">
          <span>Nombre del campo</span>

          <input
            type="text"
            value={selectedField.name}
            onChange={(event) => onChange("name", event.target.value)}
          />
        </label>

        <label className="fe-form-field">
          <span>Clave técnica</span>

          <input
            type="text"
            value={selectedField.key}
            onChange={(event) => onChange("key", event.target.value)}
          />
        </label>

        <label className="fe-form-field">
          <span>Tipo de campo</span>

          <select
            value={selectedField.type}
            onChange={(event) => onChange("type", event.target.value)}
          >
            {FIELD_TYPES.map((fieldType) => (
              <option key={fieldType.id} value={fieldType.id}>
                {fieldType.name}
              </option>
            ))}
          </select>
        </label>

        <label className="fe-checkbox-row">
          <input
            type="checkbox"
            checked={selectedField.required}
            onChange={(event) =>
              onChange("required", event.target.checked)
            }
          />

          <span>
            <strong>Campo obligatorio</strong>
            <small>Debe completarse antes de guardar.</small>
          </span>
        </label>

        <label className="fe-form-field">
          <span>Texto de ayuda</span>

          <textarea
            rows="3"
            value={selectedField.helpText}
            onChange={(event) =>
              onChange("helpText", event.target.value)
            }
            placeholder="Información de apoyo para el usuario"
          />
        </label>

        <label className="fe-form-field">
          <span>Valor por defecto</span>

          <input
            type="text"
            value={selectedField.defaultValue}
            onChange={(event) =>
              onChange("defaultValue", event.target.value)
            }
            placeholder="Valor inicial opcional"
          />
        </label>

        {supportsCatalog && (
          <label className="fe-form-field">
            <span>Catálogo reutilizable</span>

            <div className="fe-input-with-icon">
              <Database size={16} />

              <select
                value={selectedField.catalogId}
                onChange={(event) =>
                  onChange("catalogId", event.target.value)
                }
              >
                <option value="">Sin catálogo</option>

                {catalogs.map((catalog) => (
                  <option key={catalog.id} value={catalog.id}>
                    {catalog.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
        )}

        <div className="fe-properties-group">
          <div className="fe-properties-group__heading">
            <strong>Métodos de captura</strong>

            <span>
              El tipo de dato es independiente del método de captura.
            </span>
          </div>

          <div className="fe-capture-methods">
            {CAPTURE_METHODS.map((method) => {
              const Icon = method.icon;

              const isSelected =
                selectedField.captureMethods?.includes(method.id);

              return (
                <button
                  type="button"
                  key={method.id}
                  className={`fe-capture-method ${
                    isSelected ? "fe-capture-method--selected" : ""
                  }`}
                  onClick={() => toggleCaptureMethod(method.id)}
                >
                  <Icon size={16} />
                  <span>{method.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}