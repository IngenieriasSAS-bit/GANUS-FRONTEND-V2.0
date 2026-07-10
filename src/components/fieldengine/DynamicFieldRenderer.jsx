import {
  CalendarClock,
  Check,
  FileText,
  Image,
  MapPin,
  PenTool,
  QrCode,
  Upload,
  Video,
} from "lucide-react";

const MOCK_USERS = [
  {
    id: "user-admin",
    name: "Administrador GANUS",
  },
  {
    id: "user-operator",
    name: "Operador de campo",
  },
  {
    id: "user-supervisor",
    name: "Supervisor operativo",
  },
];

const MOCK_ASSETS = [
  {
    id: "asset-001",
    name: "Activo EQU-001",
  },
  {
    id: "asset-002",
    name: "Activo VEH-001",
  },
  {
    id: "asset-003",
    name: "Activo INF-001",
  },
];

export default function DynamicFieldRenderer({
  field,
  value,
  error,
  catalogs,
  onChange,
}) {
  const catalog = catalogs.find(
    (catalogItem) => catalogItem.id === field.catalogId
  );

  const catalogValues = catalog?.values || [];

  const handleValueChange = (nextValue) => {
    onChange(field.key, nextValue);
  };

  const renderField = () => {
    switch (field.type) {
      case "short-text":
        return (
          <input
            type="text"
            value={value || ""}
            placeholder={
              field.placeholder || "Ingresa la información"
            }
            onChange={(event) =>
              handleValueChange(event.target.value)
            }
          />
        );

      case "long-text":
        return (
          <textarea
            rows="4"
            value={value || ""}
            placeholder={
              field.placeholder || "Describe la información"
            }
            onChange={(event) =>
              handleValueChange(event.target.value)
            }
          />
        );

      case "number":
        return (
          <input
            type="number"
            step="1"
            value={value ?? ""}
            placeholder={
              field.placeholder || "Ingresa un valor"
            }
            onChange={(event) =>
              handleValueChange(event.target.value)
            }
          />
        );

      case "decimal":
        return (
          <input
            type="number"
            step="any"
            value={value ?? ""}
            placeholder={
              field.placeholder || "Ingresa un valor decimal"
            }
            onChange={(event) =>
              handleValueChange(event.target.value)
            }
          />
        );

      case "date":
        return (
          <input
            type="date"
            value={value || ""}
            onChange={(event) =>
              handleValueChange(event.target.value)
            }
          />
        );

      case "datetime":
        return (
          <div className="dynamic-field__input-icon">
            <CalendarClock size={18} />

            <input
              type="datetime-local"
              value={value || ""}
              onChange={(event) =>
                handleValueChange(event.target.value)
              }
            />
          </div>
        );

      case "list":
        return (
          <select
            value={value || ""}
            onChange={(event) =>
              handleValueChange(event.target.value)
            }
          >
            <option value="">Selecciona una opción</option>

            {catalogValues.map((catalogValue) => (
              <option
                key={catalogValue}
                value={catalogValue}
              >
                {catalogValue}
              </option>
            ))}
          </select>
        );

      case "multiselect":
        return (
          <div className="dynamic-field__options">
            {catalogValues.length > 0 ? (
              catalogValues.map((catalogValue) => {
                const selectedValues = Array.isArray(value)
                  ? value
                  : [];

                const isSelected =
                  selectedValues.includes(catalogValue);

                return (
                  <button
                    type="button"
                    key={catalogValue}
                    className={`dynamic-field__option ${
                      isSelected
                        ? "dynamic-field__option--selected"
                        : ""
                    }`}
                    onClick={() => {
                      const nextValues = isSelected
                        ? selectedValues.filter(
                            (item) => item !== catalogValue
                          )
                        : [...selectedValues, catalogValue];

                      handleValueChange(nextValues);
                    }}
                  >
                    <span className="dynamic-field__option-check">
                      {isSelected && <Check size={14} />}
                    </span>

                    <span>{catalogValue}</span>
                  </button>
                );
              })
            ) : (
              <span className="dynamic-field__empty-option">
                Este campo no tiene un catálogo configurado.
              </span>
            )}
          </div>
        );

      case "boolean":
        return (
          <label className="dynamic-field__boolean">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(event) =>
                handleValueChange(event.target.checked)
              }
            />

            <span className="dynamic-field__boolean-control">
              <span />
            </span>

            <span>
              {value ? "Sí" : "No"}
            </span>
          </label>
        );

      case "user":
        return (
          <select
            value={value || ""}
            onChange={(event) =>
              handleValueChange(event.target.value)
            }
          >
            <option value="">Selecciona un usuario</option>

            {MOCK_USERS.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        );

      case "related-asset":
        return (
          <select
            value={value || ""}
            onChange={(event) =>
              handleValueChange(event.target.value)
            }
          >
            <option value="">Selecciona un activo</option>

            {MOCK_ASSETS.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name}
              </option>
            ))}
          </select>
        );

      case "gps":
        return (
          <button
            type="button"
            className="dynamic-field__capture"
            onClick={() =>
              handleValueChange({
                latitude: 4.5828,
                longitude: -74.2167,
                capturedAt: new Date().toISOString(),
              })
            }
          >
            <MapPin size={19} />

            <span>
              {value
                ? "Ubicación capturada"
                : "Capturar ubicación"}
            </span>
          </button>
        );

      case "image":
        return (
          <label className="dynamic-field__upload">
            <Image size={22} />

            <span>
              <strong>Adjuntar imagen</strong>
              <small>
                Selecciona una imagen desde el dispositivo.
              </small>
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                handleValueChange(
                  event.target.files?.[0] || null
                )
              }
            />
          </label>
        );

      case "video":
        return (
          <label className="dynamic-field__upload">
            <Video size={22} />

            <span>
              <strong>Adjuntar video</strong>
              <small>
                Selecciona un archivo de video.
              </small>
            </span>

            <input
              type="file"
              accept="video/*"
              onChange={(event) =>
                handleValueChange(
                  event.target.files?.[0] || null
                )
              }
            />
          </label>
        );

      case "document":
        return (
          <label className="dynamic-field__upload">
            <FileText size={22} />

            <span>
              <strong>Adjuntar documento</strong>
              <small>
                Selecciona el archivo requerido.
              </small>
            </span>

            <input
              type="file"
              onChange={(event) =>
                handleValueChange(
                  event.target.files?.[0] || null
                )
              }
            />
          </label>
        );

      case "signature":
        return (
          <button
            type="button"
            className="dynamic-field__capture"
            onClick={() =>
              handleValueChange({
                status: "captured",
                capturedAt: new Date().toISOString(),
              })
            }
          >
            <PenTool size={19} />

            <span>
              {value
                ? "Firma registrada"
                : "Registrar firma"}
            </span>
          </button>
        );

      case "qr":
        return (
          <button
            type="button"
            className="dynamic-field__capture"
            onClick={() =>
              handleValueChange(
                `QR-${Date.now()}`
              )
            }
          >
            <QrCode size={19} />

            <span>
              {value
                ? `Código: ${value}`
                : "Capturar código QR"}
            </span>
          </button>
        );

      default:
        return (
          <div className="dynamic-field__unsupported">
            <Upload size={18} />

            <span>
              Tipo de campo no disponible para captura.
            </span>
          </div>
        );
    }
  };

  if (field.type === "separator") {
    return (
      <div className="dynamic-field dynamic-field--separator">
        <div className="dynamic-field__separator" />
      </div>
    );
  }

  if (field.type === "title") {
    return (
      <div className="dynamic-field dynamic-field--title">
        <h3>{field.name}</h3>

        {field.helpText && <p>{field.helpText}</p>}
      </div>
    );
  }

  if (field.type === "note") {
    return (
      <div className="dynamic-field dynamic-field--note">
        <p>
          {field.helpText ||
            field.name ||
            "Información complementaria del formulario."}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`dynamic-field ${
        error ? "dynamic-field--error" : ""
      }`}
    >
      <div className="dynamic-field__heading">
        <label htmlFor={`field-${field.id}`}>
          {field.name}

          {field.required && (
            <span className="dynamic-field__required">
              *
            </span>
          )}
        </label>

        {field.captureMethods?.length > 0 && (
          <span className="dynamic-field__method">
            {field.captureMethods.length} método
            {field.captureMethods.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {field.helpText && (
        <p className="dynamic-field__help">
          {field.helpText}
        </p>
      )}

      <div
        id={`field-${field.id}`}
        className="dynamic-field__control"
      >
        {renderField()}
      </div>

      {error && (
        <span className="dynamic-field__error">
          {error}
        </span>
      )}
    </div>
  );
}